import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS } from '../data/blogData';


// Social Icons Components (Keep as is)
const GoogleIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.25 17.21 15.81 18.11V21.09H19.62C21.85 19.09 23.49 16.04 23.49 12.275Z" fill="#4285F4" />
        <path d="M12 24C15.24 24 17.97 22.92 19.96 21.09L16.15 18.11C15.11 18.8 13.71 19.2 12 19.2C8.82 19.2 6.15 17.09 5.2 14.15H1.27V17.15C3.33 21.2 7.42 24 12 24Z" fill="#34A853" />
        <path d="M5.2 14.15C4.94 13.38 4.8 12.55 4.8 11.7C4.8 10.85 4.94 10.02 5.2 9.25V6.18H1.27C0.46 7.82 0 9.7 0 11.7C0 13.7 0.46 15.58 1.27 17.22L5.2 14.15Z" fill="#FBBC05" />
        <path d="M12 4.49C14.23 4.49 15.82 5.56 16.63 6.34L19.98 3.01C17.96 1.13 15.23 0 12 0C7.42 0 3.33 2.8 1.27 6.85L5.2 9.87C6.15 6.94 8.82 4.49 12 4.49Z" fill="#EA4335" />
    </svg>
);

const InstaIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="url(#paint0_linear_insta)" />
        <path d="M12 5.838C15.356 5.838 15.754 5.85 17.079 5.91C18.303 5.966 18.968 6.17 19.41 6.342C19.996 6.57 20.414 6.844 20.854 7.284C21.968 9.17 22.172 9.835 22.228 11.059C22.288 12.384 22.3 12.782 22.3 16.138C22.3 19.494 22.288 19.892 22.228 21.217C22.172 22.441 21.968 23.106 21.796 23.548C21.568 24.134 21.294 24.552 20.854 24.992C20.414 25.432 19.996 25.706 19.41 25.934C18.968 26.106 18.303 26.31 17.079 26.366C15.754 26.426 15.356 26.438 12 26.438C8.644 26.438 8.246 26.426 6.921 26.366C5.697 26.31 5.032 26.106 4.59 25.934C4.004 25.706 3.586 25.432 3.146 24.992C2.706 24.552 2.432 24.134 2.204 23.548C2.032 23.106 1.828 22.441 1.772 21.217C1.712 19.892 1.7 19.494 1.7 16.138C1.7 12.782 1.712 12.384 1.772 11.059C1.828 9.835 2.032 9.17 2.204 8.728C2.432 8.142 2.706 7.724 3.146 7.284C3.586 6.844 4.004 6.57 4.59 6.342C5.032 6.17 5.697 5.966 6.921 5.91C8.246 5.85 8.644 5.838 12 5.838ZM12 4C8.59 4 8.162 4.014 6.816 4.076C5.472 4.138 4.554 4.352 3.75 4.664C2.918 4.986 2.214 5.414 1.514 6.114C0.814 6.814 0.386 7.518 0.064 8.35C-0.248 9.154 -0.462 10.072 -0.524 11.416C-0.586 12.762 -0.6 13.19 -0.6 16.6C-0.6 20.01 -0.586 20.438 -0.524 21.784C-0.462 23.128 -0.248 24.046 0.064 24.85C0.386 25.682 0.814 26.386 1.514 27.086C2.214 27.786 2.918 28.214 3.75 28.536C4.554 28.848 5.472 29.062 6.816 29.124C8.162 29.186 8.59 29.2 12 29.2C15.41 29.2 15.838 29.186 17.184 29.124C18.528 29.062 19.446 28.848 20.25 28.536C21.082 28.214 21.786 27.786 22.486 27.086C23.186 26.386 23.614 25.682 23.936 24.85C24.248 24.046 24.462 23.128 24.524 21.784C24.586 20.438 24.6 20.01 24.6 16.6C24.6 13.19 24.586 12.762 24.524 11.416C24.462 10.072 24.248 9.154 23.936 8.35C23.614 7.518 23.186 6.814 22.486 6.114C21.786 5.414 21.082 4.986 20.25 4.664C19.446 4.352 18.528 4.138 17.184 4.076C15.838 4.014 15.41 4 12 4Z" fill="white" />
        <defs>
            <linearGradient id="paint0_linear_insta" x1="2.4" y1="21.6" x2="21.6" y2="2.4" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f09433" />
                <stop offset="0.25" stopColor="#e6683c" />
                <stop offset="0.5" stopColor="#dc2743" />
                <stop offset="0.75" stopColor="#cc2366" />
                <stop offset="1" stopColor="#bc1888" />
            </linearGradient>
        </defs>
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073C24 5.405 18.627 0 12 0C5.373 0 0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 23.999V15.56H7.078V12.073H10.125V9.429C10.125 6.425 11.916 4.768 14.657 4.768C15.97 4.768 17.344 5.003 17.344 5.003V7.951H15.83C14.34 7.951 13.875 8.875 13.875 9.822V12.073H17.203L16.67 15.56H13.875V24C19.612 23.094 24 18.1 24 12.073Z" fill="#1877F2" />
    </svg>
);

