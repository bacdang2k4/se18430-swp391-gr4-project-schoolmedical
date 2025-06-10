
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, User, Phone, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-mona-surface via-white to-muted/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center animate-slide-up">
            <div className="w-16 h-16 mona-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {isLogin ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {isLogin ? 'Đăng nhập để truy cập hệ thống y tế học đường' : 'Tham gia cộng đồng chăm sóc sức khỏe học sinh'}
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 animate-slide-up delay-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">
                {isLogin ? 'Đăng nhập tài khoản' : 'Thông tin đăng ký'}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin ? 'Nhập thông tin đăng nhập của bạn' : 'Điền đầy đủ thông tin để tạo tài khoản'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">Họ và tên</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="fullName" 
                        type="text" 
                        placeholder="Nhập họ và tên"
                        className="pl-10 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Số điện thoại</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="Nhập số điện thoại"
                        className="pl-10 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Nhập địa chỉ email"
                    className="pl-10 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Nhập mật khẩu"
                    className="pl-10 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Xác nhận mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Nhập lại mật khẩu"
                      className="pl-10 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      id="remember" 
                      type="checkbox" 
                      className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <Label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
                      Ghi nhớ đăng nhập
                    </Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
              )}

              <Link to="/otp-verification">
                <Button className="w-full mona-gradient text-white py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
                </Button>
              </Link>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                </span>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-sm text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </div>

              {/* Security note */}
              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  🔒 Thông tin của bạn được bảo vệ bằng mã hóa SSL 256-bit
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
