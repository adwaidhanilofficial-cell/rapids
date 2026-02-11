import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '../components/Icon';
import { getBlogPost } from '../data/blogData';

export const Article: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const article = id ? getBlogPost(id) : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) return <div className="text-white text-center pt-32">Article not found</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-background-dark text-gray-200 font-sans pb-24"
        >
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-primary z-[70] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                style={{ scaleX: 0 }} // This would need scroll listener logic for real progress, simplified for now
            />

            {/* Header Image */}
            <div className="relative h-[50vh] w-full">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>

                <div className="absolute top-24 left-6 md:left-12">
                    <button onClick={() => navigate('/communication-skills')} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider">
                        <Icon name="arrow_back" size="sm" /> Back to Masterclass
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-4xl mx-auto">
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-widest mb-4">
                        <span className="bg-primary text-black px-2 py-1 rounded-sm">{article.category}</span>
                        <span className="text-gray-400 py-1">{article.readTime}</span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 drop-shadow-lg">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-dark-2 border border-white/10 flex items-center justify-center text-primary font-serif">
                            {article.author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-white text-sm font-bold">{article.author}</p>
                            <p className="text-gray-500 text-xs">{article.date}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_350px] gap-12 mt-12">

                {/* Main Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                    <p className="lead text-xl text-gray-300 font-light border-l-4 border-primary pl-6 mb-12 italic">
                        {article.excerpt}
                    </p>

                    <div dangerouslySetInnerHTML={{ __html: article.content }} />

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t border-white/10 flex gap-2 flex-wrap">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">#{tag}</span>
                        ))}
                    </div>
                </article>

                {/* Sticky Sidebar CTA */}
                <aside className="hidden lg:block">
                    <div className="sticky top-32 space-y-8">

                        {/* Purchase Card */}
                        <div className="bg-surface-dark-2 border border-primary/20 rounded-xl p-6 shadow-[0_0_40px_rgba(212,175,55,0.1)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>

                            <h3 className="font-serif text-2xl text-white mb-2">Master Communication</h3>
                            <p className="text-gray-400 text-sm mb-6">Don't just read about it. Join 4,700+ executives in our offline masterclass.</p>

                            <div className="flex items-end gap-2 mb-6">
                                <span className="text-3xl font-serif text-platinum">₹5,000</span>
                                <span className="text-gray-500 line-through text-sm mb-1">₹8,000</span>
                            </div>

                            <button
                                onClick={() => navigate('/lead-form')}
                                className="w-full py-4 bg-gold-platinum text-black font-serif font-bold tracking-widest text-xs uppercase rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                            >
                                Secure Your Seat
                            </button>
                            <p className="text-center text-[10px] text-gray-500 mt-3">Limited seats available for next batch.</p>
                        </div>

                        {/* Newsletter (Visual Only) */}
                        <div className="bg-surface-dark-2 border border-white/5 rounded-xl p-6">
                            <h4 className="font-serif text-white mb-2">Weekly Insights</h4>
                            <p className="text-gray-500 text-xs mb-4">Get tips like this delivered to your inbox.</p>
                            <input type="email" placeholder="Email Address" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white mb-3 focus:border-primary/50 outline-none" />
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase rounded-lg border border-white/5 transition-colors">
                                Subscribe
                            </button>
                        </div>

                    </div>
                </aside>
            </div>

            {/* Mobile Sticky Bottom Bar CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-surface-dark-2 border-t border-white/10 z-50 flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Next Batch</p>
                    <p className="text-white font-serif font-bold">₹5,000</p>
                </div>
                <button
                    onClick={() => navigate('/lead-form')}
                    className="px-8 py-3 bg-primary text-black font-bold uppercase text-xs rounded shadow-lg"
                >
                    Secure Seat
                </button>
            </div>

        </motion.div>
    );
};