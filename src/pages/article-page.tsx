import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/icon';
import { getBlogPost } from '../data/blog-data';
import { useLanguage } from '../context/language-context';
import '../styles/blog.css';

export const Article: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const article = id ? getBlogPost(id) : null;

    // TOC State
    const [headings, setHeadings] = useState<{ id: string; text: string; level: string }[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Parse Headings and Add IDs
    useEffect(() => {
        if (article && contentRef.current) {
            const elements = contentRef.current.querySelectorAll('h2, h3');
            const headingData: { id: string; text: string; level: string }[] = [];

            elements.forEach((el, index) => {
                // Generate ID if missing
                if (!el.id) {
                    const text = el.textContent || '';
                    const slug = text
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                    el.id = slug || `section-${index}`;
                }

                headingData.push({
                    id: el.id,
                    text: el.textContent || '',
                    level: el.tagName.toLowerCase()
                });
            });

            setHeadings(headingData);
        }
    }, [article, language, contentRef.current]); // Re-run when language changes as content might change

    // Scroll Listener for Active TOC
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150; // Offset for sticky header/margin

            let currentSection = '';

            // Check which section is currently in view
            if (contentRef.current) {
                const elements = contentRef.current.querySelectorAll('h2, h3');
                elements.forEach((el) => {
                    const elementTop = (el as HTMLElement).offsetTop;
                    // Adjust offset here based on layout if needed. 
                    // Since headings are inside the content div, offsetTop is relative to the offsetParent.
                    // We might need getBoundingClientRect for more accuracy relative to viewport, 
                    // but typically for a scrolling page, comparing scrollY works if we account for page structure.
                    // Using getBoundingClientRect is safer.
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) {
                        currentSection = el.id;
                    }
                });
            }

            if (currentSection) {
                setActiveId(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Fire once on mount/update to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings]);

    if (!article) return <div className="text-white text-center pt-32">Article not found</div>;

    const toggleMobileTOC = (e: React.MouseEvent) => {
        const details = e.currentTarget.parentElement as HTMLDetailsElement;
        if (details) {
        }
    };

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
                style={{ scaleX: 0 }} // Simplified, could add useScroll from framer-motion later
            />

            {/* Header Image */}
            <div className="relative h-[50vh] w-full md:mt-24">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>

                <div className="absolute top-24 left-6 md:left-12 z-20">
                    <button onClick={() => navigate('/communication-skills')} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider bg-black/50 p-2 rounded backdrop-blur-sm">
                        <Icon name="arrow_back" size="sm" /> Back to Masterclass
                    </button>
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={`header-${language}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto right-0"
                    >
                        <div className="flex gap-4 text-xs font-bold uppercase tracking-widest mb-4">
                            <span className="bg-primary text-black px-2 py-1 rounded-sm">{article.category}</span>
                            <span className="text-gray-400 py-1">{article.readTime}</span>
                        </div>
                        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 drop-shadow-lg max-w-4xl">
                            {language === 'ml' ? (article.title_ml || article.title) : article.title}
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
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Flex Container for Left Sidebar + Content */}
            <div className="blog-container">

                {/* LEFT SIDEBAR - TOC (Desktop) & Mobile Collapsible */}
                {/* Mobile View */}
                <div className="lg:hidden w-full mb-8">
                    <details className="bg-surface-dark-2 p-4 rounded-lg border border-white/10 group">
                        <summary className="font-bold text-primary cursor-pointer flex justify-between items-center list-none">
                            <span>Table of Contents</span>
                            <span className="transform group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                            {headings.map(heading => (
                                <li key={heading.id} className={heading.level === 'h3' ? 'ml-4' : ''}>
                                    <a
                                        href={`#${heading.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                            // Close details on click
                                            const details = e.currentTarget.closest('details');
                                            if (details) details.removeAttribute('open');
                                        }}
                                        className={`text-sm ${activeId === heading.id ? 'text-primary font-bold' : 'text-gray-400'}`}
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </details>
                </div>

                {/* Desktop View */}
                <aside className="table-of-contents hidden lg:block">
                    <h3 className="uppercase tracking-widest text-xs font-bold border-b border-white/10 pb-4 mb-4">On This Page</h3>
                    <ul>
                        {headings.map(heading => (
                            <li key={heading.id} className={heading.level === 'h3' ? 'ml-4' : ''}>
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={activeId === heading.id ? 'active' : ''}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* RIGHT SIDE - BLOG CONTENT */}
                <main className="blog-content">
                    <article className="prose prose-invert prose-lg max-w-none">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={`body-${language}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                ref={contentRef}
                            >
                                <p className="lead text-xl text-gray-300 font-light border-l-4 border-primary pl-6 mb-12 italic">
                                    {language === 'ml' ? (article.summary_ml || article.excerpt) : article.excerpt}
                                </p>

                                <div dangerouslySetInnerHTML={{ __html: language === 'ml' ? (article.content_ml || article.content) : article.content }} />
                            </motion.div>
                        </AnimatePresence>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-white/10 flex gap-2 flex-wrap">
                            {article.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">#{tag}</span>
                            ))}
                        </div>
                    </article>

                    {/* Purchase Card (Relocated to bottom of content) */}
                    <div className="mt-16 bg-surface-dark-2 border border-primary/20 rounded-xl p-8 shadow-[0_0_40px_rgba(212,175,55,0.1)] relative overflow-hidden group max-w-md mx-auto">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>

                        <h3 className="font-serif text-2xl text-white mb-2 text-center">Master Communication</h3>
                        <p className="text-gray-400 text-sm mb-6 text-center">Don't just read about it. Join 4,700+ executives in our offline masterclass.</p>

                        <div className="flex items-end justify-center gap-2 mb-6">
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

                </main>
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