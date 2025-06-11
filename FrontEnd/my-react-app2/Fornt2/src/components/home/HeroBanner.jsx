
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, ArrowRight, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-white animate-slide-up">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/90 text-lg font-medium">Hệ thống y tế học đường thông minh</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              MonaHealth
              <span className="block text-3xl md:text-4xl font-light text-white/90 mt-2">
                Chăm sóc sức khỏe toàn diện
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Giải pháp quản lý sức khỏe học sinh hiện đại với công nghệ AI, 
              đảm bảo an toàn và phát triển tối ưu cho từng em.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-lg">
                  Bắt đầu ngay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/30 text-purple-600 hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Right side - Stats/Features */}
          <div className="grid grid-cols-1 gap-6 animate-slide-up delay-300">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-white mr-3" />
                <div>
                  <h3 className="text-white font-semibold text-lg">10,000+</h3>
                  <p className="text-white/80">Học sinh được quản lý</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-white mr-3" />
                <div>
                  <h3 className="text-white font-semibold text-lg">100%</h3>
                  <p className="text-white/80">Bảo mật dữ liệu</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <Sparkles className="w-8 h-8 text-white mr-3" />
                <div>
                  <h3 className="text-white font-semibold text-lg">AI Technology</h3>
                  <p className="text-white/80">Công nghệ tiên tiến</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
