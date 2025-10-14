import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Modern3DNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'team', label: 'Team', href: '/team' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (sectionId) => {
    if (sectionId.startsWith('#')) {
      const element = document.getElementById(sectionId.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId.substring(1));
      }
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-20" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                PR SPARKZ
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={() => {
                    if (item.href.startsWith('#')) {
                      scrollToSection(item.href);
                    }
                  }}
                />
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="hidden lg:block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-white block transition-all duration-300"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-white block mt-1.5 transition-all duration-300"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-white block mt-1.5 transition-all duration-300"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <div className="relative z-50 flex flex-col items-center justify-center min-h-screen space-y-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={() => {
                        scrollToSection(item.href);
                        setIsOpen(false);
                      }}
                      className="text-3xl font-bold text-white hover:text-purple-400 transition-colors duration-300"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-bold text-white hover:text-purple-400 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => {
                  scrollToSection('#contact');
                  setIsOpen(false);
                }}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Individual Navigation Item Component
const NavItem = ({ item, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="relative"
    >
      {item.href.startsWith('#') ? (
        <button
          onClick={onClick}
          className={`relative px-4 py-2 font-medium transition-all duration-300 ${
            isActive 
              ? 'text-purple-400' 
              : 'text-white/80 hover:text-white'
          }`}
        >
          {item.label}
          
          {/* Hover Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Active Indicator */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full"
              />
            )}
          </AnimatePresence>
        </button>
      ) : (
        <Link
          to={item.href}
          className="relative px-4 py-2 font-medium text-white/80 hover:text-white transition-all duration-300"
        >
          {item.label}
          
          {/* Hover Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </Link>
      )}
    </motion.div>
  );
};

export default Modern3DNavBar;