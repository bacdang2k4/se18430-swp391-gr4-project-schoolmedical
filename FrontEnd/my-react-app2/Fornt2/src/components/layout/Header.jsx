
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, Bell, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    // Always require login for protected routes
    navigate('/login');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 hero-gradient rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">MonaHealth</h1>
              <p className="text-xs text-gray-500">Y tế học đường thông minh</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Trang chủ
            </Link>
            <button 
              onClick={() => handleProtectedNavigation('/health-profile')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Hồ sơ sức khỏe
            </button>
            <button 
              onClick={() => handleProtectedNavigation('/documents')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Tài liệu
            </button>
            <button 
              onClick={() => handleProtectedNavigation('/blog')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => handleProtectedNavigation('/contact')}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Liên hệ
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-purple-50"
              onClick={() => handleProtectedNavigation('/notifications')}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            
            <Link to="/login">
              <Button className="hero-gradient text-white hover:opacity-90 px-6 py-2 shadow-lg">
                <LogIn className="w-4 h-4 mr-2" />
                Đăng nhập
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
