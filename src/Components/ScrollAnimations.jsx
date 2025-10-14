import React, { useEffect } from 'react';
import gsap from 'gsap';

// Simple scroll animations without ScrollTrigger for now
const ScrollAnimations = () => {
  useEffect(() => {
    // Basic scroll-based animations without ScrollTrigger
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax-element');
      
      elements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollAnimations;