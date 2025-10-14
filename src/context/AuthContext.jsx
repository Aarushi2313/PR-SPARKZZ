import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default admin credentials (in production, use proper backend authentication)
  const ADMIN_CREDENTIALS = {
    email: 'admin@prsparkz.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  };

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          const userData = {
            email: ADMIN_CREDENTIALS.email,
            name: ADMIN_CREDENTIALS.name,
            role: ADMIN_CREDENTIALS.role
          };
          setUser(userData);
          localStorage.setItem('adminUser', JSON.stringify(userData));
          resolve({ success: true, user: userData });
        } else {
          reject({ success: false, message: 'Invalid email or password' });
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
