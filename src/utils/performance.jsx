import { useEffect, useState } from 'react';

// Performance monitoring hook
export const usePerformance = () => {
  const [fps, setFps] = useState(60);
  const [performance, setPerformance] = useState('high');

  useEffect(() => {
    let frames = 0;
    let prevTime = performance.now();
    
    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= prevTime + 1000) {
        const currentFPS = Math.round((frames * 1000) / (currentTime - prevTime));
        setFps(currentFPS);
        
        // Adjust performance based on FPS
        if (currentFPS < 30) {
          setPerformance('low');
        } else if (currentFPS < 50) {
          setPerformance('medium');
        } else {
          setPerformance('high');
        }
        
        frames = 0;
        prevTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    const animationId = requestAnimationFrame(measureFPS);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return { fps, performance };
};

// Device detection hook
export const useDevice = () => {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    supportsWebGL: false,
    pixelRatio: 1
  });

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    setDevice({
      isMobile: window.innerWidth <= 768,
      isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
      isDesktop: window.innerWidth > 1024,
      supportsWebGL: !!gl,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2)
    });

    const handleResize = () => {
      setDevice(prev => ({
        ...prev,
        isMobile: window.innerWidth <= 768,
        isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
        isDesktop: window.innerWidth > 1024
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};

// Preloader for assets
export const useAssetPreloader = (assets = []) => {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (assets.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalAssets = assets.length;

    const updateProgress = () => {
      loadedCount++;
      setProgress((loadedCount / totalAssets) * 100);
      
      if (loadedCount === totalAssets) {
        setLoaded(true);
      }
    };

    assets.forEach(asset => {
      if (asset.type === 'image') {
        const img = new Image();
        img.onload = updateProgress;
        img.onerror = updateProgress;
        img.src = asset.src;
      } else if (asset.type === 'video') {
        const video = document.createElement('video');
        video.onloadeddata = updateProgress;
        video.onerror = updateProgress;
        video.src = asset.src;
      }
    });
  }, [assets]);

  return { loaded, progress };
};

// Intersection observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting];
};

// Video background component
export const VideoBackground = ({ 
  src, 
  poster, 
  className = '', 
  autoPlay = true, 
  loop = true, 
  muted = true 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { performance } = usePerformance();
  const device = useDevice();

  // Disable video on low performance or mobile devices
  if (performance === 'low' || device.isMobile) {
    return (
      <div 
        className={`bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${poster})` }}
      />
    );
  }

  return (
    <video
      className={`object-cover w-full h-full ${className}`}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      poster={poster}
      onLoadedData={() => setIsLoaded(true)}
      style={{ opacity: isLoaded ? 1 : 0 }}
    >
      <source src={src} type="video/mp4" />
      {/* Fallback image */}
      <img src={poster} alt="Video fallback" className="object-cover w-full h-full" />
    </video>
  );
};

export default {
  usePerformance,
  useDevice,
  useAssetPreloader,
  useIntersectionObserver,
  VideoBackground
};