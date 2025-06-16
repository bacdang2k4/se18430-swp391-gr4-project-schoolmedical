package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.CreateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.entity.HealthRecord;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.service.HealthRecordService;
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
    @GetMapping("/get-all/{id}")
    public ApiResponse<List<Student>> getStudentByParent(@PathVariable("id") String id){
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(parentService.getListChild(id));
        return response;
    }
}
