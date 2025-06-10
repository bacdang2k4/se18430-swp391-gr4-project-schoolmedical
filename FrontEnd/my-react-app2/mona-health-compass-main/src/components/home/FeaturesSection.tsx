
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Shield, 
  Calendar, 
  Pill, 
  Stethoscope, 
  Users,
  Bell,
  BarChart3,
  Heart,
  Lock
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Hồ sơ sức khỏe điện tử",
      description: "Quản lý hồ sơ sức khỏe học sinh đầy đủ và chi tiết, bao gồm tiền sử bệnh, dị ứng, và các thông tin y tế quan trọng.",
      color: "bg-blue-500"
    },
    {
      icon: Shield,
      title: "Xử lý sự kiện y tế",
      description: "Ghi nhận và xử lý nhanh chóng các sự kiện y tế như tai nạn, sốt, té ngã trong môi trường học đường.",
      color: "bg-green-500"
    },
    {
      icon: Calendar,
      title: "Kiểm tra định kỳ",
      description: "Lên lịch và quản lý quá trình kiểm tra sức khỏe định kỳ cho học sinh một cách có hệ thống.",
      color: "bg-purple-500"
    },
    {
      icon: Pill,
      title: "Quản lý thuốc",
      description: "Theo dõi việc phụ huynh gửi thuốc và quản lý việc cho học sinh uống thuốc tại trường.",
      color: "bg-orange-500"
    },
    {
      icon: Stethoscope,
      title: "Tiêm chủng",
      description: "Quản lý toàn bộ quy trình tiêm chủng từ thông báo, đồng ý đến thực hiện và theo dõi sau tiêm.",
      color: "bg-red-500"
    },
    {
      icon: Users,
      title: "Phân quyền người dùng",
      description: "Hệ thống phân quyền rõ ràng cho admin, y tá và phụ huynh với các chức năng phù hợp.",
      color: "bg-cyan-500"
    },
    {
      icon: Bell,
      title: "Thông báo tự động",
      description: "Gửi thông báo tự động cho phụ huynh về các sự kiện y tế, lịch kiểm tra và kết quả sức khỏe.",
      color: "bg-yellow-500"
    },
    {
      icon: BarChart3,
      title: "Báo cáo & Thống kê",
      description: "Tạo báo cáo và thống kê chi tiết về tình hình sức khỏe học sinh và hoạt động y tế trường học.",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Tính năng nổi bật
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Giải pháp toàn diện cho 
            <span className="mona-gradient bg-clip-text text-transparent"> y tế học đường</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hệ thống quản lý y tế học đường hiện đại với các tính năng thông minh, 
            đáp ứng mọi nhu cầu chăm sóc sức khỏe học sinh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Security Badge */}
        <div className="mt-16 text-center animate-slide-up delay-700">
          <div className="inline-flex items-center px-6 py-3 bg-muted rounded-full">
            <Lock className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-foreground">
              Bảo mật dữ liệu cấp độ ngân hàng - Tuân thủ tiêu chuẩn ISO 27001
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
