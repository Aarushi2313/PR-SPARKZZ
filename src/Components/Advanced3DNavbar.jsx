import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

const FloatingOrb = ({ position, color }) => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <Sphere position={position} scale={0.3}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  </Float>
);

const Advanced3DNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navRef = useRef(null);
  
  // Transform scroll to navbar effects
  const navY = useTransform(scrollY, [0, 100], [0, -10]);
  const navOpacity = useTransform(scrollY, [0, 50, 100], [0.8, 0.95, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [10, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👥' },
    { id: 'services', label: 'Services', icon: '⚡' },
    { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
    { id: 'contact', label: 'Contact', icon: '📱' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{ y: navY }}
      >
        <motion.div
          className="max-w-7xl mx-auto relative"
          style={{ opacity: navOpacity }}
        >
          {/* Glass Morphism Container */}
          <div className="relative">
            {/* Background with enhanced glass effect */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
              }}
            />
            
            {/* 3D Orb Background */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-30">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <FloatingOrb position={[-2, 0, 0]} color="#8b5cf6" />
                <FloatingOrb position={[2, 0, 0]} color="#ec4899" />
                <FloatingOrb position={[0, 1, 0]} color="#06b6d4" />
              </Canvas>
            </div>

            {/* Navigation Content */}
            <div className="relative flex items-center justify-between px-8 py-4">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">PS</span>
                </div>
                <div className="hidden md:block">
                  <h2 className="text-white font-bold text-xl">PR Sparkz</h2>
                  <p className="text-white/60 text-xs">Digital Excellence</p>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-6 py-3 rounded-2xl transition-all duration-300 group ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl border border-purple-500/50"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative flex items-center space-x-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                <span>Get Started</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col space-y-1">
                  <motion.span
                    className="w-5 h-0.5 bg-white"
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 4 : 0
                    }}
                  />
                  <motion.span
                    className="w-5 h-0.5 bg-white"
                    animate={{
                      opacity: isOpen ? 0 : 1
                    }}
                  />
                  <motion.span
                    className="w-5 h-0.5 bg-white"
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? -4 : 0
                    }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 lg:hidden"
          >
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center space-x-4 p-4 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-lg">{item.label}</span>
                  </motion.button>
                ))}
                
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </motion.div>
    </>
  );
};

export default Advanced3DNavbar;