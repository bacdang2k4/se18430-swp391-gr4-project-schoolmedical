package com.dinhbachihi.spring_security.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class MedicineSentResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private String medicineName;
    private String dosage;
    private String frequency;
    private String note;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private String createdBy;
}
