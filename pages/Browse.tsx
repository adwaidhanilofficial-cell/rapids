import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Course } from '../types';
import { CourseCard } from '../components/CourseCard';
import { Icon } from '../components/Icon';

interface BrowseProps {
    onCourseClick: (course: Course) => void;
}

export const Browse: React.FC<BrowseProps> = ({ onCourseClick }) => {
    const categories = ['All', 'Leadership', 'Finance', 'Technology', 'Strategy', 'Marketing', 'Operations'];
    const [activeCat, setActiveCat] = useState('All');
    
    const courses: Course[] = [
        {
            id: '101',
            title: 'Global Strategy',
            subtitle: 'Navigate complex international markets.',
            image: 'https://picsum.photos/800/600?random=1',
            category: 'Strategy',
            rating: 4.8,
            students: 1200
        },
        {
            id: '102',
            title: 'Fintech Revolution',
            subtitle: 'Understanding the future of banking.',
            image: 'https://picsum.photos/800/600?random=2',
            category: 'Finance',
            rating: 4.7,
            students: 850
        },
        {
            id: '103',
            title: 'AI for Executives',
            subtitle: 'Leveraging AI in decision making.',
            image: 'https://picsum.photos/800/600?random=3',
            category: 'Technology',
            rating: 4.9,
            students: 3100,
            isPopular: true
        },
        {
            id: '104',
            title: 'Brand Storytelling',
            subtitle: 'Craft narratives that sell.',
            image: 'https://picsum.photos/800/600?random=7',
            category: 'Marketing',
            rating: 4.6,
            students: 1800
        },
        {
            id: '105',
            title: 'Crisis Management',
            subtitle: 'Leading through uncertainty.',
            image: 'https://picsum.photos/800/600?random=8',
            category: 'Leadership',
            rating: 4.9,
            students: 900
        },
         {
            id: '106',
            title: 'Mergers & Acquisitions',
            subtitle: 'The art of the deal.',
            image: 'https://picsum.photos/800/600?random=9',
            category: 'Finance',
            rating: 4.7,
            students: 600,
            isLocked: true
        }
    ];

    const filteredCourses = activeCat === 'All' ? courses : courses.filter(c => c.category === activeCat);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="px-6 py-12 max-w-7xl mx-auto min-h-screen"
        >
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h1 className="font-serif text-4xl text-white mb-2">Explore Library</h1>
                    <p className="text-gray-400">Discover over 500+ premium executive courses.</p>
                </div>
                
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <input 
                        type="text" 
                        placeholder="Search for skills, topics..." 
                        className="w-full bg-surface-dark-2 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
                    />
                    <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
            </div>

            {/* Filter Bar */}
            <div className="border-b border-white/10 mb-8 pb-4 overflow-x-auto">
                <div className="flex gap-2">
                    {categories.map((cat, i) => (
                        <button 
                            key={i} 
                            onClick={() => setActiveCat(cat)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all ${
                                activeCat === cat 
                                ? 'bg-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} onClick={onCourseClick} />
                ))}
            </div>
            
            {filteredCourses.length === 0 && (
                <div className="py-20 text-center">
                    <Icon name="search_off" size="3xl" className="text-gray-600 mb-4" />
                    <p className="text-gray-500">No courses found in this category.</p>
                </div>
            )}
        </motion.div>
    );
};