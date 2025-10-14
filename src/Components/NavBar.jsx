import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { scrollToSection, handleHashNavigation } from '../utils/navigation.js';

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const menuRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const threeContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const interactiveMeshesRef = useRef([]);
  const animationIdRef = useRef(null);

  // Window resize detection
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setMobileOpenDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll detection with smooth threshold
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation on location change
  useEffect(() => {
    handleHashNavigation();
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setMobileOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initialize Three.js scene with responsive handling
  useEffect(() => {
    if (!threeContainerRef.current) return;

    const initThreeJS = () => {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      cameraRef.current = camera;

      // Renderer setup with improved settings
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Clear existing canvas if any
      if (threeContainerRef.current.firstChild) {
        threeContainerRef.current.removeChild(threeContainerRef.current.firstChild);
      }
      threeContainerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = windowWidth < 768 ? 600 : 1200; // Reduce particles on mobile
      
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = (Math.random() - 0.5) * 20;
        posArray[i + 2] = (Math.random() - 0.5) * 10;
        
        const isWhite = Math.random() > 0.85;
        
        if (isWhite) {
          colorArray[i] = 0.95 + Math.random() * 0.05;
          colorArray[i + 1] = 0.95 + Math.random() * 0.05;
          colorArray[i + 2] = 0.95 + Math.random() * 0.05;
        } else {
          colorArray[i] = 0.8 + Math.random() * 0.2;
          colorArray[i + 1] = 0.7 + Math.random() * 0.2;
          colorArray[i + 2] = 0.9 + Math.random() * 0.1;
        }
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: windowWidth < 768 ? 0.03 : 0.04, // Smaller particles on mobile
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      });
      
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      particlesRef.current = particles;

      // Add subtle lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Create interactive elements
      const createInteractiveElement = (x, y, z, size, color) => {
        const geometry = new THREE.IcosahedronGeometry(size, 1);
        const material = new THREE.MeshPhongMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.1,
          transparent: true,
          opacity: 0.6,
          specular: 0xffffff,
          shininess: 30
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.userData = { originalScale: size, hover: false };
        scene.add(mesh);
        interactiveMeshesRef.current.push(mesh);
        return mesh;
      };

      // Add interactive elements only on desktop
      if (windowWidth >= 768) {
        createInteractiveElement(-4, 2, 3, 0.4, 0x9678d6);
        createInteractiveElement(4, -2, 2, 0.5, 0xb8a7e3);
        createInteractiveElement(0, 4, 4, 0.6, 0xd6caf0);
      }

      // Mouse move handler for interaction (desktop only)
      const handleMouseMove = (event) => {
        if (windowWidth >= 768) {
          mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Animation
      const clock = new THREE.Clock();
      
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        if (particlesRef.current) {
          particlesRef.current.rotation.x = elapsedTime * 0.03;
          particlesRef.current.rotation.y = elapsedTime * 0.05;
          
          particlesRef.current.scale.set(
            1 + Math.sin(elapsedTime * 0.5) * 0.02,
            1 + Math.sin(elapsedTime * 0.5) * 0.02,
            1
          );
        }
        
        // Interactive elements animation (desktop only)
        if (windowWidth >= 768) {
          interactiveMeshesRef.current.forEach(mesh => {
            mesh.rotation.x = elapsedTime * 0.1;
            mesh.rotation.y = elapsedTime * 0.15;
            
            const targetScale = mesh.userData.hover ? mesh.userData.originalScale * 1.4 : mesh.userData.originalScale;
            const targetOpacity = mesh.userData.hover ? 0.9 : 0.6;
            
            mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
            mesh.material.opacity = THREE.MathUtils.lerp(mesh.material.opacity, targetOpacity, 0.1);
          });
          
          // Raycasting for interaction
          raycasterRef.current.setFromCamera(mouseRef.current, camera);
          const intersects = raycasterRef.current.intersectObjects(interactiveMeshesRef.current);
          
          interactiveMeshesRef.current.forEach(mesh => {
            mesh.userData.hover = false;
          });
          
          if (intersects.length > 0) {
            intersects[0].object.userData.hover = true;
          }
        }
        
        renderer.render(scene, camera);
      };
      
      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);

      return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        
        if (threeContainerRef.current && rendererRef.current?.domElement) {
          threeContainerRef.current.removeChild(rendererRef.current.domElement);
        }
        
        // Dispose of Three.js objects
        if (particlesRef.current) {
          particlesRef.current.geometry.dispose();
          particlesRef.current.material.dispose();
        }
        
        interactiveMeshesRef.current.forEach(mesh => {
          mesh.geometry.dispose();
          mesh.material.dispose();
          scene.remove(mesh);
        });
        
        interactiveMeshesRef.current = [];
      };
    };

    const cleanup = initThreeJS();
    return cleanup;
  }, [windowWidth]);

  const handleDropdownEnter = (item) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setHoveredItem(item);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150);
  };

  const toggleMobileDropdown = (itemLabel) => {
    if (mobileOpenDropdown === itemLabel) {
      setMobileOpenDropdown(null);
    } else {
      setMobileOpenDropdown(itemLabel);
    }
  };

  const handleNavSectionClick = (e, sectionId) => {
    e.preventDefault();
    const isOnHomePage = location.pathname === '/';
    
    if (isOnHomePage) {
      scrollToSection(sectionId, 80);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId, 80);
      }, 100);
    }
    
    // Close mobile menu on section click
    if (windowWidth < 1024) {
      setIsMenuOpen(false);
      setMobileOpenDropdown(null);
    }
  };

  const navItems = [
    { label: 'Home', path: '/', icon: '◉', isSection: false },
    { label: 'Services', path: '#services', icon: '◈', isSection: true },
    { 
      label: 'More', 
      path: '#', 
      icon: '◎',
      dropdown: [
        { label: 'About', path: '/about', isSection: false },
        { label: 'Portfolio', path: '/portfolio', isSection: false },
        { label: 'Team', path: '/team', isSection: false },
      ]
    },
    { label: 'Contact', path: '#contact', icon: '◐', isSection: true }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Three.js Container - Hidden on mobile for performance */}
      <div 
        ref={threeContainerRef} 
        className="fixed inset-0 -z-10 opacity-30 pointer-events-none hidden sm:block"
      />
      
      <nav ref={menuRef} className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl py-2 sm:py-2 md:py-3' 
          : 'bg-white/80 py-4 sm:py-4 md:py-5'
      }`} style={{ fontFamily: "'Montserrat', sans-serif", minHeight: windowWidth < 768 ? '80px' : 'auto' }}>
        
        {/* Premium glass morphism overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 via-purple-100/30 to-purple-300/30"></div>
          <div className="absolute inset-0 backdrop-blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">
            {/* Responsive Logo */}
            <Link to="/" className="group cursor-pointer interactive">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                  <img 
                    src="/logo.png" 
                    alt="PR Sparkz Logo" 
                    className="object-contain w-full h-full drop-shadow-sm"
                  />
                </div>
                
                <h1 className="font-semibold tracking-wide mt-1 text-sm sm:text-base md:text-lg" style={{ color: '#8666A5' }}>
                  PR SPARKZ
                </h1>

                {/* Floating particles - Hidden on mobile */}
                <div className="hidden sm:block">
                  <div className="absolute -top-2 -right-2 w-2.5 h-2.5 bg-purple-400 rounded-full opacity-70 group-hover:animate-ping transition-all duration-300"></div>
                  <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-purple-300 rounded-full opacity-60 group-hover:animate-ping delay-150 transition-all duration-300"></div>
                  <div className="absolute top-2 -left-3 w-1.5 h-1.5 bg-lavender-400 rounded-full opacity-50 group-hover:animate-pulse delay-300 transition-all duration-300"></div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.dropdown ? (
                    <div
                      className={`nav-item group relative px-4 xl:px-5 py-2 rounded-xl transition-all duration-400 flex items-center cursor-pointer interactive ${
                        hoveredItem === item.label ? 'bg-purple-600 shadow-lg' : 'hover:bg-purple-50/80'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm transition-colors duration-300 ${
                          hoveredItem === item.label ? 'text-white' : 'text-purple-600 group-hover:text-purple-700'
                        }`}>
                          {item.icon}
                        </span>
                        <span className={`font-medium transition-all duration-300 tracking-wide ${
                          hoveredItem === item.label ? 'text-white' : 'text-gray-800 group-hover:text-purple-800'
                        }`}>
                          {item.label}
                        </span>
                        <svg 
                          className={`w-3 h-3 transition-transform duration-300 group-hover:rotate-180 ${
                            hoveredItem === item.label ? 'text-white' : 'text-purple-500 group-hover:text-purple-600'
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-100/30 to-purple-200/30 transition-all duration-400 ${
                        hoveredItem === item.label ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                      }`}></div>
                    </div>
                  ) : item.isSection ? (
                    <a
                      href={item.path}
                      onClick={(e) => handleNavSectionClick(e, item.path.substring(1))}
                      className="nav-item group relative px-4 xl:px-5 py-2 rounded-xl transition-all duration-400 flex items-center interactive"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600 text-sm group-hover:text-purple-700 transition-colors duration-300">
                          {item.icon}
                        </span>
                        <span className="text-gray-800 font-medium group-hover:text-purple-800 transition-all duration-300 tracking-wide">
                          {item.label}
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 rounded-xl bg-purple-50/50 transition-all duration-400 opacity-0 group-hover:opacity-100"></div>
                      <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-400 group-hover:border-purple-500/30"></div>
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className={`nav-item group relative px-4 xl:px-5 py-2 rounded-xl transition-all duration-400 flex items-center interactive ${
                        isActive(item.path) ? 'bg-purple-100/60' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2 relative z-10">
                        <span className="text-purple-600 text-sm group-hover:text-purple-700 transition-colors duration-300">
                          {item.icon}
                        </span>
                        <span className="text-gray-800 font-medium group-hover:text-purple-800 transition-all duration-300 tracking-wide">
                          {item.label}
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 rounded-xl bg-purple-50/50 transition-all duration-400 opacity-0 group-hover:opacity-100"></div>
                      
                      {isActive(item.path) && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                      )}
                    </Link>
                  )}

                  {/* Enhanced Dropdown Menu */}
                  {item.dropdown && hoveredItem === item.label && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-64 bg-white/98 backdrop-blur-2xl border border-purple-100 rounded-2xl shadow-2xl overflow-hidden"
                      style={{
                        boxShadow: '0 20px 60px rgba(134, 102, 165, 0.25), 0 0 0 1px rgba(134, 102, 165, 0.08)',
                        zIndex: 9999
                      }}
                      onMouseEnter={() => handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {/* Gradient header bar */}
                      <div className="h-1 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"></div>
                      
                      {/* Dropdown content */}
                      <div className="py-3">
                        {item.dropdown.map((dropdownItem, idx) => (
                          dropdownItem.isSection ? (
                            <a
                              key={dropdownItem.label}
                              href={dropdownItem.path}
                              onClick={(e) => {
                                handleNavSectionClick(e, dropdownItem.path.substring(1));
                                setHoveredItem(null);
                              }}
                              className="block px-5 py-3 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                            >
                              {/* Background gradient on hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              
                              {/* Animated left border */}
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                              
                              <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center space-x-3">
                                  {/* Icon circle */}
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    <span className="text-purple-600 group-hover:text-white text-sm font-bold transition-colors duration-300">
                                      {idx === 0 ? '◉' : idx === 1 ? '◈' : '◎'}
                                    </span>
                                  </div>
                                  
                                  <div>
                                    <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-800 transition-colors duration-300 block">
                                      {dropdownItem.label}
                                    </span>
                                    <span className="text-xs text-gray-500 group-hover:text-purple-600 transition-colors duration-300">
                                      {idx === 0 ? 'Our Story' : idx === 1 ? 'Our Work' : 'Meet Us'}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Arrow icon */}
                                <svg 
                                  className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </a>
                          ) : (
                            <Link
                              key={dropdownItem.label}
                              to={dropdownItem.path}
                              className={`block px-5 py-3 transition-all duration-300 group relative overflow-hidden ${
                                isActive(dropdownItem.path) ? 'bg-purple-50' : ''
                              }`}
                              onClick={() => setHoveredItem(null)}
                            >
                              {/* Background gradient on hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              
                              {/* Animated left border */}
                              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-purple-600 transform transition-transform duration-300 ${
                                isActive(dropdownItem.path) ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'
                              }`}></div>
                              
                              <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center space-x-3">
                                  {/* Icon circle */}
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                    isActive(dropdownItem.path)
                                      ? 'bg-gradient-to-br from-purple-500 to-purple-600 scale-110'
                                      : 'bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-500 group-hover:to-purple-600 group-hover:scale-110 group-hover:rotate-3'
                                  }`}>
                                    <span className={`text-sm font-bold transition-colors duration-300 ${
                                      isActive(dropdownItem.path)
                                        ? 'text-white'
                                        : 'text-purple-600 group-hover:text-white'
                                    }`}>
                                      {idx === 0 ? '◉' : idx === 1 ? '◈' : '◎'}
                                    </span>
                                  </div>
                                  
                                  <div>
                                    <span className={`text-sm font-semibold transition-colors duration-300 block ${
                                      isActive(dropdownItem.path)
                                        ? 'text-purple-800'
                                        : 'text-gray-800 group-hover:text-purple-800'
                                    }`}>
                                      {dropdownItem.label}
                                    </span>
                                    <span className={`text-xs transition-colors duration-300 ${
                                      isActive(dropdownItem.path)
                                        ? 'text-purple-600'
                                        : 'text-gray-500 group-hover:text-purple-600'
                                    }`}>
                                      {idx === 0 ? 'Our Story' : idx === 1 ? 'Our Work' : 'Meet Us'}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Arrow icon */}
                                <svg 
                                  className={`w-4 h-4 text-purple-400 transform transition-all duration-300 ${
                                    isActive(dropdownItem.path)
                                      ? 'opacity-100 translate-x-0'
                                      : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                  }`}
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </Link>
                          )
                        ))}
                      </div>
                      
                      {/* Decorative bottom accent */}
                      <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Premium CTA Button - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-3">
              <a href="#contact" onClick={(e) => handleNavSectionClick(e, 'contact')} className="group relative overflow-hidden px-5 xl:px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 transition-all duration-400 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 interactive cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <span className="relative z-10 text-white font-semibold text-sm flex items-center space-x-1.5 tracking-wide">
                  <span>Get Started</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden relative rounded-xl bg-purple-50/60 backdrop-blur-sm border border-purple-200/60 flex items-center justify-center group hover:bg-purple-100/60 transition-all duration-300 interactive shadow-sm w-11 h-11 min-w-[44px] min-h-[44px]`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-5">
                <span className={`absolute block h-0.5 w-5 bg-purple-600 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'top-2 rotate-45' : 'top-1'
                }`}></span>
                <span className={`absolute block h-0.5 w-5 bg-purple-600 rounded-full top-2 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block h-0.5 w-5 bg-purple-600 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'top-2 -rotate-45' : 'top-3'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-400 z-40 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="bg-white/97 backdrop-blur-2xl border-b border-purple-200/60 shadow-2xl shadow-purple-500/10 max-h-[80vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <div 
                        className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer interactive ${
                          mobileOpenDropdown === item.label ? 'bg-purple-600 text-white' : 'hover:bg-purple-50/60'
                        }`}
                        onClick={() => toggleMobileDropdown(item.label)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`text-lg transition-colors duration-300 ${
                            mobileOpenDropdown === item.label ? 'text-white' : 'text-purple-600'
                          }`}>
                            {item.icon}
                          </span>
                          <span className={`font-medium text-base transition-colors duration-300 ${
                            mobileOpenDropdown === item.label ? 'text-white' : 'text-gray-800 group-hover:text-purple-800'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                        <svg 
                          className={`w-4 h-4 transition-all duration-300 ${
                            mobileOpenDropdown === item.label 
                              ? 'rotate-180 text-white' 
                              : 'text-purple-500'
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    ) : item.isSection ? (
                      <a
                        href={item.path}
                        onClick={(e) => {
                          handleNavSectionClick(e, item.path.substring(1));
                          setIsMenuOpen(false);
                          setMobileOpenDropdown(null);
                        }}
                        className="group flex items-center justify-between p-3 rounded-xl transition-all duration-300 interactive cursor-pointer hover:bg-purple-50/60"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-purple-600 text-lg">{item.icon}</span>
                          <span className="text-gray-800 font-medium group-hover:text-purple-800 text-base">
                            {item.label}
                          </span>
                        </div>
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setMobileOpenDropdown(null);
                        }}
                        className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 interactive hover:bg-purple-50/60 ${
                          isActive(item.path) ? 'bg-purple-50/70' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-purple-600 text-lg">{item.icon}</span>
                          <span className="text-gray-800 font-medium group-hover:text-purple-800 text-base">
                            {item.label}
                          </span>
                        </div>
                        {isActive(item.path) && item.path === '/' && (
                          <div className="w-1 h-6 bg-purple-500 rounded-full shadow-sm"></div>
                        )}
                      </Link>
                    )}
                    
                    {/* Mobile dropdown items */}
                    {item.dropdown && mobileOpenDropdown === item.label && (
                      <div className="pl-8 md:pl-12 space-y-1 mt-1">
                        {item.dropdown.map((dropdownItem) => (
                          dropdownItem.isSection ? (
                            <a
                              key={dropdownItem.label}
                              href={dropdownItem.path}
                              onClick={(e) => {
                                handleNavSectionClick(e, dropdownItem.path.substring(1));
                                setIsMenuOpen(false);
                                setMobileOpenDropdown(null);
                              }}
                              className="block py-2 px-4 rounded-lg text-gray-700 hover:text-purple-800 hover:bg-purple-50/50 transition-all duration-300 text-sm cursor-pointer"
                            >
                              {dropdownItem.label}
                            </a>
                          ) : (
                            <Link
                              key={dropdownItem.label}
                              to={dropdownItem.path}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setMobileOpenDropdown(null);
                              }}
                              className={`block py-2 px-4 rounded-lg text-gray-700 hover:text-purple-800 hover:bg-purple-50/50 transition-all duration-300 text-sm ${
                                isActive(dropdownItem.path) ? 'bg-purple-50/50 text-purple-800' : ''
                              }`}
                            >
                              {dropdownItem.label}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Mobile CTA Button */}
              <div className="mt-4 pt-4 border-t border-purple-200/60">
                <a 
                  href="#contact"
                  onClick={(e) => {
                    handleNavSectionClick(e, 'contact');
                    setIsMenuOpen(false);
                    setMobileOpenDropdown(null);
                  }}
                  className="w-full group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 transition-all duration-400 hover:scale-[1.02] block interactive cursor-pointer"
                >
                  <span className="relative z-10 text-white font-semibold flex items-center justify-center space-x-1.5 text-sm">
                    <span>Get Started</span>
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add CSS styles for responsive design */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        /* Premium scroll animations */
        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .nav-item {
          animation: float-in 0.5s ease-out forwards;
          opacity: 0;
        }

        /* Smooth transitions for all interactive elements */
        .interactive {
          transition: all 0.3s ease;
        }

        /* Enhanced professional focus states */
        .interactive:focus {
          outline: 2px solid rgba(166, 139, 227, 0.6);
          outline-offset: 2px;
        }

        /* High-performance animations and mobile optimizations */
        @media (prefers-reduced-motion: reduce) {
          .interactive,
          .nav-item {
            transition: none;
            animation: none;
          }
        }

        /* Mobile-specific optimizations */
        @media (max-width: 767px) {
          /* Improve touch targets */
          button, a, .interactive {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Better scrolling for mobile menu */
          .max-h-\[80vh\] {
            max-height: 80vh;
          }
          
          /* Ensure navbar height consistency */
          nav {
            min-height: 80px;
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          /* Tighter spacing for very small screens */
          .max-w-7xl {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          nav {
            min-height: 75px;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 768px) and (max-width: 1023px) {
          /* Adjust padding and spacing for tablet */
          .max-w-7xl {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default ModernNavbar;