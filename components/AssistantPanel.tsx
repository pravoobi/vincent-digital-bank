"use client";

import { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Bot, Send } from "lucide-react";

const STEP_HINTS: Record<number, string> = {
  1: "Ask me anything about this step — e.g. 'What format should DOB be in?'",
  2: "Ask about address requirements — e.g. 'What counts as proof of address?'",
  3: "Ask about accepted ID types, upload tips, or how extraction works.",
  4: "Ask about what happens after you submit.",
};

export default function AssistantPanel({ step }: { step: number }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/assist",
      body: { step },
    });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[520px] border rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border-b">
        <Bot size={18} className="text-blue-600" aria-hidden />
        <span className="text-sm font-semibold text-blue-800">
          AI Assistant
        </span>
        <span className="ml-auto text-xs text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">
          Demo
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm"
        role="log"
        aria-live="polite"
        aria-label="AI assistant conversation"
      >
        {messages.length === 0 && (
          <p className="text-gray-400 italic text-xs mt-2">
            {STEP_HINTS[step] ?? "How can I help?"}
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={[
              "max-w-[90%] rounded-lg px-3 py-2 text-sm",
              m.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800",
            ].join(" ")}
          >
            {m.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 animate-pulse w-16">
            …
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-3 border-t bg-gray-50"
      >
        <label htmlFor="ai-input" className="sr-only">
          Message AI assistant
        </label>
        <input
          id="ai-input"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question…"
          disabled={isLoading}
          autoComplete="off"
          className="flex-1 text-sm border rounded-lg px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
