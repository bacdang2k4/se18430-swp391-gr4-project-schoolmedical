
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, TrendingUp, Stethoscope, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const features = [
    { 
      icon: Stethoscope, 
      title: 'Khám sức khỏe định kỳ', 
      description: 'Theo dõi và quản lý lịch khám sức khỏe định kỳ cho học sinh',
      color: 'text-purple-600'
    },
    { 
      icon: Activity, 
      title: 'Theo dõi sức khỏe', 
      description: 'Giám sát chỉ số sức khỏe và phát triển thể chất của học sinh',
      color: 'text-blue-600'
    },
    { 
      icon: Shield, 
      title: 'Bảo mật thông tin', 
      description: 'Đảm bảo an toàn và bảo mật tuyệt đối cho dữ liệu y tế',
      color: 'text-green-600'
    },
    { 
      icon: Users, 
      title: 'Quản lý tập trung', 
      description: 'Hệ thống quản lý toàn diện cho nhà trường và phụ huynh',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { label: 'Học sinh được quản lý', value: '10,000+' },
    { label: 'Hồ sơ sức khỏe', value: '25,000+' },
    { label: 'Độ tin cậy', value: '99.9%' },
    { label: 'Năm kinh nghiệm', value: '5+' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-purple-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Tại sao chọn 
            <span className="hero-gradient bg-clip-text text-transparent"> MonaHealth?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hệ thống quản lý y tế học đường hiện đại với công nghệ AI, 
            mang đến trải nghiệm chăm sóc sức khỏe toàn diện và hiệu quả.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-2 animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-0">
                  <div className={`w-16 h-16 mx-auto mb-4 hero-gradient rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="card-gradient rounded-3xl p-8 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-slide-up">
          <Link to="/login">
            <Button size="lg" className="hero-gradient text-white px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg">
              Bắt đầu sử dụng ngay
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
