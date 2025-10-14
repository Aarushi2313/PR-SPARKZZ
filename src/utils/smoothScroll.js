import { useEffect } from 'react';
import gsap from 'gsap';

const useSmoothScroll = () => {
  useEffect(() => {
    // Add smooth scrolling behavior
    const smoothScroll = (target) => {
      const element = document.querySelector(target);
      if (element) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: { y: element, offsetY: 80 },
          ease: "power2.inOut"
        });
      }
    };

    // Apply smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
      });
    });

    // CSS for smooth scrolling fallback
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);
};

export default useSmoothScroll;