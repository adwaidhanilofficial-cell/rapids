import React from 'react';
import { motion } from 'framer-motion';
import { Course } from '../types';
import { Icon } from '../components/Icon';

interface CourseDetailProps {
    course: Course;
    onBack: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen bg-background-dark pb-32"
        >
            {/* Full Width Hero Banner */}
            <div className="relative h-[60vh] w-full -mt-20">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-black/50 to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent w-2/3"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 max-w-7xl mx-auto flex flex-col justify-end h-full pb-16">
                    <button onClick={onBack} className="absolute top-32 left-6 md:left-12 flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8">
                         <Icon name="arrow_back" /> Back to Browse
                    </button>

                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-2xl">
                         <div className="flex gap-3 mb-4">
                            <span className="px-3 py-1 bg-primary text-black rounded text-xs font-bold uppercase tracking-wider shadow-lg">
                                {course.category || 'Masterclass'}
                            </span>
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-xs font-bold text-white flex items-center gap-1 border border-white/20">
                                <Icon name="star" size="14px" className="text-primary" /> {course.rating || '5.0'}
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-4 drop-shadow-xl">{course.title}</h1>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">{course.subtitle || 'Master the art of leadership in the modern corporate landscape. Join 5,000+ executives in this comprehensive series.'}</p>

                        <div className="flex items-center gap-4">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-primary object-cover" alt="Instructor" />
                            <div>
                                <p className="text-white text-sm font-bold">Anil VG</p>
                                <p className="text-gray-400 text-xs">Director & Chief Mentor</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Desktop 2-Column Content */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-8 relative z-30">
                
                {/* Left Column: Curriculum */}
                <div className="lg:col-span-2 space-y-8">
                     <div className="bg-surface-dark-2 rounded-2xl p-8 border border-white/5">
                        <h3 className="font-serif text-2xl text-white mb-6">Course Curriculum</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex gap-4 p-5 rounded-xl bg-black/20 hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10 items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 font-serif group-hover:bg-primary group-hover:text-black transition-colors shrink-0">
                                        {i}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white text-base font-medium mb-1">
                                            {i === 1 ? 'Introduction & Core Principles' : 
                                            i === 2 ? 'Non-Verbal Communication Mastery' : 
                                            i === 3 ? 'Stakeholder Management & Influence' : 
                                            i === 4 ? 'Crisis Communication Strategies' :
                                            i === 5 ? 'Negotiation Tactics for Executives' : 'Final Assessment & Capstone'}
                                        </h4>
                                        <p className="text-gray-500 text-xs">15 mins • Video Lesson • Resources</p>
                                    </div>
                                    <div className="self-center">
                                        {i === 1 ? (
                                            <Icon name="check_circle" className="text-primary" />
                                        ) : (
                                            <Icon name="lock" className="text-gray-700" size="sm" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                     
                     <div className="bg-surface-dark-2 rounded-2xl p-8 border border-white/5">
                         <h3 className="font-serif text-2xl text-white mb-4">About This Course</h3>
                         <p className="text-gray-400 leading-relaxed mb-4">
                             This comprehensive program is designed for senior leaders who need to communicate their vision effectively. You will learn to command the room, handle difficult conversations with grace, and inspire your team to action.
                         </p>
                         <p className="text-gray-400 leading-relaxed">
                             Includes over 4 hours of video content, downloadable workbooks, and a certificate of completion accredited by the Global Leadership Institute.
                         </p>
                     </div>
                </div>

                {/* Right Column: Sticky Action Card */}
                <div className="relative">
                    <div className="sticky top-24 bg-surface-dark-2 rounded-2xl p-6 border border-white/10 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold text-xl">$199.00</h3>
                            <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded border border-primary/20">PREMIUM</span>
                        </div>
                        
                        <button className="w-full bg-gold-gradient text-black font-serif font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] active:scale-[0.98] transition-all duration-300 mb-4">
                            RESUME LEARNING
                        </button>
                        
                        <button className="w-full bg-transparent border border-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/5 transition-colors mb-6 text-sm">
                            ADD TO LIST
                        </button>

                        <div className="space-y-3 text-sm text-gray-400">
                             <div className="flex items-center gap-3">
                                 <Icon name="all_inclusive" size="sm" /> <span>Full Lifetime Access</span>
                             </div>
                             <div className="flex items-center gap-3">
                                 <Icon name="phone_iphone" size="sm" /> <span>Access on Mobile and TV</span>
                             </div>
                             <div className="flex items-center gap-3">
                                 <Icon name="verified" size="sm" /> <span>Certificate of Completion</span>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};