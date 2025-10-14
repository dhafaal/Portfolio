'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  
  // Navbar background on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );
  
  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ['0px 0px 0px rgba(0, 0, 0, 0)', '0px 2px 8px rgba(0, 0, 0, 0.1)']
  );

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.toLowerCase());
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu immediately
    
    // Small delay to allow menu close animation
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64; // 16 * 4 = 64px (h-16)
        const offsetTop = element.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay for better UX
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ 
        backgroundColor: navBackground,
        boxShadow: navShadow 
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => handleScrollToSection(e, 'home')}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-2xl font-bold text-black hover:text-gray-700 transition-colors duration-300"
          >
            D.
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              
              return (
                <motion.a
                  key={item}
                  href={`#${sectionId}`}
                  onClick={(e) => handleScrollToSection(e, sectionId)}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-300"
                >
                  <span className="relative z-10">{item}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gray-100 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-black transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <motion.svg
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden pb-4 border-t border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col space-y-1 pt-4">
                {navItems.map((item, i) => {
                  const sectionId = item.toLowerCase();
                  const isActive = activeSection === sectionId;
                  
                  return (
                    <motion.a
                      key={item}
                      href={`#${sectionId}`}
                      onClick={(e) => handleScrollToSection(e, sectionId)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                        isActive 
                          ? 'bg-gray-100 text-black' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}