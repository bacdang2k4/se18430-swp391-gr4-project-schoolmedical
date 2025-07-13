package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateBlogRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateBlogRequest;
import com.dinhbachihi.spring_security.dto.request.ViewBlogRequest;
import com.dinhbachihi.spring_security.entity.Blog;

import java.util.List;

public interface BlogService {
    Blog createBlog(CreateBlogRequest request);
    Blog updateBlog(UpdateBlogRequest request, Long blogId);
    ViewBlogRequest getBlogById(Long blogId);
    List<Blog> getAllBlogs();
    String acceptBlog(Long blogId);
    String rejectBlog(Long blogId);
    String deleteBlog(Long blogId);
}
