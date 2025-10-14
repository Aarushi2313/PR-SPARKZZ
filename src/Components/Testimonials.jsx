import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Users, 
  Calendar,
  TrendingUp,
  MessageCircle,
  Megaphone,
  BadgeCheck,
  Sparkles,
  User, // Generic user icon
  UserCheck, // Alternative user icon
  Venus, // Women icon
  Mars // Men icon
} from "lucide-react";
import { scrollToSection } from '../utils/navigation.js';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    { 
      id: 1,
      name: "Shikha Khandelwal", 
      role: "Founder",
      company: "BK Shikha",
      text: "My profile was completely transformed. Within a month, I experienced 4x growth and a massive increase in subscribers — all organic, without paid ads.",
  // avatar removed
      rating: 5,
      platform: "Social Media",
      stats: "4x growth",
      duration: "1 month",
      image: "/images/testimonials/bk-shikha.jpg",
      gender: "female" // Added gender field
    },
    { 
      id: 2,
      name: "Harsh Aggarwal", 
      role: "Co-founder",
      company: "Moon7 Silverhub",
      text: "Our offline events were managed with precision. From on-ground marketing to digital promotions, the reach and impact were outstanding.",
  // avatar removed
      rating: 5,
      platform: "Events & Marketing",
      stats: "Outstanding reach",
      duration: "Event series",
      image: "/images/testimonials/moon7-silverhub.jpg",
      gender: "male"
    },
    { 
      id: 3,
      name: "Sujata Chauhan", 
      role: "MD",
      company: "Vortex Splash",
      text: "Highly active and creative team. The marketing approach was smooth, effective, and results-driven.",
  // avatar removed
      rating: 5,
      platform: "Digital Marketing",
      stats: "Results-driven",
      duration: "Campaign",
      image: "/images/testimonials/vortex-splash.jpg",
      gender: "female"
    },
    { 
      id: 4,
      name: "Rohit Mehra", 
      role: "Founder",
      company: "TasteBuds Café",
      text: "The social media strategy completely changed our customer engagement. Within 6 weeks, footfall increased by 3x, and our online orders grew significantly.",
  // avatar removed
      rating: 5,
      platform: "Social Media",
      stats: "3x footfall increase",
      duration: "6 weeks",
      image: "/images/testimonials/tastebuds-cafe.jpg",
      gender: "male"
    },
    { 
      id: 5,
      name: "Neha Kapoor", 
      role: "Owner",
      company: "Aurora Jewellery",
      text: "The creative campaigns were flawless. From concept to execution, every detail was handled professionally, giving our brand a premium online presence.",
  // avatar removed
      rating: 5,
      platform: "Digital Marketing",
      stats: "Premium presence",
      duration: "Campaign series",
      image: "/images/testimonials/aurora-jewellery.jpg",
      gender: "female"
    },
    { 
      id: 6,
      name: "Vikram Singh", 
      role: "CEO",
      company: "GreenLeaf Organics",
      text: "The team brought fresh ideas and executed them with precision. Sales conversions increased, and our brand visibility across digital platforms skyrocketed.",
  // avatar removed
      rating: 5,
      platform: "Digital Marketing",
      stats: "Sales conversions up",
      duration: "Multi-platform",
      image: "/images/testimonials/greenleaf-organics.jpg",
      gender: "male"
    },
    { 
      id: 7,
      name: "Ayesha Reddy", 
      role: "Co-founder",
      company: "LuxeTreats Chocolates",
      text: "Their marketing approach is both innovative and practical. The engagement on our campaigns went through the roof, and customer feedback has been overwhelmingly positive.",
  // avatar removed
      rating: 5,
      platform: "Social Media",
      stats: "Engagement soared",
      duration: "Campaign series",
      image: "/images/testimonials/luxetreats-chocolates.jpg",
      gender: "female"
    },
  ];

  // Enhanced auto-rotate with pause/resume functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    
    const interval = setInterval(() => {
      setDirection(0);
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, testimonials.length]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const platformColors = {
    "Social Media": "linear-gradient(135deg, #8666A5 0%, #6b4d7a 100%)",
    "Events & Marketing": "linear-gradient(135deg, #b39ddb 0%, #8666A5 100%)",
    "Digital Marketing": "linear-gradient(135deg, #9b7ec4 0%, #8666A5 100%)"
  };

  const platformIcons = {
    "Social Media": MessageCircle,
    "Events & Marketing": Users,
    "Digital Marketing": Megaphone
  };

  const featuredVariants = {
    enter: (direction) => ({ 
      opacity: 0, 
      x: direction > 0 ? 100 : -100,
      scale: 0.95
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1]
      }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      scale: 1.05,
      transition: {
        duration: 0.4
      }
    })
  };

  // Avatar with only male or female Lucide icon
  const renderAvatar = (testimonial) => {
    const PlatformIcon = platformIcons[testimonial.platform];
    let GenderIcon = testimonial.gender === "female" ? Venus : Mars;
    let genderColor = testimonial.gender === "female" ? "text-pink-500" : "text-blue-500";
    return (
      <div className="relative group">
        <motion.div 
          className="w-20 h-20 rounded-xl flex items-center justify-center text-5xl bg-gradient-to-br from-white to-gray-50 shadow-lg relative overflow-hidden"
          style={{ border: '2px solid #e9d5ff' }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.3 }}
        >
          <GenderIcon size={40} className={genderColor} title={testimonial.gender === "female" ? "Woman" : "Man"} />
          {/* Platform icon overlay */}
          <div 
            className="absolute bottom-0 right-0 w-6 h-6 rounded-tl-lg flex items-center justify-center text-xs text-white"
            style={{ 
              background: platformColors[testimonial.platform] 
            }}
          >
            <PlatformIcon size={12} />
          </div>
        </motion.div>
        {/* Verified badge */}
        <motion.div 
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
          style={{ backgroundColor: '#10b981' }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
          title="Verified Client"
        >
          <Check size={12} />
        </motion.div>
      </div>
    );
  };

  // Grid avatar with only male or female Lucide icon
  const renderGridAvatar = (testimonial) => {
    let GenderIcon = testimonial.gender === "female" ? Venus : Mars;
    let genderColor = testimonial.gender === "female" ? "text-pink-500" : "text-blue-500";
    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <GenderIcon size={24} className={genderColor} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">{testimonial.name}</h4>
          <p className="text-xs text-slate-600">{testimonial.role}</p>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="testimonials" 
      className="pb-20 bg-gradient-to-br from-purple-50 via-white to-purple-50 text-slate-900 overflow-hidden relative"
      style={{ paddingTop: 'clamp(5rem, 10vh, 7rem)', fontFamily: "'Montserrat', sans-serif" }}
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div 
          className="absolute top-10 left-10 w-64 h-64 bg-purple-300 rounded-full filter blur-[120px]"
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200 rounded-full filter blur-[120px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Geometric patterns */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-4 border-purple-200/30 rounded-lg rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border-4 border-purple-300/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{backgroundColor: '#f3e8ff', color: '#6b4d7a'}}
          >
            <BadgeCheck size={16} className="mr-2" />
            TRUSTED BY OUR CLIENTS
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            What <span style={{background: 'linear-gradient(135deg, #8666A5, #b39ddb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Our Clients Say</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Our work speaks through the success of our clients.
          </motion.p>
        </motion.div>

        {/* Main Featured Testimonial */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Navigation Arrows */}
          <motion.button
            className="absolute left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-white transition-all duration-300 group"
            style={{ border: '1px solid #e9d5ff' }}
            onClick={handlePrev}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="transition-colors" style={{color: '#8666A5'}} />
          </motion.button>
          
          <motion.button
            className="absolute right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-white transition-all duration-300 group"
            style={{ border: '1px solid #e9d5ff' }}
            onClick={handleNext}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="transition-colors" style={{color: '#8666A5'}} />
          </motion.button>

          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={featuredVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl"
              style={{ border: '1px solid rgba(233, 213, 255, 0.5)' }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%)`,
                }}></div>
              </div>
              
              {/* Platform Gradient Bar */}
              <div 
                className="absolute top-0 left-0 w-full h-2"
                style={{ 
                  background: platformColors[testimonials[activeIndex].platform] 
                }}
              />
              
              <div className="flex flex-col lg:flex-row items-start gap-8 relative z-10">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                  {renderAvatar(testimonials[activeIndex])}
                  
                  {/* Name and Company Badge */}
                  <motion.div 
                    className="mt-4 px-4 py-2 rounded-lg bg-white border-2 font-semibold text-sm text-center shadow-lg"
                    style={{ 
                      borderColor: '#8666A5',
                      color: '#6b4d7a'
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="font-bold text-base" style={{ color: '#8666A5' }}>
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </div>
                  </motion.div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  {/* Rating and Stats */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.3, rotate: 10 }}
                          transition={{ duration: 0.1 }}
                        >
                          <Star size={20} className="text-amber-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      style={{backgroundColor: '#f3e8ff', color: '#6b4d7a', border: '1px solid #e9d5ff'}}
                    >
                      <TrendingUp size={14} />
                      {testimonials[activeIndex].stats}
                    </motion.div>
                    
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Calendar size={14} />
                      {testimonials[activeIndex].duration}
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <motion.blockquote 
                    className="text-lg md:text-xl lg:text-2xl font-light text-slate-800 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    "{testimonials[activeIndex].text}"
                  </motion.blockquote>
                </div>
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: index === activeIndex ? '#8666A5' : '#e9d5ff',
                      transform: index === activeIndex ? 'scale(1.1)' : 'scale(1)'
                    }}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`View testimonial from ${testimonials[index].name}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => {
            const PlatformIcon = platformIcons[testimonial.platform];
            
            return (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500"
                style={{ border: '1px solid #f3e8ff' }}
                onClick={() => goToSlide(index)}
              >
                {/* Platform Indicator */}
                <div 
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ background: platformColors[testimonial.platform] }}
                />
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-1" style={{ color: '#8666A5' }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                    <motion.div 
                      className="px-2 py-1 rounded text-xs font-semibold text-white shadow-sm flex items-center gap-1 flex-shrink-0 ml-2"
                      style={{ background: platformColors[testimonial.platform] }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <PlatformIcon size={10} />
                      {testimonial.platform}
                    </motion.div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={12} className="text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-slate-700 text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    "{testimonial.text}"
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold flex items-center gap-1" style={{color: '#8666A5'}}>
                      <TrendingUp size={10} />
                      {testimonial.stats}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar size={10} />
                      {testimonial.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg" style={{ border: '1px solid #e9d5ff' }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-slate-600 text-base mb-6 max-w-2xl mx-auto">
              Join our satisfied clients who have transformed their brand presence with proven strategies.
            </p>
            
            <motion.button 
              className="px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              style={{ 
                backgroundColor: 'white', 
                color: '#8666A5', 
                border: '2px solid #8666A5' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8666A5';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#8666A5';
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('contact', 80)}
            >
              Start Your Journey Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;