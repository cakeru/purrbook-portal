"use client";

import { Suspense, useState, useEffect, useRef, useCallback, type KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import DashboardHeader from "../components/DashboardHeader";
import {
  SEED_PORTAL_THREADS,
  getSalonAutoReply,
  formatPortalMsgTime,
  formatDaySep,
  PortalThread,
  PortalMessage,
} from "../lib/portal-messages";

// ─── Inner client component (reads searchParams) ──────────────────────────────

function MessagesClient() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("client");

  const [threads, setThreads] = useState<PortalThread[]>(SEED_PORTAL_THREADS);
  const [activeId, setActiveId] = useState<string | null>(
    initialId ?? (SEED_PORTAL_THREADS.find((t) => t.unreadCount > 0)?.id ?? SEED_PORTAL_THREADS[0]?.id ?? null)
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeThread = threads.find((t) => t.id === activeId) ?? null;

  // Mark thread read on open
  useEffect(() => {
    if (!activeId) return;
    setThreads((prev) =>
      prev.map((t) => (t.id === activeId ? { ...t, unreadCount: 0 } : t))
    );
  }, [activeId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
    return () => cancelAnimationFrame(frame);
  }, [activeThread?.messages, typing]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => { if (replyTimerRef.current) clearTimeout(replyTimerRef.current); };
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || typing || !activeId) return;

    const newMsg: PortalMessage = {
      id: `msg-${Date.now()}`,
      sender: "salon",
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setThreads((prev) =>
      prev.map((t) => t.id === activeId ? { ...t, messages: [...t.messages, newMsg] } : t)
    );
    setInput("");
    setTyping(true);

    replyTimerRef.current = setTimeout(() => {
      const reply: PortalMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "client",
        content: getSalonAutoReply(text),
        timestamp: new Date().toISOString(),
      };
      setTyping(false);
      setThreads((prev) =>
        prev.map((t) => t.id === activeId ? { ...t, messages: [...t.messages, reply] } : t)
      );
    }, 1400);
  }, [typing, activeId]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage(input);
  }

  // Group messages by day for separators
  function getDaySeparators(messages: PortalMessage[]) {
    const seen = new Set<string>();
    return messages.map((msg) => {
      const day = msg.timestamp.slice(0, 10);
      const showSep = !seen.has(day);
      seen.add(day);
      return { msg, showSep };
    });
  }

  const lastMsg = (thread: PortalThread) =>
    thread.messages[thread.messages.length - 1];

  return (
    <div className="flex h-[calc(100vh-73px)]">

      {/* Thread List */}
      <div className="w-72 border-r border-outline-variant/15 flex flex-col bg-surface-container-low shrink-0">
        <div className="px-5 py-4 border-b border-outline-variant/10">
          <h2 className="font-headline font-bold text-base text-on-surface">Messages</h2>
          <p className="text-xs text-on-surface-variant mt-0.5">Client conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map((thread) => {
            const last = lastMsg(thread);
            const active = thread.id === activeId;
            return (
              <button
                key={thread.id}
                onClick={() => setActiveId(thread.id)}
                className={`w-full text-left px-4 py-4 border-b border-outline-variant/10 transition-colors hover:bg-surface-container ${
                  active ? "bg-surface-container" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-headline font-bold text-primary text-sm">
                      {thread.clientName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-label font-bold text-sm text-on-surface truncate">
                        {thread.clientName}
                      </span>
                      {last && (
                        <span className="text-[10px] text-on-surface-variant shrink-0">
                          {formatPortalMsgTime(last.timestamp)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-bold shrink-0">
                        {thread.petName}
                      </span>
                      {last && (
                        <p className="text-xs text-on-surface-variant truncate">
                          {last.sender === "salon" ? "You: " : ""}{last.content}
                        </p>
                      )}
                    </div>
                  </div>
                  {thread.unreadCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation Panel */}
      {activeThread ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Conversation Header */}
          <div className="px-6 py-4 border-b border-outline-variant/10 bg-surface flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="font-headline font-bold text-primary text-sm">
                {activeThread.clientName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-label font-bold text-sm text-on-surface">{activeThread.clientName}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-on-surface-variant">{activeThread.clientPhone}</span>
                <span className="text-outline-variant">·</span>
                <span className="inline-block px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-bold">
                  {activeThread.petName} · {activeThread.petBreed}
                </span>
                <span className="text-outline-variant">·</span>
                <span className="text-xs text-on-surface-variant">Last booking {activeThread.lastBookingDate}</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-3 min-h-0 bg-surface-container-lowest">
            {getDaySeparators(activeThread.messages).map(({ msg, showSep }) => (
              <div key={msg.id}>
                {showSep && (
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-outline-variant/20" />
                    <span className="text-[11px] text-on-surface-variant font-label">
                      {formatDaySep(msg.timestamp)}
                    </span>
                    <div className="flex-1 h-px bg-outline-variant/20" />
                  </div>
                )}
                <div className={`flex ${msg.sender === "salon" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "client" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 mr-2">
                      <span className="font-headline font-bold text-primary text-[10px]">
                        {activeThread.clientName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "salon"
                        ? "bg-primary text-on-primary rounded-2xl rounded-tr-sm"
                        : "bg-surface-container-low text-on-surface rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-headline font-bold text-primary text-[10px]">
                    {activeThread.clientName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div className="bg-surface-container-low rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/50 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Row */}
          <div className="px-6 py-4 border-t border-outline-variant/10 bg-surface flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Reply to ${activeThread.clientName}…`}
              className="flex-1 bg-surface-container rounded-full px-4 py-2.5 text-sm font-body border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dim text-on-primary flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-on-surface-variant">
          <div className="text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-outline-variant">chat</span>
            <p className="text-sm font-label font-bold">Select a conversation</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function MessagesPage() {
  return (
    <>
      <DashboardHeader title="Messages" breadcrumb="Provider Portal" />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">Loading…</div>}>
        <MessagesClient />
      </Suspense>
    </>
  );
}
