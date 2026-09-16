import Groq from "groq-sdk";
import { conferenceData } from "@/lib/conference-data";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const PHP_CONTEXT_ENDPOINT = "https://aaemi.com.au/api/chat.php";

// ── Fetch visitor context from MySQL via PHP ──────────────────────────
async function fetchVisitorContext(visitorUuid: string | null) {
  if (!visitorUuid) return null;

  try {
    const res = await fetch(PHP_CONTEXT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorUuid }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.context ?? null;
  } catch {
    return null;
  }
}

// ── Build a personalised context block from visitor data ──────────────
function buildVisitorContextBlock(context: any): string {
  if (!context) return "";

  const lines: string[] = [];

  lines.push("── VISITOR CONTEXT (from live database) ──");

  // Role
  if (context.role) {
    lines.push(`Visitor role: ${context.role}`);
  }

  // Profile
  if (context.profile) {
    const p = context.profile;
    const name = p.full_name || [p.first_name, p.last_name].filter(Boolean).join(" ");
    if (name)          lines.push(`Name: ${name}`);
    if (p.email)       lines.push(`Email: ${p.email}`);
    if (p.company)     lines.push(`Company: ${p.company}`);
    if (p.designation) lines.push(`Designation: ${p.designation}`);
    if (p.sponsor_type) lines.push(`Sponsor type interest: ${p.sponsor_type}`);
    if (p.package_label) lines.push(`Exhibition package interest: ${p.package_label} (${p.package_price})`);
  }

  // Visit behaviour
  if (context.page_count) {
    lines.push(`Pages visited this session: ${context.page_count}`);
  }

  // Recent pages
  if (context.recent_pages?.length) {
    const pagePaths = context.recent_pages
      .slice(0, 5)
      .map((p: any) => p.path)
      .join(", ");
    lines.push(`Recently viewed pages: ${pagePaths}`);
  }

  // Recent interactions
  if (context.recent_interactions?.length) {
    const interactions = context.recent_interactions
      .slice(0, 5)
      .map((i: any) => `${i.type}: "${i.label}" on ${i.page}`)
      .join(" | ");
    lines.push(`Recent interactions: ${interactions}`);
  }

  // Forms submitted
  if (context.forms_submitted?.length) {
    const forms = context.forms_submitted.map((f: any) => {
      if (f.form === "contact")     return `submitted contact form (${f.enquiry_type})`;
      if (f.form === "sponsorship") return `submitted sponsorship request as ${f.company} (${f.sponsor_type})`;
      if (f.form === "exhibitor")   return `submitted exhibitor interest for ${f.package} (${f.company})`;
      if (f.form === "programme_request") return `downloaded programme (${f.event_choice} edition)`;
      return f.form;
    }).join(", ");
    lines.push(`Forms submitted: ${forms}`);
  }

  // Role switches
  if (context.role_history?.length > 1) {
    const history = context.role_history.map((r: any) => r.role).join(" → ");
    lines.push(`Role history: ${history}`);
  }

  lines.push("──────────────────────────────────────────");

  return lines.join("\n");
}

// ── System prompt ─────────────────────────────────────────────────────
function buildSystemPrompt(visitorContext: string) {
  return `
You are the official AI assistant for the Clean Energy Conference website.

${visitorContext ? `${visitorContext}\n\nUse this visitor context to personalise your responses naturally. Address the visitor by name if known. Reference their role, company, or interest in specific packages where relevant. Don't recite the context back verbatim — weave it in naturally.\n` : ""}

Below is official conference information:

${conferenceData}

Your responsibilities:
- Answer conference questions accurately and helpfully
- Guide attendees, sponsors, exhibitors and other visitors
- Help users navigate conference services
- Escalate serious support issues to the support team

Rules:
- Never invent information not present above
- If information is missing, say: "Please contact the support team for confirmation."
- Personalise where you have visitor context, but don't be creepy about it
- Never reveal raw database field names or internal system details to the user

Response length (important):
- Keep replies short: 2-4 sentences, or up to 4-5 short bullet points if listing items
- Never write more than one short paragraph of prose before switching to bullets
- Do not repeat information the visitor already has (e.g. from context above)
- If the full answer is genuinely long (e.g. a detailed schedule), give the short version and say: "Want the full details?" instead of dumping everything at once
- Use **bold** only on the 1-3 most important words or phrases per reply, not entire sentences
`.trim();
}

// ── Route handler ─────────────────────────────────────────────────────
export async function POST(req: Request) {
  const { message, visitorUuid, history = [] } = await req.json();

  if (!message?.trim()) {
    return Response.json({ reply: "Please send a message." }, { status: 400 });
  }

  // Fetch visitor context from MySQL (non-blocking — null if anything fails)
  const visitorContext = await fetchVisitorContext(visitorUuid ?? null);
  const contextBlock   = buildVisitorContextBlock(visitorContext);
  const systemPrompt   = buildSystemPrompt(contextBlock);

  // Build message history (cap at last 10 turns to stay within token limits)
  const conversationHistory = history.slice(-10).map((m: any) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const stream = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message },
    ],
    temperature: 0.4,
    max_tokens: 300, // caps reply length as a hard safety net (~250-350 words max)
    stream: true,
  });

  // Stream tokens to the client as plain text chunks as they arrive from Groq
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const token = chunk.choices[0]?.delta?.content ?? "";
          if (token) controller.enqueue(encoder.encode(token));
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}