import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Target, Eye, Star, Sparkles } from 'lucide-react';

// Image component with fallback
const ImageWithFallback = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setLoading(true);
    setError(false);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#d4c4c0]">
          <div className="w-12 h-12 border-4 border-[#8666A5] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
          setImgSrc('/images/portfolio/placeholder.jpg');
        }}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
};

const Portfolio = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState(1);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const portfolioItems = [
    {
      id: 1,
      category: "Fashion Campaign",
      title: "Cannes Film Festival",
      client: "Luxury Brand Partners",
      number: "01",
      letter: "W",
      description: "Orchestrated high-profile celebrity PR campaign at Cannes Film Festival 2024",
      image: "/images/portfolio/cannes/image43.jpeg",
      gallery: [
        "/images/portfolio/cannes/image43.jpeg",
        "/images/portfolio/cannes/image44.jpeg",
        "/images/portfolio/cannes/image45.jpeg",
        "/images/portfolio/cannes/image46.jpeg",
        "/images/portfolio/cannes/image47.jpeg"
      ],
      results: [
        { label: "Media Impressions", value: "250M+" },
        { label: "Coverage Articles", value: "1,200+" },
        { label: "Social Engagement", value: "5M+" }
      ]
    },
    {
      id: 2,
      category: "Brand Launch",
      title: "Celebrity Jewelry Line",
      client: "Elite Accessories Co.",
      number: "02",
      letter: "O",
      description: "Strategic celebrity partnership launch campaign with targeted media placements",
      image: "/images/portfolio/jewelry/image29.jpeg",
      gallery: [
        "/images/portfolio/jewelry/image29.jpeg",
        "/images/portfolio/jewelry/image30.jpeg",
        "/images/portfolio/jewelry/image31.jpeg",
        "/images/portfolio/jewelry/image32.jpeg",
        "/images/portfolio/jewelry/image33.jpeg",
        "/images/portfolio/jewelry/image34.jpeg",
        "/images/portfolio/jewelry/image35.jpeg",
        "/images/portfolio/jewelry/image36.jpeg",
        "/images/portfolio/jewelry/image37.jpeg",
        "/images/portfolio/jewelry/image38.jpeg",
        "/images/portfolio/jewelry/image39.jpeg"
      ],
      results: [
        { label: "Launch Day Sales", value: "$2.5M" },
        { label: "Social Reach", value: "150M+" },
        { label: "Engagement Rate", value: "12.5%" }
      ]
    },
    {
      id: 3,
      category: "Product Placement",
      title: "Commercial Integration",
      client: "Major Film Studio",
      number: "03",
      letter: "R",
      description: "Seamless product integration across multiple blockbuster productions",
      image: "/images/portfolio/commercial/image70.jpeg",
      gallery: [
        "/images/portfolio/commercial/image70.jpeg",
        "/images/portfolio/commercial/image71.jpeg",
        "/images/portfolio/commercial/image72.jpeg",
        "/images/portfolio/commercial/image64.png",
        "/images/portfolio/commercial/image65.png",
        "/images/portfolio/commercial/image66.png",
        "/images/portfolio/commercial/image67.png",
        "/images/portfolio/commercial/image68.png",
        "/images/portfolio/commercial/image69.png"
      ],
      results: [
        { label: "Box Office Total", value: "$850M" },
        { label: "Brand Awareness", value: "+85%" },
        { label: "Media Value", value: "$12M" }
      ]
    },
    {
      id: 4,
      category: "Event Management",
      title: "Star-Studded Gala",
      client: "International Foundation",
      number: "04",
      letter: "K",
      description: "Coordinated A-list celebrity attendance and media coverage for charity event",
      image: "/images/portfolio/celebrity/image48.jpeg",
      gallery: [
        "/images/portfolio/celebrity/image48.jpeg",
        "/images/portfolio/celebrity/image49.jpeg",
        "/images/portfolio/celebrity/image50.jpeg",
        "/images/portfolio/celebrity/image51.jpeg"
      ],
      results: [
        { label: "Funds Raised", value: "$3.2M" },
        { label: "Celebrity Attendees", value: "45+" },
        { label: "Press Coverage", value: "850+" }
      ]
    }
  ];

  const nextImage = () => {
    if (activeCaseStudy) {
      setImageDirection(1);
      setCurrentImageIndex((prev) => 
        (prev + 1) % activeCaseStudy.gallery.length
      );
    }
  };

  const prevImage = () => {
    if (activeCaseStudy) {
      setImageDirection(-1);
      setCurrentImageIndex((prev) => 
        prev === 0 ? activeCaseStudy.gallery.length - 1 : prev - 1
      );
    }
  };

  return (
    <motion.div
      ref={containerRef}
      id="portfolio"
      className="relative min-h-screen bg-[#f5f0ed] overflow-hidden pt-32 md:pt-40"
    >
      {/* Refined Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(134, 102, 165, 0.08) 0%, transparent 70%)`,
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(134, 102, 165, 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(134, 102, 165, 0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Enhanced Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 pb-16 px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
                border: '1px solid rgba(134, 102, 165, 0.2)',
                boxShadow: '0 8px 32px rgba(134, 102, 165, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#8666A5] animate-pulse" />
              <span className="text-sm font-semibold tracking-wider uppercase text-[#8666A5]">
                Portfolio
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-6"
          >
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#8666A5] mb-4 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Featured Work
            </h2>
            
            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isVisible ? '120px' : 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-1 bg-gradient-to-r from-transparent via-[#8666A5] to-transparent mx-auto mb-8"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl lg:text-2xl text-[#6b4d7a] max-w-4xl mx-auto leading-relaxed"
            >
              Showcasing our most impactful celebrity PR campaigns and brand partnerships
            </motion.p>
          </motion.div>

          {/* Stats Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { value: '500+', label: 'Projects' },
              { value: '2B+', label: 'Impressions' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center px-6 py-4 rounded-2xl backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5))',
                  border: '1px solid rgba(134, 102, 165, 0.15)',
                  boxShadow: '0 4px 16px rgba(134, 102, 165, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                }}
              >
                <div 
                  className="text-3xl md:text-4xl font-bold text-[#8666A5] mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#6b4d7a] font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Portfolio Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          {portfolioItems.map((item, index) => {
            const isSecond = index === 1;
            const parallaxX = hoveredCard === item.id ? (mousePos.x - window.innerWidth / 2) / 50 : 0;
            const parallaxY = hoveredCard === item.id ? (mousePos.y - window.innerHeight / 2) / 50 : 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0, 
                  scale: isVisible ? 1 : 0.8,
                  rotateY: 0
                }}
                transition={{ delay: index * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                className="relative cursor-pointer group min-h-[700px] overflow-hidden"
                style={{
                  borderTop: index < 2 ? 'none' : '1px solid rgba(134, 102, 165, 0.15)',
                  borderLeft: index % 2 === 0 ? 'none' : '1px solid rgba(134, 102, 165, 0.15)',
                  backgroundColor: isSecond ? '#3d4f51' : '#d4c4c0',
                  perspective: '1000px',
                }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  setActiveCaseStudy(item);
                  setCurrentImageIndex(0);
                }}
              >
                {/* Enhanced gradient overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none z-5"
                  style={{
                    background: isSecond 
                      ? 'linear-gradient(135deg, rgba(61, 79, 81, 0.6) 0%, transparent 50%, rgba(61, 79, 81, 0.4) 100%)'
                      : 'linear-gradient(135deg, rgba(212, 196, 192, 0.8) 0%, transparent 50%, rgba(212, 196, 192, 0.6) 100%)',
                  }}
                />

                {/* Number Badge */}
                <motion.div
                  className="absolute top-8 left-8 z-20"
                  animate={{
                    y: hoveredCard === item.id ? -10 : 0,
                    scale: hoveredCard === item.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: '#8666A5',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(134, 102, 165, 0.3)',
                      boxShadow: '0 8px 32px rgba(134, 102, 165, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {item.number}
                  </div>
                </motion.div>

                {/* Category Badge - Top Right */}
                <motion.div
                  className="absolute top-8 right-8 z-20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div 
                    className="px-5 py-2 rounded-full text-xs font-bold tracking-wider backdrop-blur-md"
                    style={{
                      background: isSecond 
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))'
                        : 'linear-gradient(135deg, rgba(134, 102, 165, 0.9), rgba(157, 123, 184, 0.9))',
                      color: isSecond ? '#fff' : '#fff',
                      border: `1px solid ${isSecond ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.4)'}`,
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    {item.category.toUpperCase()}
                  </div>
                </motion.div>

                {/* Giant Letter Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                  style={{
                    x: useTransform(smoothY, (value) => parallaxX * 2),
                    y: useTransform(smoothY, (value) => parallaxY * 2),
                  }}
                >
                  <motion.span
                    className="text-[30vw] font-bold opacity-5 select-none"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      WebkitTextStroke: isSecond ? '2px rgba(255, 255, 255, 0.1)' : '2px rgba(134, 102, 165, 0.1)',
                      color: 'transparent',
                      background: isSecond 
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
                        : 'linear-gradient(135deg, rgba(134, 102, 165, 0.1), rgba(134, 102, 165, 0.05))',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                    }}
                    animate={{
                      scale: hoveredCard === item.id ? 1.1 : 1,
                      rotate: hoveredCard === item.id ? 5 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {item.letter}
                  </motion.span>
                </motion.div>

                {/* Decorative Text Elements - Enhanced & Coordinated */}
                {index === 0 && (
                  <>
                    {/* Card 1: Cannes - Top Right Corner */}
                    <motion.div
                      initial={{ opacity: 0, x: 30, y: -20 }}
                      animate={{ opacity: isVisible ? 0.9 : 0, x: isVisible ? 0 : 30, y: isVisible ? 0 : -20 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute top-32 right-16 text-right pointer-events-none z-15"
                    >
                      <div className="relative">
                        <p className="text-[#8666A5] text-6xl font-bold mb-3 leading-tight" style={{ fontFamily: 'Brush Script MT, cursive', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
                          Red Carpet
                        </p>
                        <div className="w-24 h-1 bg-[#8666A5] ml-auto mb-2" />
                        <p className="text-[#6b4d7a] text-lg font-black tracking-[0.3em]" style={{ fontFamily: 'Courier New, monospace' }}>
                          FESTIVAL 2024
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Left Side Vertical Text */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none z-15"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed'
                      }}
                    >
                      <p className="text-[#8666A5] text-2xl font-black tracking-[0.3em] mb-4" style={{ fontFamily: 'Impact, sans-serif', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
                        CANNES
                      </p>
                      <div className="w-1 h-12 bg-[#8666A5] mx-auto mb-4" />
                      <p className="text-[#6b4d7a] text-lg font-bold tracking-[0.2em]" style={{ fontFamily: 'Futura, sans-serif' }}>
                        2024
                      </p>
                    </motion.div>
                  </>
                )}

                {index === 1 && (
                  <>
                    {/* Card 2: Jewelry - Top Right Horizontal */}
                    <motion.div
                      initial={{ opacity: 0, x: 30, y: -20 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30, y: isVisible ? 0 : -20 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute top-32 right-16 text-right pointer-events-none z-15"
                    >
                      <div className="relative">
                        <p className="text-white text-6xl font-light leading-none mb-3" style={{ fontFamily: 'Optima, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                          Luxury
                        </p>
                        <div className="w-24 h-1 bg-white/80 ml-auto mb-2" />
                        <p className="text-white/90 text-lg font-bold tracking-[0.3em]" style={{ fontFamily: 'Didot, serif' }}>
                          JEWELRY LINE
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Left Side Vertical Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none z-15"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed'
                      }}
                    >
                      <p className="text-white text-2xl font-black tracking-[0.3em] mb-4" style={{ fontFamily: 'Impact, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        CELEBRITY
                      </p>
                      <div className="w-1 h-12 bg-white/80 mx-auto mb-4" />
                      <p className="text-white/90 text-lg font-bold tracking-[0.2em]" style={{ fontFamily: 'Futura, sans-serif' }}>
                        ELITE
                      </p>
                    </motion.div>
                  </>
                )}

                {index === 2 && (
                  <>
                    {/* Card 3: Commercial - Top Right Horizontal */}
                    <motion.div
                      initial={{ opacity: 0, x: 30, y: -20 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30, y: isVisible ? 0 : -20 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute top-32 right-16 text-right pointer-events-none z-15"
                    >
                      <div className="relative">
                        <p className="text-[#8666A5] text-6xl font-black leading-none mb-3" style={{ fontFamily: 'Impact, sans-serif', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
                          Hollywood
                        </p>
                        <div className="w-24 h-1 bg-[#8666A5] ml-auto mb-2" />
                        <p className="text-[#6b4d7a] text-lg font-black tracking-[0.3em]" style={{ fontFamily: 'Futura, sans-serif' }}>
                          BLOCKBUSTER
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Right Side Vertical Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none z-15"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed'
                      }}
                    >
                      <p className="text-[#8666A5] text-2xl font-black tracking-[0.3em] mb-4" style={{ fontFamily: 'Impact, sans-serif', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
                        CINEMA
                      </p>
                      <div className="w-1 h-12 bg-[#8666A5] mx-auto mb-4" />
                      <p className="text-[#6b4d7a] text-lg font-bold tracking-[0.2em]" style={{ fontFamily: 'Futura, sans-serif' }}>
                        850M
                      </p>
                    </motion.div>
                  </>
                )}

                {index === 3 && (
                  <>
                    {/* Card 4: Gala - Top Right Horizontal */}
                    <motion.div
                      initial={{ opacity: 0, x: 30, y: -20 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30, y: isVisible ? 0 : -20 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute top-32 right-16 text-right pointer-events-none z-15"
                    >
                      <div className="relative">
                        <p className="text-[#8666A5] text-6xl font-bold leading-none mb-3" style={{ fontFamily: 'Baskerville, serif', fontStyle: 'italic', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
                          Star-Studded
                        </p>
                        <div className="w-24 h-1 bg-[#8666A5] ml-auto mb-2" />
                        <p className="text-[#6b4d7a] text-lg font-bold tracking-[0.2em]" style={{ fontFamily: 'Garamond, serif' }}>
                          GALA EVENT
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Left Side Vertical Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none z-15"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed'
                      }}
                    >
                      <p className="text-[#8666A5] text-2xl font-black tracking-[0.3em] mb-4" style={{ fontFamily: 'Impact, sans-serif', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
                        CHARITY
                      </p>
                      <div className="w-1 h-12 bg-[#8666A5] mx-auto mb-4" />
                      <p className="text-[#6b4d7a] text-lg font-bold tracking-[0.2em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                        45+ VIP
                      </p>
                    </motion.div>
                  </>
                )}

                {/* Image with particles - OPTIMIZED POSITIONING */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-12"
                  style={{
                    width: index === 1 ? '55%' : index === 2 ? '50%' : '52%',
                    height: index === 1 ? '60%' : index === 2 ? '55%' : '58%',
                    x: useTransform(smoothY, (value) => -parallaxX * 0.5),
                    y: useTransform(smoothY, (value) => -parallaxY * 0.5),
                  }}
                  animate={{
                    scale: hoveredCard === item.id ? 1.08 : 1,
                    rotateY: hoveredCard === item.id ? 5 : 0,
                    rotateX: hoveredCard === item.id ? -5 : 0,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Enhanced Multi-layer shadow */}
                  <div 
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      boxShadow: `
                        0 30px 80px rgba(0, 0, 0, 0.4),
                        0 10px 30px rgba(0, 0, 0, 0.3),
                        0 0 0 1px rgba(255, 255, 255, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `,
                      border: '4px solid rgba(255, 255, 255, 0.3)',
                      zIndex: 5,
                    }}
                  />

                  {/* Refined vignette overlay */}
                  <div 
                    className="absolute inset-0 rounded-3xl pointer-events-none z-10"
                    style={{
                      background: isSecond 
                        ? 'radial-gradient(ellipse at center, transparent 35%, rgba(61, 79, 81, 0.15) 75%, rgba(61, 79, 81, 0.35) 100%)'
                        : 'radial-gradient(ellipse at center, transparent 35%, rgba(134, 102, 165, 0.1) 75%, rgba(134, 102, 165, 0.25) 100%)',
                      mixBlendMode: 'multiply',
                    }}
                  />

                  {/* Corner accent lines */}
                  <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none z-20">
                    <div className="absolute top-3 left-3 w-8 h-1 bg-white/40 rounded" />
                    <div className="absolute top-3 left-3 w-1 h-8 bg-white/40 rounded" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none z-20">
                    <div className="absolute bottom-3 right-3 w-8 h-1 bg-white/40 rounded" />
                    <div className="absolute bottom-3 right-3 w-1 h-8 bg-white/40 rounded" />
                  </div>

                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-3xl"
                  />

                  {/* Enhanced floating particles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        background: isSecond ? 'rgba(255, 255, 255, 0.5)' : 'rgba(134, 102, 165, 0.5)',
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        filter: 'blur(1px)',
                        boxShadow: `0 0 ${Math.random() * 10 + 5}px ${isSecond ? 'rgba(255, 255, 255, 0.3)' : 'rgba(134, 102, 165, 0.3)'}`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.3, 0.9, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>

                {/* Content - Third card only - VERTICAL */}
                {index === 2 && (
                  <motion.div
                    className="absolute bottom-12 left-12 z-20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0, 
                      x: isVisible ? 0 : -20 
                    }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed'
                    }}
                  >
                    <p className="text-[#6b4d7a] text-lg font-black tracking-[0.3em] mb-3" style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
                      PRODUCT PLACEMENT
                    </p>
                    <div className="w-1 h-16 bg-[#8666A5] mx-auto mb-3" />
                    <h3 className="text-[#8666A5] text-3xl font-bold mb-2" style={{ fontFamily: 'Impact, sans-serif', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}>
                      COMMERCIAL
                    </h3>
                    <p className="text-[#6b4d7a] text-2xl font-bold" style={{ fontFamily: 'Futura, sans-serif' }}>
                      INTEGRATION
                    </p>
                  </motion.div>
                )}

                {/* Hover Overlay */}
                <AnimatePresence>
                  {hoveredCard === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-30 flex flex-col justify-end p-12"
                      style={{
                        background: 'linear-gradient(135deg, rgba(134, 102, 165, 0.97), rgba(157, 123, 184, 0.98))',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      {/* Client badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 self-start"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: '#fff',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {item.client}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="text-sm font-semibold text-white/90 mb-2 block tracking-wider uppercase">
                          {item.category}
                        </span>
                        <h3 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {item.title}
                        </h3>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Results */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                          {item.results.map((result, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="p-4 rounded-xl"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                              }}
                            >
                              <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                                {result.value}
                              </div>
                              <div className="text-sm text-white/80">
                                {result.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-[#8666A5] font-semibold shadow-lg"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                          }}
                        >
                          View Full Case Study
                          <motion.svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </motion.svg>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats Section - Compact Modern Design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto px-8 py-12"
      >
        <div className="relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(134, 102, 165, 0.08) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Compact Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h3 
              className="text-3xl md:text-4xl font-bold text-[#8666A5] mb-3" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Impact
            </h3>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-[#8666A5] to-transparent mx-auto"
            />
          </motion.div>
          
          {/* Compact Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {[
              { value: "500+", label: "Campaigns", icon: Target },
              { value: "2B+", label: "Impressions", icon: Eye },
              { value: "98%", label: "Satisfaction", icon: Star },
              { value: "150+", label: "Celebrities", icon: Sparkles },
            ].map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 150 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.03,
                    transition: { duration: 0.2 } 
                  }}
                  className="group relative"
                >
                  {/* Card Container */}
                  <div 
                    className="relative p-5 rounded-2xl backdrop-blur-md overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
                      border: '1px solid rgba(134, 102, 165, 0.2)',
                      boxShadow: '0 4px 20px rgba(134, 102, 165, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {/* Gradient overlay on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(134, 102, 165, 0.05), rgba(179, 157, 219, 0.05))',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      {/* Icon */}
                      <motion.div
                        className="flex items-center justify-center mb-2"
                        animate={{ 
                          y: [0, -3, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          delay: i * 0.2
                        }}
                      >
                        <IconComponent 
                          className="w-7 h-7"
                          style={{ color: '#8666A5' }}
                          strokeWidth={2}
                        />
                      </motion.div>

                      {/* Value */}
                      <motion.div
                        className="text-3xl md:text-4xl font-bold mb-1"
                        style={{ 
                          fontFamily: 'Playfair Display, serif',
                          background: 'linear-gradient(135deg, #8666A5, #b39ddb)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: i * 0.1 + 0.2, 
                          type: "spring", 
                          stiffness: 200
                        }}
                      >
                        {stat.value}
                      </motion.div>

                      {/* Label */}
                      <motion.p
                        className="text-xs md:text-sm font-semibold text-[#6b4d7a]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                      >
                        {stat.label}
                      </motion.p>
                    </div>

                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      }}
                    />
                  </div>

                  {/* Corner accent */}
                  <div 
                    className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, transparent 50%, rgba(134, 102, 165, 0.15) 50%)',
                      borderTopRightRadius: '1rem',
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
            onClick={() => setActiveCaseStudy(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-[#d4c4c0] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-lg"
                onClick={() => setActiveCaseStudy(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8666A5" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image Gallery */}
                <div className="relative bg-[#3d4f51] flex items-center justify-center p-12">
                  <AnimatePresence mode="wait" custom={imageDirection}>
                    <motion.div
                      key={currentImageIndex}
                      custom={imageDirection}
                      initial={{ opacity: 0, x: imageDirection * 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -imageDirection * 100 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <ImageWithFallback
                        src={activeCaseStudy.gallery[currentImageIndex]}
                        alt={`${activeCaseStudy.title} - Image ${currentImageIndex + 1}`}
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-lg"
                    onClick={prevImage}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8666A5" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-lg"
                    onClick={nextImage}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8666A5" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </motion.button>

                  {/* Image Counter */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-sm font-semibold text-[#8666A5]">
                    {currentImageIndex + 1} / {activeCaseStudy.gallery.length}
                  </div>
                </div>

                {/* Content */}
                <div className="p-12 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-[#8666A5] text-white">
                      {activeCaseStudy.category}
                    </span>

                    <h2 className="text-5xl font-bold text-[#8666A5] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {activeCaseStudy.title}
                    </h2>

                    <p className="text-xl text-[#6b4d7a] mb-8">
                      {activeCaseStudy.client}
                    </p>

                    <div className="w-20 h-1 bg-[#8666A5] mb-8" />

                    <p className="text-lg text-[#6b4d7a] leading-relaxed mb-12">
                      {activeCaseStudy.description}
                    </p>

                    <h3 className="text-2xl font-bold text-[#8666A5] mb-6">
                      Campaign Results
                    </h3>

                    <div className="space-y-6">
                      {activeCaseStudy.results.map((result, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex justify-between items-center p-4 rounded-xl bg-white/50"
                        >
                          <span className="text-lg text-[#6b4d7a]">
                            {result.label}
                          </span>
                          <span className="text-3xl font-bold text-[#8666A5]" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {result.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Portfolio;