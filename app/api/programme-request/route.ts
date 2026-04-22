import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const programmeRequestSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  secondName: z.string().trim().min(1, "Second name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  organization: z.string().trim().min(1, "Organization is required."),
  eventChoice: z.enum(["kigali", "perth", "both"]),
});

const eventLabels = {
  kigali: "Kigali Edition",
  perth: "Perth Edition",
  both: "Both Editions",
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = programmeRequestSchema.safeParse(body);

    if (!parsed.success) {
      const flattened = parsed.error.flatten();

      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed.",
          errors: flattened.fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const to = process.env.PROGRAMME_FORM_TO;
    const from = process.env.PROGRAMME_FORM_FROM;

    if (!process.env.RESEND_API_KEY || !to || !from) {
      return NextResponse.json(
        {
          ok: false,
          message: "Server environment variables are missing.",
        },
        { status: 500 }
      );
    }

    const subject = `Programme request - ${eventLabels[data.eventChoice]}`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin-bottom: 16px;">New Programme Request</h2>
        <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
          <tr>
            <td><strong>First Name:</strong></td>
            <td>${escapeHtml(data.firstName)}</td>
          </tr>
          <tr>
            <td><strong>Second Name:</strong></td>
            <td>${escapeHtml(data.secondName)}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>${escapeHtml(data.email)}</td>
          </tr>
          <tr>
            <td><strong>Organization:</strong></td>
            <td>${escapeHtml(data.organization)}</td>
          </tr>
          <tr>
            <td><strong>Requested Programme:</strong></td>
            <td>${escapeHtml(eventLabels[data.eventChoice])}</td>
          </tr>
        </table>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          ok: false,
          message: "Failed to send programme request email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Programme request submitted successfully.",
    });
  } catch (error) {
    console.error("Programme request route error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong while submitting the form.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}