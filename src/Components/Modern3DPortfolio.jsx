import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Image as DreiImage, 
  Environment, 
  OrbitControls,
  Text,
  Box,
  Plane
} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// 3D Portfolio Card Component
function Portfolio3DCard({ image, title, category, position, index, isActive, onClick }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  const [hovered, setHovered] = useState(false);
  
  const { scale, rotation } = useSpring({
    scale: hovered ? 1.1 : isActive ? 1.05 : 1,
    rotation: hovered ? [0.1, 0.1, 0] : [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.05;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
    }
  });

  return (
    <animated.group
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
        {/* Card Frame */}
        <Box args={[2.2, 1.6, 0.1]} position={[0, 0, -0.05]}>
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.8} 
            roughness={0.2}
          />
        </Box>
        
        {/* Image Plane */}
        <Plane args={[2, 1.4]} position={[0, 0, 0.06]}>
          <meshStandardMaterial>
            <primitive 
              attach="map" 
              object={new THREE.TextureLoader().load(image)} 
            />
          </meshStandardMaterial>
        </Plane>

        {/* Title Text */}
        <Text
          position={[0, -1, 0.1]}
          fontSize={0.12}
          color="#8B5CF6"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
        >
          {title}
        </Text>
        
        {/* Category Text */}
        <Text
          position={[0, -1.3, 0.1]}
          fontSize={0.08}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          opacity={0.7}
        >
          {category}
        </Text>

        {/* Glow Effect */}
        {hovered && (
          <Plane args={[2.4, 1.8]} position={[0, 0, -0.1]}>
            <meshBasicMaterial 
              color="#8B5CF6" 
              transparent 
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </Plane>
        )}
      </Float>
    </animated.group>
  );
}

// 3D Portfolio Scene
function Portfolio3DScene({ portfolioItems, activeCategory, selectedItem, setSelectedItem }) {
  const { viewport } = useThree();
  
  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  // Arrange items in a grid
  const getPosition = (index) => {
    const cols = 3;
    const spacing = 2.8;
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    return [
      (col - 1) * spacing,
      -row * spacing + 1,
      0
    ];
  };

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#EC4899" />
      
      {filteredItems.map((item, index) => (
        <Portfolio3DCard
          key={item.id}
          image={item.image}
          title={item.title}
          category={item.category}
          position={getPosition(index)}
          index={index}
          isActive={selectedItem?.id === item.id}
          onClick={() => setSelectedItem(item)}
        />
      ))}

      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        maxDistance={15}
        minDistance={5}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

const Modern3DPortfolio = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'celebrity', label: 'Celebrity' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'jewelry', label: 'Jewelry' },
    { id: 'cannes', label: 'Cannes' }
  ];

  const portfolioItems = [
    // Celebrity
    { id: 1, title: 'Celebrity Campaign', category: 'celebrity', image: '/images/portfolio/celebrity/image48.jpeg' },
    { id: 2, title: 'Star Endorsement', category: 'celebrity', image: '/images/portfolio/celebrity/image49.jpeg' },
    { id: 3, title: 'Red Carpet Event', category: 'celebrity', image: '/images/portfolio/celebrity/image50.jpeg' },
    { id: 4, title: 'Celebrity Branding', category: 'celebrity', image: '/images/portfolio/celebrity/image51.jpeg' },
    
    // Commercial
    { id: 5, title: 'Brand Identity', category: 'commercial', image: '/images/portfolio/commercial/image64.png' },
    { id: 6, title: 'Product Launch', category: 'commercial', image: '/images/portfolio/commercial/image65.png' },
    { id: 7, title: 'Marketing Campaign', category: 'commercial', image: '/images/portfolio/commercial/image66.png' },
    { id: 8, title: 'Corporate Branding', category: 'commercial', image: '/images/portfolio/commercial/image67.png' },
    { id: 9, title: 'Digital Strategy', category: 'commercial', image: '/images/portfolio/commercial/image68.png' },
    
    // Jewelry
    { id: 10, title: 'Luxury Collection', category: 'jewelry', image: '/images/portfolio/jewelry/image29.jpeg' },
    { id: 11, title: 'Diamond Campaign', category: 'jewelry', image: '/images/portfolio/jewelry/image30.jpeg' },
    { id: 12, title: 'Bridal Collection', category: 'jewelry', image: '/images/portfolio/jewelry/image31.jpeg' },
    { id: 13, title: 'Heritage Pieces', category: 'jewelry', image: '/images/portfolio/jewelry/image32.jpeg' },
    { id: 14, title: 'Modern Designs', category: 'jewelry', image: '/images/portfolio/jewelry/image33.jpeg' },
    
    // Cannes
    { id: 15, title: 'Cannes Festival', category: 'cannes', image: '/images/portfolio/cannes/image43.jpeg' },
    { id: 16, title: 'Film Premiere', category: 'cannes', image: '/images/portfolio/cannes/image44.jpeg' },
    { id: 17, title: 'Red Carpet', category: 'cannes', image: '/images/portfolio/cannes/image45.jpeg' },
    { id: 18, title: 'Gala Event', category: 'cannes', image: '/images/portfolio/cannes/image46.jpeg' },
    { id: 19, title: 'After Party', category: 'cannes', image: '/images/portfolio/cannes/image47.jpeg' }
  ];

  return (
    <section 
      ref={containerRef}
      id="portfolio" 
      className="relative py-32 bg-black overflow-hidden min-h-screen"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-6 py-3 mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
            <span className="text-sm font-medium text-purple-300 tracking-wide">
              OUR PORTFOLIO
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            <span className="block">CREATIVE</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              EXCELLENCE
            </span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in our portfolio of transformative work that has 
            redefined brands and created cultural impact across industries.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* 3D Portfolio Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-[600px] rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 overflow-hidden"
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <Portfolio3DScene
                portfolioItems={portfolioItems}
                activeCategory={activeCategory}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Portfolio Details Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-w-4xl w-full bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {selectedItem.title}
                    </h3>
                    <div className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium mb-6">
                      {selectedItem.category.toUpperCase()}
                    </div>
                    <p className="text-white/70 leading-relaxed mb-6">
                      This project showcases our expertise in creating compelling 
                      visual narratives that resonate with target audiences and 
                      drive meaningful engagement across digital platforms.
                    </p>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            View Full Portfolio
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Modern3DPortfolio;