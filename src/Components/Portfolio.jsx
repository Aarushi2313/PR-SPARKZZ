import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Target, Eye, Star, Sparkles } from 'lucide-react';

// Detect if mobile device
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Image component with fallback - optimized
const ImageWithFallback = ({ src, alt, className, eager = false }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setLoading(true);
    setError(false);
  }, [src]);

  const handleError = () => {
    console.log('Image failed to load:', src);
    setError(true);
    setLoading(false);
  };

  return (
    <div className="relative w-full h-full">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#d4c4c0]">
          <div className="w-8 h-8 border-3 border-[#8666A5] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#8666A5] to-[#9d7bb8] text-white p-6">
          <div className="w-16 h-16 mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <p className="text-sm font-semibold">Image Coming Soon</p>
          <p className="text-xs opacity-80 mt-1 text-center">{alt}</p>
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          className={className}
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setLoading(false)}
          onError={handleError}
          style={{ display: loading ? 'none' : 'block' }}
        />
      )}
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
  const shouldReduceMotion = useReducedMotion();
  const mobile = useMemo(() => isMobile(), []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Simplified transforms for mobile
  const y = useTransform(scrollYProgress, [0, 1], mobile ? [50, -50] : [100, -100]);
  const smoothY = useSpring(y, { stiffness: mobile ? 50 : 100, damping: mobile ? 20 : 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Disable mouse tracking on mobile for performance
    if (mobile) return;
    
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
  }, [mobile]);

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
      title: "Celebrity Jewellery Line",
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
      className="relative min-h-screen overflow-hidden pt-32 md:pt-40"
      style={{
        background: 'linear-gradient(135deg, #faf5f0 0%, #f5e8ed 25%, #f0e8f5 50%, #e8edf5 75%, #f5f0ed 100%)'
      }}
    >
      {/* Sophisticated Portfolio Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Film Strip Frames */}
        <AnimatePresence>
          {isVisible && !mobile && [...Array(15)].map((_, i) => {
            const size = Math.random() * 100 + 60;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const rotation = Math.random() * 40 - 20;
            
            return (
              <motion.div
                key={`frame-${i}`}
                className="absolute border-4 shadow-lg"
                style={{
                  width: `${size}px`,
                  height: `${size * 1.2}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  rotate: rotation,
                  borderColor: 'rgba(134, 102, 165, 0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(10px)',
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  y: -50 
                }}
                animate={{ 
                  opacity: [0.2, 0.35, 0.2],
                  scale: 1,
                  y: [0, -15, 0],
                  rotate: [rotation, rotation + 5, rotation]
                }}
                transition={{
                  delay: Math.random() * 1.5,
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                {/* Film strip holes */}
                <div className="absolute -left-2 top-2 flex flex-col gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div 
                      key={j} 
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: 'rgba(134, 102, 165, 0.3)' }}
                    />
                  ))}
                </div>
                <div className="absolute -right-2 top-2 flex flex-col gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div 
                      key={j} 
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: 'rgba(134, 102, 165, 0.3)' }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Vintage Camera Aperture Circles */}
        {!mobile && [...Array(8)].map((_, i) => (
          <motion.div
            key={`aperture-${i}`}
            className="absolute rounded-full border-2"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderColor: 'rgba(134, 102, 165, 0.12)',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 15 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5
            }}
          />
        ))}

        {/* Spotlight Beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-full"
          style={{
            background: 'linear-gradient(180deg, rgba(134, 102, 165, 0.08) 0%, transparent 50%, rgba(134, 102, 165, 0.05) 100%)',
            filter: 'blur(30px)',
            transformOrigin: 'top center',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleX: [1, 1.5, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-1 h-full"
          style={{
            background: 'linear-gradient(180deg, rgba(179, 157, 219, 0.08) 0%, transparent 50%, rgba(179, 157, 219, 0.05) 100%)',
            filter: 'blur(30px)',
            transformOrigin: 'top center',
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scaleX: [1, 1.5, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Animated Gradient Orbs - Portfolio Theme */}
        <motion.div 
          className="absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(134, 102, 165, 0.15) 0%, transparent 70%)' }}
          animate={{ 
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(179, 157, 219, 0.12) 0%, transparent 70%)' }}
          animate={{ 
            x: [50, -50, 50],
            y: [30, -30, 30],
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(199, 179, 229, 0.1) 0%, transparent 70%)' }}
          animate={{ 
            x: [30, -30, 30],
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(134, 102, 165, 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(134, 102, 165, 0.03) 1px, transparent 1px)`,
            backgroundSize: mobile ? '40px 40px' : '60px 60px',
          }}
        />
      </div>

      {/* Enhanced Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 pb-12 px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Floating Decorative Elements */}
          {!mobile && (
            <>
              <motion.div
                className="absolute top-5 left-10 opacity-15"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star size={32} strokeWidth={1.5} className="text-[#8666A5]" />
              </motion.div>
              <motion.div
                className="absolute top-10 right-20 opacity-15"
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Sparkles size={28} strokeWidth={1.5} className="text-[#b39ddb]" />
              </motion.div>
            </>
          )}

          {/* Section Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8, y: isVisible ? 0 : -10 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 150 }}
            className="flex justify-center mb-6"
          >
            <div 
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full backdrop-blur-md overflow-hidden cursor-default"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
                border: '2px solid rgba(134, 102, 165, 0.25)',
                boxShadow: '0 8px 32px rgba(134, 102, 165, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                }}
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Target className="w-4 h-4 text-[#8666A5]" strokeWidth={2.5} />
              </motion.div>
              
              <span className="relative z-10 text-xs font-bold tracking-[0.2em] uppercase text-[#8666A5]">
                Portfolio
              </span>
              
              <motion.div
                className="w-2 h-2 rounded-full bg-[#8666A5]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Main Title with Enhanced Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 80 }}
            className="text-center mb-6"
          >
            <motion.h2 
              className="relative inline-block text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {/* Gradient text with animation */}
              <motion.span
                className="bg-clip-text text-transparent"
                style={{
                  background: 'linear-gradient(135deg, #8666A5 0%, #b39ddb 50%, #8666A5 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% center', '100% center', '0% center']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Featured Work
              </motion.span>
              
              {/* Decorative underline accent */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-2 opacity-20"
                style={{
                  background: 'linear-gradient(90deg, transparent, #8666A5, transparent)',
                  filter: 'blur(6px)'
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isVisible ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.h2>
            
            {/* Decorative Line with Animation */}
            <motion.div
              className="flex items-center justify-center gap-2 mb-5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-[#8666A5] to-[#b39ddb]"
                initial={{ width: 0 }}
                animate={{ width: isVisible ? '50px' : 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#8666A5]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="h-0.5 bg-gradient-to-r from-[#b39ddb] via-[#8666A5] to-transparent"
                initial={{ width: 0 }}
                animate={{ width: isVisible ? '50px' : 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.div>

            {/* Enhanced Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-base md:text-lg lg:text-xl text-[#6b4d7a] leading-relaxed">
                Showcasing our most <span className="font-bold text-[#8666A5]">impactful celebrity PR campaigns</span> and <span className="font-bold text-[#8666A5]">brand partnerships</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Highlights with Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10"
          >
            {[
              { value: '50+', label: 'Projects', icon: Target, color: '#8666A5' },
              { value: '50M+', label: 'Impressions', icon: Eye, color: '#9d7bb8' },
              { value: '98%', label: 'Satisfaction', icon: Star, color: '#b39ddb' },
            ].map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5, y: isVisible ? 0 : 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.1 + i * 0.1, 
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative text-center px-6 py-4 rounded-xl backdrop-blur-md overflow-hidden cursor-default min-w-[140px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.65))',
                    border: '2px solid rgba(134, 102, 165, 0.2)',
                    boxShadow: '0 6px 20px rgba(134, 102, 165, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`
                    }}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center mb-2"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                        boxShadow: `0 3px 10px ${stat.color}25`
                      }}
                    >
                      <IconComponent 
                        className="w-5 h-5"
                        style={{ color: stat.color }}
                        strokeWidth={2}
                      />
                    </div>
                  </motion.div>

                  {/* Value with counter animation */}
                  <motion.div
                    className="relative z-10 text-3xl md:text-4xl font-bold mb-1"
                    style={{ 
                      fontFamily: 'Playfair Display, serif',
                      color: stat.color
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <motion.div 
                    className="relative z-10 text-xs md:text-sm text-[#6b4d7a] font-semibold tracking-wide uppercase"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {stat.label}
                  </motion.div>

                  {/* Decorative corner accent */}
                  <div 
                    className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top right, ${stat.color}12, transparent)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Portfolio Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          {portfolioItems.map((item, index) => {
            const isSecond = index === 1;
            const parallaxX = (!mobile && hoveredCard === item.id) ? (mousePos.x - window.innerWidth / 2) / 50 : 0;
            const parallaxY = (!mobile && hoveredCard === item.id) ? (mousePos.y - window.innerHeight / 2) / 50 : 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, rotateY: mobile ? 0 : -15 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0, 
                  scale: isVisible ? 1 : 0.95,
                  rotateY: 0
                }}
                transition={{ delay: mobile ? index * 0.08 : index * 0.15, duration: mobile ? 0.5 : 0.8, type: "spring", stiffness: mobile ? 150 : 100 }}
                whileHover={!mobile ? { scale: 1.02, transition: { duration: 0.3 } } : {}}
                className="relative cursor-pointer group min-h-[500px] md:min-h-[700px] overflow-hidden"
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
                  console.log('Opening case study:', item.title);
                  console.log('Gallery images:', item.gallery);
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

                {/* Giant Letter Overlay - Simplified for mobile */}
                {!mobile && (
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
                        willChange: 'transform',
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
                )}

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
                    {/* Card 2: Jewellery - Top Right Horizontal */}
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
                          JEWELLERY LINE
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
                    width: mobile ? '70%' : (index === 1 ? '55%' : index === 2 ? '50%' : '52%'),
                    height: mobile ? '55%' : (index === 1 ? '60%' : index === 2 ? '55%' : '58%'),
                    x: !mobile ? useTransform(smoothY, (value) => -parallaxX * 0.5) : 0,
                    y: !mobile ? useTransform(smoothY, (value) => -parallaxY * 0.5) : 0,
                    willChange: mobile ? 'auto' : 'transform',
                  }}
                  animate={!mobile ? {
                    scale: hoveredCard === item.id ? 1.08 : 1,
                    rotateY: hoveredCard === item.id ? 5 : 0,
                    rotateX: hoveredCard === item.id ? -5 : 0,
                  } : {}}
                  transition={{ duration: mobile ? 0.3 : 0.6, ease: "easeOut" }}
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
                      zIndex: 15,
                    }}
                  />

                  {/* Image - Base layer */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-3xl"
                      loading="eager"
                      onError={(e) => {
                        console.log('Cover image failed to load:', item.image);
                      }}
                      onLoad={() => {
                        console.log('Cover image loaded:', item.image);
                      }}
                    />
                  </div>

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

                  {/* Enhanced floating particles - Reduced for mobile */}
                  {!mobile && [...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        background: isSecond ? 'rgba(255, 255, 255, 0.4)' : 'rgba(134, 102, 165, 0.4)',
                        width: `${Math.random() * 5 + 2}px`,
                        height: `${Math.random() * 5 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        filter: 'blur(1px)',
                        boxShadow: `0 0 ${Math.random() * 8 + 4}px ${isSecond ? 'rgba(255, 255, 255, 0.2)' : 'rgba(134, 102, 165, 0.2)'}`,
                        willChange: 'transform, opacity',
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, Math.random() * 15 - 7.5, 0],
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
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
              { value: "50+", label: "Campaigns", icon: Target },
              { value: "2B+", label: "Impressions", icon: Eye },
              { value: "98%", label: "Satisfaction", icon: Star },
              { value: "150+", label: "Celebrities", icon: Sparkles },
            ].map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: mobile ? i * 0.05 : i * 0.1, duration: mobile ? 0.3 : 0.5, type: "spring", stiffness: mobile ? 200 : 150 }}
                  whileHover={!mobile ? { 
                    y: -6, 
                    scale: 1.03,
                    transition: { duration: 0.2 } 
                  } : {}}
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
                        animate={!mobile ? { 
                          y: [0, -3, 0],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={!mobile ? { 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          delay: i * 0.2
                        } : {}}
                      >
                        <IconComponent 
                          className="w-6 h-6 md:w-7 md:h-7"
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

                    {/* Shine effect on hover - Desktop only */}
                    {!mobile && (
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                        }}
                      />
                    )}
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

      {/* Modal - Redesigned for perfect alignment */}
      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
              backdropFilter: 'blur(12px)'
            }}
            onClick={() => setActiveCaseStudy(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-7xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              style={{
                maxHeight: 'calc(100vh - 4rem)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(134, 102, 165, 0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => setActiveCaseStudy(null)}
                style={{
                  border: '2px solid #8666A5'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8666A5" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
                {/* Image Gallery Section */}
                <div className="relative bg-gradient-to-br from-[#3d4f51] to-[#2d3f41] flex items-center justify-center p-6 md:p-12 min-h-[300px] lg:min-h-full">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none opacity-30">
                    <div className="absolute top-4 left-4 w-12 h-0.5 bg-white/60" />
                    <div className="absolute top-4 left-4 w-0.5 h-12 bg-white/60" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none opacity-30">
                    <div className="absolute bottom-4 right-4 w-12 h-0.5 bg-white/60" />
                    <div className="absolute bottom-4 right-4 w-0.5 h-12 bg-white/60" />
                  </div>

                  <AnimatePresence mode="wait" custom={imageDirection}>
                    <motion.div
                      key={currentImageIndex}
                      custom={imageDirection}
                      initial={{ opacity: 0, x: imageDirection * 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -imageDirection * 50 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="relative max-w-full max-h-full">
                        <img
                          src={activeCaseStudy.gallery[currentImageIndex]}
                          alt={`${activeCaseStudy.title} - Image ${currentImageIndex + 1}`}
                          className="max-w-full max-h-[400px] lg:max-h-[600px] object-contain rounded-xl shadow-2xl"
                          onError={(e) => {
                            console.log('Failed to load:', activeCaseStudy.gallery[currentImageIndex]);
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                          onLoad={(e) => {
                            console.log('Successfully loaded:', activeCaseStudy.gallery[currentImageIndex]);
                          }}
                        />
                        <div 
                          className="hidden items-center justify-center bg-gradient-to-br from-[#8666A5] to-[#9d7bb8] text-white p-8 rounded-xl"
                          style={{ minHeight: '400px', minWidth: '300px' }}
                        >
                          <div className="text-center">
                            <div className="w-16 h-16 mb-4 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                              </svg>
                            </div>
                            <p className="text-lg font-semibold">Image Coming Soon</p>
                            <p className="text-sm opacity-80 mt-2">{activeCaseStudy.title}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {activeCaseStudy.gallery.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1, x: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
                        onClick={prevImage}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8666A5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, x: 3 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
                        onClick={nextImage}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8666A5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </motion.button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-xs md:text-sm font-bold text-[#8666A5] shadow-lg">
                    {currentImageIndex + 1} / {activeCaseStudy.gallery.length}
                  </div>
                </div>

                {/* Content Section - Perfectly Aligned */}
                <div className="relative bg-gradient-to-br from-[#f5f0ed] to-[#e8ddd8] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
                  <div className="p-6 md:p-10 lg:p-12 pb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6 md:space-y-8"
                    >
                      {/* Category Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-[#8666A5] to-[#9d7bb8] text-white shadow-md">
                          <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
                          {activeCaseStudy.category}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <div>
                        <h2 
                          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#8666A5] mb-3 leading-tight" 
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {activeCaseStudy.title}
                        </h2>
                        
                        {/* Decorative underline */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '80px' }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="h-1 bg-gradient-to-r from-[#8666A5] to-transparent rounded-full"
                        />
                      </div>

                      {/* Client */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8666A5] to-[#9d7bb8] flex items-center justify-center shadow-md">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-[#8666A5] font-semibold uppercase tracking-wider">Client</p>
                          <p className="text-lg md:text-xl font-bold text-[#6b4d7a]">
                            {activeCaseStudy.client}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[#8666A5]/10">
                        <p className="text-base md:text-lg text-[#6b4d7a] leading-relaxed">
                          {activeCaseStudy.description}
                        </p>
                      </div>

                      {/* Results Section */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8666A5] to-[#9d7bb8] flex items-center justify-center shadow-md">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                            </svg>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-[#8666A5]">
                            Campaign Results
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {activeCaseStudy.results.map((result, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-[#8666A5]/10 overflow-hidden"
                            >
                              {/* Gradient accent on hover */}
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8666A5] to-[#9d7bb8] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                              
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <p className="text-xs md:text-sm text-[#8666A5] font-semibold uppercase tracking-wider mb-1">
                                    {result.label}
                                  </p>
                                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#8666A5]/30 to-transparent rounded-full" />
                                </div>
                                <div 
                                  className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-[#8666A5] to-[#9d7bb8] bg-clip-text text-transparent" 
                                  style={{ fontFamily: 'Playfair Display, serif' }}
                                >
                                  {result.value}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
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