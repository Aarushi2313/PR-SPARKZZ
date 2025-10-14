import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Users,
  Eye,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contacts', label: 'Contact Forms', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Sample data (in production, fetch from backend)
  const dashboardStats = [
    { label: 'Total Portfolio Items', value: '4', icon: Briefcase, color: '#8666A5', change: '+2' },
    { label: 'Testimonials', value: '12', icon: MessageSquare, color: '#b39ddb', change: '+3' },
    { label: 'Contact Submissions', value: '48', icon: Mail, color: '#c7b3e5', change: '+15' },
    { label: 'Monthly Views', value: '12.5K', icon: Eye, color: '#9d7bb8', change: '+24%' },
  ];

  const recentContacts = [
    { name: 'John Doe', email: 'john@example.com', message: 'Interested in brand partnership...', date: '2 hours ago' },
    { name: 'Sarah Smith', email: 'sarah@example.com', message: 'Looking for celebrity endorsement...', date: '5 hours ago' },
    { name: 'Mike Johnson', email: 'mike@example.com', message: 'Need PR services for product launch...', date: '1 day ago' },
  ];

  const portfolioItems = [
    { id: 1, title: 'Cannes Film Festival', category: 'Fashion Campaign', status: 'Published' },
    { id: 2, title: 'Celebrity Jewelry Line', category: 'Brand Launch', status: 'Published' },
    { id: 3, title: 'Commercial Integration', category: 'Product Placement', status: 'Published' },
    { id: 4, title: 'Star-Studded Gala', category: 'Event Management', status: 'Draft' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#8666A5] to-[#6b4d7a] text-white z-40 shadow-2xl"
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                    PR Sparkz
                  </h2>
                  <p className="text-xs text-white/70">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-lg">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <p className="font-semibold">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-white/70">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white/20 backdrop-blur-md shadow-lg'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-6 left-4 right-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-[#8666A5]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {menuItems.find((item) => item.id === activeTab)?.label}
              </h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-lg bg-[#8666A5] text-white hover:bg-[#6b4d7a] transition-colors"
            >
              View Website
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white rounded-2xl p-6 shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${stat.color}20` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: stat.color }} />
                          </div>
                          <span className="text-green-500 font-semibold text-sm">{stat.change}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Contacts */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Contact Submissions</h2>
                    <button className="text-[#8666A5] hover:text-[#6b4d7a] font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentContacts.map((contact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                          <p className="text-sm text-gray-500 mt-1">{contact.message}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{contact.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats Chart Placeholder */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Performance</h2>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-[#8666A5]/10 to-[#b39ddb]/10 rounded-xl">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4 text-[#8666A5]" />
                      <p className="text-gray-600">Chart visualization would go here</p>
                      <p className="text-sm text-gray-500 mt-2">Integrate with Chart.js or Recharts</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Manage Portfolio</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8666A5] text-white font-semibold shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Project
                  </motion.button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {portfolioItems.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-800">{item.title}</td>
                          <td className="px-6 py-4 text-gray-600">{item.category}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                item.status === 'Published'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <MessageSquare className="w-20 h-20 mx-auto mb-4 text-[#8666A5]" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Testimonials Management</h3>
                <p className="text-gray-600">Add, edit, or remove client testimonials</p>
              </motion.div>
            )}

            {activeTab === 'contacts' && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <Mail className="w-20 h-20 mx-auto mb-4 text-[#8666A5]" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Contact Form Submissions</h3>
                <p className="text-gray-600">View and manage contact form submissions</p>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <BarChart3 className="w-20 h-20 mx-auto mb-4 text-[#8666A5]" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">View detailed analytics and insights</p>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <Settings className="w-20 h-20 mx-auto mb-4 text-[#8666A5]" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Settings</h3>
                <p className="text-gray-600">Manage admin settings and preferences</p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
