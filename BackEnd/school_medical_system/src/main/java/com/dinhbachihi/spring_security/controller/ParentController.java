package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.CreateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.request.MedicineSentRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.dto.response.ConsentFormReviewResponse;
import com.dinhbachihi.spring_security.entity.ConsentForm;
import com.dinhbachihi.spring_security.entity.HealthRecord;
import com.dinhbachihi.spring_security.entity.MedicineSent;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.service.EventService;
import com.dinhbachihi.spring_security.service.HealthRecordService;
import com.dinhbachihi.spring_security.service.MedicineSentService;
import com.dinhbachihi.spring_security.service.ParentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/parent")
@RequiredArgsConstructor
public class ParentController {
    private final HealthRecordService healthRecordService;
    private final ParentService parentService;
    private final MedicineSentService medicineSentService;
    private final EventService eventService;

    @GetMapping
    public ResponseEntity<String> welcome(){
        return ResponseEntity.ok("Hello Parent");
    }

    @PostMapping("/create-health-record")
    public ApiResponse<HealthRecord> createHealthRecord(@Valid @RequestBody CreateHealthRecordRequest request){
        ApiResponse<HealthRecord> response = new ApiResponse<>();
        response.setMessage("Create Health Record Success");
        response.setResult(healthRecordService.createHealthRecord(request));
        return response;
    }

    @PutMapping("/update-health-record/{id}")
    public ApiResponse<HealthRecord> updateHealthRecord(@Valid @RequestBody UpdateHealthRecordRequest request , @PathVariable("id") Long id){
        ApiResponse<HealthRecord> response = new ApiResponse<>();
        response.setMessage("Update Health Record Success");
        response.setResult(healthRecordService.updateHealthRecord(request,id));
        return response;
    }
    @GetMapping("/get-all")
    public ApiResponse<List<Student>> getStudentByParent(){
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(parentService.getListChild());
        return response;
    }
    @PostMapping("/medical-sent/{id1}")
    public ApiResponse<MedicineSent> creaMedicineSentApiResponse(@RequestBody MedicineSentRequest request, @PathVariable("id1")String id1 ){
        ApiResponse<MedicineSent> response = new ApiResponse<>();
        response.setResult(medicineSentService.createMedicineSent(request,id1));
        response.setMessage("Successfully created medicine sent");
        return response;

    }
    @PutMapping("/event/accept/{id}")
    public ApiResponse<ConsentFormReviewResponse> acceptConsent(@PathVariable("id") Long id){
        ApiResponse<ConsentFormReviewResponse> response = new ApiResponse<>();
        response.setMessage("Accept Consent Success");
        response.setResult(eventService.acceptConsent(id));
        return response;
    }
    @PutMapping("/event/reject/{id}")
    public ApiResponse<ConsentFormReviewResponse> rejectConsent(@PathVariable("id") Long id){
        ApiResponse<ConsentFormReviewResponse> response = new ApiResponse<>();
        response.setMessage("Reject Consent Success");
        response.setResult(eventService.rejectConsent(id));
        return response;
    }
    @GetMapping("/event/list-forms")
    public ApiResponse<List<ConsentForm>> getConsentForms(){
        ApiResponse<List<ConsentForm>> response = new ApiResponse<>();
        response.setResult(eventService.getConsentForms());
        return response;
    }
}
