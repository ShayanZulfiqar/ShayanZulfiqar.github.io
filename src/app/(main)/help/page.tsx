"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { categories } from "@/data/shopData";
import {
  HelpCircle,
  ChevronDown,
  Search,
  Mail,
  Phone,
  MessageCircle,
  Headphones,
} from "lucide-react";

const HelpPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqCategories = [
    { id: "all", label: "All Topics" },
    { id: "orders", label: "Orders & Shipping" },
    { id: "payment", label: "Payment & Refunds" },
    { id: "account", label: "Account & Profile" },
    { id: "products", label: "Products & Returns" },
  ];

  const faqs = [
    {
      category: "orders",
      question: "How can I track my order?",
      answer:
        "You can track your order by visiting the 'Track Order' page and entering your tracking number. You'll find the tracking number in your order confirmation email. You can also view all your orders and their tracking information on the 'My Orders' page.",
    },
    {
      category: "orders",
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 5-7 business days. We also offer express shipping (2-3 business days) and next-day delivery options at checkout. Free shipping is available on orders over $50.",
    },
    {
      category: "orders",
      question: "Can I change my shipping address after placing an order?",
      answer:
        "Yes, you can change your shipping address within 2 hours of placing the order. After that, the order moves to our fulfillment center and cannot be modified. Please contact our customer support team immediately if you need to make changes.",
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Cash on Delivery (COD) for eligible locations. All transactions are secured with SSL encryption.",
    },
    {
      category: "payment",
      question: "How do refunds work?",
      answer:
        "Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method. If you paid by card, it may take an additional 3-5 business days for the refund to appear in your account.",
    },
    {
      category: "payment",
      question: "Is my payment information secure?",
      answer:
        "Absolutely! We use industry-standard SSL encryption and comply with PCI-DSS requirements. We never store your complete credit card information on our servers. All payments are processed through secure payment gateways.",
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click on the 'Get Started' or profile icon in the header and select 'Sign Up'. Fill in your details including name, email, and password. You'll receive a verification email to activate your account. You can also sign up during checkout.",
    },
    {
      category: "account",
      question: "I forgot my password. How do I reset it?",
      answer:
        "Click on 'Login' then select 'Forgot Password'. Enter your registered email address and we'll send you a password reset link. Follow the link to create a new password. If you don't receive the email, check your spam folder.",
    },
    {
      category: "account",
      question: "How do I update my profile information?",
      answer:
        "Go to 'My Profile' from the user menu in the header. Click 'Edit Profile' to update your name, email, phone number, and avatar. Don't forget to save your changes. You can also manage your addresses and preferences from the Settings page.",
    },
    {
      category: "products",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be unused, in original packaging, with all tags attached. Electronics and personal care items have specific return conditions. Return shipping is free for defective items.",
    },
    {
      category: "products",
      question: "How do I return an item?",
      answer:
        "Log in to your account, go to 'My Orders', select the order, and click 'Return Item'. Choose the reason for return and print the prepaid shipping label. Pack the item securely and drop it at any authorized shipping location.",
    },
    {
      category: "products",
      question: "Are the products authentic?",
      answer:
        "Yes, all products sold on HubMicro Shop are 100% authentic and sourced directly from authorized distributors and manufacturers. We guarantee the authenticity of every product and provide manufacturer warranties where applicable.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader categories={categories} />

      <main className="pt-40 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
              <HelpCircle className="text-purple-600" size={48} />
              Help Center
            </h1>
            <p className="text-gray-600 text-lg">
              Find answers to common questions or contact our support team
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-lg"
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {faqCategories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQs */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`flex-shrink-0 text-purple-600 transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                        size={24}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center shadow-lg">
                  <HelpCircle size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try different keywords or browse all topics
                  </p>
                </div>
              )}
            </div>

            {/* Contact Options */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Support
              </h2>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-purple-600 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Email Us</h3>
                      <p className="text-sm text-gray-600">
                        Response in 24 hours
                      </p>
                    </div>
                  </div>
                  <p className="text-purple-600 font-semibold">
                    support@hubmicro.com
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-purple-600 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Call Us</h3>
                      <p className="text-sm text-gray-600">Mon-Fri, 9am-6pm</p>
                    </div>
                  </div>
                  <p className="text-blue-600 font-semibold">
                    +1 (234) 567-890
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push("/live-chat")}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-purple-600 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center">
                      <MessageCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Live Chat</h3>
                      <p className="text-sm text-gray-600">
                        Available 24/7
                      </p>
                    </div>
                  </div>
                  <p className="text-green-600 font-semibold">Start Chat</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 shadow-lg text-white"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <Headphones className="text-white" size={32} />
                    <div>
                      <h3 className="font-bold">24/7 Support</h3>
                      <p className="text-sm text-white/90">
                        We're here to help anytime
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ShopFooter />
    </div>
  );
};

export default HelpPage;
