"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Inter } from "next/font/google";
import { useRole } from "@/context/RoleContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
    <div className={`${inter.className} fixed bottom-10 right-7 z-[99999] group`}>
      {/* Bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="group relative flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-white/20 bg-[#06056b] text-white shadow-[0_14px_55px_rgba(6,5,107,0.55)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_70px_rgba(6,5,107,0.7)] active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-[#06056b] opacity-40 blur-xl transition-all duration-300 group-hover:opacity-70 group-hover:blur-3xl" />
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
          <MessageCircle size={34} className="relative z-10" strokeWidth={2.3} />
          <div className="absolute bottom-1 right-1 z-20 h-4 w-4 rounded-full border-2 border-white bg-emerald-400" />
        </button>
      )}

      {/* Chat Window — full-height right side panel, slides in/out with a transform transition */}
      <div
        className={`fixed inset-y-0 right-0 z-10 flex h-full w-full flex-col overflow-hidden bg-white shadow-[0_0_60px_rgba(6,5,107,0.25)] transition-transform duration-300 ease-out sm:w-[420px] md:w-[460px] sm:border-l sm:border-black/5 ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-hidden={!open}
      >

        {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#04045c] via-[#06056b] to-[#2954ff] px-5 py-5 sm:px-7 sm:py-6 text-white">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/10 to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h2 className="text-[28px] font-bold leading-[1.15] tracking-tight">Any questions?</h2>
                <p className="mt-1.5 text-[15px] leading-snug text-white/75">Ask our Clean Energy Conference Assistant</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable Area — wrapped so the scroll shadow can sit above the scrolling content */}
          <div className="relative flex-1 overflow-hidden">
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-black/[0.08] to-transparent transition-opacity duration-200 ${
                isScrolled ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="h-full overflow-y-auto bg-[#f5f7ff] scroll-smooth"
            >

            {/* Welcome Card */}
            <div className="p-5">
              <div className="overflow-hidden rounded-[30px] bg-white shadow-sm">
                <div className="relative h-40 sm:h-52 overflow-hidden">
                  <img src="/images/hero_2.png" alt="Conference" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <div className="text-2xl font-bold leading-tight tracking-tight">Clean Energy Conference</div>
                    <div className="mt-1 text-sm text-white/80">Australia × Africa</div>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-[24px] font-bold leading-tight text-[#06056b]">Welcome 👋</h3>
                  <p className="mt-3 text-[15px] leading-7 text-zinc-600">
                    I can help you with sponsorships, registration, speakers, schedules, venue logistics and conference support.
                  </p>
                  <div className="mt-7">
                    <div className="mb-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
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
                          className="rounded-2xl border border-[#06056b]/10 bg-[#f7f9ff] px-[18px] py-[18px] text-left text-sm font-medium leading-snug text-[#06056b] transition-all duration-200 hover:scale-[1.03] hover:border-[#06056b]/30 hover:bg-white hover:shadow-md active:scale-95"
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
                      className={`max-w-[85%] rounded-[26px] px-6 py-5 text-[15px] leading-7 shadow-sm ${
                        m.role === "user" ? "bg-[#06056b] text-white" : "bg-white text-zinc-700"
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
                            // Bold text = keywords → blue
                            strong: ({ children }) => (
                              <strong className="font-semibold text-[#2954ff]">{children}</strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic text-zinc-600">{children}</em>
                            ),
                            // Bullet lists: clear spacing, emerald marker for key points
                            ul: ({ children }) => (
                              <ul className="mb-3 last:mb-0 space-y-1.5 pl-1">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-3 last:mb-0 space-y-1.5 pl-5 list-decimal marker:text-emerald-600 marker:font-semibold">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="flex gap-2 pl-0 [&>ul]:mt-1.5 [&>ol]:mt-1.5 [&_strong]:text-emerald-600">
                                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 [ol_&]:hidden" />
                                <span>{children}</span>
                              </li>
                            ),
                            // Headings: distinct weight/size so sections are scannable
                            h1: ({ children }) => (
                              <h1 className="mb-2 mt-1 text-lg font-bold text-[#06056b]">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="mb-2 mt-1 text-base font-bold text-[#06056b]">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="mb-1.5 mt-1 text-[15px] font-semibold text-[#06056b]">{children}</h3>
                            ),
                            // Inline code / code blocks
                            code: ({ children }) => (
                              <code className="rounded-md bg-[#06056b]/8 px-1.5 py-0.5 font-mono text-[13px] text-[#06056b]">
                                {children}
                              </code>
                            ),
                            // Links: underline on hover, brand color
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-[#2954ff] underline decoration-[#2954ff]/30 underline-offset-2 hover:decoration-[#2954ff]"
                              >
                                {children}
                              </a>
                            ),
                            // Horizontal rule as a soft section divider
                            hr: () => <hr className="my-3 border-[#06056b]/10" />,
                            // Blockquote for emphasis callouts
                            blockquote: ({ children }) => (
                              <blockquote className="mb-3 last:mb-0 border-l-2 border-[#06056b]/30 pl-3 text-zinc-600">
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
                    <span className="mt-1.5 px-1 text-xs text-zinc-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      {formatTime(m.timestamp)}
                    </span>
                  </div>
                ))}

                {/* Typing indicator — shows while waiting for the first token, hides once streaming text appears */}
                {isLoading &&
                  (messages[messages.length - 1]?.role === "user" ||
                    messages[messages.length - 1]?.content === "") && (
                  <div className="flex justify-start">
                    <div className="rounded-[26px] bg-white px-5 py-4 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="block h-2 w-2 rounded-full bg-[#06056b]/40" style={{ animation: "bounce 1s ease-in-out infinite" }} />
                        <span className="block h-2 w-2 rounded-full bg-[#06056b]/40" style={{ animation: "bounce 1s ease-in-out 0.15s infinite" }} />
                        <span className="block h-2 w-2 rounded-full bg-[#06056b]/40" style={{ animation: "bounce 1s ease-in-out 0.3s infinite" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            </div>
          </div>

          {/* Bottom Input */}
          <div className="border-t border-[#06056b]/10 bg-white p-5">
            <div
              className={`flex items-end gap-3 rounded-[22px] border bg-[#f7f9ff] px-5 py-3.5 transition-all duration-200 ${
                justSent ? "border-[#06056b]/30 ring-2 ring-[#06056b]/10" : "border-[#06056b]/10"
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
                className="max-h-[120px] flex-1 resize-none overflow-y-auto bg-transparent py-1 text-[15px] leading-6 text-zinc-700 outline-none placeholder:text-zinc-400 disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className={`rounded-2xl bg-[#06056b] px-4 py-3 sm:px-6 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#0d0ca3] hover:shadow-lg active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  justSent ? "scale-90" : "scale-100"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes messageIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}