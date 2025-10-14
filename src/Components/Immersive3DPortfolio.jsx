import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Box, Sphere, RoundedBox, Image as DreiImage, Text } from '@react-three/drei';
import * as THREE from 'three';

// 3D Portfolio Card Component
const Portfolio3DCard = ({ position, imageUrl, title, category, index, isSelected, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.2;
      
      if (hovered) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1));
      } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group
        ref={meshRef}
        position={position}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Card Background */}
        <RoundedBox args={[3, 4, 0.2]} radius={0.1}>
          <MeshDistortMaterial
            color={isSelected ? "#8b5cf6" : "#1a1a2e"}
            attach="material"
            distort={hovered ? 0.3 : 0.1}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        
        {/* Image Plane */}
        <DreiImage
          url={imageUrl}
          position={[0, 0.3, 0.15]}
          scale={[2.5, 2, 1]}
          transparent
        />
        
        {/* Title Text */}
        <Text
          position={[0, -1.2, 0.15]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {title}
        </Text>
        
        {/* Category Badge */}
        <RoundedBox args={[1.5, 0.3, 0.1]} position={[0, -1.7, 0.15]} radius={0.05}>
          <meshStandardMaterial color="#ec4899" transparent opacity={0.8} />
        </RoundedBox>
        
        <Text
          position={[0, -1.7, 0.2]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {category}
        </Text>
      </group>
    </Float>
  );
};

// Floating Particles for Gallery
const GalleryParticles = () => {
  const particlesRef = useRef();
  
  const particleCount = 100;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        speed: Math.random() * 0.02 + 0.01,
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
          mesh.position.y += Math.sin(state.clock.elapsedTime * particle.speed + particle.phase) * 0.01;
          mesh.rotation.z = state.clock.elapsedTime * particle.speed;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} position={particle.position} scale={0.02}>
          <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} />
        </Sphere>
      ))}
    </group>
  );
};

const Immersive3DPortfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const portfolioItems = [
    {
      id: 1,
      title: "Luxury Brand Campaign",
      category: "Commercial",
      imageUrl: "/images/portfolio/commercial/image64.png",
      description: "Premium brand positioning with immersive digital experiences"
    },
    {
      id: 2,
      title: "Celebrity Endorsement",
      category: "Celebrity",
      imageUrl: "/images/portfolio/celebrity/image48.jpeg",
      description: "High-impact celebrity partnerships and social media campaigns"
    },
    {
      id: 3,
      title: "Jewelry Collection",
      category: "Jewelry",
      imageUrl: "/images/portfolio/jewelry/image29.jpeg",
      description: "Elegant jewelry showcases with premium photography"
    },
    {
      id: 4,
      title: "Cannes Festival",
      category: "Events",
      imageUrl: "/images/portfolio/cannes/image43.jpeg",
      description: "International event coverage and brand activation"
    },
    {
      id: 5,
      title: "Tech Innovation",
      category: "Commercial",
      imageUrl: "/images/portfolio/commercial/image65.png",
      description: "Cutting-edge technology brand campaigns"
    },
    {
      id: 6,
      title: "Fashion Forward",
      category: "Celebrity",
      imageUrl: "/images/portfolio/celebrity/image49.jpeg",
      description: "Fashion industry celebrity collaborations"
    }
  ];

  const categories = ['all', 'Commercial', 'Celebrity', 'Jewelry', 'Events'];

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const getGridPosition = (index, total) => {
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    const spacing = 5;
    
    return [
      (col - (cols - 1) / 2) * spacing,
      (row - Math.floor(total / cols) / 2) * spacing,
      0
    ];
  };

  return (
    <section
      ref={containerRef}
      id="portfolio"
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
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm mb-8">
            <span className="text-purple-400 font-semibold tracking-wide">OUR DIGITAL UNIVERSE</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              PORTFOLIO
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              GALLERY
            </span>
          </h2>
          
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Explore our collection of <span className="text-purple-400 font-semibold">immersive digital experiences</span> that have transformed brands across industries
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All Projects' : category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* 3D Portfolio Canvas */}
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
          
          <GalleryParticles />
          
          {filteredItems.map((item, index) => (
            <Portfolio3DCard
              key={item.id}
              position={getGridPosition(index, filteredItems.length)}
              imageUrl={item.imageUrl}
              title={item.title}
              category={item.category}
              index={index}
              isSelected={selectedProject === item.id}
              onClick={() => setSelectedProject(selectedProject === item.id ? null : item.id)}
            />
          ))}
        </Canvas>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl p-8 max-w-2xl w-full backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
              }}
            >
              {(() => {
                const project = portfolioItems.find(p => p.id === selectedProject);
                return project ? (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                        <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {project.category}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-white/60 hover:text-white transition-colors duration-300"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="aspect-video bg-gray-800 rounded-xl mb-6 overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <p className="text-white/80 text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    
                    <div className="flex gap-4">
                      <motion.button
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Full Project
                      </motion.button>
                      <motion.button
                        className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Similar Projects
                      </motion.button>
                    </div>
                  </>
                ) : null;
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistics Section */}
      <motion.div
        className="relative z-20 mt-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '50M+', label: 'Impressions Generated' },
              { number: '25+', label: 'Industry Awards' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-white/60 font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Immersive3DPortfolio;