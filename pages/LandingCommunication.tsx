import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '../components/Icon';
import { BLOG_POSTS } from '../data/blogData';

export const LandingCommunication: React.FC = () => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background-dark min-h-screen font-sans overflow-x-hidden text-gray-200"
        >
            {/* 1. IMPACT HERO WITH VIDEO FEEL */}
            <section className="relative h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop"
                        className="w-full h-full object-cover grayscale opacity-40 scale-105 animate-pulse-slow"
                        alt="Speaker"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent"></div>
                    <div className="noise-bg"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-20">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <span className="w-16 h-[1px] bg-primary"></span>
                            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Rapids Masterclass Series</span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-10 tracking-tight"
                        >
                            Speak Like <br />
                            <span className="text-platinum">A Leader.</span>
                        </motion.h1>

                        <p className="text-gray-300 text-xl leading-relaxed mb-12 max-w-xl border-l-2 border-primary/50 pl-8 font-light">
                            The definitive offline program in Kunnamkulam to conquer stage fear, master body language, and command any room.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Updated Button: Solid Gold, Premium Feel, No Jittery Animation */}
                            <button
                                onClick={() => navigate('/lead-form')}
                                className="px-14 py-6 bg-gold-platinum text-black font-serif font-bold tracking-[0.25em] text-sm uppercase rounded-sm hover:brightness-110 transition-all shadow-[0_0_50px_rgba(212,175,55,0.3)]"
                            >
                                Secure Seat
                            </button>
                            <div className="flex items-center gap-3 px-8 py-6 border border-white/20 text-sm text-white font-medium tracking-wider uppercase bg-white/5 backdrop-blur-sm">
                                <Icon name="bolt" className="text-primary" /> 4 Weeks Offline
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE PROBLEM GRID */}
            <section className="py-32 px-6 bg-surface-dark border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                        <h2 className="font-serif text-5xl text-white leading-tight">Why You Are Here.</h2>
                        <p className="text-gray-400 max-w-md text-right text-lg font-light">Most professionals stagnate not because of a lack of skill, but a lack of voice.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "The Glass Ceiling", desc: "You have the ideas, but someone louder gets the credit." },
                            { title: "The Freeze Response", desc: "Your heart races and mind goes blank when asked to speak." },
                            { title: "Zero Presence", desc: "You enter a room and nobody notices. That changes now." }
                        ].map((item, i) => (
                            <div key={i} className="p-12 bg-surface-dark-2 border border-white/5 hover:border-primary transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Icon name="north_east" size="4xl" />
                                </div>
                                <span className="text-7xl text-gray-800 font-serif mb-8 block group-hover:text-primary/20 transition-colors">0{i + 1}</span>
                                <h3 className="text-2xl font-bold text-white mb-6 font-serif">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. YOUR CREDENTIALS (NEW CERTIFICATE SECTION) */}
            <section className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-platinum opacity-5 blur-[100px]"></div>
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Certification</span>
                        <h2 className="font-serif text-5xl text-white mb-6">A Badge of <span className="text-platinum">Honor.</span></h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            This isn't just a piece of paper. It's proof that you faced your fears and conquered them. Rapids certification is recognized by leading corporates across Kerala as a standard of excellence.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Signed by Industry Veterans",
                                "Verifiable Credential ID",
                                "Premium Physical Copy included"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white">
                                    <Icon name="verified" className="text-primary" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Certificate Visual */}
                    <div className="relative group flex justify-center">
                        <div className="relative bg-white p-2 rounded-lg shadow-[0_0_60px_rgba(212,175,55,0.2)] border border-primary/30 transform hover:scale-105 transition-transform duration-700 w-full max-w-md">
                            <div className="border-[8px] border-double border-[#D4AF37] p-8 h-[400px] flex flex-col items-center justify-center text-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                                <div className="mb-6">
                                    <Icon name="diamond" className="text-[#D4AF37] mb-2 text-3xl mx-auto" />
                                    <h3 className="font-serif text-3xl text-black font-bold uppercase tracking-widest mb-1">Certificate</h3>
                                    <p className="font-serif text-[#AA8C2C] text-xs uppercase tracking-[0.3em]">Of Completion</p>
                                </div>
                                <h4 className="font-serif text-2xl text-black border-b border-gray-300 pb-2 px-8 mb-4 inline-block">Your Name</h4>
                                <p className="text-gray-600 text-xs max-w-xs mx-auto leading-relaxed mb-8">
                                    Has successfully mastered the Art of Public Speaking at Rapids Training Institute.
                                </p>
                                <div className="flex justify-between w-full px-4 mt-auto">
                                    <div className="text-center">
                                        <div className="font-display text-xl text-black mb-1 rotate-[-10deg]">Anil VG</div>
                                        <div className="w-16 h-[1px] bg-gray-400 mx-auto"></div>
                                    </div>
                                    <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-[#D4AF37] opacity-20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. STUDENT TRANSFORMATIONS */}
            <section className="py-32 px-6 bg-background-dark relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="font-serif text-4xl text-center text-white mb-20">Real Transformations</h2>
                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="bg-surface-dark-2 p-10 border border-white/10 rounded-sm relative shadow-xl">
                            <Icon name="format_quote" className="text-primary text-6xl absolute -top-6 -left-4 bg-surface-dark-2 rounded-full" />
                            <p className="text-gray-300 text-lg leading-relaxed italic mb-8">
                                "I used to shake holding a mic. After Week 2 at Rapids, I delivered a 10-minute presentation to my company's board. I didn't just survive; I enjoyed it."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-serif font-bold">RK</div>
                                <div>
                                    <h4 className="text-white font-serif">Rahul K.</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">Software Architect</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-dark-2 p-10 border border-white/10 rounded-sm relative shadow-xl">
                            <Icon name="format_quote" className="text-primary text-6xl absolute -top-6 -left-4 bg-surface-dark-2 rounded-full" />
                            <p className="text-gray-300 text-lg leading-relaxed italic mb-8">
                                "The mock interviews were brutal but necessary. I cleared my UPSC interview because I learned how to structure my thoughts under pressure."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-serif font-bold">AS</div>
                                <div>
                                    <h4 className="text-white font-serif">Anjali S.</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">Civil Servant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. DETAILED CURRICULUM */}
            <section className="py-32 px-6 bg-surface-dark border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">The Blueprint</span>
                        <h2 className="font-serif text-5xl text-white">The 4-Week Transformation</h2>
                    </div>

                    <div className="space-y-24">
                        {[
                            {
                                week: "01",
                                title: "Deconstruction",
                                desc: "We strip away your bad habits. Diagnostic speeches recorded on camera. Understanding your baseline anxiety.",
                                points: ["Video Analysis", "Anxiety Mapping", "Vocal Baseline"]
                            },
                            {
                                week: "02",
                                title: "The Instrument",
                                desc: "Your voice is a tool. Learn to use it. Pitch, power, pause, and pace. Diaphragmatic breathing techniques.",
                                points: ["Voice Modulation", "Power Posing", "Eye Contact Drills"]
                            },
                            {
                                week: "03",
                                title: "Structure & Story",
                                desc: "Never ramble again. Learn the frameworks CEOs use to answer impromptu questions and tell compelling stories.",
                                points: ["PREP Framework", "Storytelling Arc", "Impromptu Speaking"]
                            },
                            {
                                week: "04",
                                title: "The Stage",
                                desc: "The final test. A 5-minute keynote presentation in front of a live audience and external judges.",
                                points: ["Final Keynote", "Mock Interviews", "Certification"]
                            }
                        ].map((module, i) => (
                            <div key={i} className={`flex flex-col md:flex-row gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex-1 relative">
                                    <span className="absolute -top-16 -left-16 text-[12rem] font-serif text-white/5 z-0 leading-none">{module.week}</span>
                                    <div className="relative z-10 bg-surface-dark-2 p-10 border border-white/10 shadow-2xl glass-card">
                                        <h3 className="text-3xl font-serif text-white mb-6">{module.title}</h3>
                                        <p className="text-gray-400 leading-relaxed mb-8">{module.desc}</p>
                                        <ul className="space-y-3">
                                            {module.points.map((p, j) => (
                                                <li key={j} className="flex items-center gap-3 text-gray-300 text-sm font-medium tracking-wide">
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="w-full h-80 bg-white/5 rounded-sm flex items-center justify-center border border-white/5 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <Icon name={i === 0 ? "videocam" : i === 1 ? "mic" : i === 2 ? "auto_stories" : "emoji_events"} size="4xl" className="text-gray-400 group-hover:text-primary transition-colors duration-500 scale-125" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. BLOG / INSIGHTS SECTION (NEW) */}
            <section className="py-24 px-6 bg-background-dark border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Knowledge Hub</span>
                            <h2 className="font-serif text-4xl text-white">Latest Insights</h2>
                        </div>
                        <p className="text-gray-500 text-sm max-w-sm text-right mt-4 md:mt-0">
                            Deep dives into leadership psychology, non-verbal mechanics, and persuasive strategy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.slice(0, 6).map((post) => (
                            <div
                                key={post.id}
                                onClick={() => navigate(`/blog/${post.id}`)}
                                className="group bg-surface-dark-2 rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all cursor-pointer h-full flex flex-col"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-bold text-white uppercase tracking-wider">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    {/* Updated Title Color to Primary (Gold) */}
                                    <h3 className="text-primary font-serif text-xl mb-3 transition-colors line-clamp-2">{post.title}</h3>
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">{post.excerpt}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-600 font-medium border-t border-white/5 pt-4">
                                        <span>{post.readTime}</span>
                                        <span className="group-hover:translate-x-1 transition-transform text-primary flex items-center gap-1">
                                            Read Article <Icon name="arrow_forward" size="12px" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <button className="px-8 py-3 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors rounded-sm">
                            View All Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* 7. FAQ SECTION */}
            <section className="py-24 px-6 bg-surface-dark border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-serif text-3xl text-center text-white mb-16">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is this suitable for beginners?", a: "Yes. We start from the basics of overcoming fear. However, the pace is intensive." },
                            { q: "What is the batch size?", a: "Strictly capped at 15 students to ensure every student gets ample stage time." },
                            { q: "Can I get a refund?", a: "The booking fee is non-refundable. The remaining fee is refundable up to 7 days before the batch starts." },
                            { q: "Is there a certificate?", a: "Yes, upon successful completion of the Week 4 Keynote, you will be certified." }
                        ].map((item, i) => (
                            <div key={i} className="border border-white/10 rounded-sm overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex justify-between items-center p-6 text-left bg-surface-dark-2 hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-serif text-white font-medium">{item.q}</span>
                                    <Icon name={openFaq === i ? "remove" : "add"} className="text-primary" />
                                </button>
                                {openFaq === i && (
                                    <div className="p-6 bg-black text-gray-400 text-sm leading-relaxed border-t border-white/5">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. PRICING & CTA */}
            <section className="py-32 px-6 bg-background-dark">
                <div className="max-w-5xl mx-auto bg-surface-dark-2 border border-white/10 p-16 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Icon name="diamond" size="4xl" />
                    </div>

                    <h2 className="font-serif text-5xl text-white mb-6">Ready to Speak Up?</h2>
                    <p className="text-gray-400 mb-12 text-lg">Next batch starts this Monday. Only 3 seats remaining.</p>

                    <div className="flex flex-col items-center justify-center mb-12">
                        <span className="text-gray-500 line-through text-xl">₹8,000</span>
                        <span className="text-7xl font-serif text-platinum mt-4 drop-shadow-lg">₹5,000</span>
                        <span className="text-primary text-sm font-bold mt-4 tracking-widest uppercase">Full Course Fee</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto mb-12">
                        <div className="p-6 bg-primary/10 border border-primary/20 rounded-sm">
                            <span className="block text-xs text-primary font-bold uppercase tracking-widest mb-1">Booking Fee</span>
                            <span className="block text-3xl font-serif text-white">₹500</span>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                            <span className="block text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Pay Later</span>
                            <span className="block text-3xl font-serif text-gray-300">₹4,500</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/lead-form')}
                        className="w-full md:w-auto px-20 py-6 bg-gold-platinum text-black font-serif font-bold tracking-[0.25em] text-lg rounded-sm hover:brightness-110 transition-all shadow-[0_0_50px_rgba(191,149,63,0.4)]"
                    >
                        RESERVE MY SPOT
                    </button>
                    <p className="text-xs text-gray-500 mt-8 tracking-wide">100% Satisfaction Guarantee. Refundable if cancelled 7 days prior.</p>
                </div>
            </section>

        </motion.div>
    );
};