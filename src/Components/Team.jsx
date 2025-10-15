import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Camera, 
  Film,
  Zap,
  Sparkles,
  Heart,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Award,
  Target,
  Layers,
  Code,
  Palette,
  TrendingUp,
  Users
} from 'lucide-react';

const Team = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  const [muted, setMuted] = useState({});
  const [showPolaroids, setShowPolaroids] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowPolaroids(true), 500);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Track image loading errors
  const [imageErrors, setImageErrors] = useState({});
  
  const handleImageError = (memberId, type = 'main') => {
    setImageErrors(prev => ({ ...prev, [`${memberId}-${type}`]: true }));
  };

  const teamMembers = [
    {
      id: 1,
      name: "Priyanka Ranjan",
      role: "Marketing Maestro",
      bio: "Strategic marketing wizard who turns brands into legends. When she's not crafting campaigns, she's probably plotting world domination through killer content.",
      skills: ["Brand Alchemy", "Campaign Wizardry", "ROI Sorcery"],
      image: "/images/team/priyanka.jpg",
      video: "/videos/team/priyanka.mp4",
      polaroids: [
        "/images/team/polaroids/priyanka-1.jpg",
        "/images/team/polaroids/priyanka-2.jpg"
      ],
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      funFact: "Can spot a trending hashtag from 10 miles away"
    },
    {
      id: 2,
      name: "Ankush Chaudhary",
      role: "Visual Visionary",
      bio: "Design superhero who makes pixels dance and colors sing. His designs don't just look good—they have personality and tell stories that stick.",
      skills: ["Pixel Perfection", "Color Wizardry", "Visual Storytelling"],
      image: "/images/team/ankush.jpg",
      video: "/videos/team/ankush.mp4",
      polaroids: [
        "/images/team/polaroids/ankush-1.jpg",
        "/images/team/polaroids/ankush-2.jpg"
      ],
      colorFrom: "#9b7ec4",
      colorTo: "#c7b3e5",
      funFact: "Dreams in Pantone colors"
    },
    {
      id: 3,
      name: "Bhawneet Singh",
      role: "3D Dreamweaver",
      bio: "Reality bender who builds impossible worlds before breakfast. If you can imagine it, he can make it exist in stunning 3D glory.",
      skills: ["Reality Bending", "3D Magic", "Virtual World Building"],
      image: "/images/team/bhawneet.jpg",
      video: "/videos/team/bhawneet.mp4",
      polaroids: [
        "/images/team/polaroids/bhawneet-1.jpg",
        "/images/team/polaroids/bhawneet-2.jpg"
      ],
      colorFrom: "#7556a1",
      colorTo: "#a890cc",
      funFact: "Once rendered a dragon that looked more real than reality"
    },
    {
      id: 4,
      name: "Shrey Sharma",
      role: "Digital Dynamo",
      bio: "Algorithm whisperer and engagement guru. He doesn't just follow trends—he creates them, then optimizes them for maximum impact.",
      skills: ["Algorithm Whispering", "Engagement Alchemy", "Growth Hacking"],
      image: "/images/team/shrey.jpg",
      video: "/videos/team/shrey.mp4",
      polaroids: [
        "/images/team/polaroids/shrey-1.jpg",
        "/images/team/polaroids/shrey-2.jpg"
      ],
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      funFact: "Can make anything go viral (except the common cold)"
    },
    {
      id: 5,
      name: "Prateek Balara",
      role: "Creative Chameleon",
      bio: "Multi-talented creative force who moves between design and video like a artistic ninja. His work doesn't just capture attention—it holds it hostage.",
      skills: ["Creative Shapeshifting", "Video Sorcery", "Multi-Format Magic"],
      image: "/images/team/prateek.jpg",
      video: "/videos/team/prateek.mp4",
      polaroids: [
        "/images/team/polaroids/prateek-1.jpg",
        "/images/team/polaroids/prateek-2.jpg"
      ],
      colorFrom: "#9b7ec4",
      colorTo: "#c7b3e5",
      funFact: "Edits videos in his sleep (literally)"
    }
  ];

  const toggleVideo = (memberId) => {
    if (activeVideo === memberId) {
      setActiveVideo(null);
    } else {
      setActiveVideo(memberId);
    }
  };

  const togglePlay = (memberId) => {
    setIsPlaying(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  const toggleMute = (memberId) => {
    setMuted(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  return (
    <section 
      ref={sectionRef}
      id="team"
      className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative overflow-hidden" 
      style={{ 
        fontFamily: "'Montserrat', sans-serif",
        paddingTop: 'clamp(7rem, 20vw, 10rem)',
        scrollMarginTop: '100px',
        background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #fdf4ff 100%)'
      }}
    >
      {/* UNBELIEVABLE Background - Polaroid Storm */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Polaroid Background */}
        <AnimatePresence>
          {showPolaroids && (
            <>
              {/* Floating Polaroids */}
              {[...Array(25)].map((_, i) => {
                const width = Math.random() * 120 + 80;
                const height = Math.random() * 150 + 100;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const rotation = Math.random() * 60 - 30;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute bg-white shadow-2xl border-4 border-white"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                      left: `${left}%`,
                      top: `${top}%`,
                      rotate: rotation
                    }}
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      y: -100 
                    }}
                    animate={{ 
                      opacity: 0.3,
                      scale: 1,
                      y: [0, -20, 0],
                      rotate: [rotation, rotation + 10, rotation]
                    }}
                    transition={{
                      delay: Math.random() * 2,
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className="w-full h-3/4 bg-gradient-to-br from-purple-200 via-lavender-200 to-purple-100" style={{ background: 'linear-gradient(135deg, #e9d5ff, #ddd6fe, #f3e8ff)' }}></div>
                    <div className="h-1/4 flex items-center justify-center">
                      <span className="text-xs font-handwriting" style={{ color: '#6b4d7a' }}>Team Magic</span>
                    </div>
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Animated Gradient Orbs */}
        <motion.div 
          className="absolute -top-60 -left-60 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(134, 102, 165, 0.3)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-60 -right-60 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(179, 157, 219, 0.2)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Modern Professional Header */}
        <motion.div 
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, type: "spring" }}
        >
          {/* Top Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6 shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, rgba(134, 102, 165, 0.1), rgba(179, 157, 219, 0.1))',
              border: '2px solid #e9d5ff'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" style={{ color: '#8666A5' }} />
            </motion.div>
            <span className="font-bold text-sm" style={{ color: '#6b4d7a' }}>Meet the Creative Powerhouse</span>
            <Users className="w-5 h-5" style={{ color: '#b39ddb' }} />
          </motion.div>
          
          {/* Main Title */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
              <motion.span 
                className="inline-block"
                style={{ 
                  background: 'linear-gradient(135deg, #8666A5, #b39ddb, #8666A5)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto'
                }}
                animate={{ 
                  backgroundPosition: ['0% center', '200% center', '0% center']
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Team
              </motion.span>
              {' '}
              <motion.span 
                className="inline-block"
                style={{ 
                  background: 'linear-gradient(135deg, #6b4d7a, #8666A5, #b39ddb)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto'
                }}
                animate={{ 
                  backgroundPosition: ['200% center', '0% center', '200% center']
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Sparkz
              </motion.span>
            </h1>
            
            {/* Animated Underline */}
            <motion.div 
              className="h-1.5 rounded-full mx-auto"
              style={{ 
                background: 'linear-gradient(90deg, #8666A5, #b39ddb, #8666A5)',
                backgroundSize: '200% auto'
              }}
              initial={{ width: 0 }}
              animate={isVisible ? { 
                width: '200px',
                backgroundPosition: ['0% center', '200% center', '0% center']
              } : {}}
              transition={{ 
                width: { delay: 0.6, duration: 0.8 },
                backgroundPosition: { duration: 3, repeat: Infinity }
              }}
            />
          </motion.div>
          
          {/* Description */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-medium">
              Where{' '}
              <motion.span 
                className="inline-block font-black px-3 py-1 rounded-lg"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(134, 102, 165, 0.15), rgba(179, 157, 219, 0.15))',
                  color: '#8666A5'
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                innovation
              </motion.span>
              {' '}meets{' '}
              <motion.span 
                className="inline-block font-black px-3 py-1 rounded-lg"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(134, 102, 165, 0.15), rgba(179, 157, 219, 0.15))',
                  color: '#8666A5'
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                execution
              </motion.span>
              {' '}and{' '}
              <motion.span 
                className="inline-block font-black px-3 py-1 rounded-lg"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(134, 102, 165, 0.15), rgba(179, 157, 219, 0.15))',
                  color: '#6b4d7a'
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                extraordinary results
              </motion.span>
              {' '}happen
            </p>
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            className="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden lg:block"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
              style={{ background: 'linear-gradient(135deg, #8666A5, #b39ddb)' }}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-12 top-1/2 transform -translate-y-1/2 hidden lg:block"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
              style={{ background: 'linear-gradient(135deg, #b39ddb, #8666A5)' }}
            >
              <Star className="w-8 h-8 text-white fill-current" />
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-0 left-1/4 w-2 h-2 rounded-full"
            style={{ background: '#8666A5' }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-3 h-3 rounded-full"
            style={{ background: '#b39ddb' }}
            animate={{ 
              scale: [1, 1.8, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>

        {/* Enhanced Team Grid - Professional Cards with Unique Design */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 80,
                    damping: 12
                  }
                }
              }}
              className="group relative"
            >
              {/* Main Professional Card */}
              <motion.div 
                className="relative bg-white rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  boxShadow: '0 20px 50px rgba(134, 102, 165, 0.15)',
                  border: '1px solid rgba(134, 102, 165, 0.1)'
                }}
                whileHover={{ 
                  y: -12,
                  boxShadow: '0 30px 70px rgba(134, 102, 165, 0.25)'
                }}
                onClick={() => toggleVideo(member.id)}
              >
                {/* Top Accent Bar */}
                <motion.div 
                  className="h-2"
                  style={{
                    background: `linear-gradient(90deg, ${member.colorFrom}, ${member.colorTo})`
                  }}
                  whileHover={{ height: '6px' }}
                />

                <div className="p-8">
                  {/* Header Section */}
                  <div className="flex items-start gap-6 mb-6">
                    {/* Avatar with Image */}
                    <div className="relative flex-shrink-0">
                      <motion.div 
                        className="w-28 h-28 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white"
                        whileHover={{ scale: 1.05, rotate: 3 }}
                      >
                        {!imageErrors[`${member.id}-main`] ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(member.id, 'main')}
                          />
                        ) : (
                          <div 
                            className="w-full h-full flex flex-col items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${member.colorFrom}15, ${member.colorTo}15)`
                            }}
                          >
                            <Users 
                              className="w-10 h-10 mb-1"
                              style={{ color: member.colorFrom }}
                            />
                            <span 
                              className="text-[10px] font-bold text-center px-2"
                              style={{ color: member.colorTo }}
                            >
                              Coming Soon
                            </span>
                          </div>
                        )}
                      </motion.div>
                      
                      {/* Status Badge */}
                      <motion.div
                        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${member.colorFrom}, ${member.colorTo})`
                        }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star className="w-5 h-5 text-white fill-current" />
                      </motion.div>
                    </div>

                    {/* Name and Role */}
                    <div className="flex-1 min-w-0">
                      <motion.h3 
                        className="text-2xl font-black text-gray-900 mb-2 leading-tight"
                        whileHover={{ color: member.colorFrom }}
                      >
                        {member.name}
                      </motion.h3>
                      
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${member.colorFrom}, ${member.colorTo})`
                        }}
                        whileHover={{ scale: 1.05, x: 5 }}
                      >
                        <Award className="w-4 h-4" />
                        {member.role}
                      </motion.div>
                      
                      {/* Fun Fact Chip */}
                      <motion.div
                        className="mt-3 flex items-center gap-2 text-xs font-semibold"
                        style={{ color: member.colorFrom }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Zap className="w-4 h-4" />
                        {member.funFact}
                      </motion.div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <motion.div 
                    className="mb-6 p-4 rounded-2xl"
                    style={{ 
                      background: 'linear-gradient(135deg, #faf7ff, #f5f0ff)',
                      border: '1px solid #e9d5ff'
                    }}
                  >
                    <p className="text-gray-700 leading-relaxed text-sm font-medium">
                      {member.bio}
                    </p>
                  </motion.div>

                  {/* Skills Section */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="w-5 h-5" style={{ color: member.colorFrom }} />
                      <span className="text-sm font-bold text-gray-900">Superpowers</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          className="px-3 py-2 bg-white rounded-xl text-xs font-bold text-center shadow-sm"
                          style={{
                            border: `2px solid ${member.colorTo}`,
                            color: member.colorFrom
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            y: -3,
                            backgroundColor: member.colorFrom,
                            color: 'white',
                            borderColor: member.colorFrom
                          }}
                          animate={{ 
                            y: [0, -3, 0],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: skillIndex * 0.3
                          }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Polaroids Mini Gallery - Single Image */}
                  <div className="flex gap-3 justify-center">
                    <motion.div
                      className="relative w-24 h-28 bg-white shadow-lg border-4 border-white rounded-lg overflow-hidden"
                      style={{ rotate: -3 }}
                      whileHover={{ 
                        scale: 1.3,
                        rotate: 0,
                        zIndex: 10
                      }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <img 
                        src={member.polaroids[0]} 
                        alt="" 
                        className="w-full h-4/5 object-cover"
                      />
                      <div className="h-1/5 flex items-center justify-center bg-white">
                        <Heart className="w-3 h-3 text-red-500 fill-current" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${member.colorFrom}, ${member.colorTo})`
                  }}
                />

                {/* Corner Decorations */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: member.colorTo, opacity: 0.2 }}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              </motion.div>

              {/* Floating Action Indicator */}
              <motion.div
                className="absolute -top-3 -right-3 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center z-20"
                style={{ 
                  background: `linear-gradient(135deg, ${member.colorFrom}, ${member.colorTo})`
                }}
                animate={{ 
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    '0 10px 30px rgba(134, 102, 165, 0.3)',
                    '0 15px 50px rgba(134, 102, 165, 0.5)',
                    '0 10px 30px rgba(134, 102, 165, 0.3)'
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity 
                }}
                whileHover={{ scale: 1.3, rotate: 360 }}
              >
                <Camera className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* UNBELIEVABLE Stats - Polaroid Style */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[
            { number: "5", label: "Creative Geniuses", emoji: "🧠" },
            { number: "∞", label: "Ideas Generated", emoji: "💡" },
            { number: "100+", label: "Projects Magicked", emoji: "✨" },
            { number: "50+", label: "Happy Clients", emoji: "😊" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              whileHover={{ scale: 1.1, y: -10 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-4 border-white text-center relative overflow-hidden">
                {/* Polaroid Tape */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-4 rounded-full shadow-md" style={{ background: 'linear-gradient(to right, #b39ddb, #f5c4d8)' }}></div>
                
                <motion.div 
                  className="text-4xl font-black mb-2"
                  style={{ background: 'linear-gradient(135deg, #8666A5, #f5c4d8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}
                </motion.div>
                
                <div className="flex items-center justify-center gap-2 text-gray-600 font-bold text-sm">
                  <span className="text-xl">{stat.emoji}</span>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple Professional CTA Section */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="text-center">
            {/* Clean Header with Subtle Line */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div 
                  className="h-px w-12 bg-gradient-to-r from-transparent to-purple-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                />
                <Sparkles className="w-6 h-6" style={{ color: '#8666A5' }} />
                <motion.div 
                  className="h-px w-12 bg-gradient-to-l from-transparent to-purple-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                />
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Let's Create Something Amazing
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ready to transform your brand? Our team is here to bring your vision to life.
              </p>
            </motion.div>

            {/* Two-Column Layout */}
            <motion.div
              className="grid md:grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3 }}
            >
              {/* Primary CTA */}
              <motion.button
                className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #8666A5, #b39ddb)',
                  boxShadow: '0 4px 20px rgba(134, 102, 165, 0.3)'
                }}
                whileHover={{ 
                  y: -3,
                  boxShadow: '0 8px 30px rgba(134, 102, 165, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Check if we're on the home page
                  if (location.pathname === '/') {
                    // Scroll to contact section on home page
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  } else {
                    // Navigate to home page with contact hash
                    navigate('/#contact');
                    // Scroll after navigation
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }
                }}
              >
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <Film className="w-5 h-5" />
                  Start Your Project
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%', skewX: -20 }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                className="group px-8 py-4 rounded-xl font-semibold border-2 transition-all cursor-pointer"
                style={{
                  borderColor: '#8666A5',
                  color: '#8666A5',
                  background: 'white'
                }}
                whileHover={{ 
                  y: -3,
                  backgroundColor: '#f9f5ff',
                  boxShadow: '0 4px 20px rgba(134, 102, 165, 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Check if we're on the home page
                  if (location.pathname === '/') {
                    // Scroll to contact section on home page
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      // Focus on phone input after scrolling
                      setTimeout(() => {
                        const phoneInput = document.querySelector('input[type="tel"]') || document.querySelector('input[name="phone"]');
                        if (phoneInput) phoneInput.focus();
                      }, 800);
                    }
                  } else {
                    // Navigate to home page with contact hash
                    navigate('/#contact');
                    // Scroll after navigation
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Focus on phone input
                        setTimeout(() => {
                          const phoneInput = document.querySelector('input[type="tel"]') || document.querySelector('input[name="phone"]');
                          if (phoneInput) phoneInput.focus();
                        }, 300);
                      }
                    }, 100);
                  }
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Schedule a Call
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8666A5' }} />
                <span>50+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#b39ddb' }} />
                <span>24/7 Support</span>
              </div>
              {/* <div className="flex items-center gap-2"> */}
                {/* <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c7b3e5' }} /> */}
                {/* <span>Fast Delivery</span> */}
              {/* </div> */}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Camera Icons */}
      <motion.div
        className="absolute top-20 left-20 w-12 h-12"
        style={{ color: 'rgba(134, 102, 165, 0.2)' }}
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 360]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Camera className="w-full h-full" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 right-20 w-10 h-10"
        style={{ color: 'rgba(179, 157, 219, 0.15)' }}
        animate={{ 
          y: [0, 20, 0],
          rotate: [360, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <Camera className="w-full h-full" />
      </motion.div>
    </section>
  );
};

export default Team;