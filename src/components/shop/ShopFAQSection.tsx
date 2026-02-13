import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Loader2 } from "lucide-react";
import { ShopFaq } from "@/types/shop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchShopFaqs } from "@/store/slices/shopSlice";

const ShopFAQSection = () => {
    const dispatch = useAppDispatch();
    const { data: faqs, loading } = useAppSelector((state) => state.shop.faqs);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchShopFaqs());
    }, [dispatch]);

    if (!loading && (!faqs || faqs.length === 0)) {
        return null; // Don't show the section if no FAQs exist
    }

    return (
        <section className="py-20 bg-gray-50 overflow-hidden relative" id="shop-faq">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl -ml-48 -mb-48" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-[0_10px_30px_rgba(147,51,234,0.1)] text-purple-600 text-xs font-black tracking-widest mb-6 border border-purple-50"
                    >
                        <HelpCircle size={16} />
                        KNOWLEDGE CENTER
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Everything You <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">Need to Know</span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Curated answers to our most common inquiries. If your question isn't covered, our experts are just a click away.
                    </p>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="relative">
                                <Loader2 className="animate-spin text-purple-600" size={48} />
                                <div className="absolute inset-0 bg-purple-400 blur-2xl opacity-20 animate-pulse" />
                            </div>
                            <p className="text-purple-600/60 font-bold tracking-widest text-xs">SYNCHRONIZING...</p>
                        </div>
                    ) : faqs.map((faq: ShopFaq, index: number) => (
                        <motion.div
                            key={faq._id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`w-full text-left p-6 md:p-10 rounded-[2.5rem] transition-all duration-500 border-2 ${activeIndex === index
                                    ? "bg-white border-purple-500/20 shadow-[0_30px_60px_-15px_rgba(147,51,234,0.15)] ring-4 ring-purple-500/5"
                                    : "bg-white/40 border-white/60 hover:border-purple-200 backdrop-blur-md hover:bg-white"
                                    }`}
                            >
                                <div className="flex justify-between items-center gap-6">
                                    <h3 className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-500 ${activeIndex === index ? "text-purple-600" : "text-slate-800"
                                        }`}>
                                        {faq.question}
                                    </h3>
                                    <div className={`flex-none w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeIndex === index
                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-200 rotate-180"
                                        : "bg-white text-slate-400 border border-slate-100 group-hover:bg-purple-50 group-hover:text-purple-600"
                                        }`}>
                                        <ChevronDown size={24} />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div
                                                className="pt-8 text-slate-600 leading-loose text-lg border-t border-slate-100 mt-8 prose prose-purple font-medium"
                                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Support Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-20 bg-slate-900 p-1 md:p-1.5 rounded-[3.5rem] overflow-hidden group shadow-2xl"
                >
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-10 md:p-14 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                        {/* Decorative background effects */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-900/40 rounded-full -ml-40 -mb-40 blur-3xl animate-pulse" />

                        <div className="relative z-10 max-w-md text-center md:text-left text-white">
                            <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Can't Find Your <br className="hidden md:block" /> Answer?</h3>
                            <p className="text-indigo-100 font-medium opacity-90 text-lg">Our expert support team is standing by 24/7 to help you with anything you need.</p>
                        </div>
                        <button className="relative z-10 bg-white text-indigo-600 px-10 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 hover:bg-slate-50 transition-all active:scale-95 shadow-[0_15px_30_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                            <MessageCircle size={22} strokeWidth={3} />
                            Start Live Chat
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ShopFAQSection;
