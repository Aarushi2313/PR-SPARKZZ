import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    const scrollToTop = () => {
      // Try smooth scrolling first
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback for browsers that don't support smooth scrolling
        window.scrollTo(0, 0);
      }
    };

    // Small delay to ensure route transition is complete
    const timeoutId = setTimeout(scrollToTop, 100);
    
    // Also try immediate scroll for faster devices
    scrollToTop();

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return <div style={{ fontFamily: "'Montserrat', sans-serif", display: 'none' }} />;
};

export default ScrollToTop;