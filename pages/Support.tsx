import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Support() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "Can I transfer my batch if I miss the current one?",
            answer: "Yes, you can transfer to the next immediate batch available. However, this is subject to seat availability and must be requested at least 48 hours before your scheduled batch begins. Please contact support to initiate this process."
        },
        {
            question: "What happens if I miss a class?",
            answer: "If you miss a class, don't worry! You get free entry to the next batch's corresponding session. We ensure you never miss out on learning. Just inform our support team about your absence, and we'll schedule you for the next round."
        },
        {
            question: "How does the 15-Day Satisfaction Guarantee work?",
            answer: "We offer a 15-day refund window starting from your Class Start Date. If you are not satisfied with the training within the first 15 days, you can request a refund of the Course Fee (₹5,000). The Booking Fee (₹500) is non-refundable as it covers seat reservation and administrative costs."
        },
        {
            question: "Will I get a certificate after completion?",
            answer: "Yes, upon successful completion of the course and clearing the final assessment, you will be awarded a Certificate of Completion from Rapids Training Institutes, recognized for its excellence in elite communication training."
        }
    ];

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-gray-200 font-sans selection:bg-yellow-500/30">
            {/* Hero Section */}
            <section className="relative py-24 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <div className="inline-block mb-4 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-semibold tracking-widest uppercase">
                        Help Center
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        Rapids Support Center
                    </h1>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                        Find answers, manage your learning journey, and get in touch with our elite support team.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-icons-round text-gray-500 group-focus-within:text-yellow-500 transition-colors">search</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for help (e.g., 'refund', 'batch transfer')"
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 text-white placeholder-gray-500 transition-all outline-none"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Quick Links Grid */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "About Rapids", icon: "diamond", link: "/about", desc: "Learn about our mission and elite training." },
                        { title: "Explore Courses", icon: "school", link: "/courses", desc: "Browse our masterclasses and workshops." },
                        { title: "Refund Policy", icon: "receipt_long", link: "/refund", desc: "Understand our 15-day guarantee." },
                        { title: "Privacy & Data", icon: "security", link: "/privacy", desc: "How we protect your personal information." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link to={item.link} className="flex items-start p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-[0_0_30px_-10px_rgba(234,179,8,0.2)] transition-all group h-full">
                                <div className="flex-shrink-0 mr-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-icons-round text-black text-2xl">{item.icon}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white/5 border-y border-white/10 py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-serif font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-400">Everything you need to know about joining Rapids.</p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
                                >
                                    <span className="text-lg font-medium text-white pr-8">{faq.question}</span>
                                    <span className={`material-icons-round text-yellow-500 transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-white/10"
                                        >
                                            <div className="p-6 text-gray-400 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Footer */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-white mb-8">Still need help?</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <a
                            href="tel:+919747559900"
                            className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
                        >
                            <span className="material-icons-round">call</span>
                            Call Support
                        </a>
                        <a
                            href="https://wa.me/919747559900"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-3"
                        >
                            <span className="material-icons-round">chat</span>
                            Chat on WhatsApp
                        </a>
                    </div>
                    <p className="mt-8 text-gray-500 text-sm">
                        Support Hours: Mon-Sat, 9:00 AM - 6:00 PM IST
                    </p>
                </div>
            </section>
        </div>
    );
}