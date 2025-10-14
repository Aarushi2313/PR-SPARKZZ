import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox, Sphere, Torus, Text } from '@react-three/drei';
import * as THREE from 'three';

// 3D Contact Form Background Elements
const ContactParticles = () => {
  const particlesRef = useRef();
  
  const particleCount = 100;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
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
          mesh.position.y += Math.sin(state.clock.elapsedTime * particle.speed + particle.phase) * 0.02;
          mesh.position.x += Math.cos(state.clock.elapsedTime * particle.speed * 0.5 + particle.phase) * 0.01;
          mesh.rotation.z = state.clock.elapsedTime * particle.speed;
          mesh.material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2 + particle.phase) * 0.1;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} position={particle.position} scale={0.03}>
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

// Floating 3D Contact Icons
const ContactIcon3D = ({ position, icon, color, index }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3;
    }
  });

  const getIconShape = (iconType) => {
    switch (iconType) {
      case 'email':
        return (
          <RoundedBox args={[1.2, 0.8, 0.2]} radius={0.1}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.2}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </RoundedBox>
        );
      case 'phone':
        return (
          <RoundedBox args={[0.6, 1.2, 0.2]} radius={0.1}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.3}
              speed={1.5}
              roughness={0.2}
              metalness={0.9}
            />
          </RoundedBox>
        );
      case 'location':
        return (
          <Sphere scale={0.8}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.4}
              speed={2.5}
              roughness={0.0}
              metalness={1}
            />
          </Sphere>
        );
      case 'time':
        return (
          <Torus args={[0.8, 0.2, 16, 100]}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.2}
              speed={3}
              roughness={0.1}
              metalness={0.8}
            />
          </Torus>
        );
      default:
        return (
          <Sphere scale={0.8}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        );
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={meshRef} position={position}>
        {getIconShape(icon)}
      </group>
    </Float>
  );
};

const Premium3DContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const contactInfo = [
    {
      icon: 'email',
      title: 'Email Us',
      value: 'hello@prsparkz.com',
      color: '#ec4899',
      description: 'Get in touch for project inquiries'
    },
    {
      icon: 'phone',
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      color: '#8b5cf6',
      description: 'Speak directly with our team'
    },
    {
      icon: 'location',
      title: 'Visit Us',
      value: 'San Francisco, CA',
      color: '#06b6d4',
      description: 'Our creative headquarters'
    },
    {
      icon: 'time',
      title: 'Work Hours',
      value: '9AM - 6PM PST',
      color: '#f97316',
      description: 'Monday to Friday'
    }
  ];

  const services = [
    'Social Media Marketing',
    'Content Creation',
    'Brand Identity',
    'Digital Strategy',
    'Video Production',
    'Photography',
    'Web Development',
    'Other'
  ];

  const budgetRanges = [
    '$5K - $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K - $100K',
    '$100K+'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
        budget: ''
      });
    }, 2000);
  };

  const getContactPosition = (index) => {
    const positions = [
      [-8, 3, -5],
      [-3, 4, -3],
      [3, 3, -4],
      [8, 4, -5]
    ];
    return positions[index] || [0, 3, 0];
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #16213e 50%, #1a0b2e 100%)'
      }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          style={{ height: '100%' }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[0, 0, 10]} intensity={0.8} color="#ec4899" />
          
          <ContactParticles />
          
          {contactInfo.map((info, index) => (
            <ContactIcon3D
              key={index}
              position={getContactPosition(index)}
              icon={info.icon}
              color={info.color}
              index={index}
            />
          ))}
        </Canvas>
      </div>

      {/* Section Header */}
      <motion.div
        className="relative z-20 text-center mb-16 px-6"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm mb-8">
            <span className="text-cyan-400 font-semibold tracking-wide">LET'S CONNECT</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              START YOUR
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              JOURNEY
            </span>
          </h2>
          
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Ready to transform your brand? Let's create something <span className="text-cyan-400 font-semibold">extraordinary</span> together
          </p>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div 
                className="p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                }}
              >
                <h3 className="text-3xl font-bold text-white mb-8">Get in Touch</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your Name"
                        required
                        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                      />
                      {focusedField === 'name' && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-purple-400 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </motion.div>
                    
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your Email"
                        required
                        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                      />
                      {focusedField === 'email' && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-purple-400 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Company & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Company Name"
                        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                      />
                      {focusedField === 'company' && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-purple-400 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </motion.div>
                    
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Phone Number"
                        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                      />
                      {focusedField === 'phone' && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-purple-400 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Service & Budget Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-purple-400 transition-all duration-300"
                      >
                        <option value="" className="bg-gray-900">Select Service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service} className="bg-gray-900">
                            {service}
                          </option>
                        ))}
                      </select>
                      {focusedField === 'service' && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-purple-400 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </motion.div>
                    
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('budget')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-purple-400 transition-all duration-300"
                      >
                        <option value="" className="bg-gray-900">Budget Range</option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range} className="bg-gray-900">
                            {range}
                          </option>
                        ))}
                      </select>
                      {focusedField === 'budget' && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-purple-400 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your project..."
                      rows={6}
                      required
                      className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-all duration-300 resize-none"
                    />
                    {focusedField === 'message' && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-purple-400 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-2xl text-lg transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Send Message</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-white mb-6">Connect With Us</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  Ready to elevate your brand? Our team of digital experts is here to help you create extraordinary experiences that drive real results.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div 
                      className="p-6 rounded-3xl border border-white/10 backdrop-blur-xl"
                      style={{
                        background: `linear-gradient(135deg, ${info.color}15 0%, rgba(255,255,255,0.05) 100%)`,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          style={{ 
                            background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}80 100%)`,
                            boxShadow: `0 10px 30px ${info.color}40`
                          }}
                        >
                          <div className="text-white text-lg">
                            {info.icon === 'email' && '📧'}
                            {info.icon === 'phone' && '📱'}
                            {info.icon === 'location' && '📍'}
                            {info.icon === 'time' && '🕒'}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-lg mb-1">
                            {info.title}
                          </h4>
                          <p className="font-medium mb-1" style={{ color: info.color }}>
                            {info.value}
                          </p>
                          <p className="text-white/60 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h4 className="text-white font-semibold text-lg mb-6">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { name: 'Instagram', color: '#E4405F', icon: '📷' },
                    { name: 'LinkedIn', color: '#0077B5', icon: '💼' },
                    { name: 'Twitter', color: '#1DA1F2', icon: '🐦' },
                    { name: 'Behance', color: '#1769FF', icon: '🎨' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${social.color} 0%, ${social.color}80 100%)`,
                        boxShadow: `0 10px 30px ${social.color}40`
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Premium3DContact;