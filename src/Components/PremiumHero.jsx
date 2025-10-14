import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Points, PointMaterial, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Premium Particle System
const ParticleField = ({ count = 2000 }) => {
  const mesh = useRef();
  const light = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;
      const t = (particle.time += speed);
      
      dummy.position.set(
        x + Math.cos(t) * factor,
        y + Math.sin(t) * factor,
        z + Math.cos(t) * factor
      );
      
      dummy.scale.setScalar(Math.cos(t) * 0.5 + 0.5);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshPhongMaterial color="#4c1d95" />
      </instancedMesh>
    </>
  );
};

// Floating 3D Shapes
const FloatingShapes = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Box position={[-8, 4, -5]} scale={1.5}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Box>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
        <Torus position={[8, -2, -3]} scale={1.2} args={[1, 0.3, 16, 100]}>
          <MeshDistortMaterial
            color="#ec4899"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.9}
          />
        </Torus>
      </Float>
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere position={[6, 6, -8]} scale={1.8}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0.0}
            metalness={1}
          />
        </Sphere>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <Box position={[-6, -4, -6]} scale={1.3}>
          <MeshDistortMaterial
            color="#f97316"
            attach="material"
            distort={0.2}
            speed={2.5}
            roughness={0.3}
            metalness={0.7}
          />
        </Box>
      </Float>
    </>
  );
};

// Interactive 3D Text
const Hero3DText = () => {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Center ref={textRef} position={[0, 0, -2]}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
      >
        PR SPARKZ
        <MeshDistortMaterial
          color="#ffffff"
          attach="material"
          distort={0.1}
          speed={1}
          roughness={0.1}
          metalness={0.8}
        />
      </Text3D>
    </Center>
  );
};

const PremiumHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Advanced scroll transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  
  // Smooth spring animations
  const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 };
  const smoothY = useSpring(y, springConfig);
  const smoothOpacity = useSpring(opacity, springConfig);
  const smoothScale = useSpring(scale, springConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

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
      className="relative min-h-screen w-full overflow-hidden"
      style={{ 
        fontFamily: "'Montserrat', sans-serif",
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a0b2e 50%, #16213e 100%)'
      }}
    >
      {/* Premium 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <ParticleField />
          <FloatingShapes />
          {/* <Hero3DText /> */}
        </Canvas>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-10">
        <div 
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)
            `
          }}
        />
      </div>

      {/* Dynamic floating elements */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: `linear-gradient(45deg, 
                  ${['#8b5cf6', '#ec4899', '#06b6d4', '#f97316'][Math.floor(Math.random() * 4)]}, 
                  rgba(255,255,255,0.3))`
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-20 flex flex-col justify-center items-center min-h-screen px-6 pt-20"
        style={{ 
          y: smoothY, 
          opacity: smoothOpacity, 
          scale: smoothScale,
          rotateX: rotateX
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-12"
          >
            <div className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 backdrop-blur-xl"
                 style={{
                   background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                   boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                 }}>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-30" />
                </div>
                <span className="text-white/90 font-semibold tracking-wider text-lg">
                  PREMIUM DIGITAL EXPERIENCES
                </span>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Headlines with enhanced effects */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 150 }}
            className="mb-12"
          >
            <div className="space-y-4">
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-none tracking-tight">
                <motion.span 
                  className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  YOUR
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  DIGITAL
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  EMPIRE
                </motion.span>
              </h1>
            </div>
          </motion.div>

          {/* Enhanced Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 200 }}
            className="mb-16"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light leading-relaxed max-w-5xl mx-auto">
              We craft <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">immersive digital realities</span> that transform brands into{' '}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-semibold">cultural phenomena</span>
            </p>
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 1.2, type: "spring", stiffness: 200 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-3xl overflow-hidden transition-all duration-500 text-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(255,255,255,0.1)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center space-x-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
                </svg>
                <span>Launch Your Empire</span>
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('portfolio')}
              className="group px-10 py-5 backdrop-blur-xl text-white font-bold border-2 border-white/20 rounded-3xl hover:border-white/40 transition-all duration-500 text-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-center space-x-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 3H6C4.9 3 4 3.9 4 5V19C4 20.1 4.9 21 6 21H19C20.1 21 21 20.1 21 19V8L15 3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M15 3V8H21" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M10 12L14 16L10 20" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                <span>Explore Our Universe</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 1.6, type: "spring", stiffness: 200 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto"
          >
            {[
              { number: '1000+', label: 'Brands Elevated', icon: '🚀' },
              { number: '10M+', label: 'Global Reach', icon: '🌍' },
              { number: '99.9%', label: 'Success Rate', icon: '⭐' },
              { number: '24/7', label: 'Elite Support', icon: '💎' }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -10 }}
              >
                <div className="mb-4 text-4xl group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60 font-medium tracking-widest uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Premium Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center space-y-4">
          <span className="text-white/60 text-sm font-semibold tracking-widest">DISCOVER MORE</span>
          <div className="relative">
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
              <motion.div 
                className="w-1.5 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="absolute inset-0 bg-white/5 rounded-full animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Enhanced Mouse Follower */}
      <motion.div
        className="fixed w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)',
          filter: 'blur(2px)',
        }}
      />
    </section>
  );
};

export default PremiumHero;