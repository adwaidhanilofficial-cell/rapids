import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/blog-data';

export const Blog: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 px-6 pb-24 min-h-screen bg-background-dark text-gray-200 font-sans"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/10 blur-[100px] -z-10"></div>
                    <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Knowledge Hub</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">Rapids Insights</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light tracking-wide">
                        Strategies for leadership, communication, and high-performance psychology.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post) => (
                        <div
                            key={post.id}
                            onClick={() => navigate(`/blog/${post.id}`)}
                            className="group bg-surface-dark-2 rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all cursor-pointer h-full flex flex-col hover:-translate-y-1 duration-300 shadow-lg"
                        >
                            <div className="h-56 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                {/* Updated Title Color to Primary (Gold) */}
                                <h3 className="text-primary font-serif text-2xl mb-4 transition-colors leading-tight">{post.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">{post.excerpt}</p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white font-serif">
                                            {post.author.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-white font-bold">{post.author}</span>
                                            <span className="text-[10px] text-gray-500">{post.date}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};