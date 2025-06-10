
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Heart, Award, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-mona-surface via-white to-muted/30 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                ✨ Nền tảng Y tế Học đường Thông minh
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Quản lý y tế 
                <span className="block mona-gradient bg-clip-text text-transparent">học đường hiện đại</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Hệ thống quản lý y tế học đường toàn diện, kết nối phụ huynh, nhà trường 
                và đội ngũ y tế để chăm sóc sức khỏe học sinh một cách khoa học và hiệu quả.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="mona-gradient border-0 hover:shadow-lg transition-all duration-300 text-white">
                  Đăng nhập hệ thống
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
                Tìm hiểu thêm
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">2,847+</p>
                <p className="text-sm text-muted-foreground">Học sinh được chăm sóc</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-2xl font-bold text-foreground">99.9%</p>
                <p className="text-sm text-muted-foreground">Độ tin cậy hệ thống</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Hỗ trợ liên tục</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Được chứng nhận</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Phản hồi nhanh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Đánh giá cao</span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up delay-300">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 mona-gradient rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Trường Tiểu học ABC</h3>
                    <p className="text-sm text-muted-foreground">Hệ thống y tế học đường</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">Kiểm tra sức khỏe định kỳ</span>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Hoàn thành</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-800">Tiêm chủng định kỳ</span>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Đã lên lịch</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-yellow-800">Theo dõi thuốc</span>
                      <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Cần xem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full blur-lg animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
