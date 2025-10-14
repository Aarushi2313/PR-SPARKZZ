import React, { useRef, useState, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Environment, 
  Sphere, 
  MeshDistortMaterial,
  OrbitControls,
  Sparkles
} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

// 3D Background Scene for Contact
function Contact3DScene() {
  const sphereRef = useRef();
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      sphereRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#EC4899" />
      
      {/* Central Sphere */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, -3]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            transparent
            opacity={0.6}
            distort={0.4}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      {/* Floating Elements */}
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.5} rotationIntensity={0.3} floatIntensity={0.2}>
          <Sphere 
            args={[0.3, 32, 32]} 
            position={[
              Math.sin(i * 2) * 4,
              Math.cos(i * 2) * 2,
              Math.sin(i) * 2
            ]}
          >
            <MeshDistortMaterial
              color={i % 2 === 0 ? "#EC4899" : "#06B6D4"}
              transparent
              opacity={0.4}
              distort={0.3}
              speed={1.5}
              metalness={0.9}
              roughness={0.1}
            />
          </Sphere>
        </Float>
      ))}

      <Sparkles
        count={30}
        scale={[8, 8, 8]}
        size={2}
        speed={0.4}
        color="#8B5CF6"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

const Modern3DContactForm = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Brand Strategy',
    'Social Media Marketing',
    'Digital Marketing',
    'Creative Production',
    'Web Development',
    'Analytics & Insights'
  ];

  const budgetRanges = [
    '$5K - $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K - $100K',
    '$100K+'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      budget: '',
      message: ''
    });
  };

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative py-32 bg-black overflow-hidden min-h-screen"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-3 mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
            <span className="text-sm font-medium text-purple-300 tracking-wide">
              GET IN TOUCH
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            <span className="block">LET'S CREATE</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              SOMETHING
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AMAZING
            </span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your brand? Let's discuss your vision and create 
            something extraordinary together.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Company & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                      placeholder="Your company"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Service & Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">Service Needed</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors duration-300"
                    >
                      <option value="" className="bg-gray-900">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-gray-900">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors duration-300"
                    >
                      <option value="" className="bg-gray-900">Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-gray-900">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* 3D Scene & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* 3D Scene */}
            <div className="h-80 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 overflow-hidden">
              <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <Contact3DScene />
                </Suspense>
              </Canvas>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                    <p className="text-white/60 text-sm">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" fill="none"/>
                      <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">hello@prsparkz.com</p>
                    <p className="text-white/60 text-sm">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M21 10C21 17 12 23 12 23S3 17 3 10A9 9 0 0 1 12 1A9 9 0 0 1 21 10Z" stroke="white" strokeWidth="2" fill="none"/>
                      <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">New York, NY</p>
                    <p className="text-white/60 text-sm">Available worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Modern3DContactForm;