
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="relative banner-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                🏥 Hệ thống Y tế Học đường Hiện đại
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Chăm sóc sức khỏe
                <span className="block text-yellow-300">học sinh toàn diện</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Nền tảng quản lý y tế học đường thông minh, kết nối phụ huynh, nhà trường 
                và đội ngũ y tế để chăm sóc sức khỏe học sinh một cách khoa học và hiệu quả.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/login">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 border-0 shadow-lg">
                  Bắt đầu sử dụng
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Play className="w-5 h-5 mr-2" />
                Xem demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">2,847+</p>
                <p className="text-sm text-white/80">Học sinh</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">99.9%</p>
                <p className="text-sm text-white/80">Độ tin cậy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-sm text-white/80">Hỗ trợ</p>
              </div>
            </div>
          </div>

          {/* Image/Mockup */}
          <div className="relative animate-slide-up delay-300">
            <div className="relative">
              {/* Main Device Mockup */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 mona-gradient rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">TH</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Trường Tiểu học ABC</h3>
                      <p className="text-sm text-muted-foreground">Hệ thống y tế học đường</p>
                    </div>
                  </div>
                  
                  {/* Health Cards */}
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-800">Kiểm tra sức khỏe định kỳ</p>
                          <p className="text-xs text-green-600">Hoàn thành - Tháng 10/2024</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">💉</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-800">Tiêm chủng định kỳ</p>
                          <p className="text-xs text-blue-600">Đã lên lịch - 15/11/2024</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">💊</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-yellow-800">Thuốc điều trị</p>
                          <p className="text-xs text-yellow-600">Cần xem lại - Hôm nay</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-pulse">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-xs font-medium">Thông báo mới</p>
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
