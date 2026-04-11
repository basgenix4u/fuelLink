// src/components/shared/ChatWindow.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Paperclip,
  Image,
  X,
  MoreVertical,
  Phone,
  CheckCheck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  senderType: "marketer" | "depot";
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  attachments?: { type: string; url: string; name: string }[];
}

interface ChatWindowProps {
  recipientId: string;
  recipientName: string;
  recipientType: "marketer" | "depot";
  currentUserId: string;
  currentUserType: "marketer" | "depot";
  orderId?: string;
  onClose?: () => void;
  isFullPage?: boolean;
}

// Mock messages
const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "depot-001",
    senderType: "depot",
    content: "Hello! Your order has been confirmed. We're ready for pickup tomorrow.",
    timestamp: "2025-02-19T09:00:00Z",
    status: "read",
  },
  {
    id: "2",
    senderId: "marketer-001",
    senderType: "marketer",
    content: "Great! Our truck will arrive around 10 AM. Is that okay?",
    timestamp: "2025-02-19T09:15:00Z",
    status: "read",
  },
  {
    id: "3",
    senderId: "depot-001",
    senderType: "depot",
    content: "Perfect. Please ensure your driver has the QR code ready for verification at the gate.",
    timestamp: "2025-02-19T09:20:00Z",
    status: "read",
  },
  {
    id: "4",
    senderId: "marketer-001",
    senderType: "marketer",
    content: "Already shared with him. Thanks!",
    timestamp: "2025-02-19T09:25:00Z",
    status: "delivered",
  },
];

export function ChatWindow({
  recipientId,
  recipientName,
  recipientType,
  currentUserId,
  currentUserType,
  orderId,
  onClose,
  isFullPage = false,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      senderType: currentUserType,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate reply
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply: Message = {
          id: `msg-${Date.now() + 1}`,
          senderId: recipientId,
          senderType: recipientType,
          content: "Thanks for your message. I'll get back to you shortly.",
          timestamp: new Date().toISOString(),
          status: "delivered",
        };
        setMessages((prev) => [...prev, reply]);
      }, 2000);
    }, 1000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const MessageStatus = ({ status }: { status: Message["status"] }) => {
    switch (status) {
      case "sent":
        return <Clock className="w-3 h-3 text-slate-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-slate-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-white",
        isFullPage ? "h-[calc(100vh-200px)] rounded-2xl border border-slate-200" : "h-[500px] rounded-2xl shadow-xl border border-slate-200"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
              recipientType === "depot" ? "bg-primary-500" : "bg-secondary-500"
            )}
          >
            {recipientName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{recipientName}</h3>
            <p className="text-xs text-slate-500 capitalize">{recipientType}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Phone className="w-5 h-5 text-slate-500" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-slate-500" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          )}
        </div>
      </div>

      {/* Order Context (if applicable) */}
      {orderId && (
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
          <p className="text-xs text-slate-500">
            Regarding order: <span className="font-medium text-slate-700">{orderId}</span>
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.senderId === currentUserId;

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex", isOwn ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5",
                  isOwn
                    ? "bg-secondary-500 text-white rounded-br-md"
                    : "bg-slate-100 text-slate-900 rounded-bl-md"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <div
                  className={cn(
                    "flex items-center justify-end gap-1 mt-1",
                    isOwn ? "text-white/70" : "text-slate-400"
                  )}
                >
                  <span className="text-[10px]">{formatTime(message.timestamp)}</span>
                  {isOwn && <MessageStatus status={message.status} />}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <div className="bg-slate-100 rounded-2xl px-4 py-3 rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <span
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Paperclip className="w-5 h-5 text-slate-500" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Image className="w-5 h-5 text-slate-500" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
          />
          <Button
            variant="secondary"
            size="md"
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}