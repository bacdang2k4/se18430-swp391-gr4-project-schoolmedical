
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Heart, Eye, Ear, Shield, Pill } from 'lucide-react';

const HealthProfile = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Thông tin cơ bản', icon: User },
    { id: 'medical', label: 'Tiền sử bệnh', icon: Heart },
    { id: 'vision', label: 'Thị lực', icon: Eye },
    { id: 'hearing', label: 'Thính lực', icon: Ear },
    { id: 'vaccination', label: 'Tiêm chủng', icon: Shield },
    { id: 'medication', label: 'Thuốc men', icon: Pill },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Họ và tên học sinh</Label>
                <Input id="studentName" placeholder="Nhập họ và tên" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Ngày sinh</Label>
                <Input id="birthDate" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <select className="w-full p-2 border border-input rounded-md bg-background">
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Nhóm máu</Label>
                <select className="w-full p-2 border border-input rounded-md bg-background">
                  <option value="">Chọn nhóm máu</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Chiều cao (cm)</Label>
                <Input id="height" type="number" placeholder="Nhập chiều cao" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Cân nặng (kg)</Label>
                <Input id="weight" type="number" placeholder="Nhập cân nặng" />
              </div>
            </div>
          </div>
        );
      case 'medical':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="allergies">Dị ứng</Label>
              <Textarea id="allergies" placeholder="Mô tả các loại dị ứng (thực phẩm, thuốc, môi trường...)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chronicDiseases">Bệnh mãn tính</Label>
              <Textarea id="chronicDiseases" placeholder="Mô tả các bệnh mãn tính (tim mạch, đái tháo đường, hen suyễn...)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Tiền sử điều trị</Label>
              <Textarea id="medicalHistory" placeholder="Mô tả các ca điều trị, phẫu thuật đã thực hiện" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="familyHistory">Tiền sử gia đình</Label>
              <Textarea id="familyHistory" placeholder="Các bệnh di truyền hoặc bệnh lý trong gia đình" />
            </div>
          </div>
        );
      case 'vision':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leftEye">Thị lực mắt trái</Label>
                <Input id="leftEye" placeholder="VD: 10/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rightEye">Thị lực mắt phải</Label>
                <Input id="rightEye" placeholder="VD: 10/10" />
              </div>
            </div>
            <div className="space-y-3">
              <Label>Vấn đề về mắt</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="glasses" />
                  <Label htmlFor="glasses">Đeo kính</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="colorBlind" />
                  <Label htmlFor="colorBlind">Mù màu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="eyeDisease" />
                  <Label htmlFor="eyeDisease">Bệnh về mắt khác</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eyeNotes">Ghi chú thêm</Label>
              <Textarea id="eyeNotes" placeholder="Mô tả chi tiết về tình trạng thị lực" />
            </div>
          </div>
        );
      case 'hearing':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Tình trạng thính lực</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="normalHearing" />
                  <Label htmlFor="normalHearing">Thính lực bình thường</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hearingAid" />
                  <Label htmlFor="hearingAid">Sử dụng máy trợ thính</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hearingLoss" />
                  <Label htmlFor="hearingLoss">Giảm thính lực</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hearingNotes">Ghi chú về thính lực</Label>
              <Textarea id="hearingNotes" placeholder="Mô tả chi tiết về tình trạng thính lực" />
            </div>
          </div>
        );
      case 'vaccination':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Vaccine đã tiêm</Label>
              <div className="grid grid-cols-2 gap-2">
                {['BCG', 'Bại liệt', 'DPT', 'Sởi', 'Viêm gan B', 'Thủy đậu', 'HPV', 'Viêm não Nhật Bản'].map((vaccine) => (
                  <div key={vaccine} className="flex items-center space-x-2">
                    <Checkbox id={vaccine} />
                    <Label htmlFor={vaccine}>{vaccine}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vaccinationNotes">Ghi chú tiêm chủng</Label>
              <Textarea id="vaccinationNotes" placeholder="Ghi chú về lịch sử tiêm chủng, phản ứng sau tiêm..." />
            </div>
          </div>
        );
      case 'medication':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentMeds">Thuốc đang sử dụng</Label>
              <Textarea id="currentMeds" placeholder="Liệt kê các loại thuốc đang sử dụng thường xuyên" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyMeds">Thuốc cấp cứu</Label>
              <Textarea id="emergencyMeds" placeholder="Thuốc cần thiết khi có tình huống cấp cứu (hen suyễn, dị ứng...)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicationAllergies">Dị ứng thuốc</Label>
              <Textarea id="medicationAllergies" placeholder="Liệt kê các loại thuốc gây dị ứng" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-healthcare-surface py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Hồ sơ sức khỏe học sinh</h1>
            <p className="mt-2 text-muted-foreground">
              Quản lý thông tin sức khỏe chi tiết của học sinh
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Danh mục</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-colors ${
                            activeTab === tab.id
                              ? 'bg-primary/10 text-primary border-r-2 border-primary'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </CardTitle>
                  <CardDescription>
                    Vui lòng điền đầy đủ thông tin để đảm bảo chăm sóc sức khỏe tốt nhất
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderTabContent()}
                  
                  <div className="flex justify-end mt-6 pt-6 border-t">
                    <Button className="healthcare-gradient text-white px-8">
                      Lưu thông tin
                    </Button>
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
