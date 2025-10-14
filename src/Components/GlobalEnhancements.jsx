import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

// Premium Loading Screen with 3D Effects
const Premium3DLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0b2e 50%, #16213e 100%)'
          }}
        >
          {/* 3D Loading Animation */}
          <div className="relative w-full h-full">
            <Canvas camera={{ position: [0, 0, 8] }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              
              {/* Animated Loading Spheres */}
              <Float speed={4} rotationIntensity={2} floatIntensity={3}>
                <Sphere position={[-2, 0, 0]} scale={0.8}>
                  <MeshDistortMaterial
                    color="#8b5cf6"
                    attach="material"
                    distort={0.6}
                    speed={4}
                    roughness={0.1}
                    metalness={0.8}
                  />
                </Sphere>
              </Float>
              
              <Float speed={3} rotationIntensity={1} floatIntensity={4}>
                <Sphere position={[0, 0, 0]} scale={1}>
                  <MeshDistortMaterial
                    color="#ec4899"
                    attach="material"
                    distort={0.8}
                    speed={3}
                    roughness={0.0}
                    metalness={1}
                  />
                </Sphere>
              </Float>
              
              <Float speed={5} rotationIntensity={3} floatIntensity={2}>
                <Sphere position={[2, 0, 0]} scale={0.6}>
                  <MeshDistortMaterial
                    color="#06b6d4"
                    attach="material"
                    distort={0.4}
                    speed={5}
                    roughness={0.2}
                    metalness={0.9}
                  />
                </Sphere>
              </Float>
            </Canvas>
            
            {/* Loading Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-6 justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">PS</span>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-3xl">PR Sparkz</h2>
                    <p className="text-purple-400 text-sm">Digital Excellence</p>
                  </div>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Loading Experience
                  </span>
                </h3>
                
                <p className="text-white/70 text-lg">
                  Preparing your immersive journey...
                </p>
              </motion.div>
              
              {/* Loading Progress */}
              <motion.div
                className="w-64 h-2 bg-white/10 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </motion.div>
              
              {/* Loading Text */}
              <motion.div
                className="mt-6 text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Initializing 3D components...
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Global Cursor Effect
const GlobalCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-white/80 rounded-full pointer-events-none z-[999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Trailing Effect */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-purple-400/50 rounded-full pointer-events-none z-[998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </>
  );
};

// Smooth Page Transitions
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export { Premium3DLoader, GlobalCursor, PageTransition };