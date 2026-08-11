import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logo from "@/assets/trinity-logo.png.asset.json";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "I got an IRS notice — what now?",
  "Can I set up a payment plan?",
  "What is an Offer in Compromise?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open || status === "ready") {
      const id = window.setTimeout(() => textareaRef.current?.focus(), 120);
      return () => window.clearTimeout(id);
    }
    return;
  }, [open, status]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    setInput("");
    void sendMessage({ text: value });
  };

  const handleSubmit = (message: { text?: string }) => {
    send(message.text ?? input);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with our AI tax assistant"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[image:var(--gradient-ink)] py-3 pl-3 pr-5 text-ink-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-accent-foreground">
            <MessageCircle className="size-5" />
          </span>
          <span className="text-sm font-semibold">Ask Ellie</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-x-3 bottom-3 z-50 flex h-[min(78vh,620px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-lift)] sm:inset-x-auto sm:right-5 sm:w-[400px]">
          <header className="flex items-center gap-3 bg-[image:var(--gradient-ink)] px-4 py-3 text-ink-foreground">
            <img
              src={logo.url}
              alt="Trinity Tax Consultants"
              className="size-9 rounded-full bg-ink-foreground/5"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Ellie · Trinity Assistant</p>
              <p className="truncate text-xs text-ink-foreground/70">
                AI help with tax &amp; service questions
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
            >
              <X />
            </Button>
          </header>

          <Conversation className="flex-1">
            <ConversationContent className="gap-4">
              {messages.length === 0 && (
                <div className="space-y-4 px-1 py-2">
                  <p className="text-sm text-muted-foreground">
                    Hi, I&apos;m Ellie. Ask me about IRS notices, back taxes, payment plans, or how
                    Trinity can help. Free consultations are always available.
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-lg border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:border-accent hover:bg-secondary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <Message key={message.id} from={message.role}>
                  <MessageContent
                    className={
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-transparent p-0 text-foreground"
                    }
                  >
                    {message.parts.map((part, index) =>
                      part.type === "text" ? (
                        <MessageResponse key={index}>{part.text}</MessageResponse>
                      ) : null,
                    )}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" && (
                <Shimmer className="text-sm">Ellie is thinking...</Shimmer>
              )}

              {error && (
                <p className="text-sm text-destructive">
                  Sorry, something went wrong. Please try again or call us at (702) 840-3808.
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border p-3">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputTextarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a tax or service question..."
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} disabled={!input.trim() || busy} />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Phone className="size-3" /> General info only — not formal tax advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
