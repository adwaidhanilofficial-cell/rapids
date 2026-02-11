import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from './Icon';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home', sub: 'Main Hub' },
  { path: '/courses', label: 'Courses', sub: 'Explore Programs' },
  { path: '/about', label: 'About', sub: 'Our Story' },
  { path: '/contact', label: 'Support', sub: 'Contact Us' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleMobileNav = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled ? 'dark:bg-black/80 bg-white/90 backdrop-blur-xl border-b dark:border-white/5 border-black/5 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-[#FBF5B7] to-primary-dark flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-500">
              <Icon name="diamond" className="text-black" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-serif text-xl font-bold tracking-[0.2em] dark:text-white text-black group-hover:text-primary transition-colors">RAPIDS</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-primary/80 font-bold hidden md:block opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">Training Institute</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 bg-white/5 dark:bg-white/5 bg-black/5 p-1 rounded-full border dark:border-white/5 border-black/5 backdrop-blur-md shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-bold tracking-widest uppercase transition-all duration-500 relative px-6 py-2.5 rounded-full font-serif ${isActive(link.path) || (location.pathname === '/communication' && link.path === '/courses')
                    ? 'text-black bg-primary shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'dark:text-gray-400 text-gray-600 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Theme Toggle */}
            {location.pathname === '/' && (
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-white/5 flex items-center justify-center text-gray-600 dark:text-yellow-400 hover:scale-110 hover:bg-white/10 transition-all"
                title="Toggle Theme"
              >
                <Icon name={isDark ? "light_mode" : "dark_mode"} size="sm" />
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-transform"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} className={mobileMenuOpen ? "text-white" : "text-primary"} />
          </button>
        </div>
      </nav>

      {/* FULL SCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-3xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="space-y-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.path}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                  onClick={() => handleMobileNav(link.path)}
                  className="group block text-left w-full"
                >
                  <span className="block text-xs text-primary font-bold tracking-[0.3em] mb-2 opacity-50 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                  <span className={`block font-serif text-5xl ${isActive(link.path) ? 'text-white' : 'text-gray-600 group-hover:text-white'} transition-colors`}>
                    {link.label}
                  </span>
                  <span className="block text-sm text-gray-500 mt-2 font-light">{link.sub}</span>
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-12 border-t border-white/10 mt-12 flex gap-4"
              >
                <button className="flex-1 py-4 border border-white/20 rounded-sm text-white font-serif text-sm uppercase tracking-widest hover:bg-white/5 transition-colors">
                  Log In
                </button>
                <button className="flex-1 py-4 bg-primary text-black rounded-sm font-serif text-sm uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  Sign Up
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};