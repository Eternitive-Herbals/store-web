"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import BackgroundTexture from "@/assets/background-texture-white-2.svg";
import { Send, MessageSquare, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = async (text: string = input) => {
    const content = text.trim();
    if (!content) return;

    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble connecting right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const clearChat = () => {
    setMessages([]);
  };

  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sf-pro-text pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`mb-4 flex h-[600px] max-h-[80vh] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-[2rem] border border-primary-background/20 bg-[#F9F8F6] shadow-2xl transition-all duration-300 origin-bottom-right relative ${
          isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-50 opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2rem]">
            <Image
            src={BackgroundTexture}
            alt="Background Texture"
            fill
            sizes="400px"
            className="object-cover opacity-5"
            />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between border-b border-primary-background/15 bg-[#F9F8F6]/90 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-primary-background/30 bg-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-background text-[13px] font-medium text-white">
                A
              </div>
            </div>
            <div>
              <h1 className="font-cormorant text-xl font-medium text-primary-background leading-none">Aethery ChatBot</h1>
              <p className="text-[11px] text-gray-400 mt-0.5">Your wellness advisor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="text-[11px] text-[#6A7282] hover:text-primary-background transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-primary-background transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="relative z-10 flex flex-1 flex-col gap-4 overflow-y-auto p-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary-background/10">
          {messages.length === 0 ? (
            <div className="mt-4 flex flex-col items-center text-center">
              <div className="mb-3 text-2xl text-primary-background">✦</div>
              <h2 className="font-cormorant mb-2 text-2xl font-medium text-primary-background">Welcome to Aethery</h2>
              <p className="text-[13px] text-[#6A7282] leading-relaxed px-4">
                Ask me anything about our wellness products, your orders, or let me guide you to the right supplement.
              </p>
              <div className="mt-6 flex w-full flex-col gap-2 px-2">
                <button onClick={() => handleSend("What are your best products for gym recovery?")} className="text-[12px] text-left px-3 py-2 rounded-lg bg-white border border-primary-background/10 hover:border-primary-background/30 transition-colors text-[#4A5565] cursor-pointer shadow-sm">⚡ Gym Recovery</button>
                <button onClick={() => handleSend("Show me your best ayurvedic products")} className="text-[12px] text-left px-3 py-2 rounded-lg bg-white border border-primary-background/10 hover:border-primary-background/30 transition-colors text-[#4A5565] cursor-pointer shadow-sm">🪴 Ayurvedic Options</button>
                <button onClick={() => handleSend("I need help with my order tracking")} className="text-[12px] text-left px-3 py-2 rounded-lg bg-white border border-primary-background/10 hover:border-primary-background/30 transition-colors text-[#4A5565] cursor-pointer shadow-sm">📦 Track my Order</button>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${
                    msg.role === "user" ? "border border-primary-background/15 bg-[#E2DED3] text-[#6A7282]" : "bg-primary-background text-white"
                  }`}
                >
                  {msg.role === "user" ? "You" : "A"}
                </div>
                <div
                  className={`max-w-[85%] rounded-[12px] px-3.5 py-2.5 text-[14px] leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-tr-sm bg-primary-background text-white"
                      : "rounded-tl-sm border border-primary-background/15 bg-white text-[#4A5565]"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{formatText(msg.content)}</p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex gap-2">
              <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-primary-background text-[10px] text-white">
                A
              </div>
              <div className="rounded-[12px] rounded-tl-sm border border-primary-background/15 bg-white px-4 py-3 text-[#4A5565]">
                <div className="flex gap-1.5">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative z-10 border-t border-primary-background/15 bg-[#F9F8F6]/90 px-4 pb-4 pt-3 backdrop-blur-md">
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              className="max-h-[100px] min-h-[44px] flex-1 resize-none rounded-2xl border border-primary-background/15 bg-white px-4 py-2.5 text-[14px] text-primary-background placeholder:text-gray-400 focus:border-primary-background focus:outline-none focus:ring-0"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="flex h-[44px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary-background text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-gray-400">
            General wellness guidance only.
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-16 w-16 items-center justify-center rounded-full bg-primary-background border-[1.5px] border-white/20 text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 absolute right-0 bottom-0 cursor-pointer ${
          isOpen ? "rotate-90 scale-0 opacity-0 pointer-events-none" : "rotate-0 scale-100 opacity-100 pointer-events-auto"
        }`}
      >
        <MessageSquare size={28} />
      </button>
    </div>
  );
}
