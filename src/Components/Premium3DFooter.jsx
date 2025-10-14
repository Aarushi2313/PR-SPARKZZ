import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

// 3D Footer Particles
const FooterParticles = () => {
  const particlesRef = useRef();
  
  const particleCount = 60;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 15
        ],
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: ['#8b5cf6', '#ec4899', '#06b6d4', '#f97316'][Math.floor(Math.random() * 4)]
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        const mesh = particlesRef.current.children[i];
        if (mesh) {
          mesh.position.y += Math.sin(state.clock.elapsedTime * particle.speed + particle.phase) * 0.01;
          mesh.rotation.y = state.clock.elapsedTime * particle.speed;
          mesh.material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5 + particle.phase) * 0.1;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} position={particle.position} scale={0.02}>
          <meshStandardMaterial
            color={particle.color}
            transparent
            opacity={0.3}
            emissive={particle.color}
            emissiveIntensity={0.1}
          />
        </Sphere>
      ))}
    </group>
  );
};

// Floating Logo 3D
const FooterLogo3D = () => {
  const logoRef = useRef();
  
  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      logoRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={logoRef} position={[0, 2, 0]}>
        <RoundedBox args={[2, 2, 0.3]} radius={0.3}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.2}
            speed={1.5}
            roughness={0.1}
            metalness={0.8}
          />
        </RoundedBox>
        
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          PS
        </Text>
      </group>
    </Float>
  );
};

const Premium3DFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      'Social Media Marketing',
      'Content Creation',
      'Brand Identity',
      'Digital Strategy',
      'Video Production',
      'Photography'
    ],
    company: [
      'About Us',
      'Our Team',
      'Careers',
      'Portfolio',
      'Blog',
      'Contact'
    ],
    resources: [
      'Case Studies',
      'White Papers',
      'Industry Reports',
      'Templates',
      'Webinars',
      'FAQ'
    ],
    legal: [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy',
      'Data Protection',
      'Accessibility',
      'Disclaimer'
    ]
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: '📷', 
      color: '#E4405F',
      handle: '@prsparkz',
      followers: '50K+'
    },
    { 
      name: 'LinkedIn', 
      icon: '💼', 
      color: '#0077B5',
      handle: '/company/prsparkz',
      followers: '25K+'
    },
    { 
      name: 'Twitter', 
      icon: '🐦', 
      color: '#1DA1F2',
      handle: '@prsparkz',
      followers: '35K+'
    },
    { 
      name: 'Behance', 
      icon: '🎨', 
      color: '#1769FF',
      handle: '/prsparkz',
      followers: '15K+'
    },
    { 
      name: 'YouTube', 
      icon: '📺', 
      color: '#FF0000',
      handle: '/prsparkz',
      followers: '10K+'
    }
  ];

  const achievements = [
    { icon: '🏆', title: 'Digital Excellence Award 2024' },
    { icon: '⭐', title: '500+ Successful Projects' },
    { icon: '🚀', title: 'Top 1% Digital Agencies' },
    { icon: '💎', title: 'Premium Partner Status' }
  ];

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{ height: '100%' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
          
          <FooterParticles />
          <FooterLogo3D />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/90 to-transparent" />

      {/* Main Footer Content */}
      <div className="relative z-20 px-6 pt-20 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Footer Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm mb-8">
              <span className="text-purple-400 font-semibold tracking-wide">CONNECT WITH US</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Elevate</span> Your Brand?
            </h3>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Join the ranks of successful brands who trust PR Sparkz to create extraordinary digital experiences
            </p>
            
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl text-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
              }}
            >
              Start Your Journey
            </motion.button>
          </motion.div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* Company Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">PS</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl">PR Sparkz</h3>
                  <p className="text-purple-400 text-sm">Digital Excellence</p>
                </div>
              </div>
              
              <p className="text-white/70 leading-relaxed mb-8 text-lg">
                We're a premium digital agency specializing in creating immersive brand experiences that drive real business results. From social media mastery to cutting-edge web solutions, we turn your vision into digital reality.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white/80">
                  <span className="text-purple-400">📧</span>
                  <span>hello@prsparkz.com</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <span className="text-purple-400">📱</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <span className="text-purple-400">📍</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h4 className="text-white font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-white/60 hover:text-purple-400 transition-colors duration-300 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-white font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-white/60 hover:text-purple-400 transition-colors duration-300 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-white font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-white/60 hover:text-purple-400 transition-colors duration-300 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Media Section */}
          <motion.div
            className="border-t border-white/10 pt-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-white font-bold text-xl mb-8 text-center">Follow Our Journey</h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="group p-6 rounded-3xl border border-white/10 backdrop-blur-xl text-center"
                  style={{
                    background: `linear-gradient(135deg, ${social.color}15 0%, rgba(255,255,255,0.05) 100%)`,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${social.color} 0%, ${social.color}80 100%)`,
                      boxShadow: `0 10px 30px ${social.color}40`
                    }}
                  >
                    {social.icon}
                  </div>
                  
                  <h5 className="text-white font-semibold mb-2">{social.name}</h5>
                  <p className="text-white/60 text-sm mb-1">{social.handle}</p>
                  <p className="text-xs font-medium" style={{ color: social.color }}>
                    {social.followers} followers
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="border-t border-white/10 pt-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-white font-bold text-xl mb-8 text-center">Awards & Recognition</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-3xl border border-white/10 backdrop-blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <p className="text-white font-medium text-sm leading-relaxed">
                    {achievement.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            className="border-t border-white/10 pt-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-white font-bold text-2xl mb-4">Stay Updated</h4>
              <p className="text-white/70 mb-8">Get the latest insights, tips, and case studies delivered to your inbox</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                />
                <motion.button
                  className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © {currentYear} PR Sparkz. All rights reserved. Crafted with ❤️ in San Francisco.
              </div>
              
              <div className="flex space-x-6">
                {footerLinks.legal.slice(0, 3).map((link, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors duration-300 text-sm"
                    whileHover={{ y: -2 }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Premium3DFooter;