export const Home: React.FC = () => {
    const navigate = useNavigate();

    const [districtIndex, setDistrictIndex] = useState(0);
    const districts = ["Thrissur", "Kochi", "Malappuram", "Palakkad", "Kozhikode", "Trivandrum", "Kannur"];

    useEffect(() => {
        const interval = setInterval(() => {
            setDistrictIndex((prev) => (prev + 1) % districts.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Real Reviews with Source Icons
    const reviews = [
        { name: "Anjaly P.", text: "സ്റ്റേജ് ഫിയർ മാറി 🔥 Best class ever.", lang: "ml", source: "google", icon: <GoogleIcon /> },
        { name: "Arun Kumar", text: "Truly world class experience in Kunnamkulam 💯", lang: "en", source: "facebook", icon: <FacebookIcon /> },
        { name: "Fathima S.", text: "Confidence വച്ചു Best decision ever 💪", lang: "ml", source: "insta", icon: <InstaIcon /> },
        { name: "Vishnu", text: "Interview crack cheythu Thanks Rapids ❤️", lang: "ml", source: "google", icon: <GoogleIcon /> },
        { name: "Rahul M.", text: "My communication skills improved 10x 🚀", lang: "en", source: "insta", icon: <InstaIcon /> },
        { name: "Priya Nair", text: "സംസാരത്തിൽ നല്ല മാറ്റം ഉണ്ട് 👌", lang: "ml", source: "facebook", icon: <FacebookIcon /> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dark:bg-background-dark bg-background-light min-h-screen transition-colors duration-500 overflow-x-hidden"
        >
            <div className="noise-bg fixed inset-0 z-50 pointer-events-none"></div>

            {/* SECTION 1: THE GRAND HERO */}
            <section className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden transition-colors duration-500">
                {/* Background Elements */}
                <div className="absolute inset-0 dark:bg-background-dark bg-background-light transition-colors duration-500">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        className="text-left"
                    >
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/20 rounded-full mb-8 backdrop-blur-md dark:bg-white/5 bg-black/5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-shine"></span>
                                <span className="text-primary font-bold text-[10px] tracking-[0.3em] uppercase font-sans">Kerala's Apex Skill Training Center</span>
                            </div>
                        </motion.div>

                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl dark:text-white text-gray-900 leading-[1.1] mb-4 tracking-tight transition-colors">
                            <motion.div className="overflow-hidden" variants={{ hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } }}>
                                <span>Kerala's Premier</span>
                            </motion.div>
                            <motion.span className="text-platinum block" variants={{ hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } } }}>
                                <span>Public Speaking &amp;</span>
                            </motion.span>
                            <motion.div className="overflow-hidden" variants={{ hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.35 } } }}>
                                <span>Communication Training Center</span>
                            </motion.div>
                        </h1>

                        <motion.h2 variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="dark:text-gray-400 text-gray-600 text-lg md:text-xl mb-12 leading-relaxed max-w-lg font-light border-l border-primary/30 pl-6 transition-colors">
                            Helping Students Across Kerala Overcome Stage Fear and Speak with Confidence
                        </motion.h2>

                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-8">
                            <button
                                onClick={() => navigate('/communication-skills')}
                                className="view-masterclass-btn relative px-10 py-5 overflow-hidden border border-primary/40 rounded-sm transition-all duration-300 hover:border-primary group"
                            >
                                <span className="relative z-10 flex items-center gap-3 font-serif font-bold tracking-[0.2em] text-xs uppercase">
                                    View Masterclass <Icon name="arrow_forward" size="sm" />
                                </span>
                            </button>

                            <button
                                onClick={() => navigate('/courses')}
                                className="px-10 py-5 border-b dark:border-white/20 border-black/20 hover:border-black dark:hover:border-white dark:text-white/70 text-gray-700 hover:text-black dark:hover:text-white font-serif font-bold tracking-[0.2em] text-xs uppercase transition-all"
                            >
                                Browse All Programs
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative hidden lg:block h-[600px]"
                    >
                        <div className="absolute inset-0 bg-gold-platinum opacity-10 blur-[100px] rounded-full animate-float"></div>
                        {/* Parallax Image Card - UPDATED: No Video Button, New Image */}
                        <motion.div
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="relative w-full h-full rounded-[2rem] overflow-hidden border dark:border-white/10 border-black/10 shadow-2xl glass-card transition-all duration-500"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-[3s]"
                                alt="Public Speaking Masterclass"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t dark:from-background-dark from-white via-transparent to-transparent"></div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: THE PHILOSOPHY */}
            <section className="py-32 px-6 dark:bg-surface-dark bg-surface-light border-y dark:border-white/5 border-black/5 relative transition-colors duration-500">
                <div className="max-w-6xl mx-auto text-center">
                    <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-6 block">Our Philosophy</span>
                    <h2 className="font-serif text-4xl md:text-5xl dark:text-white text-gray-900 mb-20 leading-tight transition-colors">
                        "Mediocrity is a disease. <br /><span className="italic dark:text-gray-500 text-gray-400 font-display">We are the cure.</span>"
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            { icon: "psychology", title: "Mindset First", desc: "Skills are useless without the will to use them. We break your fear before we build your voice." },
                            { icon: "groups", title: "Small Cohorts", desc: "We limit batches to 15. You cannot hide in the back of the room at Rapids." },
                            { icon: "verified", title: "Real World", desc: "No theory. Only practice. Mock interviews, stage speeches, and boardroom simulations." }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative p-8 rounded-xl border border-white/5 bg-surface-dark-2 overflow-hidden transition-all duration-300 hover:border-primary/30"
                            >
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                                        <Icon name={item.icon} className="text-3xl" />
                                    </div>
                                    <h3 className="dark:text-white text-gray-900 font-serif text-xl mb-4 transition-colors group-hover:text-primary">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: SOCIAL PROOF & CERTIFICATE */}
            <section className="py-32 px-6 dark:bg-background-dark bg-background-light relative overflow-hidden transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT SIDE: Social Proof Hub */}
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-32 h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl"></div>

                            <div className="mb-10">
                                <h2 className="font-serif text-4xl dark:text-white text-gray-900 mb-4 transition-colors">What They Say</h2>
                                <div className="flex items-center gap-4">
                                    <span className="text-6xl font-serif text-platinum">4,700+</span>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-sm uppercase tracking-widest">Students</span>
                                        <span className="text-primary text-xs uppercase tracking-widest font-bold">
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={districtIndex}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                >
                                                    From {districts[districtIndex]}
                                                </motion.span>
                                            </AnimatePresence>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-[400px] w-full overflow-hidden mask-gradient-b">
                                <div className="animate-scroll-up py-4 space-y-4">
                                    {/* Using 2 sets ensures seamless looping with 50% translation */}
                                    {[...reviews, ...reviews].map((review, i) => (
                                        <div key={i} className="dark:bg-surface-dark-2 bg-white border dark:border-white/10 border-black/5 p-6 rounded-xl shadow-lg flex items-start gap-4 transition-colors">
                                            <div className="mt-1 shrink-0 p-1.5 dark:bg-gray-100 bg-gray-50 rounded-full border border-black/5">
                                                {review.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-serif font-bold dark:text-white text-gray-900 text-sm">{review.name}</span>
                                                    <Icon name="verified" size="12px" className="text-blue-400" />
                                                </div>
                                                {/* REVIEWS UPDATED: No Quotes, Clean Text */}
                                                <p className={`text-sm dark:text-gray-400 text-gray-600 leading-relaxed ${review.lang === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
                                                    {review.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: The White & Gold Certificate */}
                        <div className="relative group flex justify-center">
                            <div className="absolute inset-0 bg-gold-platinum opacity-20 blur-[80px]"></div>

                            <div className="relative bg-white p-2 rounded-lg shadow-[0_0_50px_rgba(255,255,255,0.1)] dark:shadow-[0_0_50px_rgba(255,255,255,0.1)] shadow-black/10 border border-primary/30 transform group-hover:rotate-1 transition-transform duration-700 w-full max-w-md">
                                {/* Decorative Border */}
                                <div className="border-[8px] border-double border-[#D4AF37] p-8 h-[450px] flex flex-col items-center justify-center text-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                                    {/* Certificate Header */}
                                    <div className="mb-8">
                                        <Icon name="diamond" className="text-[#D4AF37] mb-4 text-4xl mx-auto" />
                                        <h3 className="font-serif text-4xl text-black font-bold uppercase tracking-widest mb-2">Certificate</h3>
                                        <p className="font-serif text-[#AA8C2C] text-sm uppercase tracking-[0.3em]">Of Completion</p>
                                    </div>

                                    <p className="font-display italic text-gray-500 mb-4">This is to certify that</p>
                                    <h4 className="font-serif text-3xl text-black border-b border-gray-300 pb-2 px-8 mb-6 inline-block">Student Name</h4>

                                    <p className="text-gray-600 text-sm max-w-xs mx-auto leading-relaxed mb-8">
                                        Has successfully completed the 4-week <strong className="text-black">Executive Communication Masterclass</strong> at Rapids Training Institute, demonstrating exceptional proficiency.
                                    </p>

                                    <div className="flex justify-between w-full px-8 mt-auto">
                                        <div className="text-center">
                                            <div className="font-display text-2xl text-black mb-1 rotate-[-10deg]"></div>
                                            <div className="w-20 h-[1px] bg-gray-400 mx-auto"></div>
                                            <p className="text-[10px] text-gray-500 uppercase mt-1">Director</p>
                                        </div>
                                        <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-[#D4AF37] opacity-20"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SECTION 4: THE FACULTY */}
            <section className="py-24 px-6 dark:bg-surface-dark bg-surface-light border-t dark:border-white/5 border-black/5 transition-colors duration-500">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="font-serif text-4xl dark:text-white text-gray-900 mb-6 transition-colors">Expert Guidance</h2>
                            <p className="dark:text-gray-400 text-gray-600 mb-10 leading-relaxed">
                                Learn from a diverse team of experts. From corporate leadership to psychological resilience, our mentors provide holistic development.
                            </p>

                            <div className="space-y-4">
                                {/* Anil VG */}
                                <div className="flex items-center gap-6 group cursor-pointer bg-surface-dark-2 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all hover:translate-x-2 duration-300">
                                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 grayscale group-hover:grayscale-0 transition-all" alt="Anil VG" />
                                    <div>
                                        <h4 className="dark:text-white text-gray-900 font-serif text-lg mb-0.5 transition-colors group-hover:text-primary">Anil VG</h4>
                                        <p className="text-xs text-primary uppercase tracking-wider font-bold">Director & Chief Mentor</p>
                                    </div>
                                </div>

                                {/* Ali Sulfikkar */}
                                <div className="flex items-center gap-6 group cursor-pointer bg-surface-dark-2 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all hover:translate-x-2 duration-300">
                                    {/* Placeholder for Ali Sulfikkar */}
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 grayscale group-hover:grayscale-0 transition-all" alt="Ali Sulfikkar" />
                                    <div>
                                        <h4 className="dark:text-white text-gray-900 font-serif text-lg mb-0.5 transition-colors group-hover:text-primary">Ali Sulfikkar</h4>
                                        <p className="text-xs text-primary uppercase tracking-wider font-bold">Experienced Mentor</p>
                                    </div>
                                </div>

                                {/* E. Usha */}
                                <div className="flex items-center gap-6 group cursor-pointer bg-surface-dark-2 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all hover:translate-x-2 duration-300">
                                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 grayscale group-hover:grayscale-0 transition-all" alt="E. Usha" />
                                    <div>
                                        <h4 className="dark:text-white text-gray-900 font-serif text-lg mb-0.5 transition-colors group-hover:text-primary">E. Usha</h4>
                                        <p className="text-xs text-primary uppercase tracking-wider font-bold">Psychologist & Mentor</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 md:order-2 relative">
                            <div className="absolute inset-0 bg-gold-platinum blur-[80px] opacity-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
                                className="relative z-10 w-full rounded-sm grayscale shadow-2xl border dark:border-white/10 border-black/10 hover:grayscale-0 transition-all duration-700 object-cover aspect-[4/3]"
                                alt="Communication Class"
                            />
                            <div className="absolute bottom-4 right-4 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded border border-white/10">
                                <p className="text-white text-xs font-serif uppercase tracking-widest">Live Workshop</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: LATEST INSIGHTS (BLOG) */}
            <section className="py-24 px-6 dark:bg-background-dark bg-background-light border-t dark:border-white/5 border-black/5 transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Knowledge Hub</span>
                            <h2 className="font-serif text-4xl dark:text-white text-gray-900 transition-colors">Latest Insights</h2>
                        </div>
                        <p className="dark:text-gray-500 text-gray-600 text-sm max-w-sm text-right mt-4 md:mt-0 transition-colors">
                            Deep dives into leadership psychology, non-verbal mechanics, and persuasive strategy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.slice(0, 3).map((post) => (
                            <div
                                key={post.id}
                                onClick={() => navigate(`/blog/${post.id}`)}
                                className="group dark:bg-surface-dark-2 bg-white rounded-xl overflow-hidden border dark:border-white/5 border-black/10 hover:border-primary/30 transition-all cursor-pointer h-full flex flex-col hover:-translate-y-1 duration-300 shadow-lg"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    {/* GOLD TITLE UPDATE TO MATCH SCREENSHOT */}
                                    <h3 className="text-primary font-serif text-xl mb-3 transition-colors line-clamp-2">{post.title}</h3>
                                    <p className="dark:text-gray-500 text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">{post.excerpt}</p>
                                    <div className="flex items-center justify-between text-xs dark:text-gray-600 text-gray-400 font-medium border-t dark:border-white/5 border-black/5 pt-4">
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
                        <button
                            onClick={() => navigate('/blog')}
                            className="px-8 py-3 border dark:border-white/10 border-black/10 dark:text-white text-black text-xs font-bold uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-sm"
                        >
                            View All Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 5: UPCOMING COURSES TEASER */}
            <section className="py-24 px-6 bg-black relative">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Future Modules</span>
                    <h2 className="font-serif text-4xl dark:text-white text-white mb-12">Expanding The Ecosystem</h2>
                    <div className="flex justify-center gap-16 opacity-60">
                        <div className="group flex flex-col items-center gap-4 hover:opacity-100 transition-opacity cursor-pointer">
                            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors hover:scale-110 duration-300">
                                <Icon name="candlestick_chart" className="text-gray-400 group-hover:text-primary" size="lg" />
                            </div>
                            <span className="dark:text-gray-400 text-gray-400 font-serif tracking-widest text-sm">PRO TRADING</span>
                        </div>
                        <div className="group flex flex-col items-center gap-4 hover:opacity-100 transition-opacity cursor-pointer">
                            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors hover:scale-110 duration-300">
                                <Icon name="shopping_cart" className="text-gray-400 group-hover:text-primary" size="lg" />
                            </div>
                            <span className="dark:text-gray-400 text-gray-400 font-serif tracking-widest text-sm">E-COMMERCE</span>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};