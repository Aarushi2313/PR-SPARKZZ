import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Interactive3DScene from './Interactive3DScene.jsx';

const Enhanced3DHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animations for scroll effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
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
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full bg-black overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Interactive3DScene scrollY={scrollY} mousePosition={mousePosition} />
      </div>

      {/* Floating Images with Scroll Effects */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {/* Portfolio Images Floating Around */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -200]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 15]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [0.8, 0])
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="/images/portfolio/celebrity/image48.jpeg" 
            alt="Portfolio" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 w-40 h-28 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -150]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, -10]),
            opacity: useTransform(scrollYProgress, [0, 0.6], [0.7, 0])
          }}
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <img 
            src="/images/portfolio/commercial/image64.png" 
            alt="Portfolio" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 w-36 h-36 rounded-full overflow-hidden shadow-2xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.3]),
            opacity: useTransform(scrollYProgress, [0, 0.7], [0.6, 0])
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img 
            src="/images/portfolio/jewelry/image29.jpeg" 
            alt="Portfolio" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-32 w-28 h-40 rounded-3xl overflow-hidden shadow-2xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -250]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 20]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [0.8, 0])
          }}
          animate={{
            x: [0, 10, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <img 
            src="/images/portfolio/cannes/image43.jpeg" 
            alt="Portfolio" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent" />
        </motion.div>

        {/* Floating Text Elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -300]),
            opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0])
          }}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-white/80 text-sm font-medium">SOCIAL MEDIA</span>
        </motion.div>

        <motion.div
          className="absolute top-2/3 right-1/4 px-6 py-3 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -200]),
            opacity: useTransform(scrollYProgress, [0, 0.6], [1, 0])
          }}
          animate={{
            y: [0, 10, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <span className="text-purple-300 text-sm font-medium">BRANDING</span>
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/60 via-transparent to-purple-900/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Main Content */}
      <motion.div 
        className="relative z-20 flex flex-col justify-center items-center min-h-screen px-6 pt-20"
        style={{ 
          y: heroY, 
          opacity: heroOpacity,
          scale: heroScale
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-lg">
              <motion.div 
                className="w-3 h-3 bg-green-400 rounded-full mr-4"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-white/90 tracking-wider">
                NEXT-GEN SOCIAL MEDIA MARKETING
              </span>
            </div>
          </motion.div>

          {/* Main Headlines with Staggered Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-4"
              style={{
                y: useTransform(scrollYProgress, [0, 0.5], [0, -100])
              }}
            >
              <motion.span 
                className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                YOUR
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                GROWTH
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                STORY
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mb-16"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed max-w-4xl mx-auto">
              We create <motion.span 
                className="text-purple-400 font-semibold"
                animate={{ color: ["#a855f7", "#ec4899", "#06b6d4", "#a855f7"] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                immersive digital experiences
              </motion.span> that transform brands into cultural movements
            </p>
          </motion.div>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-3xl overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative flex items-center space-x-3">
                <motion.svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                </motion.svg>
                <span>Start Your Journey</span>
              </div>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('services')}
              className="group px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold border-2 border-white/20 rounded-3xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(139, 92, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <motion.svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M15 3H6C4.9 3 4 3.9 4 5V19C4 20.1 4.9 21 6 21H19C20.1 21 21 20.1 21 19V8L15 3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M15 3V8H21" stroke="currentColor" strokeWidth="2" fill="none"/>
                </motion.svg>
                <span>Explore Our Magic</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {[
              { number: '500+', label: 'Brands Transformed', color: 'from-purple-400 to-pink-400' },
              { number: '2M+', label: 'Reach Generated', color: 'from-blue-400 to-cyan-400' },
              { number: '98%', label: 'Success Rate', color: 'from-green-400 to-emerald-400' },
              { number: '24/7', label: 'Global Support', color: 'from-orange-400 to-red-400' }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.2 
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-white/60 font-medium tracking-wide group-hover:text-white/90 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0])
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <motion.span 
            className="text-white/60 text-sm font-medium tracking-widest"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            DISCOVER MORE
          </motion.span>
          <div className="relative">
            <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div 
                className="w-2 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-3"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.div
              className="absolute inset-0 border-2 border-purple-500/50 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Interactive Mouse Follower */}
      <motion.div
        className="fixed w-16 h-16 border-2 border-purple-500/30 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <motion.div
          className="w-full h-full bg-purple-500/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default Enhanced3DHero;