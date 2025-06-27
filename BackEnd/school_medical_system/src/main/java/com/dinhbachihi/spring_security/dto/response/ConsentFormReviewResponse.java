package com.dinhbachihi.spring_security.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ConsentFormReviewResponse {
    private String type;
    private String eventName;
    private LocalDate eventDate;
    private String studentName;
    private String description;
    private String status;
}
