import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SimpleModernHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to different values
  const y = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Mouse move effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full bg-black overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-5 opacity-30">
        <div className="w-full h-full bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-pink-900/30">
          {/* Animated background patterns */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/40 via-transparent to-purple-900/30" />

      {/* Main Content */}
      <motion.div 
        className="relative z-20 flex flex-col justify-center items-center min-h-screen px-6 pt-20"
        style={{ y, opacity }}
      >
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
              <span className="text-sm font-medium text-white/90 tracking-wide">
                NEXT-GEN SOCIAL MEDIA MARKETING
              </span>
            </div>
          </motion.div>

          {/* Main Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-4">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                YOUR
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                GROWTH
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                STORY
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed max-w-4xl mx-auto">
              We create <span className="text-purple-400 font-semibold">immersive digital experiences</span> that transform brands into cultural movements
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center space-x-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
                <span>Start Your Journey</span>
              </div>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('services')}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 3H6C4.9 3 4 3.9 4 5V19C4 20.1 4.9 21 6 21H19C20.1 21 21 20.1 21 19V8L15 3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M15 3V8H21" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                <span>View Our Work</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: '500+', label: 'Brands Transformed' },
              { number: '2M+', label: 'Reach Generated' },
              { number: '98%', label: 'Success Rate' },
              { number: '24/7', label: 'Global Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center space-y-3">
          <span className="text-white/60 text-sm font-medium tracking-widest">SCROLL</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Mouse Follower Effect */}
      <motion.div
        className="fixed w-8 h-8 bg-purple-500/30 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </section>
  );
};

export default SimpleModernHero;