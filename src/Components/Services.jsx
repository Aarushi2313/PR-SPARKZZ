import React, { useState, useEffect, useRef } from "react";
import { scrollToSection } from '../utils/navigation.js';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isInView, setIsInView] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const ref = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setTimeout(() => setAnimationPhase(1), 200);
          setTimeout(() => setAnimationPhase(2), 600);
          setTimeout(() => setAnimationPhase(3), 1000);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Logo component using actual logo
  const LogoIcon = () => (
    <img 
      src="/logo.png" 
      alt="PR Sparkz Logo" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        // Fallback if logo doesn't load
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='logoGradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%238B5CF6'/%3E%3Cstop offset='100%25' stop-color='%237C3AED'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='45' fill='url(%23logoGradient)'/%3E%3Ctext x='50' y='58' text-anchor='middle' fill='white' font-size='24' font-family='Arial, sans-serif' font-weight='bold'%3EPR%3C/text%3E%3C/svg%3E";
      }}
    />
  );

  // Service images - Local paths
  // Add your images to public/images/services/ folder
  // Supported formats: .jpg, .png
  const serviceImages = {
    campaign: "/images/services/campaign.jpg",
    social: "/images/services/social.jpg",
    influencer: "/images/services/influencer.jpg",
    celebrity: "/images/services/celebrity.jpg",
    website: "/images/services/website.jpg",
    digital: "/images/services/digital.jpg",
    offline: "/images/services/offline.jpg",
    ai: "/images/services/ai.jpg"
  };

  // State to track image loading errors
  const [imageErrors, setImageErrors] = useState({});

  // Handle image error
  const handleImageError = (serviceId) => {
    setImageErrors(prev => ({ ...prev, [serviceId]: true }));
  };

  // Services data - simplified
  const services = [
    { 
      id: 1, 
      title: "Campaign Planning", 
      desc: "Data-backed campaigns tailored to your audience.",
      image: serviceImages.campaign,
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      stats: { metric1: "+250%", label1: "ROI", metric2: "+180%", label2: "Engagement" }
    },
    { 
      id: 2, 
      title: "Social Media", 
      desc: "Complete social media management.",
      image: serviceImages.social,
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      stats: { metric1: "+320%", label1: "Engagement", metric2: "+150%", label2: "Growth" }
    },
    { 
      id: 3, 
      title: "Influencer Marketing", 
      desc: "Build trust through niche influencers.",
      image: serviceImages.influencer,
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      stats: { metric1: "+400%", label1: "Reach", metric2: "+275%", label2: "Trust" }
    },
    { 
      id: 4, 
      title: "Celebrity Branding", 
      desc: "Strategic partnerships for mass reach.",
      image: serviceImages.celebrity,
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      stats: { metric1: "+500%", label1: "Awareness", metric2: "+300%", label2: "Credibility" }
    },
    { 
      id: 5, 
      title: "Web Development", 
      desc: "User-centric, optimized websites.",
      image: serviceImages.website,
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      stats: { metric1: "+350%", label1: "Conversions", metric2: "+220%", label2: "Engagement" }
    },
    { 
      id: 6, 
      title: "Digital Marketing", 
      desc: "SEO, ads, and funnel strategies.",
      image: serviceImages.digital,
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      stats: { metric1: "+300%", label1: "ROAS", metric2: "+240%", label2: "Leads" }
    },
    { 
      id: 7, 
      title: "Offline Marketing", 
      desc: "Events and brand experiences.",
      image: serviceImages.offline,
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      stats: { metric1: "+200%", label1: "Recall", metric2: "+165%", label2: "Coverage" }
    },
    { 
      id: 8, 
      title: "AI Solutions", 
      desc: "Predictive analysis and optimization.",
      image: serviceImages.ai,
      colorFrom: "#8666A5",
      colorTo: "#b39ddb",
      stats: { metric1: "+450%", label1: "Efficiency", metric2: "+280%", label2: "Accuracy" }
    }
  ];

  // Mouse tracking for cursor effects
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Auto-rotate services
  useEffect(() => {
    if (isHovered || hoveredCard !== null) return;
    
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovered, hoveredCard, services.length]);

  return (
    <section 
      id="services" 
      className="min-h-screen pb-12 md:pb-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 text-slate-800 overflow-hidden relative"
      ref={ref}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{ 
        fontFamily: "'Montserrat', sans-serif",
        paddingTop: 'clamp(5rem, 10vh, 7rem)'
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-purple-100/20"></div>
        
        {/* Sparkle Elements */}
        <div className="absolute top-20 left-4 md:left-10 w-6 h-6 opacity-40">
          <div className="spark-shape animate-spark-twinkle-1" style={{ backgroundColor: '#b39ddb' }}></div>
        </div>
        <div className="absolute top-40 right-4 md:right-20 w-4 h-4 opacity-50">
          <div className="spark-shape animate-spark-twinkle-2" style={{ backgroundColor: '#c7b3e5' }}></div>
        </div>
      </div>

      {/* Custom cursor - desktop only */}
      {!isMobile && (
        <div
          className="fixed w-6 h-6 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${cursorVariant === 'cardHover' ? '2' : cursorVariant === 'ctaHover' ? '3' : '1'})`,
            backgroundColor: cursorVariant === 'ctaHover' ? '#8666A5' : '#8666A5',
            opacity: cursorVariant === 'default' ? '0.3' : '0.5',
            mixBlendMode: 'difference',
          }}
        />
      )}

      {/* Floating image preview for desktop */}
      {!isMobile && hoveredCard !== null && !imageErrors[services[hoveredCard]?.id] && (
        <div 
          className="fixed w-80 h-56 rounded-2xl overflow-hidden shadow-2xl z-50 pointer-events-none transition-all duration-300 transform"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 140,
            opacity: hoveredCard !== null ? 1 : 0,
            transform: `translate(${hoveredCard !== null ? '0' : '20px'}, ${hoveredCard !== null ? '0' : '20px'}) scale(${hoveredCard !== null ? '1' : '0.9'})`
          }}
        >
          <div className="relative w-full h-full">
            <img 
              src={services[hoveredCard]?.image} 
              alt={services[hoveredCard]?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-bold text-lg mb-1">{services[hoveredCard]?.title}</h4>
              <p className="text-white/90 text-sm line-clamp-2">{services[hoveredCard]?.desc}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Simplified */}
        <div 
          className={`text-center mb-12 md:mb-16 transform transition-all duration-1000 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div 
            className={`inline-block mb-4 transform transition-all duration-800 delay-200 ${
              animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <span className="px-4 py-1.5 text-xs rounded-full font-semibold tracking-wider uppercase"
              style={{
                background: 'linear-gradient(135deg, #f8f6ff, #f3e8ff)',
                color: '#6b4d7a',
                border: '1px solid rgba(179, 157, 219, 0.5)'
              }}
            >
              Brand Growth Solutions
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span 
              className={`block transform transition-all duration-1000 delay-300 ${
                animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Our <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(135deg, #8666A5, #b39ddb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Services</span>
            </span>
          </h1>
          
          <p 
            className={`text-base text-slate-600 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-700 ${
              animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Complete digital marketing solutions to grow your brand
          </p>
        </div>

        {/* Service cards grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl overflow-hidden ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                  minHeight: '420px'
                }}
                onMouseEnter={() => {
                  if (!isMobile) {
                    setActiveService(index);
                    setHoveredCard(index);
                    setCursorVariant("cardHover");
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setHoveredCard(null);
                    setCursorVariant("default");
                  }
                }}
                onClick={() => isMobile && setActiveService(index)}
              >
                {/* Hover gradient overlay */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo})` }}
                />

                {/* Image Section - Top Half with Enhanced Effects */}
                <div className="relative h-48 overflow-hidden">
                  {imageErrors[service.id] ? (
                    // "Coming Soon" fallback when image fails to load
                    <div 
                      className="w-full h-full flex flex-col items-center justify-center text-white"
                      style={{ 
                        background: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo})` 
                      }}
                    >
                      <div className="text-center px-4">
                        <svg 
                          className="w-16 h-16 mx-auto mb-3 opacity-70" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                          />
                        </svg>
                        <div className="text-xl font-bold mb-1">Coming Soon</div>
                        <div className="text-sm opacity-90">Image will be added</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={() => handleImageError(service.id)}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                    </>
                  )}

                  {/* PR Sparkz Logo - Top Right Corner */}
                  <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-all duration-500">
                    <div className="bg-white/90 rounded-lg p-2 shadow-lg border border-white/60">
                      <LogoIcon />
                    </div>
                    {/* Logo glow effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500 rounded-lg"
                      style={{ background: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo})` }}
                    ></div>
                  </div>

                  {/* Enhanced hover effect overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo})` }}
                  />
                </div>

                {/* Content Section - Bottom Half */}
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-slate-900 transition-all duration-300 transform group-hover:translate-x-1">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 group-hover:text-slate-700 mb-6 leading-relaxed transition-all duration-300">
                    {service.desc}
                  </p>

                  {/* Enhanced Stats with original hover effects */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/90 group-hover:bg-white/95 rounded-xl text-center shadow-sm border border-white/40 group-hover:border-white/60 group-hover:shadow-md transition-all duration-300 transform group-hover:scale-105">
                      <div 
                        className="text-lg font-bold bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300"
                        style={{ 
                          background: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {service.stats.metric1}
                      </div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-600 font-semibold uppercase tracking-wide mt-1 transition-colors duration-300">
                        {service.stats.label1}
                      </div>
                    </div>
                    <div className="p-3 bg-white/90 group-hover:bg-white/95 rounded-xl text-center shadow-sm border border-white/40 group-hover:border-white/60 group-hover:shadow-md transition-all duration-300 transform group-hover:scale-105">
                      <div 
                        className="text-lg font-bold bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300"
                        style={{ 
                          background: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {service.stats.metric2}
                      </div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-600 font-semibold uppercase tracking-wide mt-1 transition-colors duration-300">
                        {service.stats.label2}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Active indicator with pulse effect */}
                {activeService === index && (
                  <>
                    <div 
                      className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl transform transition-all duration-600 ${
                        isInView ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      style={{ 
                        background: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo})`,
                        transformOrigin: 'left center'
                      }}
                    />
                    {/* Pulsing border effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl border-2 opacity-30 animate-pulse"
                      style={{
                        borderImage: `linear-gradient(135deg, ${service.colorFrom}, ${service.colorTo}) 1`,
                        animation: 'pulse-border 2s infinite'
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Results section */}
        <div 
          className={`mt-12 md:mt-16 transform transition-all duration-1000 delay-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "500+", label: "Projects" },
              { value: "98%", label: "Success" },
              { value: "95%", label: "Retention" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div 
                key={index}
                className={`p-4 bg-white/80 rounded-xl text-center shadow-lg border border-white/30 backdrop-blur-sm hover:scale-105 transition-all duration-400 transform ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${1200 + index * 100}ms` }}
              >
                <div 
                  className="text-2xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #8666A5, #b39ddb)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div 
          className={`text-center mt-12 md:mt-16 transform transition-all duration-1000 delay-1400 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <h4 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
              Ready to Transform Your Brand?
            </h4>
            
            <button 
              className="group relative px-8 py-4 bg-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{
                color: '#8666A5',
                border: '2px solid #8666A5'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  setCursorVariant("ctaHover");
                  e.currentTarget.style.backgroundColor = '#8666A5';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  setCursorVariant("default");
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#8666A5';
                }
              }}
              onClick={() => scrollToSection('contact', 80)}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Get Started Today</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        .spark-shape {
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
        
        @keyframes spark-twinkle-1 {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes spark-twinkle-2 {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.5); }
        }

        @keyframes pulse-border {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }
        
        .animate-spark-twinkle-1 {
          animation: spark-twinkle-1 4s ease-in-out infinite;
        }
        .animate-spark-twinkle-2 {
          animation: spark-twinkle-2 5s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Performance Optimization */
        @media (prefers-reduced-motion: reduce) {
          .animate-spark-twinkle-1,
          .animate-spark-twinkle-2 {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;



