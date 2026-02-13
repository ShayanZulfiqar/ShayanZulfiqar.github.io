"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  Star,
  Paperclip,
  Send,
  MoreVertical,
  Archive,
  Trash2,
  Flag,
  Filter,
  CheckCheck,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState(0);
  const [messageText, setMessageText] = useState("");
  const [filterType, setFilterType] = useState("all");

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      lastMessage: "Thanks for your help with the order!",
      time: "2m ago",
      unread: 2,
      status: "online",
      starred: true,
      messages: [
        {
          text: "Hi! I have a question about my recent order #12345",
          time: "10:30 AM",
          sender: "user",
        },
        {
          text: "Hello Sarah! I'd be happy to help. What would you like to know?",
          time: "10:32 AM",
          sender: "admin",
        },
        {
          text: "When will it be delivered?",
          time: "10:33 AM",
          sender: "user",
        },
        {
          text: "Your order is currently being processed and will be shipped within 24 hours. Expected delivery is 3-5 business days.",
          time: "10:35 AM",
          sender: "admin",
        },
        {
          text: "Thanks for your help with the order!",
          time: "10:36 AM",
          sender: "user",
        },
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "MC",
      lastMessage: "Can I get a refund on this item?",
      time: "15m ago",
      unread: 1,
      status: "online",
      starred: false,
      messages: [
        {
          text: "Can I get a refund on this item?",
          time: "11:45 AM",
          sender: "user",
        },
      ],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "ER",
      lastMessage: "The product quality is amazing!",
      time: "1h ago",
      unread: 0,
      status: "offline",
      starred: true,
      messages: [
        {
          text: "The product quality is amazing!",
          time: "10:15 AM",
          sender: "user",
        },
        {
          text: "Thank you so much for the positive feedback! We're thrilled you love it.",
          time: "10:20 AM",
          sender: "admin",
        },
      ],
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "DK",
      lastMessage: "Is this available in other colors?",
      time: "2h ago",
      unread: 0,
      status: "offline",
      starred: false,
      messages: [
        {
          text: "Is this available in other colors?",
          time: "9:30 AM",
          sender: "user",
        },
        {
          text: "Yes! We have it available in blue, red, and black. Would you like me to send you the links?",
          time: "9:35 AM",
          sender: "admin",
        },
      ],
    },
    {
      id: 5,
      name: "Lisa Anderson",
      avatar: "LA",
      lastMessage: "Thank you for the quick response!",
      time: "3h ago",
      unread: 0,
      status: "offline",
      starred: false,
      messages: [
        {
          text: "Thank you for the quick response!",
          time: "8:45 AM",
          sender: "user",
        },
      ],
    },
  ];

  const filteredConversations = conversations.filter((conv) => {
    if (filterType === "unread") return conv.unread > 0;
    if (filterType === "starred") return conv.starred;
    return true;
  });

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add send logic here
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <MessageSquare className="text-indigo-600" size={32} />
              Messages
            </h1>
            <p className="text-gray-500 mt-1">
              Manage customer conversations and support
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterType === "all"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("unread")}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterType === "unread"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilterType("starred")}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterType === "starred"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              Starred
            </button>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        style={{ height: "calc(100vh - 240px)" }}
      >
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-96 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv, index) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedMessage(index)}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${
                    selectedMessage === index ? "bg-indigo-50 border-l-4 border-l-indigo-600" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {conv.avatar}
                      </div>
                      {conv.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {conv.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {conv.starred && (
                            <Star className="text-yellow-500 fill-yellow-500" size={14} />
                          )}
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <div className="mt-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-indigo-600 rounded-full">
                            {conv.unread}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {filteredConversations[selectedMessage]?.avatar}
                  </div>
                  {filteredConversations[selectedMessage]?.status === "online" && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {filteredConversations[selectedMessage]?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {filteredConversations[selectedMessage]?.status === "online"
                      ? "Active now"
                      : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Star size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Archive size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Flag size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {filteredConversations[selectedMessage]?.messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-lg ${
                      msg.sender === "admin"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div
                      className={`flex items-center gap-1 mt-2 text-xs ${
                        msg.sender === "admin" ? "text-indigo-100" : "text-gray-500"
                      }`}
                    >
                      <Clock size={12} />
                      <span>{msg.time}</span>
                      {msg.sender === "admin" && <CheckCheck size={14} className="ml-1" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Send size={18} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MessagesPage;
