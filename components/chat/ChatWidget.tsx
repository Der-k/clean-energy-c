"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, ChevronRight, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Inter } from "next/font/google";
import { useRole } from "@/context/RoleContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Brand tokens — kept in one place so palette changes stay a one-line edit.
const BRAND = {
  navy: "#0b0a6b",
  navyDark: "#080754",
  green: "#009966",
  gold: "#EAC301",
};

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

  const suggestedPrompts = [
    "How do I become a sponsor?",
    "Where is the venue located?",
    "Show the conference programme",
    "How do I register?",
    "Who are the keynote speakers?",
    "How do I contact support?",
  ];

  return (
    <div className={`${inter.className} fixed bottom-6 right-6 z-[99999]`}>
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_4px_18px_rgba(11,10,107,0.35)] transition-transform duration-150 hover:scale-105 active:scale-95"
          style={{ backgroundColor: BRAND.navy }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H9l-3.8 3.05c-.5.4-1.2.04-1.2-.6V16H5.5C4.67 16 4 15.33 4 14.5v-9Z"
              fill="white"
            />
            <circle cx="9" cy="10" r="1.15" fill={BRAND.navy} />
            <circle cx="12.5" cy="10" r="1.15" fill={BRAND.navy} />
            <circle cx="16" cy="10" r="1.15" fill={BRAND.navy} />
          </svg>
          <span
            className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-[#0b0a6b] ring-2 ring-white"
            style={{ backgroundColor: BRAND.gold }}
          >
            1
          </span>
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`fixed inset-y-0 right-0 z-10 flex h-full w-full flex-col overflow-hidden bg-white shadow-[0_0_40px_rgba(0,0,0,0.18)] transition-transform duration-250 ease-out sm:inset-y-4 sm:right-4 sm:h-[calc(100%-2rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-black/[0.06] ${
          open ? "translate-x-0" : "translate-x-[110%] pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3.5 text-white sm:rounded-t-2xl"
          style={{ backgroundColor: BRAND.navy }}
        >
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-[13px] font-semibold">
              CE
              <span
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2"
                style={{ backgroundColor: BRAND.green, boxShadow: `0 0 0 2px ${BRAND.navy}` }}
              />
            </div>
            <div className="leading-tight">
              <div className="text-[14px] font-semibold">Conference Assistant</div>
              <div className="text-[12px] text-white/65">Typically replies instantly</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="relative flex-1 overflow-hidden bg-[#F7F8FA]">
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-5 bg-gradient-to-b from-black/[0.06] to-transparent transition-opacity duration-200 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto scroll-smooth"
          >
            {/* Welcome */}
            <div className="border-b border-black/[0.05] bg-white px-5 pb-5 pt-6">
              <h3 className="text-[16px] font-semibold text-[#111827]">Hi, welcome 👋</h3>
              <p className="mt-1.5 text-[13.5px] leading-6 text-[#6B7280]">
                Ask about sponsorships, registration, speakers, schedules, or venue logistics.
              </p>
            </div>

            {/* Quick actions — list rows, not illustrated cards */}
            <div className="border-b border-black/[0.05] bg-white px-2 py-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  disabled={isLoading}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-[13.5px] font-medium text-[#1F2937] transition-colors hover:bg-[#F3F4F6] disabled:opacity-50"
                >
                  <span className="flex items-center gap-2.5">
                    <Zap size={14} style={{ color: BRAND.green }} className="shrink-0" />
                    {prompt}
                  </span>
                  <ChevronRight size={15} className="shrink-0 text-[#9CA3AF]" />
                </button>
              ))}
            </div>

            {/* Messages */}
            {messages.length > 0 && (
              <div className="space-y-4 px-4 py-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                    style={{ animation: "messageIn 0.2s ease-out" }}
                  >
                    {m.role === "assistant" && (
                      <div
                        className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: BRAND.navy }}
                      >
                        CE
                      </div>
                    )}
                    <div className={`flex max-w-[78%] flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-[13.5px] leading-6 ${
                          m.role === "user"
                            ? "rounded-br-md text-white"
                            : "rounded-bl-md border border-black/[0.06] bg-white text-[#1F2937] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                        }`}
                        style={m.role === "user" ? { backgroundColor: BRAND.green } : undefined}
                      >
                        {m.role === "assistant" ? (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => <p className="mb-2.5 last:mb-0">{children}</p>,
                              strong: ({ children }) => (
                                <strong className="font-semibold text-[#111827]">{children}</strong>
                              ),
                              em: ({ children }) => <em className="italic text-[#6B7280]">{children}</em>,
                              ul: ({ children }) => (
                                <ul className="mb-2.5 last:mb-0 space-y-1 pl-1">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol
                                  className="mb-2.5 last:mb-0 space-y-1 pl-5 list-decimal"
                                  style={{ color: BRAND.navy }}
                                >
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="flex gap-2 pl-0 [&>ul]:mt-1 [&>ol]:mt-1">
                                  <span
                                    className="mt-2 h-1 w-1 shrink-0 rounded-full [ol_&]:hidden"
                                    style={{ backgroundColor: BRAND.green }}
                                  />
                                  <span>{children}</span>
                                </li>
                              ),
                              h1: ({ children }) => (
                                <h1 className="mb-1.5 mt-1 text-[15px] font-semibold text-[#111827]">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="mb-1.5 mt-1 text-[14px] font-semibold text-[#111827]">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="mb-1 mt-1 text-[13.5px] font-semibold text-[#111827]">{children}</h3>
                              ),
                              code: ({ children }) => (
                                <code className="rounded bg-[#F3F4F6] px-1.5 py-0.5 font-mono text-[12px] text-[#111827]">
                                  {children}
                                </code>
                              ),
                              a: ({ children, href }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium underline underline-offset-2"
                                  style={{ color: BRAND.navy }}
                                >
                                  {children}
                                </a>
                              ),
                              hr: () => <hr className="my-2.5 border-black/[0.08]" />,
                              blockquote: ({ children }) => (
                                <blockquote
                                  className="mb-2.5 last:mb-0 border-l-2 pl-3 text-[#6B7280]"
                                  style={{ borderColor: BRAND.gold }}
                                >
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
                      <span className="mt-1 px-1 text-[11px] text-[#9CA3AF]">{formatTime(m.timestamp)}</span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isLoading &&
                  (messages[messages.length - 1]?.role === "user" ||
                    messages[messages.length - 1]?.content === "") && (
                  <div className="flex items-end gap-2">
                    <div
                      className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: BRAND.navy }}
                    >
                      CE
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-black/[0.06] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                      <span className="block h-1.5 w-1.5 rounded-full bg-[#9CA3AF]" style={{ animation: "dotFade 1.2s ease-in-out infinite" }} />
                      <span className="block h-1.5 w-1.5 rounded-full bg-[#9CA3AF]" style={{ animation: "dotFade 1.2s ease-in-out 0.2s infinite" }} />
                      <span className="block h-1.5 w-1.5 rounded-full bg-[#9CA3AF]" style={{ animation: "dotFade 1.2s ease-in-out 0.4s infinite" }} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-black/[0.06] bg-white p-3">
          <div
            className={`flex items-end gap-2 rounded-full border bg-[#F7F8FA] py-1.5 pl-4 pr-1.5 transition-all duration-150 ${
              justSent ? "border-[#009966]/40" : "border-black/[0.08]"
            }`}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              rows={1}
              className="max-h-[100px] flex-1 resize-none overflow-y-auto bg-transparent py-1.5 text-[13.5px] leading-5 text-[#1F2937] outline-none placeholder:text-[#9CA3AF] disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-150 active:scale-90 disabled:opacity-40"
              style={{ backgroundColor: BRAND.navy }}
            >
              <Send size={15} />
            </button>
          </div>
          <div className="mt-2 text-center text-[10.5px] text-[#9CA3AF]">
            Powered by <span className="font-semibold" style={{ color: BRAND.navy }}>Clean Energy Conference</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dotFade {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 1; transform: translateY(-2px); }
        }
        @keyframes messageIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}