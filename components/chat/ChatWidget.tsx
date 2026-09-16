"use client";

import { useEffect, useRef, useState } from "react";
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
          className="flex h-16 items-center gap-3 rounded-full px-6 text-[16px] font-semibold text-white shadow-[0_6px_20px_rgba(11,10,107,0.4)] transition-transform duration-150 hover:scale-105 active:scale-95"
          style={{ backgroundColor: BRAND.navy }}
        >
          Chat with us
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold text-[#0b0a6b]"
            style={{ backgroundColor: BRAND.gold }}
          >
            1
          </span>
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`fixed inset-y-0 right-0 z-10 flex h-full w-full flex-col overflow-hidden bg-[#EDEFF7] shadow-[0_0_40px_rgba(0,0,0,0.18)] transition-transform duration-250 ease-out sm:inset-y-4 sm:right-4 sm:h-[calc(100%-2rem)] sm:w-[400px] sm:rounded-[28px] sm:border sm:border-black/[0.06] ${
          open ? "translate-x-0" : "translate-x-[110%] pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 text-white sm:rounded-t-[28px]"
          style={{ backgroundColor: BRAND.navy }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-[16px] font-bold">
              CE
            </div>
            <div className="leading-tight">
              <div className="text-[17px] font-semibold">Conference Assistant</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[13px] text-white/70">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.green }} />
                Online now
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full px-3 py-1.5 text-[14px] font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="relative flex-1 overflow-hidden">
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-5 bg-gradient-to-b from-black/[0.07] to-transparent transition-opacity duration-200 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-full space-y-4 overflow-y-auto scroll-smooth p-4"
          >
            {/* Hero + welcome card — white */}
            <div className="overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-sm">
              <img src="/images/hero_2.png" alt="Conference" className="h-36 w-full object-cover" />
              <div className="p-5">
                <div className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: BRAND.green }}>
                  Clean Energy Conference · AU × AF
                </div>
                <h3 className="mt-1.5 text-[20px] font-bold leading-tight text-[#111827]">Hi, welcome</h3>
                <p className="mt-2 text-[15px] leading-7 text-[#4B5563]">
                  Ask about sponsorships, registration, speakers, schedules, or venue logistics.
                </p>
              </div>
            </div>

            {/* Quick actions card — green-tinted, distinct from the white cards around it */}
            <div className="rounded-[22px] border border-[#009966]/15 bg-[#EAF7F1] p-4">
              <div className="px-1 pb-3 text-[13px] font-bold uppercase tracking-wide text-[#00734C]">
                Popular Questions
              </div>
              <div className="space-y-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handlePromptClick(prompt)}
                    disabled={isLoading}
                    className="block w-full rounded-2xl border border-[#009966]/15 bg-white px-4 py-3.5 text-left text-[15px] font-semibold leading-snug text-[#111827] shadow-sm transition-all hover:border-[#009966]/40 hover:shadow-md disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages card — navy-tinted wrapper once a conversation exists */}
            {messages.length > 0 && (
              <div className="rounded-[22px] border border-[#0b0a6b]/10 bg-white p-4">
                <div className="space-y-4">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                      style={{ animation: "messageIn 0.2s ease-out" }}
                    >
                      {m.role === "assistant" && (
                        <span className="mb-1 px-1 text-[12px] font-bold uppercase tracking-wide text-[#0b0a6b]/50">
                          Assistant
                        </span>
                      )}
                      <div className={`flex max-w-[85%] flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                        <div
                          className={`rounded-[20px] px-5 py-3.5 text-[15px] leading-7 ${
                            m.role === "user"
                              ? "rounded-br-md text-white"
                              : "rounded-bl-md border border-[#EAC301]/30 bg-[#FFFBEB] text-[#1F2937]"
                          }`}
                          style={m.role === "user" ? { backgroundColor: BRAND.green } : undefined}
                        >
                          {m.role === "assistant" ? (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                                strong: ({ children }) => (
                                  <strong className="font-bold text-[#0b0a6b]">{children}</strong>
                                ),
                                em: ({ children }) => <em className="italic text-[#6B7280]">{children}</em>,
                                ul: ({ children }) => (
                                  <ul className="mb-3 last:mb-0 space-y-1.5 pl-1">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                  <ol
                                    className="mb-3 last:mb-0 space-y-1.5 pl-5 list-decimal"
                                    style={{ color: BRAND.navy }}
                                  >
                                    {children}
                                  </ol>
                                ),
                                li: ({ children }) => (
                                  <li className="flex gap-2 pl-0 [&>ul]:mt-1.5 [&>ol]:mt-1.5">
                                    <span
                                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full [ol_&]:hidden"
                                      style={{ backgroundColor: BRAND.green }}
                                    />
                                    <span>{children}</span>
                                  </li>
                                ),
                                h1: ({ children }) => (
                                  <h1 className="mb-2 mt-1 text-[17px] font-bold text-[#111827]">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                  <h2 className="mb-2 mt-1 text-[16px] font-bold text-[#111827]">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="mb-1.5 mt-1 text-[15px] font-bold text-[#111827]">{children}</h3>
                                ),
                                code: ({ children }) => (
                                  <code className="rounded bg-[#0b0a6b]/8 px-1.5 py-0.5 font-mono text-[13px] text-[#0b0a6b]">
                                    {children}
                                  </code>
                                ),
                                a: ({ children, href }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold underline underline-offset-2"
                                    style={{ color: BRAND.navy }}
                                  >
                                    {children}
                                  </a>
                                ),
                                hr: () => <hr className="my-3 border-black/[0.08]" />,
                                blockquote: ({ children }) => (
                                  <blockquote
                                    className="mb-3 last:mb-0 border-l-[3px] pl-3 text-[#6B7280]"
                                    style={{ borderColor: BRAND.green }}
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
                        <span className="mt-1.5 px-1 text-[12px] text-[#9CA3AF]">{formatTime(m.timestamp)}</span>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading &&
                    (messages[messages.length - 1]?.role === "user" ||
                      messages[messages.length - 1]?.content === "") && (
                    <div className="flex flex-col items-start">
                      <span className="mb-1 px-1 text-[12px] font-bold uppercase tracking-wide text-[#0b0a6b]/50">
                        Assistant
                      </span>
                      <div className="flex items-center gap-1.5 rounded-[20px] rounded-bl-md border border-[#EAC301]/30 bg-[#FFFBEB] px-5 py-4">
                        <span className="block h-2 w-2 rounded-full bg-[#0b0a6b]/40" style={{ animation: "dotFade 1.2s ease-in-out infinite" }} />
                        <span className="block h-2 w-2 rounded-full bg-[#0b0a6b]/40" style={{ animation: "dotFade 1.2s ease-in-out 0.2s infinite" }} />
                        <span className="block h-2 w-2 rounded-full bg-[#0b0a6b]/40" style={{ animation: "dotFade 1.2s ease-in-out 0.4s infinite" }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input card — white, floating above the tinted page background */}
        <div className="p-4 pt-2">
          <div
            className={`rounded-[24px] border bg-white p-2 shadow-sm transition-all duration-150 ${
              justSent ? "border-[#009966]/50 ring-2 ring-[#009966]/15" : "border-black/[0.08]"
            }`}
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                rows={1}
                className="max-h-[100px] flex-1 resize-none overflow-y-auto bg-transparent px-3 py-2.5 text-[15px] leading-6 text-[#1F2937] outline-none placeholder:text-[#9CA3AF] disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="shrink-0 rounded-2xl px-5 py-3 text-[14px] font-bold text-white transition-transform duration-150 active:scale-95 disabled:opacity-40"
                style={{ backgroundColor: BRAND.navy }}
              >
                Send
              </button>
            </div>
          </div>
          <div className="mt-3 text-center text-[12px] text-[#9CA3AF]">
            Powered by <span className="font-bold" style={{ color: BRAND.navy }}>Clean Energy Conference</span>
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