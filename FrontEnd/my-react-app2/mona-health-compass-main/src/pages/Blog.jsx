
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, User, Search, Tag, Eye, Heart, MessageCircle } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Tầm quan trọng của dinh dưỡng cân bằng cho học sinh',
      excerpt: 'Dinh dưỡng đóng vai trò quan trọng trong sự phát triển thể chất và trí tuệ của học sinh. Bài viết này sẽ chia sẻ những nguyên tắc cơ bản về dinh dưỡng cân bằng...',
      author: 'BS. Nguyễn Thị Lan',
      date: '15/12/2024',
      readTime: '5 phút đọc',
      category: 'Dinh dưỡng',
      image: '/api/placeholder/400/250',
      views: 234,
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: 'Cách phòng chống cận thị ở học sinh',
      excerpt: 'Tỷ lệ cận thị ở học sinh đang gia tăng alarmingly. Hãy cùng tìm hiểu các biện pháp phòng ngừa hiệu quả để bảo vệ thị lực của các em...',
      author: 'BS. Trần Văn Minh',
      date: '12/12/2024',
      readTime: '7 phút đọc',
      category: 'Mắt',
      image: '/api/placeholder/400/250',
      views: 189,
      likes: 32,
      comments: 8
    },
    {
      id: 3,
      title: 'Stress học tập và cách giải quyết',
      excerpt: 'Áp lực học tập có thể ảnh hưởng nghiêm trọng đến sức khỏe tâm thần của học sinh. Bài viết này sẽ hướng dẫn cách nhận biết và xử lý stress một cách hiệu quả...',
      author: 'TS. Lê Thị Hương',
      date: '10/12/2024',
      readTime: '6 phút đọc',
      category: 'Tâm lý',
      image: '/api/placeholder/400/250',
      views: 156,
      likes: 38,
      comments: 15
    },
    {
      id: 4,
      title: 'Tập thể dục đúng cách cho học sinh',
      excerpt: 'Hoạt động thể chất thường xuyên giúp tăng cường sức khỏe và cải thiện khả năng học tập. Tìm hiểu các bài tập phù hợp với từng độ tuổi...',
      author: 'Thầy Phạm Văn Khoa',
      date: '08/12/2024',
      readTime: '4 phút đọc',
      category: 'Thể dục',
      image: '/api/placeholder/400/250',
      views: 278,
      likes: 52,
      comments: 9
    },
    {
      id: 5,
      title: 'Vệ sinh răng miệng cho trẻ em',
      excerpt: 'Thói quen vệ sinh răng miệng tốt từ nhỏ sẽ giúp trẻ có một hàm răng khỏe mạnh. Cùng tìm hiểu cách chăm sóc răng miệng đúng cách...',
      author: 'BS. Nguyễn Thị Mai',
      date: '05/12/2024',
      readTime: '3 phút đọc',
      category: 'Răng miệng',
      image: '/api/placeholder/400/250',
      views: 145,
      likes: 29,
      comments: 6
    },
    {
      id: 6,
      title: 'Giấc ngủ và sự phát triển của trẻ',
      excerpt: 'Giấc ngủ đủ và chất lượng là yếu tố quan trọng cho sự phát triển của trẻ. Bài viết này sẽ chia sẻ về tầm quan trọng của giấc ngủ và cách cải thiện chất lượng ngủ...',
      author: 'BS. Hoàng Văn Nam',
      date: '02/12/2024',
      readTime: '5 phút đọc',
      category: 'Giấc ngủ',
      image: '/api/placeholder/400/250',
      views: 198,
      likes: 41,
      comments: 11
    }
  ];

  const categories = ['Tất cả', 'Dinh dưỡng', 'Mắt', 'Tâm lý', 'Thể dục', 'Răng miệng', 'Giấc ngủ'];
  const featuredPost = blogPosts[0];

  const getCategoryColor = (category) => {
    const colors = {
      'Dinh dưỡng': 'bg-green-100 text-green-800',
      'Mắt': 'bg-blue-100 text-blue-800',
      'Tâm lý': 'bg-purple-100 text-purple-800',
      'Thể dục': 'bg-orange-100 text-orange-800',
      'Răng miệng': 'bg-pink-100 text-pink-800',
      'Giấc ngủ': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-mona-surface via-white to-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog sức khỏe</h1>
            <p className="text-xl text-muted-foreground">Kiến thức y tế và sức khỏe học đường từ các chuyên gia</p>
          </div>

          {/* Search and Categories */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 mb-8 animate-slide-up delay-100">
            <CardContent className="p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Tìm kiếm bài viết..." 
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Badge 
                    key={index}
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Post */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 mb-8 overflow-hidden animate-slide-up delay-200">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <Badge className={getCategoryColor(featuredPost.category)}>
                  Bài viết nổi bật
                </Badge>
                <CardTitle className="text-2xl font-bold mt-4 mb-3 leading-tight">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4">
                  {featuredPost.excerpt}
                </CardDescription>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {featuredPost.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {featuredPost.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {featuredPost.comments}
                    </span>
                  </div>
                  <Button className="mona-gradient text-white">
                    Đọc tiếp
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <Card 
                key={post.id} 
                className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden animate-slide-up"
                style={{animationDelay: `${(index + 3) * 100}ms`}}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <Badge className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {post.excerpt.substring(0, 120)}...
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-2 mb-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback>{post.author.split(' ').pop().charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{post.author}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                        <span className="mx-2">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {post.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {post.comments}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Đọc tiếp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12 animate-slide-up">
            <Button variant="outline" size="lg" className="px-8">
              Tải thêm bài viết
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
