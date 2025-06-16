package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.CreateBlogRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateBlogRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.entity.Blog;
import com.dinhbachihi.spring_security.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/nurse")
@RequiredArgsConstructor
public class NurseController {
    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<String> welcome(){
        return ResponseEntity.ok("Hello Nurse");
    }

    @PostMapping("/blog")
    public ApiResponse<Blog> createBlog(@RequestBody CreateBlogRequest request){
        ApiResponse<Blog> response = new ApiResponse<>();
        response.setResult(blogService.createBlog(request));
        response.setMessage("Successfully created blog");
        return response;
    }

    @PutMapping("/blog/{blog-id}")
    public ApiResponse<Blog> updateBlog(@PathVariable("blog-id") Long blogId, @RequestBody UpdateBlogRequest request){
        ApiResponse<Blog> response = new ApiResponse<>();
        response.setResult(blogService.updateBlog(request,blogId));
        response.setMessage("Successfully updated blog");
        return response;
    }
}
