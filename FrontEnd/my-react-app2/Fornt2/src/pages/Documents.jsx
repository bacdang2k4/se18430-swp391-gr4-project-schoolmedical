
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Search, Filter, Eye, Calendar } from 'lucide-react';

const Documents = () => {
  const documents = [
    {
      id: 1,
      title: 'Hướng dẫn dinh dưỡng cho học sinh',
      description: 'Tài liệu hướng dẫn chế độ dinh dưỡng phù hợp cho từng độ tuổi học sinh',
      category: 'Dinh dưỡng',
      date: '15/12/2024',
      type: 'PDF',
      size: '2.5 MB',
      downloads: 156
    },
    {
      id: 2,
      title: 'Quy trình xử lý tai nạn học đường',
      description: 'Hướng dẫn chi tiết các bước xử lý khi xảy ra tai nạn trong trường học',
      category: 'An toàn',
      date: '10/12/2024',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 203
    },
    {
      id: 3,
      title: 'Lịch tiêm chủng cho học sinh',
      description: 'Lịch trình tiêm chủng bắt buộc và tự nguyện cho các độ tuổi',
      category: 'Tiêm chủng',
      date: '05/12/2024',
      type: 'PDF',
      size: '1.2 MB',
      downloads: 89
    },
    {
      id: 4,
      title: 'Phòng chống bệnh mùa lạnh',
      description: 'Các biện pháp phòng chống cảm cúm và bệnh đường hô hấp',
      category: 'Phòng bệnh',
      date: '01/12/2024',
      type: 'PDF',
      size: '3.1 MB',
      downloads: 134
    },
    {
      id: 5,
      title: 'Chăm sóc sức khỏe tâm thần học sinh',
      description: 'Hướng dẫn nhận biết và hỗ trợ các vấn đề sức khỏe tâm thần',
      category: 'Sức khỏe tâm thần',
      date: '28/11/2024',
      type: 'PDF',
      size: '2.7 MB',
      downloads: 78
    },
    {
      id: 6,
      title: 'Vệ sinh cá nhân và môi trường',
      description: 'Tầm quan trọng của vệ sinh cá nhân và môi trường học tập',
      category: 'Vệ sinh',
      date: '25/11/2024',
      type: 'PDF',
      size: '1.9 MB',
      downloads: 167
    }
  ];

  const categories = ['Tất cả', 'Dinh dưỡng', 'An toàn', 'Tiêm chủng', 'Phòng bệnh', 'Sức khỏe tâm thần', 'Vệ sinh'];

  const getCategoryColor = (category) => {
    const colors = {
      'Dinh dưỡng': 'bg-green-100 text-green-800',
      'An toàn': 'bg-red-100 text-red-800',
      'Tiêm chủng': 'bg-blue-100 text-blue-800',
      'Phòng bệnh': 'bg-purple-100 text-purple-800',
      'Sức khỏe tâm thần': 'bg-orange-100 text-orange-800',
      'Vệ sinh': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-mona-surface via-white to-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl font-bold text-foreground mb-4">Thư viện tài liệu</h1>
            <p className="text-xl text-muted-foreground">Kho tài liệu y tế học đường phong phú và cập nhật</p>
          </div>

          {/* Search and Filter */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 mb-8 animate-slide-up delay-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Tìm kiếm tài liệu..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category, index) => (
                  <Badge 
                    key={index}
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <Card 
                key={doc.id} 
                className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className={getCategoryColor(doc.category)}>
                      {doc.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{doc.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {doc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {doc.date}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <Download className="w-4 h-4 inline mr-1" />
                      {doc.downloads} lượt tải
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Xem
                      </Button>
                      <Button size="sm" className="mona-gradient text-white">
                        <Download className="w-4 h-4 mr-1" />
                        Tải
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12 animate-slide-up">
            <Button variant="outline" size="lg" className="px-8">
              Tải thêm tài liệu
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
