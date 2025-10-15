import React, { useState, useEffect } from 'react';

const SparkzHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
 return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 xs:pt-24 sm:pt-32 md:pt-40 relative overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ minHeight: '100%', minWidth: '100%' }}
        >
          <source src="/Digital Marketing Services - Promo Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to make text more readable */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Main Headline (hidden visually but space preserved) */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 opacity-0 pointer-events-none" aria-hidden="true">
            <div>You Grow,</div>
            <div className="bg-clip-text text-transparent" style={{ 
              background: 'linear-gradient(135deg, #8666A5, #b39ddb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              We Grow
            </div>
          </h1>

          {/* Subheadline (hidden visually but space preserved) */}
          <p className="text-xl md:text-2xl font-semibold mb-8 opacity-0 pointer-events-none" style={{ color: '#8666A5' }} aria-hidden="true">
            Your brand's growth is our growth
          </p>

          {/* Divider (hidden visually but space preserved) */}
          <div className="flex justify-center items-center my-10 opacity-0 pointer-events-none" aria-hidden="true">
            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#b39ddb' }}></div>
            <div className="w-3 h-3 rounded-full mx-4" style={{ backgroundColor: '#8666A5' }}></div>
            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#b39ddb' }}></div>
          </div>

          {/* Description (hidden visually but space preserved) */}
          <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto opacity-0 pointer-events-none" aria-hidden="true">
            At <span className="font-semibold" style={{ color: '#8666A5' }}>PR Sparkz</span>, we create digital presence that drives real growth. 
            Your success is our success—we're partners in your journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-black hover:bg-[#b39ddb]/30 hover:border-[#b39ddb]/60 hover:text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 min-w-[200px] shadow-[0_8px_30px_rgba(134,102,165,0.12)] hover:shadow-[0_20px_70px_rgba(179,157,219,0.28)] border border-white/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-current">
                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span className="text-[15px] md:text-base">Start a Project</span>
            </button>

            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-black hover:bg-[#b39ddb]/30 hover:border-[#b39ddb]/60 hover:text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 min-w-[200px] shadow-[0_8px_30px_rgba(179,157,219,0.12)] hover:shadow-[0_20px_70px_rgba(179,157,219,0.28)] border border-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current">
                <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
              </svg>
              <span className="text-[15px] md:text-base">Book a Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom animation for star spin */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin linear infinite;
        }
      `}</style>
    </section>
  );
};

export default SparkzHero;