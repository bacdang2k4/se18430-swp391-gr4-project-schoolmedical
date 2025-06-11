
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
                Nhập mã xác thực
              </CardTitle>
              <CardDescription>
                Mã xác thực đã được gửi đến <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button 
                className="w-full mona-gradient text-white font-semibold py-3"
                disabled={otp.length !== 6}
              >
                Xác thực
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Không nhận được mã?
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  Gửi lại mã xác thực
                </Button>
              </div>

              <div className="text-center">
                <Link to="/login" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại đăng nhập
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OtpVerification;
