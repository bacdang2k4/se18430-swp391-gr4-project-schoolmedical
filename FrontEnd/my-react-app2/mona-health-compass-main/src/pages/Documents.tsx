
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Search, Filter, Calendar, User } from 'lucide-react';

const Documents = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tất cả', count: 24 },
    { id: 'health-guide', label: 'Hướng dẫn sức khỏe', count: 8 },
    { id: 'nutrition', label: 'Dinh dưỡng', count: 6 },
    { id: 'disease-prevention', label: 'Phòng chống bệnh tật', count: 5 },
    { id: 'first-aid', label: 'Sơ cứu', count: 3 },
    { id: 'mental-health', label: 'Sức khỏe tâm thần', count: 2 },
  ];

  const documents = [
    {
      id: 1,
      title: 'Hướng dẫn phòng chống cúm mùa cho học sinh',
      description: 'Tài liệu hướng dẫn các biện pháp phòng chống cúm mùa hiệu quả trong trường học',
      category: 'disease-prevention',
      date: '2024-01-15',
      author: 'BS. Nguyễn Văn A',
      downloads: 156,
      fileSize: '2.3 MB',
      fileType: 'PDF'
    },
    {
      id: 2,
      title: 'Chế độ dinh dưỡng cân bằng cho trẻ em',
      description: 'Hướng dẫn xây dựng thực đơn dinh dưỡng phù hợp với từng độ tuổi học sinh',
      category: 'nutrition',
      date: '2024-01-10',
      author: 'ThS. Trần Thị B',
      downloads: 203,
      fileSize: '1.8 MB',
      fileType: 'PDF'
    },
    {
      id: 3,
      title: 'Kỹ năng sơ cứu cơ bản trong trường học',
      description: 'Tài liệu đào tạo kỹ năng sơ cứu cơ bản cho giáo viên và nhân viên y tế',
      category: 'first-aid',
      date: '2024-01-08',
      author: 'BS. Lê Văn C',
      downloads: 89,
      fileSize: '3.1 MB',
      fileType: 'PDF'
    },
    {
      id: 4,
      title: 'Chăm sóc sức khỏe tâm thần học sinh',
      description: 'Hướng dẫn nhận biết và hỗ trợ học sinh có vấn đề về sức khỏe tâm thần',
      category: 'mental-health',
      date: '2024-01-05',
      author: 'ThS. Phạm Thị D',
      downloads: 124,
      fileSize: '2.7 MB',
      fileType: 'PDF'
    },
    {
      id: 5,
      title: 'Hướng dẫn vệ sinh cá nhân cho học sinh',
      description: 'Tài liệu giáo dục về vệ sinh cá nhân và thói quen sống lành mạnh',
      category: 'health-guide',
      date: '2024-01-03',
      author: 'BS. Hoàng Văn E',
      downloads: 167,
      fileSize: '1.5 MB',
      fileType: 'PDF'
    },
    {
      id: 6,
      title: 'Phòng chống bệnh truyền nhiễm trong trường học',
      description: 'Các biện pháp phòng chống và kiểm soát bệnh truyền nhiễm tại cơ sở giáo dục',
      category: 'disease-prevention',
      date: '2024-01-01',
      author: 'BS. Ngô Thị F',
      downloads: 198,
      fileSize: '2.9 MB',
      fileType: 'PDF'
    }
  ];

  const filteredDocuments = activeCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);

  return (
    <Layout>
      <div className="min-h-screen bg-healthcare-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Tài liệu sức khỏe học đường</h1>
            <p className="mt-2 text-muted-foreground">
              Kho tài liệu chuyên môn về chăm sóc sức khỏe học sinh
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Tìm kiếm tài liệu..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Lọc
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Danh mục</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors ${
                          activeCategory === category.id
                            ? 'bg-primary/10 text-primary border-r-2 border-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <span>{category.label}</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Documents List */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {doc.title}
                          </h3>
                          <p className="text-muted-foreground mb-3">
                            {doc.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {doc.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(doc.date).toLocaleDateString('vi-VN')}
                            </div>
                            <div>
                              <Download className="w-4 h-4 inline mr-1" />
                              {doc.downloads} lượt tải
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {doc.fileType}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {doc.fileSize}
                              </span>
                            </div>
                            <Button size="sm" className="healthcare-gradient text-white">
                              <Download className="w-4 h-4 mr-2" />
                              Tải xuống
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Trước</Button>
                  <Button size="sm" className="bg-primary text-white">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Tiếp</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
