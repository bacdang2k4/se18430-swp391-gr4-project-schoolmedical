package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.CreateBlogRequest;
import com.dinhbachihi.spring_security.dto.request.MedicalEventRequest;
import com.dinhbachihi.spring_security.dto.request.MedicineSentRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateBlogRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.dto.response.MedicalEventResponse;
import com.dinhbachihi.spring_security.entity.Blog;
import com.dinhbachihi.spring_security.entity.MedicineSent;
import com.dinhbachihi.spring_security.service.BlogService;
import com.dinhbachihi.spring_security.service.MedicalEventService;
import com.dinhbachihi.spring_security.service.MedicineSentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/nurse")
@RequiredArgsConstructor
public class NurseController {
    private final BlogService blogService;
    private final MedicineSentService medicineSentService;
    private final MedicalEventService medicalEventService;
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

    @PostMapping("/medicalsent/{id1}/{id2}")
    public ApiResponse<MedicineSent> creaMedicineSentApiResponse(@RequestBody MedicineSentRequest request, @PathVariable("id1")String id1 , @PathVariable("id2")String id2){
        ApiResponse<MedicineSent> response = new ApiResponse<>();
        response.setResult(medicineSentService.createMedicineSent(request,id2,id1));
        response.setMessage("Successfully created medicine sent");
        return response;

    }
    @PostMapping("/medical-event")
    public ApiResponse<MedicalEventResponse> createMedicalEventApiResponse(@RequestBody MedicalEventRequest request){
        ApiResponse<MedicalEventResponse> response = new ApiResponse<>();
        response.setResult(medicalEventService.createMedicalEvent(request));
        response.setMessage("Successfully created medicine event");
        return response;
    }
}
