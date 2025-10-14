import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";

// Page Components
import Hero from "./Components/Hero.jsx";
import AboutUs from "./Components/AboutUs.jsx";
import Services from "./Components/Services.jsx";
import WhyPRSparkz from "./Components/WhyPRSparkz.jsx";
import Portfolio from "./Components/Portfolio.jsx";
import Team from "./Components/Team.jsx";

// UI Components
import Testimonials from "./Components/Testimonials.jsx";
import ContactForm from "./Components/ContactForm.jsx";

// Utility Components
import ScrollToTop from "./Components/ScrollToTop.jsx";

// Admin Components
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import ProtectedRoute from "./Components/Admin/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="font-sans bg-black text-white relative">
        {/* Content Layer */}
        <div className="relative">
          <ScrollToTop />
          <Routes>
            {/* Admin Routes - No NavBar/Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Public Routes - With NavBar/Footer */}
            <Route
              path="/*"
              element={
                <>
                  <NavBar />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <Hero />
                          <Services />
                          <WhyPRSparkz />
                          <Testimonials />
                          <ContactForm />
                        </>
                      }
                    />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/team" element={<Team />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
