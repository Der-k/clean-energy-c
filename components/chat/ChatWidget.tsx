"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Inter, Fraunces } from "next/font/google";
import { useRole } from "@/context/RoleContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Warm display serif for the header line — gives the widget a voice that
// isn't generic SaaS-grotesk, and echoes conference/editorial print material.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

/**
 * Signature mark: a sunrise crossing a horizon line.
 * Used at three scales — launcher, header backdrop, typing indicator —
 * so the "clean energy" idea is a running motif, not a one-off graphic.
 */
function SunriseMark({ className = "", strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="26" r="9" fill="currentColor" className="text-[#F2A93B]" />
      <g stroke="#F2A93B" strokeWidth={strokeWidth} strokeLinecap="round">
        <path d="M24 6v6" />
        <path d="M8 26h-5" />
        <path d="M45 26h-5" />
        <path d="M12.5 14.5l4 4" />
        <path d="M35.5 14.5l-4 4" />
      </g>
      <path d="M2 38h44" stroke="#F2A93B" strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export default function ChatWidget() {
  const { visitorUuid } = useRole();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string; timestamp: number }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Format a timestamp as a short local time string, e.g. "3:42 PM"
  function formatTime(ts: number) {
    return new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  // Track scroll position to show/hide the top scroll shadow
  function handleScroll() {
    if (scrollContainerRef.current) {
      setIsScrolled(scrollContainerRef.current.scrollTop > 8);
    }
  }

  // Auto-resize the textarea as content grows, capped at a max height
  function autoResizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  useEffect(() => {
    autoResizeTextarea();
  }, [input]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  // Shared logic: sends a message and streams the assistant's reply token-by-token
  async function streamReply(trimmed: string, currentMessages: { role: string; content: string; timestamp: number }[]) {
    // Brief "sent" pulse feedback — resets itself after the animation plays
    setJustSent(true);
    setTimeout(() => setJustSent(false), 400);

    const userMessage = { role: "user", content: trimmed, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          visitorUuid: visitorUuid ?? null,
          history: currentMessages,
        }),
      });

      if (!res.body) throw new Error("No response body");

      // Push an empty assistant placeholder — tokens get appended into this as they arrive
      setMessages((prev) => [...prev, { role: "assistant", content: "", timestamp: Date.now() }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let streamedDone = false;

      while (!streamedDone) {
        const { value, done } = await reader.read();
        streamedDone = done;
        if (value) {
          const textChunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: updated[lastIndex].content + textChunk,
            };
            return updated;
          });
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again.", timestamp: Date.now() },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await streamReply(trimmed, messages);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handlePromptClick(prompt: string) {
    if (isLoading) return;
    streamReply(prompt, messages);
  }

  return (
    <div className={`${inter.variable} ${fraunces.variable} font-sans fixed bottom-10 right-7 z-[99999] group`}>
      {/* Bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="group relative flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-[#F2A93B]/30 bg-[#10231F] text-white shadow-[0_14px_55px_rgba(16,35,31,0.5)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_70px_rgba(16,35,31,0.65)] active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-[#F2A93B] opacity-20 blur-xl transition-all duration-300 group-hover:opacity-40 group-hover:blur-3xl" />
          <div className="absolute inset-0 rounded-full border border-[#F2A93B]/25 animate-ping opacity-30" />
          <SunriseMark className="relative z-10 h-9 w-9 text-white" strokeWidth={2.3} />
          <div className="absolute bottom-1 right-1 z-20 h-4 w-4 rounded-full border-2 border-[#10231F] bg-[#F2A93B]" />
        </button>
      )}

      {/* Chat Window — full-height right side panel, slides in/out with a transform transition */}
      <div
        className={`fixed inset-y-0 right-0 z-10 flex h-full w-full flex-col overflow-hidden bg-[#FBF7EE] shadow-[0_0_60px_rgba(16,35,31,0.2)] transition-transform duration-300 ease-out sm:w-[420px] md:w-[460px] sm:border-l sm:border-[#10231F]/10 ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-hidden={!open}
      >

        {/* Header — dawn sky over a horizon line, the widget's signature moment */}
        <div className="relative overflow-hidden bg-[#10231F] px-5 py-5 sm:px-7 sm:py-6 text-white">
          <div className="absolute -right-8 -top-16 h-56 w-56 rounded-full bg-[#F2A93B]/20 blur-3xl" />
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full opacity-70"
            viewBox="0 0 460 64"
            preserveAspectRatio="none"
          >
            <circle cx="380" cy="60" r="34" fill="#F2A93B" fillOpacity="0.9" />
            <line x1="0" y1="60" x2="460" y2="60" stroke="#F2A93B" strokeWidth="1.5" strokeOpacity="0.5" />
          </svg>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className={`${fraunces.className} text-[30px] font-medium italic leading-[1.1] tracking-tight`}>
                Any questions?
              </h2>
              <p className="mt-2 text-[14px] font-medium uppercase tracking-[0.14em] text-[#F2A93B]/90">
                Clean Energy Conference · AU × AF
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Area — wrapped so the scroll shadow can sit above the scrolling content */}
        <div className="relative flex-1 overflow-hidden">
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-[#10231F]/[0.08] to-transparent transition-opacity duration-200 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto bg-[#FBF7EE] scroll-smooth"
          >

            {/* Welcome Card */}
            <div className="p-5">
              <div className="overflow-hidden rounded-[24px] border border-[#10231F]/8 bg-white shadow-sm">
                <div className="relative h-40 sm:h-52 overflow-hidden">
                  <img src="/images/hero_2.png" alt="Conference" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10231F]/70 via-[#10231F]/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <div className={`${fraunces.className} text-[26px] italic font-medium leading-tight tracking-tight`}>
                      Clean Energy Conference
                    </div>
                    <div className="mt-1 text-sm text-white/85">Australia × Africa</div>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className={`${fraunces.className} text-[22px] font-semibold leading-tight text-[#10231F]`}>
                    Welcome
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#5B6B63]">
                    I can help you with sponsorships, registration, speakers, schedules, venue logistics and conference support.
                  </p>
                  <div className="mt-7">
                    <div className="mb-3.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#B08A3E]">
                      <span className="h-px w-4 bg-[#F2A93B]" />
                      Suggested Questions
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        "How do I become a sponsor?",
                        "Where is the venue located?",
                        "Show the conference programme",
                        "How do I register?",
                        "Who are the keynote speakers?",
                        "How do I contact support?",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handlePromptClick(prompt)}
                          className="rounded-2xl border border-[#10231F]/10 border-l-[3px] border-l-[#F2A93B] bg-[#FBF7EE] px-[18px] py-[18px] text-left text-sm font-medium leading-snug text-[#10231F] transition-all duration-200 hover:scale-[1.03] hover:border-[#10231F]/20 hover:border-l-[#F2A93B] hover:bg-white hover:shadow-md active:scale-95"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            {messages.length > 0 && (
              <div className="space-y-5 px-5 pb-6">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`group flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                    style={{ animation: "messageIn 0.3s ease-out" }}
                  >
                    <div
                      className={`max-w-[85%] rounded-[22px] px-6 py-5 text-[15px] leading-7 shadow-sm ${
                        m.role === "user"
                          ? "bg-[#2F6F5E] text-white"
                          : "border border-[#10231F]/8 bg-white text-[#243B34]"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            // Paragraphs: comfortable spacing between blocks
                            p: ({ children }) => (
                              <p className="mb-3 last:mb-0">{children}</p>
                            ),
                            // Bold text = keywords → solar amber
                            strong: ({ children }) => (
                              <strong className="font-semibold text-[#B08A3E]">{children}</strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic text-[#5B6B63]">{children}</em>
                            ),
                            // Bullet lists: clear spacing, eucalyptus marker for key points
                            ul: ({ children }) => (
                              <ul className="mb-3 last:mb-0 space-y-1.5 pl-1">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-3 last:mb-0 space-y-1.5 pl-5 list-decimal marker:text-[#2F6F5E] marker:font-semibold">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="flex gap-2 pl-0 [&>ul]:mt-1.5 [&>ol]:mt-1.5 [&_strong]:text-[#2F6F5E]">
                                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2A93B] [ol_&]:hidden" />
                                <span>{children}</span>
                              </li>
                            ),
                            // Headings: distinct weight/size so sections are scannable
                            h1: ({ children }) => (
                              <h1 className={`${fraunces.className} mb-2 mt-1 text-lg font-semibold text-[#10231F]`}>{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className={`${fraunces.className} mb-2 mt-1 text-base font-semibold text-[#10231F]`}>{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="mb-1.5 mt-1 text-[15px] font-semibold text-[#10231F]">{children}</h3>
                            ),
                            // Inline code / code blocks
                            code: ({ children }) => (
                              <code className="rounded-md bg-[#10231F]/8 px-1.5 py-0.5 font-mono text-[13px] text-[#10231F]">
                                {children}
                              </code>
                            ),
                            // Links: underline on hover, amber
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-[#B08A3E] underline decoration-[#F2A93B]/40 underline-offset-2 hover:decoration-[#F2A93B]"
                              >
                                {children}
                              </a>
                            ),
                            // Horizontal rule as a soft section divider
                            hr: () => <hr className="my-3 border-[#10231F]/10" />,
                            // Blockquote for emphasis callouts
                            blockquote: ({ children }) => (
                              <blockquote className="mb-3 last:mb-0 border-l-2 border-[#F2A93B]/50 pl-3 text-[#5B6B63]">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      ) : (
                        m.content
                      )}
                    </div>
                    <span className="mt-1.5 px-1 text-xs text-[#8A9791] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      {formatTime(m.timestamp)}
                    </span>
                  </div>
                ))}

                {/* Typing indicator — sunrise pulse instead of generic gray dots */}
                {isLoading &&
                  (messages[messages.length - 1]?.role === "user" ||
                    messages[messages.length - 1]?.content === "") && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2.5 rounded-[22px] border border-[#10231F]/8 bg-white px-5 py-4 shadow-sm">
                      <span className="block h-2 w-2 rounded-full bg-[#F2A93B]" style={{ animation: "sunPulse 1.1s ease-in-out infinite" }} />
                      <span className="block h-2 w-2 rounded-full bg-[#F2A93B]" style={{ animation: "sunPulse 1.1s ease-in-out 0.18s infinite" }} />
                      <span className="block h-2 w-2 rounded-full bg-[#F2A93B]" style={{ animation: "sunPulse 1.1s ease-in-out 0.36s infinite" }} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Input */}
        <div className="border-t border-[#10231F]/10 bg-white p-5">
          <div
            className={`flex items-end gap-3 rounded-[20px] border bg-[#FBF7EE] px-5 py-3.5 transition-all duration-200 ${
              justSent ? "border-[#F2A93B]/50 ring-2 ring-[#F2A93B]/15" : "border-[#10231F]/10"
            }`}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the conference..."
              disabled={isLoading}
              rows={1}
              className="max-h-[120px] flex-1 resize-none overflow-y-auto bg-transparent py-1 text-[15px] leading-6 text-[#243B34] outline-none placeholder:text-[#8A9791] disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className={`rounded-2xl bg-[#10231F] px-4 py-3 sm:px-6 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#1B3730] hover:shadow-lg active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                justSent ? "scale-90" : "scale-100"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sunPulse {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.55; }
          50%       { transform: translateY(-4px) scale(1.15); opacity: 1; }
        }
        @keyframes messageIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}