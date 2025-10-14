import React, { useState, useEffect, useCallback, useMemo } from 'react';

const PRLoadingAnimation = ({ progress: externalProgress = null }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showProgressText, setShowProgressText] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('loading'); // loading, completing, done

  // Memoized logo loading handler
  const handleLogoLoad = useCallback(() => {
    setLogoLoaded(true);
  }, []);

  // Memoized progress calculation
  const progressPercentage = useMemo(() => Math.round(progress), [progress]);

  // Memoized phase text
  const phaseText = useMemo(() => {
    switch (currentPhase) {
      case 'loading':
        return progress < 30 ? 'Initializing...' : 
               progress < 60 ? 'Loading Assets...' :
               progress < 90 ? 'Preparing Experience...' : 'Finalizing...';
      case 'completing':
        return 'Almost Ready!';
      case 'done':
        return 'Welcome!';
      default:
        return 'Loading...';
    }
  }, [currentPhase, progress]);

  useEffect(() => {
    // Show progress text after a short delay
    const textTimer = setTimeout(() => setShowProgressText(true), 600);
    
    // Use external progress if provided (from App.jsx), otherwise internal simulation
    if (externalProgress !== null) {
      setProgress(externalProgress);
      if (externalProgress >= 100) {
        setCurrentPhase('completing');
        setTimeout(() => {
          setCurrentPhase('done');
          setTimeout(() => setIsVisible(false), 800);
        }, 600);
      }
    } else {
      // Internal progress simulation for fallback
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setCurrentPhase('completing');
            setTimeout(() => {
              setCurrentPhase('done');
              setTimeout(() => setIsVisible(false), 800);
            }, 600);
            return 100;
          }
          return prev + (prev < 50 ? 3 : prev < 80 ? 2 : 1);
        });
      }, 120);

      return () => clearInterval(progressInterval);
    }

    return () => clearTimeout(textTimer);
  }, [externalProgress]);

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        @keyframes logoFadeIn {
          0% { 
            opacity: 0; 
            transform: scale(0.8) translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        @keyframes logoFloat {
          0%, 100% { 
            transform: translateY(0) scale(1); 
          }
          50% { 
            transform: translateY(-8px) scale(1.02); 
          }
        }
        @keyframes logoPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(139, 92, 246, 0);
          }
        }
        @keyframes brandSlideUp {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes circleOrbit {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        @keyframes circleOrbitReverse {
          0% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
          100% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
        }
        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.4; 
          }
          33% { 
            transform: translateY(-20px) scale(1.1); 
            opacity: 0.7; 
          }
          66% { 
            transform: translateY(10px) scale(0.9); 
            opacity: 0.5; 
          }
        }
        @keyframes progressShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.95); }
        }
        @keyframes backgroundPulse {
          0%, 100% { 
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
          }
          50% { 
            background: linear-gradient(135deg, #faf8ff 0%, #f3e8ff 50%, #ede9fe 100%);
          }
        }
        @keyframes glassReflection {
          0% { transform: translateX(-150px) skewX(-20deg); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateX(150px) skewX(-20deg); opacity: 0; }
        }
        
        .animate-logo-fade-in { animation: logoFadeIn 1s ease-out forwards; }
        .animate-logo-float { animation: logoFloat 3s ease-in-out infinite; }
        .animate-logo-pulse { animation: logoPulse 2s ease-in-out infinite; }
        .animate-brand-slide-up { animation: brandSlideUp 0.8s ease-out forwards; }
        .animate-circle-orbit { animation: circleOrbit 15s linear infinite; }
        .animate-circle-orbit-reverse { animation: circleOrbitReverse 20s linear infinite; }
        .animate-particle-float { animation: particleFloat 6s ease-in-out infinite; }
        .animate-progress-shimmer { animation: progressShimmer 2s ease-in-out infinite; }
        .animate-fade-out { animation: fadeOut 0.8s ease-out forwards; }
        .animate-background-pulse { animation: backgroundPulse 8s ease-in-out infinite; }
        .animate-glass-reflection { animation: glassReflection 3s ease-in-out infinite; }

        /* Glass morphism effect */
        .glass-morphism {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Professional gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .mobile-scale {
            transform: scale(0.8);
          }
          .mobile-text {
            font-size: 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .mobile-scale {
            transform: scale(0.7);
          }
          .mobile-text {
            font-size: 0.75rem;
          }
        }
      `}</style>
      
      <div className={`fixed inset-0 z-50 transition-all duration-1000 ease-out overflow-hidden ${
        currentPhase === 'done' ? 'animate-fade-out' : ''
      }`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {/* Animated Background */}
        <div className="absolute inset-0 animate-background-pulse" />
        
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating orbs */}
          <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-gradient-to-br from-purple-200/40 to-violet-300/30 rounded-full blur-3xl animate-logo-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-200/30 to-purple-300/40 rounded-full blur-3xl animate-logo-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full blur-3xl animate-logo-float" style={{animationDelay: '2s'}}></div>
          
          {/* Orbiting elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-circle-orbit">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full opacity-60 shadow-lg"></div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-circle-orbit-reverse">
              <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-50 shadow-lg"></div>
            </div>
          </div>
          
          {/* Floating particles - More sophisticated */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-particle-float ${
                i % 3 === 0 ? 'bg-purple-400/60' : 
                i % 3 === 1 ? 'bg-violet-400/50' : 'bg-indigo-400/40'
              }`}
              style={{
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
              }}
            />
          ))}
        </div>

        {/* Main Content Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative mobile-scale">
            {/* Glass morphism container */}
            <div className="glass-morphism rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              {/* Glass reflection effect */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="w-20 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-glass-reflection"></div>
                </div>
              </div>

              {/* Logo Container */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 animate-logo-fade-in">
                <div className="relative w-full h-full animate-logo-float">
                  {/* Logo Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-300/30 to-violet-300/30 blur-xl animate-logo-pulse"></div>
                  
                  {/* Logo Image */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm border border-white/30">
                    <img 
                      src="/logo.png" 
                      alt="PR Sparkz Logo" 
                      className={`w-full h-full object-contain p-3 transition-all duration-1000 ${
                        logoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      onLoad={handleLogoLoad}
                      loading="eager"
                      style={{ 
                        filter: 'drop-shadow(0 8px 16px rgba(139, 92, 246, 0.2))',
                        imageRendering: 'crisp-edges'
                      }}
                    />
                    
                    {/* Logo loading skeleton */}
                    {!logoLoaded && (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-purple-100/50 to-violet-100/50 rounded-2xl flex items-center justify-center">
                        <div className="w-16 h-16 bg-purple-200/60 rounded-xl animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full opacity-70 animate-particle-float"></div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full opacity-60 animate-particle-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-50 animate-particle-float" style={{animationDelay: '2s'}}></div>
                  <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-65 animate-particle-float" style={{animationDelay: '1.5s'}}></div>
                </div>
              </div>

              {/* Brand Text */}
              <div className="text-center animate-brand-slide-up" style={{animationDelay: '0.8s'}}>
                <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2 tracking-wide">
                  PR SPARKZ
                </h1>
                <p className="text-purple-600/80 text-sm sm:text-base font-medium tracking-wider mb-8 opacity-90">
                  Excellence in Public Relations
                </p>
              </div>

              {/* Enhanced Progress Section */}
              <div className={`text-center transition-all duration-500 ${showProgressText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="mb-4">
                  <div className={`text-2xl sm:text-3xl font-bold gradient-text transition-all duration-300 ${
                    currentPhase === 'completing' ? 'animate-pulse' : ''
                  }`}>
                    {currentPhase === 'completing' || currentPhase === 'done' ? 'Ready!' : `${progressPercentage}%`}
                  </div>
                  <p className="text-purple-600/70 text-sm sm:text-base font-medium mobile-text">
                    {phaseText}
                  </p>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="w-64 sm:w-80 h-3 bg-gradient-to-r from-purple-100/60 to-violet-100/60 rounded-full mx-auto overflow-hidden shadow-inner border border-white/30">
                  <div 
                    className={`h-full bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 transition-all duration-500 ease-out relative rounded-full ${
                      currentPhase === 'completing' ? 'animate-pulse' : ''
                    }`}
                    style={{ 
                      width: `${progress}%`,
                      boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                    }}
                  >
                    {/* Progress shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-progress-shimmer"></div>
                  </div>
                </div>

                {/* Loading phases indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                  {[1, 2, 3, 4].map((phase) => (
                    <div 
                      key={phase}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        progress >= (phase * 25) 
                          ? 'bg-gradient-to-r from-purple-500 to-violet-500 scale-110 shadow-lg' 
                          : 'bg-purple-200/50 scale-90'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PRLoadingAnimation;