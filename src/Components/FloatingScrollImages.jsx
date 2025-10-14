import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FloatingScrollImages = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Create spring animations for smoother movement
  const springScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Define floating images with their properties
  const floatingImages = [
    {
      src: '/images/portfolio/celebrity/image48.jpeg',
      size: { width: 120, height: 80 },
      position: { top: '15%', left: '10%' },
      scroll: { start: 0, end: -200 },
      rotation: { start: -5, end: 10 },
      delay: 0
    },
    {
      src: '/images/portfolio/commercial/image64.png',
      size: { width: 100, height: 100 },
      position: { top: '25%', right: '15%' },
      scroll: { start: 0, end: -150 },
      rotation: { start: 5, end: -8 },
      delay: 0.2
    },
    {
      src: '/images/portfolio/jewelry/image29.jpeg',
      size: { width: 90, height: 120 },
      position: { top: '60%', left: '8%' },
      scroll: { start: 0, end: -300 },
      rotation: { start: 8, end: 15 },
      delay: 0.4
    },
    {
      src: '/images/portfolio/cannes/image43.jpeg',
      size: { width: 110, height: 90 },
      position: { bottom: '20%', right: '12%' },
      scroll: { start: 0, end: -250 },
      rotation: { start: -3, end: 12 },
      delay: 0.6
    },
    {
      src: '/images/portfolio/celebrity/image49.jpeg',
      size: { width: 80, height: 100 },
      position: { top: '40%', left: '85%' },
      scroll: { start: 0, end: -180 },
      rotation: { start: 10, end: -5 },
      delay: 0.3
    },
    {
      src: '/images/portfolio/jewelry/image30.jpeg',
      size: { width: 95, height: 85 },
      position: { bottom: '40%', left: '20%' },
      scroll: { start: 0, end: -220 },
      rotation: { start: -8, end: 18 },
      delay: 0.5
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingImages.map((image, index) => {
        // Transform values based on scroll
        const y = useTransform(
          springScrollY,
          [0, 1],
          [image.scroll.start, image.scroll.end]
        );
        
        const rotation = useTransform(
          springScrollY,
          [0, 1],
          [image.rotation.start, image.rotation.end]
        );
        
        const opacity = useTransform(
          springScrollY,
          [0, 0.3, 0.7, 1],
          [0.8, 1, 0.8, 0.3]
        );

        const scale = useTransform(
          springScrollY,
          [0, 0.5, 1],
          [1, 1.1, 0.9]
        );

        return (
          <motion.div
            key={index}
            className="absolute rounded-2xl overflow-hidden shadow-2xl"
            style={{
              ...image.position,
              width: image.size.width,
              height: image.size.height,
              y,
              rotate: rotation,
              opacity,
              scale
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              rotate: image.rotation.start 
            }}
            animate={{ 
              opacity: 0.8, 
              scale: 1,
              x: [0, mousePosition.x * 10, 0],
              y: [0, mousePosition.y * 5, 0]
            }}
            transition={{ 
              duration: 1, 
              delay: image.delay,
              x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.2, 
              zIndex: 20,
              transition: { duration: 0.3 }
            }}
          >
            {/* Image with gradient overlay */}
            <img 
              src={image.src} 
              alt={`Portfolio ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20" />
            
            {/* Glass reflection effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.8
              }}
            />
            
            {/* Border glow */}
            <div className="absolute inset-0 border border-white/30 rounded-2xl" />
          </motion.div>
        );
      })}
      
      {/* Floating text elements */}
      <motion.div
        className="absolute top-1/4 left-1/3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
        style={{
          y: useTransform(springScrollY, [0, 1], [0, -400]),
          opacity: useTransform(springScrollY, [0, 0.5], [1, 0])
        }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-white/80 text-sm font-medium tracking-wide">CREATIVE EXCELLENCE</span>
      </motion.div>
      
      <motion.div
        className="absolute top-2/3 right-1/3 px-6 py-3 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30"
        style={{
          y: useTransform(springScrollY, [0, 1], [0, -300]),
          opacity: useTransform(springScrollY, [0, 0.7], [1, 0])
        }}
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <span className="text-purple-300 text-sm font-medium tracking-wide">DIGITAL INNOVATION</span>
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 px-6 py-3 bg-pink-500/20 backdrop-blur-sm rounded-full border border-pink-500/30"
        style={{
          y: useTransform(springScrollY, [0, 1], [0, -200]),
          opacity: useTransform(springScrollY, [0, 0.8], [1, 0])
        }}
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <span className="text-pink-300 text-sm font-medium tracking-wide">BRAND STORYTELLING</span>
      </motion.div>
    </div>
  );
};

export default FloatingScrollImages;