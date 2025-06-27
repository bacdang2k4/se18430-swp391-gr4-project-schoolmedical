package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.CreateBlogRequest;
import com.dinhbachihi.spring_security.dto.request.MedicalEventRequest;
import com.dinhbachihi.spring_security.dto.request.MedicineSentRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateBlogRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.dto.response.MedicalEventResponse;
import com.dinhbachihi.spring_security.dto.response.MedicineSentResponse;
import com.dinhbachihi.spring_security.entity.Blog;
import com.dinhbachihi.spring_security.entity.MedicineSent;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.service.BlogService;
import com.dinhbachihi.spring_security.service.EventService;
import com.dinhbachihi.spring_security.service.MedicalEventService;
import com.dinhbachihi.spring_security.service.MedicineSentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/nurse")
@RequiredArgsConstructor
public class NurseController {
    private final BlogService blogService;
    private final MedicalEventService medicalEventService;
    private final MedicineSentService medicineSentService;
    private final EventService eventService;

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


    @PostMapping("/medical-event")
    public ApiResponse<MedicalEventResponse> createMedicalEventApiResponse(@RequestBody MedicalEventRequest request){
        ApiResponse<MedicalEventResponse> response = new ApiResponse<>();
        response.setResult(medicalEventService.createMedicalEvent(request));
        response.setMessage("Successfully created medicine event");
        return response;
    }
    @GetMapping("/medical-sent/list")
    public ApiResponse<List<MedicineSentResponse>> getMedicalSents(){
        ApiResponse<List<MedicineSentResponse>> response = new ApiResponse<>();
        response.setResult(medicineSentService.getMedicineSents());
        return response;
    }
    @PutMapping("/medical-sent/{id}")
    public ApiResponse<MedicineSent> acceptMedicalSent(@PathVariable("id") Long id){
        ApiResponse<MedicineSent> response = new ApiResponse<>();
        response.setResult(medicineSentService.acceptMedicineSent(id));
        response.setMessage("Successfully accepted medicine sent");
        return response;
    }
    @GetMapping("/event/parti/{id}")
    public ApiResponse<List<Student>> getListParticipant(@PathVariable("id") Long id){
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(eventService.getStudentAccept(id));
        return response;
    }


}
