package com.dinhbachihi.spring_security.dto.request;

import com.dinhbachihi.spring_security.entity.Gender;
import lombok.Data;

import java.time.LocalDate;
@Data
public class StudentUpdateRequest {
    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate dateOfBirth;
}
