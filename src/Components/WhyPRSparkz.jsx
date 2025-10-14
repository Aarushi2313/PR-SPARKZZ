import React, { useState, useEffect, useRef } from "react";
import { scrollToSection } from '../utils/navigation.js';

const WhyPRSparkz = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStat, setActiveStat] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  // Auto-rotate statistics
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveStat(prev => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const stats = [
    {
      icon: (
        <svg className="w-8 h-8" style={{ color: '#8666A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "+127%",
      subtitle: "Growth in Engagement",
      description: "Strategic approach delivers measurable results",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
    },
    {
      icon: (
        <svg className="w-8 h-8" style={{ color: '#8666A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "+89%",
      subtitle: "Brand Consistency",
      description: "Unified messaging across all channels",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&q=80"
    },
    {
      icon: (
        <svg className="w-8 h-8" style={{ color: '#8666A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "3x",
      subtitle: "Faster Execution",
      description: "AI-powered campaign delivery",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80"
    }
  ];

  const features = [
    {
      title: "Data-Driven Insights",
      description: "Real-time analytics and predictive intelligence for informed decisions",
      icon: (
        <svg className="w-8 h-8" style={{ color: '#8666A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" />
          <circle cx="8" cy="13" r="1.5" fill="currentColor" />
          <circle cx="16" cy="8" r="1.5" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13L12 10M12 10L16 8" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80"
    },
    {
      title: "Multi-Platform Strategy",
      description: "Seamless integration across all digital and traditional channels",
      icon: (
        <svg className="w-8 h-8" style={{ color: '#8666A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21h8M12 17v4" />
          <rect x="13" y="7" width="6" height="4" rx="1" strokeWidth={1.5} fill="currentColor" opacity="0.2" />
          <rect x="5" y="7" width="6" height="4" rx="1" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 13v1M17 13v1" />
          <circle cx="8" cy="9" r="0.5" fill="currentColor" />
          <circle cx="16" cy="9" r="0.5" fill="currentColor" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&q=80"
    },
    {
      title: "Creative Excellence",
      description: "Award-winning design and compelling storytelling that resonates",
      icon: (
        <svg className="w-8 h-8" style={{ color: '#8666A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v8M8 12h8" />
          <circle cx="12" cy="12" r="3" strokeWidth={1.5} fill="currentColor" opacity="0.2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l1-1M7 7l-1-1M17 17l1 1M7 17l-1 1" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&q=80"
    },
    {
      title: "24/7 Support",
      description: "Continuous monitoring, optimization and dedicated support",
      icon: (
        <svg className="w-8 h-8" style={{ color: '#8666A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.34 6.34l1.41 1.41M16.25 16.25l1.41 1.41M6.34 17.66l1.41-1.41M16.25 7.75l1.41-1.41" opacity="0.5" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&q=80"
    }
  ];

  return (
    <section
      id="why-pr-sparkz"
      ref={sectionRef}
      className="pb-16 md:pb-24 bg-gradient-to-br from-gray-50 via-purple-50 to-purple-100 relative overflow-hidden"
      style={{ paddingTop: 'max(140px, calc(100px + 3rem))', fontFamily: "'Montserrat', sans-serif" }}
      aria-label="Why Choose PR Sparkz"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-2 md:left-10 w-16 h-16 md:w-32 md:h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-32 right-2 md:right-20 w-12 h-12 md:w-24 md:h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 md:w-28 md:h-28 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 md:w-16 md:h-16 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-300 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 20}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Why PR Sparkz Section */}
        <div className={`transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Enhanced Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)', border: '1px solid #e9d5ff' }}>
              <span className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: '#8666A5' }}></span>
              <span className="text-sm font-semibold" style={{ color: '#6b4d7a' }}>Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4" style={{ background: 'linear-gradient(135deg, #8666A5, #b39ddb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Transform Your Digital Presence
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl px-2 leading-relaxed font-light">
              We craft <span className="font-semibold" style={{ color: '#8666A5' }}>data-driven, AI-powered strategies</span> that spark visibility, growth, and engagement—because your brand's success is ours.
            </p>
            <div className="w-24 md:w-32 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(to right, #b39ddb, #8666A5)' }}></div>
          </div>

          {/* Interactive Statistics with Images */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20 items-center">
            {/* Image Showcase */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-64 md:h-80">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={stats[activeStat].image}
                alt={stats[activeStat].subtitle}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{stats[activeStat].title}</h3>
                <p className="text-xl mb-1">{stats[activeStat].subtitle}</p>
                <p className="text-sm" style={{ color: '#e9d5ff' }}>{stats[activeStat].description}</p>
              </div>

              {/* Image controls */}
              <div className="absolute top-6 right-6 flex space-x-2">
                {stats.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStat(index)}
                    aria-label={`View stat ${index + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStat === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveStat(index)}
                  className="group bg-white p-6 rounded-2xl shadow-lg border-2 transition-all duration-500 cursor-pointer"
                  style={{
                    borderColor: activeStat === index ? '#8666A5' : '#f3f4f6',
                    boxShadow: activeStat === index ? '0 20px 25px -5px rgba(134, 102, 165, 0.1), 0 10px 10px -5px rgba(134, 102, 165, 0.04)' : '',
                    transform: activeStat === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onMouseLeave={(e) => {
                    if (activeStat !== index) {
                      e.currentTarget.style.borderColor = '#f3f4f6';
                    }
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ 
                        background: activeStat === index 
                          ? 'linear-gradient(135deg, #8666A5, #b39ddb)' 
                          : 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
                        transform: activeStat === index ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      <div style={{ color: activeStat === index ? 'white' : '#8666A5' }}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                          {stat.title}
                        </h3>
                        <span 
                          className="text-xs font-semibold px-2 py-1 rounded-full transition-colors"
                          style={{
                            backgroundColor: activeStat === index ? '#f3e8ff' : '#f3f4f6',
                            color: activeStat === index ? '#6b4d7a' : '#4b5563'
                          }}
                        >
                          {stat.subtitle}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid with Images */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center rounded-2xl bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden"
                style={{ borderColor: '#f3f4f6' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e9d5ff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f3f4f6'}
              >
                {/* Feature Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Icon in top-left corner */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Feature Content */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-2 transition-colors group-hover:text-[#8666A5]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect line */}
                  <div className="w-0 group-hover:w-12 h-0.5 mx-auto mt-4 rounded-full transition-all duration-300" style={{ background: 'linear-gradient(to right, #b39ddb, #8666A5)' }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid lg:grid-cols-2">
                {/* Content */}
                <div className="p-8 md:p-12 lg:p-16">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Ready to Transform Your Digital Presence?
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Let's discuss how our data-driven strategies and proven methodologies can drive measurable results for your business.
                  </p>

                  <div className="space-y-4">
                    <button
                      onClick={() => scrollToSection('contact', 80)}
                      className="w-full md:w-auto font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center"
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
                    >
                      <span>Schedule Free Consultation</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>

                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      No commitment required • 30-minute session
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative min-h-64 lg:min-h-full">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Professional Consultation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-purple-600/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyPRSparkz;