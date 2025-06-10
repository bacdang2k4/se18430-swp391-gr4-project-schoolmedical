
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, User, Bell, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();

  const handleProtectedNavigation = (path: string) => {
    // Always require login for protected routes
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 mona-gradient rounded-lg flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MonaHealth</h1>
              <p className="text-xs text-muted-foreground">Y tế học đường thông minh</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Trang chủ
            </Link>
            <button 
              onClick={() => handleProtectedNavigation('/health-profile')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Hồ sơ sức khỏe
            </button>
            <button 
              onClick={() => handleProtectedNavigation('/documents')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Tài liệu
            </button>
            <button 
              onClick={() => handleProtectedNavigation('/blog')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => handleProtectedNavigation('/contact')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Liên hệ
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => handleProtectedNavigation('/notifications')}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            
            <Link to="/login">
              <Button variant="ghost" className="text-primary hover:bg-primary/10">
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
