import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Course } from '../types';
import { Icon } from '../components/Icon';

export const Courses: React.FC = () => {
    const navigate = useNavigate();

    const courses: Course[] = [
        {
            id: 'comm-skills',
            title: 'Communication Skills',
            subtitle: 'Master public speaking and corporate influence.',
            image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop',
            status: 'active',
            bookingFee: 500,
            totalFee: 5000
        },
        {
            id: 'trading',
            title: 'Professional Trading',
            subtitle: 'Technical analysis and risk management.',
            image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2670&auto=format&fit=crop',
            status: 'coming_soon'
        },
        {
            id: 'ecommerce',
            title: 'E-commerce Mastery',
            subtitle: 'Build and scale your digital business.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop',
            status: 'coming_soon'
        }
    ];

    const handleCourseClick = (course: Course) => {
        if (course.status === 'coming_soon') return;
        if (course.id === 'comm-skills') {
            navigate('/communication-skills');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 px-6 pb-24 min-h-screen max-w-7xl mx-auto"
        >
            <div className="text-center mb-20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/10 blur-[100px] -z-10"></div>
                <h1 className="font-serif text-5xl md:text-7xl dark:text-white text-gray-900 mb-6">Our Programs</h1>
                <p className="dark:text-gray-400 text-gray-600 max-w-2xl mx-auto text-lg font-light tracking-wide">
                    Specialized offline curriculums designed for the modern economy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-content-center">
                {courses.map(course => (
                    <div
                        key={course.id}
                        onClick={() => handleCourseClick(course)}
                        className={`group relative dark:bg-surface-dark-2 bg-white rounded-sm overflow-hidden border dark:border-white/5 border-black/10 transition-all duration-500 flex flex-col ${course.status === 'active' ? 'cursor-pointer hover:border-primary hover:shadow-[0_0_60px_rgba(191,149,63,0.15)]' : 'cursor-default opacity-60 grayscale hover:grayscale-0 transition-all duration-700'}`}
                    >
                        {/* Image Container - Increased Height */}
                        <div className="h-[450px] relative overflow-hidden shrink-0">
                            <img
                                src={course.image}
                                alt={course.title}
                                className={`w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ${course.status === 'coming_soon' ? 'filter blur-[6px] scale-110 brightness-50' : ''}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t dark:from-surface-dark-2 from-white via-black/10 to-transparent"></div>

                            {/* COMING SOON OVERLAY */}
                            {course.status === 'coming_soon' && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                                    <h3 className="font-serif text-4xl font-bold text-platinum tracking-[0.25em] drop-shadow-2xl text-center leading-tight">
                                        COMING<br />SOON
                                    </h3>
                                    <div className="w-16 h-[1px] bg-primary/50 mt-6"></div>
                                </div>
                            )}

                            {/* ACTIVE COURSE STATUS */}
                            {course.status === 'active' && (
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-gold-platinum text-black shadow-lg">
                                        Admissions Open
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card Content */}
                        <div className="p-8 relative flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-serif text-3xl dark:text-white text-gray-900 mb-3 group-hover:text-platinum transition-all duration-300">{course.title}</h3>
                                <p className="dark:text-gray-400 text-gray-600 text-sm mb-6 leading-relaxed border-l border-primary/20 pl-4">{course.subtitle}</p>
                            </div>

                            {course.status === 'active' ? (
                                <div className="space-y-6 mt-auto">
                                    <div className="flex justify-between items-center text-sm border-t dark:border-white/5 border-black/5 pt-6">
                                        <span className="dark:text-gray-500 text-gray-500 uppercase tracking-widest text-[10px]">Booking Fee</span>
                                        <span className="text-platinum font-serif text-xl font-bold">₹{course.bookingFee}</span>
                                    </div>
                                    <button className="group/btn w-full py-4 dark:bg-white/5 bg-black/5 dark:text-white text-black font-serif font-bold tracking-[0.2em] text-[10px] uppercase rounded-sm border dark:border-white/10 border-black/5 hover:bg-gold-platinum hover:text-black hover:border-transparent transition-all duration-300 relative overflow-hidden">
                                        <span className="relative z-10">View Curriculum</span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                                    </button>
                                </div>
                            ) : (
                                <div className="border-t dark:border-white/5 border-black/5 pt-6 mt-auto">
                                    <button disabled className="w-full py-4 bg-transparent dark:text-gray-600 text-gray-400 font-serif font-bold text-[10px] tracking-[0.2em] uppercase rounded-sm border dark:border-white/5 border-black/5 cursor-not-allowed flex items-center justify-center gap-2">
                                        <Icon name="lock" size="sm" /> Notify Me
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};