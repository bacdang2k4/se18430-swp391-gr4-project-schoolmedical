package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.CreateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateHealthRecordRequest;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.entity.HealthRecord;
import com.dinhbachihi.spring_security.service.HealthRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/parent")
@RequiredArgsConstructor
public class ParentController {
    private final HealthRecordService healthRecordService;

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

    @PutMapping("/update-health-record")
    public ApiResponse<HealthRecord> updateHealthRecord(@Valid @RequestBody UpdateHealthRecordRequest request){
        ApiResponse<HealthRecord> response = new ApiResponse<>();
        response.setMessage("Update Health Record Success");
        response.setResult(healthRecordService.updateHealthRecord(request));
        return response;
    }
}
