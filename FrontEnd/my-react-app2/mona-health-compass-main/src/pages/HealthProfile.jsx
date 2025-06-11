
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, User, Calendar, FileText, Activity, Phone, Mail, MapPin } from 'lucide-react';

const HealthProfile = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-mona-surface via-white to-muted/30 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl font-bold text-foreground mb-4">Hồ sơ sức khỏe</h1>
            <p className="text-xl text-muted-foreground">Quản lý thông tin sức khỏe cá nhân</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 animate-slide-up">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mona-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">Nguyễn Văn A</CardTitle>
                  <CardDescription>Học sinh lớp 10A1</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Ngày sinh: 15/03/2008</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>0123 456 789</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>nguyenvana@email.com</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>123 Đường ABC, TP.HCM</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Tình trạng sức khỏe</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Tốt</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 animate-slide-up delay-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Chỉ số cơ bản
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Chiều cao</span>
                      <p className="font-semibold">165 cm</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cân nặng</span>
                      <p className="font-semibold">55 kg</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">BMI</span>
                      <p className="font-semibold">20.2</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nhóm máu</span>
                      <p className="font-semibold">O+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Records */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 animate-slide-up delay-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    Lịch sử khám bệnh
                  </CardTitle>
                  <CardDescription>Các lần khám gần đây</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: '15/12/2024', type: 'Khám định kỳ', doctor: 'BS. Nguyễn Thị B', result: 'Bình thường', status: 'success' },
                      { date: '20/11/2024', type: 'Khám chuyên khoa', doctor: 'BS. Trần Văn C', result: 'Cần theo dõi', status: 'warning' },
                      { date: '10/10/2024', type: 'Tiêm vaccine', doctor: 'Y tá Lê Thị D', result: 'Hoàn thành', status: 'success' }
                    ].map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{record.type}</h4>
                            <Badge variant={record.status === 'success' ? 'secondary' : 'outline'} 
                                   className={record.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {record.result}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Bác sĩ: {record.doctor}</p>
                          <p className="text-sm text-muted-foreground">Ngày khám: {record.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Xem tất cả lịch sử
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 animate-slide-up delay-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-primary" />
                    Lịch hẹn sắp tới
                  </CardTitle>
                  <CardDescription>Các cuộc hẹn đã được lên lịch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: '25/12/2024', time: '09:00', type: 'Khám định kỳ', doctor: 'BS. Nguyễn Thị B' },
                      { date: '30/12/2024', time: '14:30', type: 'Tiêm vaccine', doctor: 'Y tá Lê Thị D' }
                    ].map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{appointment.type}</h4>
                          <p className="text-sm text-muted-foreground">Bác sĩ: {appointment.doctor}</p>
                          <p className="text-sm text-muted-foreground">{appointment.date} - {appointment.time}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Chi tiết
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HealthProfile;
