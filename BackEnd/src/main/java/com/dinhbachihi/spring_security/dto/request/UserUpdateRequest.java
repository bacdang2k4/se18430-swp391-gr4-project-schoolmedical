package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
}
