import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';

// 3D Service Icon Component
function ServiceIcon3D({ icon, color }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <Center>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={0.8}
            distort={0.2}
            speed={2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Center>
    </Float>
  );
}

const Modern3DServices = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const services = [
    {
      title: 'Brand Strategy',
      description: 'Crafting compelling narratives that resonate with your audience and build lasting connections.',
      icon: '🎯',
      color: '#8B5CF6',
      features: ['Brand Identity', 'Market Research', 'Positioning Strategy', 'Brand Guidelines']
    },
    {
      title: 'Social Media',
      description: 'Creating viral content and managing communities that drive engagement and growth.',
      icon: '📱',
      color: '#EC4899',
      features: ['Content Creation', 'Community Management', 'Influencer Marketing', 'Social Analytics']
    },
    {
      title: 'Digital Marketing',
      description: 'Data-driven campaigns that maximize ROI and accelerate your digital transformation.',
      icon: '🚀',
      color: '#06B6D4',
      features: ['PPC Campaigns', 'SEO Optimization', 'Email Marketing', 'Conversion Optimization']
    },
    {
      title: 'Creative Production',
      description: 'Stunning visuals and immersive experiences that captivate and convert audiences.',
      icon: '🎨',
      color: '#10B981',
      features: ['Video Production', 'Graphic Design', '3D Visualization', 'Animation']
    },
    {
      title: 'Web Development',
      description: 'Modern, responsive websites and applications that deliver exceptional user experiences.',
      icon: '💻',
      color: '#F59E0B',
      features: ['Custom Development', 'E-commerce', 'Mobile Apps', 'Web3 Integration']
    },
    {
      title: 'Analytics & Insights',
      description: 'Advanced data analysis and AI-powered insights to optimize your marketing performance.',
      icon: '📊',
      color: '#EF4444',
      features: ['Performance Tracking', 'AI Analytics', 'Reporting', 'Strategy Optimization']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { scale: 1, opacity: 1 }
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-6 py-3 mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-purple-300 tracking-wide">
              OUR SERVICES
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            <span className="block">TRANSFORMING</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              DIGITAL DREAMS
            </span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            We blend cutting-edge technology with creative excellence to deliver 
            solutions that drive real business growth and cultural impact.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              variants={itemVariants}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            View All Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Individual Service Card Component
const ServiceCard = ({ service, index, variants }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      <div className="relative h-full p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-purple-500/30">
        
        {/* 3D Icon Container */}
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl" />
          <div className="relative z-10 w-full h-full flex items-center justify-center text-3xl">
            {service.icon}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-white/70 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: service.color }}
                />
                <span className="text-sm text-white/60">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Learn More Link */}
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center space-x-2 text-purple-400 font-medium group-hover:text-purple-300 transition-colors duration-300"
          >
            <span>Learn More</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>

        {/* Hover Gradient Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl"
          style={{ 
            background: `linear-gradient(135deg, ${service.color}20, transparent)` 
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Modern3DServices;