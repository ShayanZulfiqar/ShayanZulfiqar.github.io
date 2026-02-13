"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { categories } from "@/data/shopData";
import {
  Send,
  Paperclip,
  Smile,
  X,
  Image as ImageIcon,
  File,
  MoreVertical,
  ArrowLeft,
  Circle,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
  attachment?: {
    type: "image" | "file";
    name: string;
    url: string;
  };
}

const LiveChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to HubMicro Support. How can I help you today?",
      sender: "support",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const emojis = [
    "😀", "😂", "🥰", "😍", "🤔", "👍", "👎", "🙏", "💯", "🔥",
    "❤️", "💙", "💚", "💛", "🎉", "✨", "⭐", "💪", "👌", "✅",
    "❌", "⚠️", "💡", "🎯", "📦", "🚀", "💰", "🛒", "📱", "💻"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setShowEmojiPicker(false);

    // Simulate support typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const supportResponse: Message = {
        id: messages.length + 2,
        text: "Thank you for your message. Our team is reviewing your query and will respond shortly.",
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportResponse]);
    }, 2000);
  };

  const handleEmojiClick = (emoji: string) => {
    setInputMessage(inputMessage + emoji);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: `Sent a ${type}`,
        sender: "user",
        timestamp: new Date(),
        attachment: {
          type,
          name: file.name,
          url: URL.createObjectURL(file),
        },
      };
      setMessages([...messages, newMessage]);
      setShowAttachmentMenu(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ShopHeader categories={categories} />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <main className="flex-1 pt-32 pb-8 px-4 relative z-10">
        <div className="max-w-5xl mx-auto h-full">
          {/* Chat Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-t-2xl shadow-lg p-6 border-b-2 border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.history.back()}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">HS</span>
                  </div>
                  <Circle
                    size={12}
                    className="absolute bottom-0 right-0 text-green-500 fill-green-500"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    HubMicro Support
                  </h2>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online - We'll reply shortly
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical size={24} className="text-gray-600" />
              </button>
            </div>
          </motion.div>

          {/* Messages Container */}
          <div className="bg-white shadow-lg h-[calc(100vh-400px)] overflow-y-auto">
            <div className="p-6 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-md ${
                      message.sender === "user" ? "order-1" : "order-2"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-5 py-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">
                        {message.text}
                      </p>
                      {message.attachment && (
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                            {message.attachment.type === "image" ? (
                              <ImageIcon size={20} />
                            ) : (
                              <File size={20} />
                            )}
                            <span className="text-sm font-medium truncate">
                              {message.attachment.name}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-xs text-gray-500 mt-1 px-2 ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-5 py-3">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-b-2xl shadow-lg p-4 border-t-2 border-gray-100"
          >
            {/* Emoji Picker */}
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="mb-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-700">
                      Pick an emoji
                    </h3>
                    <button
                      onClick={() => setShowEmojiPicker(false)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X size={18} className="text-gray-600" />
                    </button>
                  </div>
                  <div className="grid grid-cols-10 gap-2">
                    {emojis.map((emoji, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEmojiClick(emoji)}
                        className="text-2xl hover:bg-gray-200 rounded-lg p-2 transition-colors"
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Attachment Menu */}
            <AnimatePresence>
              {showAttachmentMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="mb-4 p-3 bg-gray-50 rounded-xl border-2 border-gray-200"
                >
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => imageInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      <ImageIcon size={20} />
                      <span>Image</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      <File size={20} />
                      <span>File</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message Input */}
            <div className="flex items-end gap-3">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Paperclip
                    size={22}
                    className={
                      showAttachmentMenu ? "text-purple-600" : "text-gray-600"
                    }
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Smile
                    size={22}
                    className={
                      showEmojiPicker ? "text-purple-600" : "text-gray-600"
                    }
                  />
                </motion.button>
              </div>

              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-purple-500 transition-colors resize-none max-h-32"
                  style={{ minHeight: "48px" }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ""}
                className={`p-4 rounded-full transition-all ${
                  inputMessage.trim() === ""
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg"
                }`}
              >
                <Send size={20} className="text-white" />
              </motion.button>
            </div>

            {/* Hidden File Inputs */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              className="hidden"
            />
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => handleFileUpload(e, "file")}
              className="hidden"
            />
          </motion.div>
        </div>
      </main>

      <ShopFooter />

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LiveChatPage;
