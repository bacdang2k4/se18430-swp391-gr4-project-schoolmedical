package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/reports")
@RequiredArgsConstructor
public class ReportController {
    private final UserService userService;
    private final HealthRecordService healthRecordService;
    private final MedicalEventService medicalEventService;
    private final EventService eventService;
    private final CheckUpEventService checkUpEventService;
    private final MedicineSentService medicineSentService;

    @GetMapping("/users")
    public ApiResponse<Map<String, Object>> getUserReport() {
        ApiResponse<Map<String, Object>> response = new ApiResponse<>();
        response.setResult(userService.getUserReport());
        response.setMessage("User report retrieved successfully");
        return response;
    }

    @GetMapping("/health-overview")
    public ApiResponse<Map<String, Object>> getHealthOverviewReport() {
        ApiResponse<Map<String, Object>> response = new ApiResponse<>();
        response.setResult(healthRecordService.getHealthOverviewReport());
        response.setMessage("Health overview report retrieved successfully");
        return response;
    }

    @GetMapping("/medical-events")
    public ApiResponse<Map<String, Object>> getMedicalEventReport() {
        ApiResponse<Map<String, Object>> response = new ApiResponse<>();
        response.setResult(medicalEventService.getMedicalEventReport());
        response.setMessage("Medical event report retrieved successfully");
        return response;
    }

    @GetMapping("/vaccination")
    public ApiResponse<Map<String, Object>> getVaccinationReport() {
        ApiResponse<Map<String, Object>> response = new ApiResponse<>();
        response.setResult(eventService.getVaccinationReport());
        response.setMessage("Vaccination report retrieved successfully");
        return response;
    }

    @GetMapping("/checkup")
    public ApiResponse<Map<String, Object>> getCheckupReport() {
        ApiResponse<Map<String, Object>> response = new ApiResponse<>();
        response.setResult(checkUpEventService.getCheckupReport());
        response.setMessage("Checkup report retrieved successfully");
        return response;
    }

    @GetMapping("/medicine-usage")
    public ApiResponse<Map<String, Object>> getMedicineUsageReport() {
        ApiResponse<Map<String, Object>> response = new ApiResponse<>();
        response.setResult(medicineSentService.getMedicineUsageReport());
        response.setMessage("Medicine usage report retrieved successfully");
        return response;
    }
}
