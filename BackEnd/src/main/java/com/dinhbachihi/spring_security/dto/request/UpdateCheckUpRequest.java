package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateCheckUpRequest {
    private LocalDate eventDate;
    private String description;
}
