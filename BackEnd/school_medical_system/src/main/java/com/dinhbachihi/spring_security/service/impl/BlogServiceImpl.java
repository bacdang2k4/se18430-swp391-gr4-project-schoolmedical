package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.CreateBlogRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateBlogRequest;
import com.dinhbachihi.spring_security.dto.request.ViewBlogRequest;
import com.dinhbachihi.spring_security.entity.Blog;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.BlogRepository;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public Blog createBlog(CreateBlogRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setAuthor(user);
        blog.setType(request.getType());
        return blogRepository.save(blog);
    }

    public Blog updateBlog(UpdateBlogRequest request, Long blogId){
        Blog blog = blogRepository.getReferenceById(blogId);
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        return blogRepository.save(blog);
    }

    public ViewBlogRequest getBlogById(Long blogId){
        Blog blog = blogRepository.getReferenceById(blogId);
        ViewBlogRequest request = new ViewBlogRequest();
        request.setTitle(blog.getTitle());
        request.setContent(blog.getContent());
        request.setUpdatedAt(blog.getUpdatedAt());
        return request;
    }

    public List<Blog> getAllBlogs(){
        return blogRepository.findAll();
    }
}
