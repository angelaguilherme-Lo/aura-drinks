'use client';

import { useMemo, useRef, useState, useEffect } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const starterQuestions = [
  'Which drink is best for a floral taste?',
  'What are the seasonal collections?',
  'Can you help me with checkout?',
  'Which flavors are best for summer?',
];

export function AuraChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hello — I’m the Aura assistant. I can help with flavors, collections, ingredients, favorites, accounts, and checkout questions.',
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: text },
    ];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            data.message ??
            'I’m sorry — I couldn’t generate a response just now.',
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            'I’m sorry — the assistant is temporarily unavailable. Please try again shortly.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const quickActions = useMemo(() => starterQuestions, []);

  return (
  <>
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      aria-label={open ? "Close Aura chat" : "Open Aura chat"}
      className="fixed bottom-6 left-6 z-[70] inline-flex h-14 items-center justify-center rounded-full bg-[#476f57] px-6 text-sm font-medium text-white shadow-[0_18px_40px_rgba(71,111,87,0.35)] transition hover:bg-[#3d5f4a]"
    >
      {open ? "Close chat" : "Ask Aura"}
    </button>

      {open && (
        <section className="fixed bottom-24 right-6 z-[70] flex h-[min(78vh,720px)] w-[min(92vw,420px)] flex-col overflow-hidden rounded-[32px] border border-[var(--surface-line)] bg-[rgba(255,252,246,0.96)] shadow-[0_28px_80px_rgba(32,22,12,0.18)] backdrop-blur-xl">
          <div className="border-b border-[var(--surface-line)] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
              Aura assistant
            </p>
            <h2 className="mt-2 text-xl text-[var(--text)]">
              Product and checkout help
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Ask about flavors, favorites, sign-in, collections, and demo
              checkout support.
            </p>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-[24px] px-4 py-3 text-sm leading-7 ${
                    message.role === 'user'
                      ? 'bg-[#476f57] text-white'
                      : 'border border-[var(--surface-line)] bg-white text-[var(--text)]'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-[24px] border border-[var(--surface-line)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">
                  Aura is typing...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[var(--surface-line)] px-4 py-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickActions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  className="rounded-full border border-[var(--surface-line)] bg-white px-3 py-2 text-xs text-[var(--text-muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
                >
                  {question}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-end gap-3"
            >
              <label htmlFor="aura-chat-input" className="sr-only">
                Ask Aura a question
              </label>

              <textarea
                id="aura-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about drinks, services, or checkout..."
                rows={2}
                className="min-h-[56px] flex-1 resize-none rounded-[20px] border border-[var(--surface-line)] bg-white px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-soft)] focus:border-[#476f57]"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#476f57] px-5 text-sm font-medium text-white transition hover:bg-[#3d5f4a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
