import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/navigation';
import { Home } from './pages/home-page';
import { Courses } from './pages/courses-page';
import { LandingCommunication } from './pages/landing-communication-page';
import { LeadForm } from './pages/lead-form-page';
import { Success } from './pages/success-page';
import { BookRedirect } from './pages/book-redirect-page';
import { Article } from './pages/article-page';
import { Blog } from './pages/blog-page';
import { ContactUs } from './pages/contact-us-page';
import { Support } from './pages/support-page';
import { PrivacyPolicy } from './pages/privacy-policy-page';
import { TermsAndConditions } from './pages/terms-and-conditions-page';
import { RefundPolicy } from './pages/refund-policy-page';
import { ShippingPolicy } from './pages/shipping-policy-page';
import { AboutUs } from './pages/legal-page';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-background-dark min-h-screen text-gray-200 font-sans antialiased selection:bg-primary selection:text-black flex flex-col">

      <ScrollToTop />
      <Navbar />

      <main className="flex-1 relative z-10">
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/communication-skills" element={<LandingCommunication />} />
            <Route path="/lead-form" element={<LeadForm />} />
            <Route path="/book" element={<BookRedirect />} />
            <Route path="/success" element={<Success />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Article />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Website Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

          {/* Brand Column */}
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-primary">diamond</span>
              <span className="font-serif text-lg font-bold tracking-[0.15em] text-white">RAPIDS TRAINING INSTITUTE</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Rapids Training Institutes.<br />
              Premier Public Speaking Institute in Kunnamkulam, Kerala.<br />
              Reg. Office: C Shape Building, Near Old Bus Stand, 680503.
            </p>
          </div>

          {/* Compliance Links Column */}
          <div className="flex flex-wrap gap-8 md:gap-16 text-sm text-gray-500">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-serif uppercase tracking-widest text-[10px]">Company</h4>
              <Link to="/about" className="text-left hover:text-primary transition-colors">About Us</Link>
              <Link to="/contact" className="text-left hover:text-primary transition-colors">Contact Us</Link>
              <Link to="/blog" className="text-left hover:text-primary transition-colors">Blog</Link>
              <Link to="/support" className="text-left hover:text-primary transition-colors">Help Center</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-serif uppercase tracking-widest text-[10px]">Policies</h4>
              <Link to="/privacy" className="text-left hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-left hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/refund" className="text-left hover:text-primary transition-colors">Refund Policy</Link>
              <Link to="/shipping-policy" className="text-left hover:text-primary transition-colors">Course Delivery</Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600">
          <div>© 2024 Rapids Training Institutes. All rights reserved.</div>
          <div className="mt-2 md:mt-0">Kunnamkulam, Kerala</div>
        </div>
      </footer>

    </div>
  );
}