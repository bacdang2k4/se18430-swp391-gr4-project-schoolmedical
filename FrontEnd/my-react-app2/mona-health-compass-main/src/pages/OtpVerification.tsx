
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [email] = useState('user@example.com'); // This would come from previous step

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-mona-surface via-white to-muted/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center animate-slide-up">
            <div className="mx-auto w-16 h-16 mona-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Xác thực email</h2>
            <p className="mt-2 text-muted-foreground">
              Vui lòng nhập mã xác thực đã được gửi đến email của bạn
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 animate-slide-up delay-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Nhập mã OTP
              </CardTitle>
              <CardDescription>
                Mã xác thực 6 số đã được gửi đến <br />
                <span className="font-medium text-foreground">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="w-12 h-12 text-lg border-border/50 focus:border-primary" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-lg border-border/50 focus:border-primary" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-lg border-border/50 focus:border-primary" />
                    <InputOTPSlot index={3} className="w-12 h-12 text-lg border-border/50 focus:border-primary" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-lg border-border/50 focus:border-primary" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-lg border-border/50 focus:border-primary" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center text-sm text-muted-foreground space-y-2">
                <p>Không nhận được mã xác thực?</p>
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="link" className="p-0 text-primary font-medium text-sm">
                    Gửi lại mã
                  </Button>
                  <span className="text-muted-foreground">hoặc</span>
                  <Button variant="link" className="p-0 text-primary font-medium text-sm">
                    Gọi điện thoại
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Mã sẽ được gửi lại sau <span className="font-medium text-primary">30 giây</span>
                </p>
              </div>

              <Link to="/dashboard">
                <Button 
                  className="w-full mona-gradient text-white py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={otp.length !== 6}
                >
                  Xác thực và tiếp tục
                </Button>
              </Link>

              <div className="flex items-center justify-center">
                <Link 
                  to="/login" 
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Quay lại đăng nhập
                </Link>
              </div>

              {/* Security info */}
              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  🔐 Mã OTP có hiệu lực trong 5 phút và chỉ sử dụng một lần
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OtpVerification;
