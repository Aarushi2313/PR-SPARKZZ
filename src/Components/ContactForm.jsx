import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Share2, 
  Target, 
  Sparkles,
  Calendar,
  DollarSign,
  User,
  Mail,
  FileText,
  CheckCircle,
  Phone,
  Send
} from "lucide-react";

const ProjectLaunchpad = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    timeline: "",
    budget: "",
    name: "",
    email: "",
    description: ""
  });
  const [isLaunching, setIsLaunching] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);

  const projectTypes = [
    { 
      icon: Rocket, 
      title: "Brand Blastoff", 
      desc: "Complete brand transformation",
      color: "from-purple-500 to-purple-600"
    },
    { 
      icon: Share2, 
      title: "Social Orbit", 
      desc: "Social media domination",
      color: "from-purple-600 to-purple-700"
    },
    { 
      icon: Target, 
      title: "Target Launch", 
      desc: "Precision marketing campaign",
      color: "from-purple-500 to-indigo-600"
    },
    { 
      icon: Sparkles, 
      title: "Star Mission", 
      desc: "Custom strategy package",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  const timelines = [
    { label: "Immediate Launch", value: "immediate", icon: Rocket },
    { label: "Next 30 Days", value: "30days", icon: Calendar },
    { label: "1-3 Months", value: "3months", icon: Calendar },
    { label: "Exploring Options", value: "flexible", icon: Sparkles }
  ];

  const budgets = [
    { label: "Enterprise Mission", range: "$10k+", icon: Sparkles },
    { label: "Growth Orbit", range: "$5k - $10k", icon: Target },
    { label: "Startup Launch", range: "$2k - $5k", icon: Rocket },
    { label: "Discovery Phase", range: "To be discussed", icon: DollarSign }
  ];

  const handleProjectSelect = (type) => {
    setFormData({...formData, projectType: type});
    setCurrentStep(2);
  };

  const handleTimelineSelect = (timeline) => {
    setFormData({...formData, timeline});
    setCurrentStep(3);
  };

  const handleBudgetSelect = (budget) => {
    setFormData({...formData, budget});
    setCurrentStep(4);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setIsLaunching(true);
    
    setTimeout(() => {
      setIsLaunching(false);
      setIsLaunched(true);
    }, 3000);
  };

  const resetLaunchpad = () => {
    setCurrentStep(1);
    setFormData({
      projectType: "",
      timeline: "",
      budget: "",
      name: "",
      email: "",
      description: ""
    });
    setIsLaunched(false);
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 relative overflow-hidden" 
      style={{ paddingTop: "clamp(5rem, 10vh, 7rem)", fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-20 animate-float-delayed"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles size={16} className="mr-2" style={{color: "#64419a"}} />
            <span className="text-sm font-semibold" style={{color: "#64419a"}}>GET IN TOUCH</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="text-gray-800">Start Your </span>
            <span style={{
              background: "linear-gradient(to right, #64419a, #553c8b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Journey
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your brand? Let's create something extraordinary together.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-2xl md:rounded-3xl border border-purple-200 shadow-xl p-6 md:p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-8 md:mb-12 relative">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center relative z-10">
                <motion.div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep >= step 
                      ? "bg-purple-600 border-purple-600 text-white shadow-lg" 
                      : "border-purple-300 bg-white text-purple-300"
                  }`}
                  style={currentStep >= step ? {backgroundColor: "#64419a", borderColor: "#64419a"} : {}}
                  whileHover={{ scale: 1.1 }}
                  animate={currentStep === step ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {step}
                </motion.div>
                <span 
                  className={`text-xs md:text-sm mt-2 font-medium ${
                    currentStep >= step ? "text-purple-700" : "text-gray-400"
                  }`}
                  style={currentStep >= step ? {color: "#64419a"} : {}}
                >
                  {["Mission", "Timeline", "Budget", "Launch"][step-1]}
                </span>
              </div>
            ))}
            
            <div className="absolute top-5 md:top-6 left-8 md:left-12 right-8 md:right-12 h-0.5 md:h-1 bg-purple-200">
              <motion.div
                className="h-full"
                style={{background: "linear-gradient(to right, #64419a, #553c8b)"}}
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) * 33.33)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && !isLaunched && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
                  Choose Your Mission
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {projectTypes.map((project, index) => {
                    const IconComponent = project.icon;
                    return (
                      <motion.button
                        key={project.title}
                        onClick={() => handleProjectSelect(project.title)}
                        className={`p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br ${project.color} text-white text-left transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-white/30 shadow-lg hover:shadow-xl`}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="mb-3">
                          <IconComponent size={32} />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {project.desc}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && !isLaunched && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
                  Set Your Launch Timeline
                </h2>
                
                <div className="grid gap-3 md:gap-4 max-w-2xl mx-auto">
                  {timelines.map((timeline, index) => {
                    const IconComponent = timeline.icon;
                    return (
                      <motion.button
                        key={timeline.value}
                        onClick={() => handleTimelineSelect(timeline.value)}
                        className="p-4 rounded-xl bg-white border-2 border-purple-200 text-gray-800 text-left hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-md"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <IconComponent size={20} style={{color: "#64419a"}} />
                          </div>
                          <span className="text-base md:text-lg font-medium">
                            {timeline.label}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && !isLaunched && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
                  Select Your Investment
                </h2>
                
                <div className="grid gap-3 md:gap-4 max-w-2xl mx-auto">
                  {budgets.map((budget, index) => {
                    const IconComponent = budget.icon;
                    return (
                      <motion.button
                        key={budget.range}
                        onClick={() => handleBudgetSelect(budget.range)}
                        className="p-4 rounded-xl bg-white border-2 border-purple-200 text-gray-800 text-left hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-sm hover:shadow-md"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <IconComponent size={20} style={{color: "#64419a"}} />
                            </div>
                            <span className="text-base md:text-lg font-medium">
                              {budget.label}
                            </span>
                          </div>
                          <span className="font-semibold" style={{color: "#64419a"}}>
                            {budget.range}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {currentStep === 4 && !isLaunched && !isLaunching && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-8">
                  Complete Your Details
                </h2>
                
                <form onSubmit={handleDetailsSubmit} className="max-w-2xl mx-auto space-y-4 md:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">
                        Your Name
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
                        <input
                          type="text"
                          required
                          className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-white border-2 border-purple-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                          placeholder="John Doe"
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
                        <input
                          type="email"
                          required
                          className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-white border-2 border-purple-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                          placeholder="john@example.com"
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">
                      Project Description
                    </label>
                    <div className="relative">
                      <FileText size={18} className="absolute left-4 top-4 text-purple-400" />
                      <textarea
                        rows="4"
                        className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-white border-2 border-purple-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all resize-none"
                        placeholder="Tell us about your project goals..."
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-3 md:py-4 text-white font-bold rounded-xl text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    style={{background: "linear-gradient(to right, #64419a, #553c8b)"}}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={20} />
                    Submit Your Project
                  </motion.button>
                </form>
              </motion.div>
            )}

            {isLaunching && (
              <motion.div
                key="launching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 md:py-20"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 relative">
                  <motion.div
                    className="w-full h-full rounded-full"
                    style={{background: "linear-gradient(to right, #64419a, #553c8b)"}}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-4 bg-white rounded-full flex items-center justify-center"
                    animate={{ scale: [0.8, 1, 0.8] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles size={32} style={{color: "#64419a"}} />
                  </motion.div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Processing Your Request
                </h3>
                <p className="text-gray-600">Preparing your project details...</p>
              </motion.div>
            )}

            {isLaunched && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 md:py-16"
              >
                <motion.div
                  className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle size={40} className="text-white" />
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Request Submitted!
                </h3>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you! We'll reach out within 24 hours to discuss your project.
                </p>

                <motion.button
                  onClick={resetLaunchpad}
                  className="px-6 md:px-8 py-3 border-2 rounded-xl transition-all duration-300 font-semibold"
                  style={{borderColor: "#64419a", color: "#64419a"}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Another Request
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 mb-4 font-medium">Prefer direct contact?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a
              href="mailto:Info@prsparkz.com"
              className="inline-flex items-center gap-2 transition-colors font-medium"
              style={{color: "#64419a"}}
            >
              <Mail size={18} />
              Info@prsparkz.com
            </a>
            <a
              href="tel:+917738715711"
              className="inline-flex items-center gap-2 transition-colors font-medium"
              style={{color: "#64419a"}}
            >
              <Phone size={18} />
              +91 7738715711
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
  );
};

export default ProjectLaunchpad;