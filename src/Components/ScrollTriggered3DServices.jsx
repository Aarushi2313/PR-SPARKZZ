import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, Box, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Service Card Component
function Service3DCard({ position, title, description, color, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Box args={[1.5, 2, 0.3]} scale={hovered ? 1.1 : 1}>
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={hovered ? 0.9 : 0.7}
            distort={hovered ? 0.4 : 0.2}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        
        {/* Floating icons around the card */}
        <Sphere args={[0.1, 16, 16]} position={[0.8, 0.8, 0.2]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
        <Sphere args={[0.08, 16, 16]} position={[-0.8, -0.8, 0.2]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
      </group>
    </Float>
  );
}

// 3D Services Scene
function Services3DScene({ scrollProgress }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5;
    }
  });

  const services = [
    { title: 'Social Media', color: '#8B5CF6', position: [-3, 1, 0] },
    { title: 'Brand Strategy', color: '#EC4899', position: [0, 1, -2] },
    { title: 'Digital Marketing', color: '#06B6D4', position: [3, 1, 0] },
    { title: 'Creative Design', color: '#10B981', position: [0, -1, 2] }
  ];

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#EC4899" />
      
      {services.map((service, index) => (
        <Service3DCard
          key={index}
          position={service.position}
          title={service.title}
          color={service.color}
          index={index}
        />
      ))}
      
      {/* Central rotating torus */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
        <Torus args={[2, 0.5, 16, 100]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            transparent
            opacity={0.3}
            distort={0.3}
            speed={1.5}
            metalness={1}
            roughness={0}
          />
        </Torus>
      </Float>
    </group>
  );
}

const ScrollTriggered3DServices = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll to different values
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const services = [
    {
      title: 'Social Media Marketing',
      description: 'Create viral content that drives engagement and builds communities around your brand.',
      icon: '📱',
      color: 'from-purple-500 to-pink-500',
      delay: 0
    },
    {
      title: 'Brand Strategy',
      description: 'Develop compelling brand narratives that resonate with your target audience.',
      icon: '🎯',
      color: 'from-pink-500 to-red-500',
      delay: 0.2
    },
    {
      title: 'Digital Marketing',
      description: 'Data-driven campaigns that maximize ROI and accelerate business growth.',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.4
    },
    {
      title: 'Creative Design',
      description: 'Stunning visuals and immersive experiences that captivate your audience.',
      icon: '🎨',
      color: 'from-green-500 to-emerald-500',
      delay: 0.6
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden min-h-screen"
    >
      {/* Animated Background Patterns */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/5 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header with 3D Scene */}
        <motion.div
          style={{ y, opacity, scale }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block px-8 py-4 mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm"
          >
            <span className="text-sm font-bold text-purple-300 tracking-wide">
              OUR SERVICES
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block">TRANSFORMING</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              DIGITAL DREAMS
            </span>
          </motion.h2>
          
          {/* 3D Services Scene */}
          <div className="h-96 mb-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 overflow-hidden">
            <Canvas
              camera={{ position: [0, 0, 8], fov: 60 }}
              gl={{ antialias: true, alpha: true }}
            >
              <Services3DScene scrollProgress={scrollYProgress.get()} />
            </Canvas>
          </div>
          
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We blend cutting-edge technology with creative excellence to deliver 
            solutions that drive real business growth and cultural impact.
          </motion.p>
        </motion.div>

        {/* Services Grid with Scroll Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 15 }}
              animate={isInView ? { 
                opacity: 1, 
                x: 0, 
                rotateY: 0,
                transition: { 
                  duration: 1, 
                  delay: service.delay,
                  ease: [0.215, 0.61, 0.355, 1]
                }
              } : {}}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
                
                {/* Floating Service Icon */}
                <motion.div 
                  className="relative w-20 h-20 mb-6 mx-auto"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-xl opacity-50`} />
                  <div className="relative z-10 w-full h-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl border border-white/30">
                    {service.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Interactive Learn More */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center space-x-2 text-purple-400 font-medium hover:text-purple-300 transition-colors duration-300"
                  >
                    <span>Learn More</span>
                    <motion.svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </motion.button>
                </div>

                {/* Hover Gradient Effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Floating Micro-Animations */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/20 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with 3D Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative">Explore All Services</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollTriggered3DServices;