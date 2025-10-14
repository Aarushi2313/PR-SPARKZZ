import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox, Sphere, Cylinder, Text, Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';

// 3D Team Member Card
const TeamMember3D = ({ position, member, index, isHovered, onHover }) => {
  const meshRef = useRef();
  const avatarRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.1;
      
      if (isHovered) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1));
      } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
      }
    }
    
    if (avatarRef.current && isHovered) {
      avatarRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group
        ref={meshRef}
        position={position}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={() => onHover(null)}
      >
        {/* Card Background */}
        <RoundedBox args={[3, 4.5, 0.3]} radius={0.2}>
          <MeshDistortMaterial
            color={isHovered ? "#1a1a2e" : "#0f0f1a"}
            attach="material"
            distort={isHovered ? 0.15 : 0.05}
            speed={1}
            roughness={0.1}
            metalness={0.7}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        
        {/* Card Glow Effect */}
        <RoundedBox args={[3.1, 4.6, 0.25]} radius={0.2} position={[0, 0, -0.05]}>
          <meshStandardMaterial
            color={member.accentColor}
            transparent
            opacity={isHovered ? 0.3 : 0.1}
            emissive={member.accentColor}
            emissiveIntensity={isHovered ? 0.2 : 0.05}
          />
        </RoundedBox>
        
        {/* Avatar */}
        <group ref={avatarRef} position={[0, 1.2, 0.2]}>
          <Cylinder args={[0.8, 0.8, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#333" />
          </Cylinder>
          <Sphere scale={0.7}>
            <MeshDistortMaterial
              color={member.accentColor}
              attach="material"
              distort={0.2}
              speed={1}
              roughness={0.3}
              metalness={0.8}
            />
          </Sphere>
        </group>
        
        {/* Name */}
        <Text
          position={[0, 0.2, 0.2]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {member.name}
        </Text>
        
        {/* Role */}
        <Text
          position={[0, -0.2, 0.2]}
          fontSize={0.15}
          color={member.accentColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {member.role}
        </Text>
        
        {/* Social Icons Background */}
        <RoundedBox args={[2.5, 0.6, 0.1]} position={[0, -1.5, 0.15]} radius={0.1}>
          <meshStandardMaterial color="#111111" transparent opacity={0.7} />
        </RoundedBox>
      </group>
    </Float>
  );
};

// Floating Company Values
const CompanyValue3D = ({ position, value, index }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + index;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={meshRef} position={position}>
        <Sphere scale={1.2}>
          <MeshDistortMaterial
            color={value.color}
            attach="material"
            distort={0.4}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        <Text
          position={[0, 0, 1.5]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {value.title}
        </Text>
      </group>
    </Float>
  );
};

// About Particles
const AboutParticles = () => {
  const particlesRef = useRef();
  
  const particleCount = 80;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 20
        ],
        speed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: ['#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#10b981'][Math.floor(Math.random() * 5)]
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        const mesh = particlesRef.current.children[i];
        if (mesh) {
          mesh.position.y += Math.sin(state.clock.elapsedTime * particle.speed + particle.phase) * 0.01;
          mesh.rotation.y = state.clock.elapsedTime * particle.speed * 0.5;
          mesh.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + particle.phase) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} position={particle.position} scale={0.02}>
          <meshStandardMaterial
            color={particle.color}
            transparent
            opacity={0.4}
            emissive={particle.color}
            emissiveIntensity={0.1}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Advanced3DAbout = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Creative Director",
      accentColor: "#ec4899",
      bio: "Visionary creative with 10+ years in digital storytelling",
      expertise: ["Brand Strategy", "Creative Direction", "Visual Design"]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Tech Lead",
      accentColor: "#8b5cf6",
      bio: "Full-stack engineer passionate about immersive experiences",
      expertise: ["React/Three.js", "WebGL", "Performance Optimization"]
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Strategy Head",
      accentColor: "#06b6d4",
      bio: "Data-driven strategist with proven ROI track record",
      expertise: ["Digital Strategy", "Analytics", "Growth Hacking"]
    },
    {
      id: 4,
      name: "David Kim",
      role: "Content Creator",
      accentColor: "#f97316",
      bio: "Multimedia artist creating compelling brand narratives",
      expertise: ["Video Production", "Photography", "Animation"]
    }
  ];

  const companyValues = [
    { title: "Innovation", color: "#8b5cf6" },
    { title: "Excellence", color: "#ec4899" },
    { title: "Integrity", color: "#06b6d4" },
    { title: "Growth", color: "#f97316" }
  ];

  const getTeamPosition = (index) => {
    const positions = [
      [-6, 1, 0],
      [-2, 1, 0],
      [2, 1, 0],
      [6, 1, 0]
    ];
    return positions[index] || [0, 0, 0];
  };

  const getValuePosition = (index) => {
    const positions = [
      [-8, -3, -5],
      [-3, -2, -3],
      [3, -2, -3],
      [8, -3, -5]
    ];
    return positions[index] || [0, -3, 0];
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0b2e 50%, #16213e 100%)'
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
          className="max-w-6xl mx-auto"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm mb-8">
            <span className="text-pink-400 font-semibold tracking-wide">MEET THE TEAM</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              CREATIVE
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MINDS
            </span>
          </h2>
          
          <p className="text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            Our diverse team of <span className="text-pink-400 font-semibold">digital innovators</span> combines creativity, technology, and strategy to deliver extraordinary results
          </p>
        </motion.div>
      </motion.div>

      {/* 3D Team Canvas */}
      <motion.div
        className="relative z-10 h-[700px] mb-20"
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
            position={[0, 15, 5]}
            angle={0.8}
            penumbra={1}
            intensity={1.2}
            color="#06b6d4"
          />
          
          <AboutParticles />
          
          {teamMembers.map((member, index) => (
            <TeamMember3D
              key={member.id}
              position={getTeamPosition(index)}
              member={member}
              index={index}
              isHovered={hoveredMember === index}
              onHover={setHoveredMember}
            />
          ))}
          
          {companyValues.map((value, index) => (
            <CompanyValue3D
              key={index}
              position={getValuePosition(index)}
              value={value}
              index={index}
            />
          ))}
        </Canvas>
      </motion.div>

      {/* Team Details Grid */}
      <motion.div
        className="relative z-20 px-6 mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div 
                  className="p-6 rounded-3xl border border-white/10 backdrop-blur-xl h-full"
                  style={{
                    background: `linear-gradient(135deg, ${member.accentColor}15 0%, rgba(255,255,255,0.05) 100%)`,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Avatar */}
                  <div 
                    className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${member.accentColor} 0%, ${member.accentColor}80 100%)`,
                      boxShadow: `0 10px 30px ${member.accentColor}40`
                    }}
                  >
                    👤
                  </div>
                  
                  <h3 className="text-xl font-bold text-white text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-center mb-4 font-medium" style={{ color: member.accentColor }}>
                    {member.role}
                  </p>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-4 text-center">
                    {member.bio}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-white/90 font-semibold text-sm">Expertise:</h4>
                    {member.expertise.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center text-white/70 text-sm">
                        <div 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: member.accentColor }}
                        />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Company Story */}
      <motion.div
        className="relative z-20 px-6 mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Founded in 2020, PR Sparkz emerged from a vision to bridge the gap between traditional marketing and the digital-first world. Our journey began with a simple belief: every brand has a unique story waiting to be told through immersive digital experiences.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Today, we're proud to be at the forefront of digital innovation, helping brands create authentic connections with their audiences through cutting-edge technology and creative excellence.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { number: '500+', label: 'Projects Delivered' },
                  { number: '98%', label: 'Client Retention' },
                  { number: '50M+', label: 'Impressions Generated' },
                  { number: '4.9/5', label: 'Average Rating' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-black text-purple-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/60 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <div className="text-6xl">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Company Values */}
      <motion.div
        className="relative z-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Values</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div 
                  className="p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${value.color}20 0%, rgba(255,255,255,0.05) 100%)`,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${value.color} 0%, ${value.color}80 100%)`,
                      boxShadow: `0 10px 30px ${value.color}40`
                    }}
                  >
                    {index === 0 && '💡'}
                    {index === 1 && '⭐'}
                    {index === 2 && '🤝'}
                    {index === 3 && '📈'}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h4>
                  
                  <p className="text-white/70 leading-relaxed">
                    {index === 0 && "Pushing boundaries with cutting-edge solutions"}
                    {index === 1 && "Delivering exceptional quality in every project"}
                    {index === 2 && "Building trust through transparency and honesty"}
                    {index === 3 && "Driving continuous improvement and success"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Advanced3DAbout;