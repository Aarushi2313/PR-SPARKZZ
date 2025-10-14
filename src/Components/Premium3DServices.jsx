import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox, Sphere, Torus, Cylinder, Text } from '@react-three/drei';
import * as THREE from 'three';

// 3D Service Card Component
const Service3DCard = ({ position, service, index, isHovered, onHover }) => {
  const meshRef = useRef();
  const iconRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.3;
      
      if (isHovered) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1));
      } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
      }
    }
    
    if (iconRef.current && isHovered) {
      iconRef.current.rotation.y += 0.02;
      iconRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getServiceIcon = (iconType) => {
    switch (iconType) {
      case 'social':
        return (
          <Sphere ref={iconRef} scale={0.6}>
            <MeshDistortMaterial
              color="#ec4899"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
        );
      case 'content':
        return (
          <RoundedBox ref={iconRef} args={[1.2, 1.2, 0.3]} radius={0.2}>
            <MeshDistortMaterial
              color="#8b5cf6"
              attach="material"
              distort={0.3}
              speed={1.5}
              roughness={0.2}
              metalness={0.9}
            />
          </RoundedBox>
        );
      case 'branding':
        return (
          <Torus ref={iconRef} args={[0.8, 0.3, 16, 100]}>
            <MeshDistortMaterial
              color="#06b6d4"
              attach="material"
              distort={0.5}
              speed={3}
              roughness={0.0}
              metalness={1}
            />
          </Torus>
        );
      case 'strategy':
        return (
          <Cylinder ref={iconRef} args={[0.8, 0.8, 1.2, 6]}>
            <MeshDistortMaterial
              color="#f97316"
              attach="material"
              distort={0.2}
              speed={2.5}
              roughness={0.3}
              metalness={0.7}
            />
          </Cylinder>
        );
      default:
        return (
          <Sphere ref={iconRef} scale={0.6}>
            <MeshDistortMaterial
              color="#10b981"
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
        );
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group
        ref={meshRef}
        position={position}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={() => onHover(null)}
      >
        {/* Main Card */}
        <RoundedBox args={[4, 5, 0.3]} radius={0.2}>
          <MeshDistortMaterial
            color={isHovered ? "#1a1a2e" : "#0f0f1a"}
            attach="material"
            distort={isHovered ? 0.2 : 0.05}
            speed={1}
            roughness={0.1}
            metalness={0.6}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        
        {/* Card Border Glow */}
        <RoundedBox args={[4.1, 5.1, 0.25]} radius={0.2} position={[0, 0, -0.05]}>
          <meshStandardMaterial
            color={service.color}
            transparent
            opacity={isHovered ? 0.3 : 0.1}
            emissive={service.color}
            emissiveIntensity={isHovered ? 0.2 : 0.05}
          />
        </RoundedBox>
        
        {/* Service Icon */}
        <group position={[0, 1, 0.2]}>
          {getServiceIcon(service.icon)}
        </group>
        
        {/* Title */}
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {service.title}
        </Text>
        
        {/* Subtitle */}
        <Text
          position={[0, -0.5, 0.2]}
          fontSize={0.15}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {service.subtitle}
        </Text>
        
        {/* Feature List Background */}
        <RoundedBox args={[3.5, 2, 0.1]} position={[0, -1.8, 0.15]} radius={0.1}>
          <meshStandardMaterial color="#111111" transparent opacity={0.7} />
        </RoundedBox>
      </group>
    </Float>
  );
};

// Floating Service Particles
const ServiceParticles = () => {
  const particlesRef = useRef();
  
  const particleCount = 50;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15
        ],
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        const mesh = particlesRef.current.children[i];
        if (mesh) {
          mesh.position.y += Math.sin(state.clock.elapsedTime * particle.speed + particle.phase) * 0.02;
          mesh.rotation.x = state.clock.elapsedTime * particle.speed;
          mesh.rotation.z = state.clock.elapsedTime * particle.speed * 0.5;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} position={particle.position} scale={0.03}>
          <meshStandardMaterial
            color={['#8b5cf6', '#ec4899', '#06b6d4', '#f97316'][i % 4]}
            transparent
            opacity={0.4}
            emissive={['#8b5cf6', '#ec4899', '#06b6d4', '#f97316'][i % 4]}
            emissiveIntensity={0.2}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Premium3DServices = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const services = [
    {
      id: 1,
      title: "Social Media",
      subtitle: "Mastery",
      icon: "social",
      color: "#ec4899",
      features: ["Strategy Development", "Content Creation", "Community Management", "Analytics & Growth"],
      description: "Transform your social presence into a powerful brand amplifier with our comprehensive social media strategies."
    },
    {
      id: 2,
      title: "Content",
      subtitle: "Creation",
      icon: "content",
      color: "#8b5cf6",
      features: ["Video Production", "Photography", "Graphic Design", "Copywriting"],
      description: "Create compelling visual narratives that captivate audiences and drive meaningful engagement."
    },
    {
      id: 3,
      title: "Brand",
      subtitle: "Identity",
      icon: "branding",
      color: "#06b6d4",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
      description: "Craft distinctive brand identities that resonate with your target audience and stand out in the market."
    },
    {
      id: 4,
      title: "Digital",
      subtitle: "Strategy",
      icon: "strategy",
      color: "#f97316",
      features: ["Market Analysis", "Competitor Research", "Campaign Planning", "ROI Optimization"],
      description: "Develop data-driven strategies that maximize your digital presence and accelerate business growth."
    }
  ];

  const getGridPosition = (index) => {
    const positions = [
      [-6, 2, 0],
      [6, 2, 0],
      [-6, -2, 0],
      [6, -2, 0]
    ];
    return positions[index] || [0, 0, 0];
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #16213e 50%, #1a0b2e 100%)'
      }}
    >
      {/* Section Header */}
      <motion.div
        className="relative z-20 text-center mb-16 px-6"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm mb-8">
            <span className="text-cyan-400 font-semibold tracking-wide">PREMIUM SERVICES</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              DIGITAL
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              EXCELLENCE
            </span>
          </h2>
          
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Elevate your brand with our <span className="text-cyan-400 font-semibold">cutting-edge digital services</span> designed to create lasting impact and drive exceptional results
          </p>
        </motion.div>
      </motion.div>

      {/* 3D Services Canvas */}
      <motion.div
        className="relative z-10 h-[800px]"
        style={{ opacity }}
      >
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          style={{ height: '100%' }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[0, 0, 10]} intensity={0.8} color="#ec4899" />
          <spotLight
            position={[0, 10, 5]}
            angle={0.6}
            penumbra={1}
            intensity={1}
            color="#06b6d4"
          />
          
          <ServiceParticles />
          
          {services.map((service, index) => (
            <Service3DCard
              key={service.id}
              position={getGridPosition(index)}
              service={service}
              index={index}
              isHovered={hoveredCard === index}
              onHover={setHoveredCard}
            />
          ))}
        </Canvas>
      </motion.div>

      {/* Service Details Panel */}
      <motion.div
        className="relative z-20 px-6 mt-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div 
                  className="p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}10 0%, rgba(255,255,255,0.05) 100%)`,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Service Icon */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}80 100%)`,
                      boxShadow: `0 10px 30px ${service.color}40`
                    }}
                  >
                    <div className="text-2xl text-white">
                      {service.icon === 'social' && '📱'}
                      {service.icon === 'content' && '🎨'}
                      {service.icon === 'branding' && '✨'}
                      {service.icon === 'strategy' && '🚀'}
                    </div>
                  </div>
                  
                  {/* Service Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-lg font-medium mb-4" style={{ color: service.color }}>
                    {service.subtitle}
                  </p>
                  
                  {/* Service Description */}
                  <p className="text-white/70 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Feature List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white/80">
                        <div 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{ backgroundColor: service.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <motion.button
                    className="w-full py-3 rounded-xl font-semibold transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}80 100%)`,
                      color: 'white'
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="relative z-20 text-center mt-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Transform</span> Your Brand?
          </h3>
          <p className="text-xl text-white/70 mb-8">
            Let's create something extraordinary together
          </p>
          
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-3xl text-lg"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
            }}
          >
            Start Your Journey
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Premium3DServices;