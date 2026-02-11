import React from 'react';
import { motion } from 'framer-motion';
import { Course } from '../types';
import { Icon } from '../components/Icon';

interface MyLearningProps {
    onCourseClick: (course: Course) => void;
}

export const MyLearning: React.FC<MyLearningProps> = ({ onCourseClick }) => {
    const myCourses: Course[] = [
        {
            id: '1',
            title: 'Executive Communication Skills',
            subtitle: 'Module 3: Non-verbal Mastery',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNoqCu05oUXBfUynAkPYk3Y1WmXH-YNx0Lwq7QFp_OcTIDpPlPVmF2tcR67Btf03qEtB_xJ54p01jDONe9VLEe-u6EhlbQbN-htL-K-V2WM5E1yddvRPyuTbPC-p7_g2DbUpS1-72c6nMFpXUGKQqAqpVEMxJsbaN4ICo11lMFcNiVdLRTjcJgOlHZdLRXLoPyQwdszX4sHH6aFYa6RXxv3MSJIv0UnhkZHrZAiHWxnKn7K24pbe_dgtq_FMrLwZd8-MP26hA91Q',
            progress: 65,
        },
        {
            id: '202',
            title: 'Strategic Negotiation',
            subtitle: 'Module 1: Preparation',
            image: 'https://picsum.photos/800/600?random=4',
            progress: 12,
        },
        {
            id: '101',
            title: 'Global Strategy',
            subtitle: 'Completed 2 days ago',
            image: 'https://picsum.photos/800/600?random=1',
            progress: 100,
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="px-6 py-12 max-w-7xl mx-auto min-h-screen"
        >
            <div className="flex items-end justify-between mb-10">
                <h1 className="font-serif text-4xl text-white">My Learning Dashboard</h1>
                <button className="text-primary text-sm font-bold border-b border-primary/30 hover:border-primary pb-0.5 transition-colors">
                    VIEW ALL HISTORY
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Content: Course List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-serif text-white mb-4 flex items-center gap-2">
                        <Icon name="play_circle_outline" className="text-primary" /> In Progress
                    </h2>
                    
                    {myCourses.map(course => (
                        <div 
                            key={course.id}
                            onClick={() => onCourseClick(course)}
                            className="bg-surface-dark-2 rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-6 border border-white/5 cursor-pointer hover:bg-white/5 hover:border-primary/20 transition-all group"
                        >
                            <div className="w-full md:w-48 h-32 md:h-28 rounded-lg overflow-hidden shrink-0 relative">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                {course.progress === 100 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Icon name="check_circle" className="text-primary" size="lg" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-serif text-white text-xl mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                                    <div className="bg-black/30 px-2 py-1 rounded text-[10px] text-gray-400 border border-white/10 uppercase font-bold tracking-wider">
                                        {course.progress === 100 ? 'Completed' : 'Video'}
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-4">{course.subtitle}</p>
                                
                                {/* Progress Bar */}
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                                    <div 
                                        className="h-full bg-gold-gradient shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 font-medium">
                                    <span>{course.progress}% Complete</span>
                                    {course.progress < 100 && <span className="text-primary group-hover:underline">Resume Module</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-surface-dark-2 to-black border border-white/5 text-center shadow-xl">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Icon name="emoji_events" className="text-primary" size="lg" />
                        </div>
                        <h3 className="text-white font-serif text-xl mb-2">Weekly Streak</h3>
                        <p className="text-gray-400 text-sm mb-8">You're on a 3-day streak. Keep it up!</p>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5, 6, 7].map(day => (
                                <div key={day} className={`w-10 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-bold ${day <= 3 ? 'bg-primary text-black' : 'bg-white/5 text-gray-600'}`}>
                                    <span className="text-[8px] opacity-70">DAY</span>
                                    <span>{day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-surface-dark-2 rounded-2xl p-6 border border-white/5">
                        <h3 className="text-white font-serif mb-4">Achievements</h3>
                        <div className="flex flex-wrap gap-3">
                             <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 tooltip" title="Fast Starter">
                                 <Icon name="bolt" className="text-yellow-400" />
                             </div>
                             <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">
                                 <Icon name="school" className="text-blue-400" />
                             </div>
                             <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">
                                 <Icon name="timer" className="text-green-400" />
                             </div>
                             <div className="w-12 h-12 rounded-full bg-transparent border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-700">
                                 <Icon name="add" />
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};