package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.CreateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.request.MedicineSentRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.dto.response.ConsentFormReviewResponse;
import com.dinhbachihi.spring_security.dto.response.MedicineSentResponse;
import com.dinhbachihi.spring_security.entity.*;
import com.dinhbachihi.spring_security.repository.VaccinationResultRepository;
import com.dinhbachihi.spring_security.service.*;
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
    private final CheckUpEventService checkUpEventService;

    @GetMapping
    public ResponseEntity<String> welcome(){
        return ResponseEntity.ok("Hello Parent");
    }

    @GetMapping("/get-health-record/{id}")
    public ApiResponse<HealthRecord> getHealthRecord(@PathVariable Long id){
        ApiResponse<HealthRecord> response = new ApiResponse<>();
        response.setMessage("Get Health Record Success");
        response.setResult(healthRecordService.getHealthRecord(id));
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
    public ApiResponse<List<VaccinationConsent>> getConsentForms(){
        ApiResponse<List<VaccinationConsent>> response = new ApiResponse<>();
        response.setResult(eventService.getConsentForms());
        return response;
    }
    @GetMapping("/checkup/list-forms")
    public ApiResponse<List<CheckUpEventConsent>> getCheckUpConsentForms(){
        ApiResponse<List<CheckUpEventConsent>> response = new ApiResponse<>();
        response.setResult(checkUpEventService.getList());
        return response;
    }
    @GetMapping("/medical-sent/history")
    public ApiResponse<List<MedicineSentResponse>> getMedicineSentHistoryForParent() {
        ApiResponse<List<MedicineSentResponse>> response = new ApiResponse<>();
        response.setResult(medicineSentService.getMedicineSentsByCurrentParent());
        response.setMessage("Fetched medicine sent history for current parent");
        return response;
    }

    @PutMapping("/checkup/accept/{id}")
    public ApiResponse<CheckUpEventConsent> acceptCheckUpEventConsent(@PathVariable("id") Long id){
        ApiResponse<CheckUpEventConsent> response = new ApiResponse<>();
        response.setMessage("Accept Consent Success");
        response.setResult(checkUpEventService.acceptCheckUpEventConsent(id));
        return response;
    }
    @PutMapping("/checkup/reject/{id}")
    public ApiResponse<CheckUpEventConsent> rejectCheckUpEventConsent(@PathVariable("id") Long id){
        ApiResponse<CheckUpEventConsent> response = new ApiResponse<>();
        response.setMessage("Reject Consent Success");
        response.setResult(checkUpEventService.rejectCheckUpEventConsent(id));
        return response;
    }
    @GetMapping("/event/result/{id}")
    public ApiResponse<VaccinationResult> getVaccinationResult(@PathVariable("id") Long id){
        ApiResponse<VaccinationResult> response = new ApiResponse<>();
        response.setResult(eventService.getVaccinationResultOfStudent(id));
        return response;

    }
}
