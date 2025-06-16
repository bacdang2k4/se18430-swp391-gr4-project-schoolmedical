package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateBlogRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateBlogRequest;
import com.dinhbachihi.spring_security.entity.Blog;

public interface BlogService {
    Blog createBlog(CreateBlogRequest request);
    Blog updateBlog(UpdateBlogRequest request, Long blogId);
}
