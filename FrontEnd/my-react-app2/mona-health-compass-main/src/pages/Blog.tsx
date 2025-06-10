
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, User, Eye, Heart, MessageCircle, Tag } from 'lucide-react';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tất cả bài viết', count: 18 },
    { id: 'experience', label: 'Kinh nghiệm', count: 8 },
    { id: 'tips', label: 'Mẹo hay', count: 5 },
    { id: 'news', label: 'Tin tức', count: 3 },
    { id: 'research', label: 'Nghiên cứu', count: 2 },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Kinh nghiệm xử lý khi học sinh bị sốt cao đột ngột',
      excerpt: 'Chia sẻ từ 10 năm kinh nghiệm làm việc tại phòng y tế trường học, những bước cần thiết khi học sinh gặp tình huống sốt cao...',
      content: 'Nội dung chi tiết về cách xử lý khi học sinh bị sốt cao...',
      category: 'experience',
      author: 'Y tá Nguyễn Thị Lan',
      authorAvatar: '/api/placeholder/40/40',
      date: '2024-01-15',
      readTime: '5 phút đọc',
      views: 1234,
      likes: 89,
      comments: 23,
      tags: ['sốt cao', 'sơ cứu', 'kinh nghiệm'],
      featured: true
    },
    {
      id: 2,
      title: 'Cách tổ chức chiến dịch tiêm chủng hiệu quả tại trường',
      excerpt: 'Hướng dẫn chi tiết từ khâu chuẩn bị đến thực hiện và theo dõi sau tiêm chủng, đảm bảo an toàn và hiệu quả...',
      category: 'tips',
      author: 'BS. Trần Văn Minh',
      authorAvatar: '/api/placeholder/40/40',
      date: '2024-01-12',
      readTime: '7 phút đọc',
      views: 856,
      likes: 67,
      comments: 15,
      tags: ['tiêm chủng', 'tổ chức', 'quy trình'],
      featured: false
    },
    {
      id: 3,
      title: 'Nghiên cứu mới về tác động của dinh dưỡng đến học tập',
      excerpt: 'Kết quả nghiên cứu cho thấy mối liên hệ chặt chẽ giữa chế độ dinh dưỡng và khả năng tập trung học tập của học sinh...',
      category: 'research',
      author: 'TS. Phạm Thị Hoa',
      authorAvatar: '/api/placeholder/40/40',
      date: '2024-01-10',
      readTime: '10 phút đọc',
      views: 634,
      likes: 45,
      comments: 8,
      tags: ['nghiên cứu', 'dinh dưỡng', 'học tập'],
      featured: false
    },
    {
      id: 4,
      title: 'Mẹo hay giúp học sinh hình thành thói quen vệ sinh tốt',
      excerpt: 'Những cách đơn giản nhưng hiệu quả để khuyến khích học sinh duy trì thói quen vệ sinh cá nhân và môi trường...',
      category: 'tips',
      author: 'Cô Lê Thị Mai',
      authorAvatar: '/api/placeholder/40/40',
      date: '2024-01-08',
      readTime: '4 phút đọc',
      views: 923,
      likes: 76,
      comments: 19,
      tags: ['vệ sinh', 'thói quen', 'giáo dục'],
      featured: false
    },
    {
      id: 5,
      title: 'Cập nhật: Hướng dẫn mới về phòng chống COVID-19 tại trường học',
      excerpt: 'Bộ Y tế vừa ban hành hướng dẫn cập nhật về các biện pháp phòng chống COVID-19 trong môi trường giáo dục...',
      category: 'news',
      author: 'Ban biên tập',
      authorAvatar: '/api/placeholder/40/40',
      date: '2024-01-06',
      readTime: '6 phút đọc',
      views: 1567,
      likes: 123,
      comments: 34,
      tags: ['COVID-19', 'hướng dẫn', 'phòng chống'],
      featured: false
    }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <Layout>
      <div className="min-h-screen bg-healthcare-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Blog sức khỏe học đường</h1>
            <p className="mt-2 text-muted-foreground">
              Chia sẻ kinh nghiệm và kiến thức chuyên môn từ cộng đồng y tế học đường
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Tìm kiếm bài viết..." 
                className="pl-10"
              />
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <Card className="mb-8 bg-white shadow-lg overflow-hidden">
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Nổi bật
                  </span>
                </div>
                <div className="bg-gradient-to-r from-primary/20 to-healthcare-secondary/20 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {featuredPost.views.toLocaleString()} lượt xem
                    </div>
                  </div>
                  <Button className="healthcare-gradient text-white">
                    Đọc tiếp
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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

              {/* Popular Tags */}
              <Card className="bg-white shadow-sm mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Thẻ phổ biến</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['sơ cứu', 'dinh dưỡng', 'tiêm chủng', 'vệ sinh', 'COVID-19', 'kinh nghiệm'].map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 rounded text-xs hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {filteredPosts.filter(post => !post.featured).map((post) => (
                  <Card key={post.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary cursor-pointer transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.date).toLocaleDateString('vi-VN')}
                            </div>
                            <span>{post.readTime}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {post.views.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {post.likes}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {post.comments}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Đọc tiếp
                            </Button>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-1">
                            {post.tags.map((tag) => (
                              <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
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

export default Blog;
