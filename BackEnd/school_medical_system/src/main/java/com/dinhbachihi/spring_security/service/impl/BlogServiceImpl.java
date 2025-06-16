package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.CreateBlogRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateBlogRequest;
import com.dinhbachihi.spring_security.entity.Blog;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.BlogRepository;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public Blog createBlog(CreateBlogRequest request){
        User user = userRepository.findById(request.getAuthor())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setAuthor(user);
        return blogRepository.save(blog);
    }

    public Blog updateBlog(UpdateBlogRequest request, Long blogId){
        Blog blog = blogRepository.getReferenceById(blogId);
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        return blogRepository.save(blog);
    }
}
