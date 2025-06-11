
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  BarChart3, 
  Shield, 
  Bell, 
  Calendar,
  Stethoscope,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: 'Hồ sơ sức khỏe điện tử',
      description: 'Quản lý toàn diện thông tin sức khỏe của từng học sinh với hệ thống lưu trữ an toàn và dễ truy cập.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      title: 'Quản lý học sinh',
      description: 'Theo dõi và quản lý thông tin cá nhân, lịch sử khám bệnh và tình trạng sức khỏe của tất cả học sinh.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: BarChart3,
      title: 'Báo cáo thống kê',
      description: 'Tạo báo cáo chi tiết về tình hình sức khỏe, xu hướng bệnh tật và hiệu quả các chương trình y tế.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Shield,
      title: 'Bảo mật dữ liệu',
      description: 'Đảm bảo an toàn tuyệt đối cho thông tin cá nhân và dữ liệu y tế với các tiêu chuẩn bảo mật cao nhất.',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Bell,
      title: 'Thông báo tự động',
      description: 'Gửi thông báo kịp thời về lịch khám, tiêm chủng và các vấn đề sức khỏe cần chú ý.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Calendar,
      title: 'Lịch hẹn thông minh',
      description: 'Quản lý lịch khám bệnh, tiêm chủng và các hoạt động y tế khác một cách khoa học và hiệu quả.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      icon: Stethoscope,
      title: 'Khám sức khỏe định kỳ',
      description: 'Tổ chức và theo dõi các đợt khám sức khỏe định kỳ, đảm bảo sức khỏe tối ưu cho học sinh.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: BookOpen,
      title: 'Tài liệu giáo dục',
      description: 'Cung cấp thư viện tài liệu phong phú về sức khỏe, dinh dưỡng và phòng chống bệnh tật.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tính năng 
            <span className="mona-gradient bg-clip-text text-transparent"> nổi bật</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Khám phá những tính năng mạnh mẽ giúp quản lý sức khỏe học sinh hiệu quả và toàn diện
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:scale-105 animate-slide-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-mona-surface to-white rounded-3xl p-12 animate-slide-up">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Sẵn sàng bắt đầu?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn trường học đã tin tướng và sử dụng MonaHealth 
            để chăm sóc sức khỏe học sinh tốt hơn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="mona-gradient text-white px-8 py-3 text-lg font-semibold">
                Đăng ký ngay
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
              Liên hệ tư vấn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
