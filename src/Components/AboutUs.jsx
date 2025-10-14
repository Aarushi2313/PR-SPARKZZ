import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Award, 
  Handshake, 
  Share2, 
  Users, 
  Newspaper, 
  Target,
  TrendingUp,
  Sparkles
} from "lucide-react";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showPolaroids, setShowPolaroids] = useState(false);
  const [counters, setCounters] = useState({
    retention: 0,
    roi: 0,
    audience: 0,
    projects: 0
  });
  
  const sectionRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setIsVisible(true);
          // Trigger polaroids after a short delay
          setTimeout(() => {
            setShowPolaroids(true);
          }, 800);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;
    
    const animateCounters = () => {
      const duration = 2000;
      const targets = { retention: 98, roi: 347, audience: 50, projects: 250 };
      const steps = 60;
      const stepDuration = duration / steps;
      
      let current = { retention: 0, roi: 0, audience: 0, projects: 0 };
      
      const timer = setInterval(() => {
        let allReached = true;
        
        Object.keys(targets).forEach(key => {
          if (current[key] < targets[key]) {
            const increment = targets[key] / steps;
            current[key] = Math.min(current[key] + increment, targets[key]);
            allReached = false;
          }
        });
        
        setCounters({ 
          retention: Math.floor(current.retention),
          roi: Math.floor(current.roi),
          audience: Math.floor(current.audience),
          projects: Math.floor(current.projects)
        });
        
        if (allReached) clearInterval(timer);
      }, stepDuration);
      
      return () => clearInterval(timer);
    };

    const timer = setTimeout(animateCounters, 300);
    return () => clearTimeout(timer);
  }, [isIntersecting]);

  useEffect(() => {
    if (!isIntersecting) return;
    
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, [isIntersecting]);

  const features = [
    {
      icon: Rocket,
      title: "Startup Launch Specialists",
      description: "We specialize in launching startups and building them into recognizable, scalable brands from the ground up.",
      gradient: "from-purple-400 to-purple-500",
      target: "case-studies"
    },
    {
      icon: Award,
      title: "Brand Building",
      description: "From defining visual identity to building online and offline presence, we create lasting brand impact.",
      gradient: "from-purple-500 to-purple-600",
      target: "services"
    },
    {
      icon: Handshake,
      title: "Growth Partnership",
      description: "We believe in 'You Grow, We Grow' - your success is our success in this collaborative journey.",
      gradient: "from-purple-600 to-purple-700",
      target: "contact"
    }
  ];

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="pb-12 md:pb-24 bg-gradient-to-br from-gray-50 via-purple-50 to-purple-100 relative overflow-hidden"
      style={{ 
        paddingTop: 'clamp(7rem, 20vw, 10rem)', // Significantly increased padding top for mobile
        scrollMarginTop: '100px', // Increased scroll margin for better navigation
        marginTop: '0', // Ensure no negative margins
        fontFamily: "'Montserrat', sans-serif"
      }}
      aria-label="About PR Sparkz"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute top-10 left-2 md:left-10 w-16 h-16 md:w-32 md:h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute top-32 right-2 md:right-20 w-12 h-12 md:w-24 md:h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float-delayed"></div>
      <div className="absolute bottom-40 left-1/4 w-16 h-16 md:w-28 md:h-28 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 md:w-16 md:h-16 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      
      {/* Polaroids - scattered randomly with pins and tape - Enhanced with varying sizes - Hidden on mobile/tablet */}
      <AnimatePresence>
        {showPolaroids && (
          <div className="absolute inset-0 pointer-events-none z-5 hidden xl:block">
            {[
              // Large polaroids - positioned at edges to avoid content overlap
              { id: 1, rotation: -12, delay: 0.1, left: '2%', top: '8%', size: 'large', pinType: 'pin', label: 'Creativity', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop' },
              { id: 2, rotation: 8, delay: 0.25, left: '92%', top: '5%', size: 'large', pinType: 'tape', label: 'Innovation', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop' },
              { id: 3, rotation: -5, delay: 0.4, left: '1%', top: '82%', size: 'large', pinType: 'tape', label: 'Strategy', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop' },
              { id: 4, rotation: 15, delay: 0.55, left: '93%', top: '78%', size: 'large', pinType: 'pin', label: 'Impact', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop' },
              
              // Medium polaroids - carefully positioned to avoid overlap
              { id: 5, rotation: -8, delay: 0.7, left: '1%', top: '35%', size: 'medium', pinType: 'pin', label: 'Growth', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop' },
              { id: 6, rotation: 6, delay: 0.85, left: '94%', top: '92%', size: 'medium', pinType: 'tape', label: 'Results', image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&h=500&fit=crop' },
              { id: 7, rotation: -10, delay: 0.95, left: '3%', top: '58%', size: 'medium', pinType: 'pin', label: 'Success', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=500&fit=crop' },
              { id: 8, rotation: 12, delay: 1.05, left: '92%', top: '38%', size: 'medium', pinType: 'tape', label: 'Vision', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop' },
              
              // Small polaroids - edge placement
              { id: 9, rotation: -6, delay: 1.15, left: '4%', top: '22%', size: 'small', pinType: 'tape', label: 'Team', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop' },
              { id: 10, rotation: 9, delay: 1.25, left: '91%', top: '18%', size: 'small', pinType: 'pin', label: 'Ideas', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop' },
              { id: 11, rotation: -14, delay: 1.35, left: '2%', top: '68%', size: 'small', pinType: 'pin', label: 'Launch', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop' },
              { id: 12, rotation: 7, delay: 1.45, left: '93%', top: '58%', size: 'small', pinType: 'tape', label: 'Digital', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=400&fit=crop' },
            ].map(polaroid => {
              // Define size dimensions based on size property
              const sizeMap = {
                large: { width: '160px', height: '190px', padding: '10px', paddingBottom: '32px', fontSize: '9px' },
                medium: { width: '130px', height: '155px', padding: '9px', paddingBottom: '28px', fontSize: '8px' },
                small: { width: '100px', height: '120px', padding: '7px', paddingBottom: '22px', fontSize: '7px' }
              };
              
              const dimensions = sizeMap[polaroid.size] || sizeMap.medium;
              
              return (
                <motion.div
                  key={polaroid.id}
                  className="absolute bg-white shadow-2xl"
                  style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    padding: dimensions.padding,
                    paddingBottom: dimensions.paddingBottom,
                    left: polaroid.left,
                    top: polaroid.top,
                  }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0, 
                    rotate: polaroid.rotation - 90,
                    y: -100,
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: polaroid.rotation,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    delay: polaroid.delay,
                    duration: 0.7,
                    type: 'spring',
                    stiffness: 120,
                    damping: 12,
                    y: {
                      duration: 2.5 + Math.random() * 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: polaroid.delay + 1,
                    }
                  }}
                >
                  <div className="w-full h-full overflow-hidden rounded-sm">
                    <img 
                      src={polaroid.image} 
                      alt={polaroid.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Pin or Tape effect based on type - Enhanced for better visibility */}
                  {polaroid.pinType === 'pin' ? (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                      {/* Pin shadow */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full opacity-20 blur-sm"></div>
                      {/* Pin head - larger and more prominent */}
                      <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg border-2 border-red-700 relative">
                        {/* Highlight on pin */}
                        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                      </div>
                      {/* Pin needle - thicker */}
                      <div className="w-1 h-5 bg-gradient-to-b from-gray-400 to-gray-600 mx-auto shadow-sm"></div>
                    </div>
                  ) : (
                    <>
                      {/* Tape pieces - enhanced with texture and multiple strips */}
                      {/* Left tape strip */}
                      <div 
                        className="absolute -top-3 left-1/4 w-12 h-5 bg-gradient-to-b from-yellow-50 to-yellow-100 opacity-80 shadow-md border-t border-b border-yellow-200"
                        style={{ 
                          transform: `rotate(${polaroid.rotation * 0.3}deg)`,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                        }}
                      >
                        {/* Tape texture lines */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="h-px bg-yellow-300 mt-1"></div>
                          <div className="h-px bg-yellow-300 mt-1"></div>
                          <div className="h-px bg-yellow-300 mt-1"></div>
                        </div>
                      </div>
                      {/* Right tape strip */}
                      <div 
                        className="absolute -top-3 right-1/4 w-10 h-5 bg-gradient-to-b from-yellow-50 to-yellow-100 opacity-80 shadow-md border-t border-b border-yellow-200"
                        style={{ 
                          transform: `rotate(${-polaroid.rotation * 0.4}deg)`,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                        }}
                      >
                        {/* Tape texture lines */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="h-px bg-yellow-300 mt-1"></div>
                          <div className="h-px bg-yellow-300 mt-1"></div>
                          <div className="h-px bg-yellow-300 mt-1"></div>
                        </div>
                      </div>
                      {/* Center tape piece for extra hold */}
                      <div 
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-yellow-50 to-yellow-100 opacity-75 shadow-sm border-t border-b border-yellow-200"
                        style={{ 
                          transform: `translateX(-50%) rotate(${polaroid.rotation * 0.2}deg)`,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                        }}
                      >
                        {/* Tape texture lines */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="h-px bg-yellow-300 mt-0.5"></div>
                          <div className="h-px bg-yellow-300 mt-0.5"></div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Handwritten style text at bottom */}
                  <div 
                    className="absolute bottom-1 left-0 right-0 text-center text-gray-600 font-handwriting"
                    style={{ fontFamily: 'cursive', fontSize: dimensions.fontSize }}
                  >
                    {polaroid.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section - Added more top margin for mobile */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-3 md:mb-4 mt-4 md:mt-0">
            <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase shadow-md" style={{background: 'linear-gradient(to right, #64419a, #553c8b)'}}>
              About PR Sparkz
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 mt-2">
            <span className="bg-gradient-to-r from-gray-800 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight" style={{background: 'linear-gradient(to right, #1f2937, #64419a, #553c8b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Building Iconic Brands
            </span>
          </h1>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto mb-6 md:mb-8 rounded-full" style={{background: 'linear-gradient(to right, #8b5cf6, #64419a)'}}></div>
          <p className="text-sm md:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light px-2 md:px-0">
            At PR Sparkz, we specialize in launching startups and building them into recognizable, scalable brands. 
            From defining visual identity to building online and offline presence, our approach blends creativity, 
            strategy, and real-time execution.
          </p>
          <div className="mt-4 md:mt-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            <span className="text-xl md:text-2xl lg:text-3xl font-bold" style={{background: 'linear-gradient(to right, #a78bfa, #64419a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>We believe — You Grow, We Grow.</span>
          </div>
        </div>

        {/* Main Content Grid - Two-column layout for founder and services, full-width for Why Choose Us */}
        <div className="space-y-8 md:space-y-12 mb-12 md:mb-20">
          {/* Top Row: Founder + Services */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
            {/* Left Column - Founder Section */}
            <div className={`relative transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="space-y-4 md:space-y-6">
                {/* Founder Card */}
                <motion.div 
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg md:shadow-xl border border-gray-100 relative overflow-hidden mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -translate-y-8 md:-translate-y-12 translate-x-8 md:translate-x-12 opacity-60"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col items-center text-center">
                      {/* Founder Image with actual photo */}
                      <motion.div 
                        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full mb-3 md:mb-4 overflow-hidden border-4 border-white shadow-lg relative" 
                        style={{background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)'}}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src="/PR-FD.jpeg"
                          alt="Priyanka Khandelwal - Founder of PR Sparkz" 
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center hidden" style={{background: 'linear-gradient(135deg, #a78bfa, #64419a)'}}>
                          <span className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">PK</span>
                        </div>
                      </motion.div>
                      
                      <div className="space-y-1 md:space-y-2">
                        <motion.h2 
                          className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800"
                          initial={{ opacity: 0 }}
                          animate={isVisible ? { opacity: 1 } : {}}
                          transition={{ delay: 0.6 }}
                        >
                          Priyanka Khandelwal
                        </motion.h2>
                        <motion.p 
                          className="text-purple-600 text-sm md:text-base font-medium flex items-center justify-center gap-2" 
                          style={{color: '#64419a'}}
                          initial={{ opacity: 0 }}
                          animate={isVisible ? { opacity: 1 } : {}}
                          transition={{ delay: 0.7 }}
                        >
                          <Award size={16} />
                          Founder & Brand Strategist
                        </motion.p>
                        <motion.div 
                          className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto my-2 rounded-full" 
                          style={{background: 'linear-gradient(to right, #8b5cf6, #64419a)'}}
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: "4rem" } : {}}
                          transition={{ delay: 0.8, duration: 0.5 }}
                        />
                        <motion.p 
                          className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-md"
                          initial={{ opacity: 0 }}
                          animate={isVisible ? { opacity: 1 } : {}}
                          transition={{ delay: 0.9 }}
                        >
                          "With over 5 years of experience in brand building, digital strategy, and public relations, 
                          I bring a dynamic vision to help startups and established businesses scale with innovative campaigns 
                          and authentic storytelling."
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Card */}
                <motion.div 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl md:rounded-2xl p-4 md:p-6 text-white shadow-lg md:shadow-xl" 
                  style={{background: 'linear-gradient(to right, #64419a, #553c8b)'}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className="text-xl md:text-2xl lg:text-3xl font-bold mb-1"
                        initial={{ scale: 0 }}
                        animate={isIntersecting ? { scale: 1 } : {}}
                        transition={{ delay: 1, type: "spring" }}
                      >
                        {counters.projects}+
                      </motion.div>
                      <div className="text-xs md:text-sm opacity-90">Startups Launched</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className="text-xl md:text-2xl lg:text-3xl font-bold mb-1"
                        initial={{ scale: 0 }}
                        animate={isIntersecting ? { scale: 1 } : {}}
                        transition={{ delay: 1.1, type: "spring" }}
                      >
                        {counters.retention}%
                      </motion.div>
                      <div className="text-xs md:text-sm opacity-90">Client Success Rate</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Services */}
            <div className={`transition-all duration-700 delay-400 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="space-y-4 md:space-y-6 mt-4">
                <div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Our Expertise</h2>
                  <p className="text-gray-700 mb-3 md:mb-4 leading-relaxed text-sm md:text-base lg:text-lg font-light">
                    We focus on comprehensive brand development that creates lasting impact in the market. 
                    Our integrated approach ensures consistent messaging across all touchpoints.
                  </p>
                  
                  {/* Services Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 md:mb-6">
                    {[
                      { icon: Share2, name: "Social Media Marketing", color: "purple", target: "services" },
                      { icon: Sparkles, name: "Influencer Marketing", color: "purple", target: "services" },
                      { icon: Newspaper, name: "PR & Offline Events", color: "purple", target: "services" },
                      { icon: Target, name: "Performance Marketing", color: "purple", target: "services" }
                    ].map((service, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 cursor-pointer group"
                        onClick={() => {
                          const targetSection = document.getElementById(service.target);
                          if (targetSection) {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                            {React.createElement(service.icon, { 
                              size: 18, 
                              className: "text-purple-600",
                              style: { color: '#64419a' }
                            })}
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-800 text-xs md:text-sm leading-tight">{service.name}</h4>
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base lg:text-lg font-light">
                    We combine brand storytelling with strategic launch campaigns to create memorable brand 
                    experiences that resonate with your target audience and drive measurable results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Section: Why Choose Us */}
          <div className={`transition-all duration-700 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <motion.div
              className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg border border-purple-100"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Why Choose Us - Modern Bento Grid Design */}
              <div className="space-y-4">
                {/* Section Header */}
                <div className="text-center mb-6">
                  <motion.div
                    className="inline-flex items-center gap-2 mb-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg" style={{background: 'linear-gradient(135deg, #8b5cf6, #64419a)'}}>
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-xl md:text-2xl">
                      Why Choose PR Sparkz
                    </h3>
                  </motion.div>
                  <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                    Three core pillars that make us your ideal brand growth partner
                  </p>
                </div>

                {/* Interactive Grid Cards */}
                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    const isActive = activeFeature === index;
                    
                    return (
                      <motion.div
                        key={index}
                        className="group relative"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        onMouseEnter={() => setActiveFeature(index)}
                        onClick={() => {
                          const targetSection = document.getElementById(feature.target);
                          if (targetSection) {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        {/* Card */}
                        <motion.div
                          className={`relative h-full bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-500 ${
                            isActive 
                              ? 'border-purple-400 shadow-2xl' 
                              : 'border-gray-200 shadow-md hover:border-purple-300 hover:shadow-xl'
                          }`}
                          whileHover={{ y: -8 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Gradient Background - Animated */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: index === 0 
                                ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.1))' 
                                : index === 1 
                                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(100, 65, 154, 0.1))' 
                                : 'linear-gradient(135deg, rgba(100, 65, 154, 0.1), rgba(85, 60, 139, 0.1))'
                            }}
                          />

                          {/* Icon Badge - Top Corner */}
                          <div className="absolute top-4 right-4 z-10">
                            <motion.div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{
                                background: index === 0 
                                  ? 'linear-gradient(135deg, #a78bfa, #8b5cf6)' 
                                  : index === 1 
                                  ? 'linear-gradient(135deg, #8b5cf6, #64419a)' 
                                  : 'linear-gradient(135deg, #64419a, #553c8b)'
                              }}
                              animate={isActive ? {
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                              } : {}}
                              transition={{ 
                                duration: isActive ? 3 : 0,
                                repeat: isActive ? Infinity : 0,
                                ease: "easeInOut"
                              }}
                            >
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </motion.div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10 p-6">
                            {/* Large Icon */}
                            <motion.div
                              className="mb-4"
                              animate={isActive ? {
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                              } : {}}
                              transition={{ 
                                duration: 2,
                                repeat: isActive ? Infinity : 0,
                                repeatDelay: 1
                              }}
                            >
                              <div 
                                className="inline-flex p-4 rounded-2xl shadow-lg"
                                style={{
                                  background: index === 0 
                                    ? 'linear-gradient(135deg, #a78bfa, #8b5cf6)' 
                                    : index === 1 
                                    ? 'linear-gradient(135deg, #8b5cf6, #64419a)' 
                                    : 'linear-gradient(135deg, #64419a, #553c8b)'
                                }}
                              >
                                <IconComponent size={32} className="text-white" />
                              </div>
                            </motion.div>

                            {/* Title */}
                            <h4 className="font-bold text-gray-800 text-lg md:text-xl mb-3 leading-tight">
                              {feature.title}
                            </h4>

                            {/* Description */}
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                              {feature.description}
                            </p>

                            {/* Action Link */}
                            <motion.div
                              className="flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all"
                              style={{color: '#64419a'}}
                              initial={{ x: 0 }}
                              animate={isActive ? { x: [0, 5, 0] } : {}}
                              transition={{ 
                                duration: 1.5,
                                repeat: isActive ? Infinity : 0,
                                repeatDelay: 0.5
                              }}
                            >
                              <span>Explore</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </motion.div>
                          </div>

                          {/* Bottom Accent Line */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: index === 0 
                                ? 'linear-gradient(to right, transparent, #a78bfa, transparent)' 
                                : index === 1 
                                ? 'linear-gradient(to right, transparent, #8b5cf6, transparent)' 
                                : 'linear-gradient(to right, transparent, #64419a, transparent)'
                            }}
                          />

                          {/* Hover Glow Effect */}
                          <div 
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4), transparent 70%)',
                              filter: 'blur(20px)'
                            }}
                          />
                        </motion.div>

                        {/* Active Indicator - Bottom Dots */}
                        <div className="flex justify-center mt-3">
                          <motion.div
                            className={`h-1 rounded-full transition-all duration-300 ${
                              isActive ? 'w-8 bg-purple-600' : 'w-1 bg-gray-300'
                            }`}
                            style={isActive ? {backgroundColor: '#64419a'} : {}}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom Stats Bar */}
                <motion.div
                  className="flex flex-wrap justify-center gap-6 md:gap-12 pt-6 mt-6 border-t border-purple-100"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 1.3 }}
                >
                  {[
                    { label: "Success Rate", value: "98%", icon: TrendingUp },
                    { label: "Avg ROI", value: "347%", icon: Target },
                    { label: "Happy Clients", value: "250+", icon: Handshake }
                  ].map((stat, index) => {
                    const StatIcon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.4 + index * 0.1 }}
                      >
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <StatIcon size={20} style={{color: '#64419a'}} />
                        </div>
                        <div>
                          <div className="text-xl md:text-2xl font-bold text-gray-800">{stat.value}</div>
                          <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Buttons - Moved below Why Choose Us */}
        <div className={`flex flex-col sm:flex-row gap-2 md:gap-3 justify-center mb-12 transition-all duration-700 delay-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2 }}
          >
            <Link 
              to="/team"
              className="group px-8 py-4 bg-gradient-to-r from-[#5F4B8B] to-[#7c3aed] text-white font-bold rounded-xl hover:from-[#4b366b] hover:to-[#5F4B8B] transition-all duration-300 flex items-center justify-center min-w-[200px] shadow-lg text-sm md:text-base text-center relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Users size={18} className="mr-2" />
                Meet Our Team
              </span>
              <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </Link>
          </motion.div>
          
          <motion.button 
            className="px-8 py-4 font-bold border-2 rounded-xl transition-all duration-300 flex items-center justify-center min-w-[200px] shadow group"
            style={{ 
              backgroundColor: 'white', 
              color: '#8666A5', 
              borderColor: '#8666A5' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8666A5';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#8666A5';
            }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.3 }}
          >
            <TrendingUp size={18} className="mr-2 group-hover:rotate-12 transition-transform" />
            Our Process
          </motion.button>
        </div>

        {/* Enhanced Stats Section */}
        <div className={`transition-all duration-700 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <motion.div 
            className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg md:shadow-xl border border-gray-100 relative overflow-hidden mt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 rounded-t-xl md:rounded-t-2xl" style={{background: 'linear-gradient(to right, #a78bfa, #64419a, #553c8b)'}}></div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-purple-100 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>
            
            <div className="text-center mb-6 md:mb-8 lg:mb-12 relative z-10">
              <motion.h2 
                className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Our Impact in Numbers
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto text-xs md:text-sm lg:text-base font-light px-2"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                These metrics represent our commitment to delivering exceptional results for every startup we work with.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {[
                { value: counters.retention, suffix: "%", label: "Client Success Rate", color: "purple", icon: TrendingUp },
                { value: counters.roi, suffix: "%", label: "Average ROI", color: "purple", icon: Target },
                { value: counters.audience, suffix: "M+", label: "Audience Reached", color: "purple", icon: Users },
                { value: counters.projects, suffix: "+", label: "Brands Transformed", color: "purple", icon: Sparkles }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="text-center group"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.5 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg md:rounded-xl p-3 md:p-4 mb-2 md:mb-3 group-hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Icon in corner */}
                      <div className="absolute top-2 right-2 text-purple-300 opacity-30">
                        <IconComponent size={24} />
                      </div>
                      
                      <motion.div 
                        className="text-lg md:text-2xl lg:text-3xl font-bold text-purple-600 mb-1"
                        style={{color: '#64419a'}}
                        initial={{ scale: 1 }}
                        animate={isIntersecting ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                      >
                        {stat.value}{stat.suffix}
                      </motion.div>
                      <div className="text-gray-600 font-medium text-xs md:text-sm">{stat.label}</div>
                    </motion.div>
                    <div className="w-full bg-purple-200 rounded-full h-1 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={isIntersecting ? { 
                          width: `${stat.label.includes('ROI') ? Math.min(stat.value / 3, 100) : stat.label.includes('Audience') ? Math.min(stat.value * 2, 100) : stat.label.includes('Brands') ? Math.min(stat.value / 2.5, 100) : stat.value}%`
                        } : {}}
                        transition={{ duration: 1.5, delay: 2 + index * 0.1, ease: "easeOut" }}
                        style={{ 
                          background: 'linear-gradient(to right, #8b5cf6, #64419a)'
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;