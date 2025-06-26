package com.dinhbachihi.spring_security.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class MedicineSentResponse {
    private Long id;
    private String studentId;
    private String parentId;
    private String approvedBy;
    private String medicineName;
    private String description;
    private String note;
    private LocalDateTime sendDate;
    private String status;
    private boolean isUse;
}
