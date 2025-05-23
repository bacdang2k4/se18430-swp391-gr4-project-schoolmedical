package com.dinhbachihi.spring_security.dto;

import com.dinhbachihi.spring_security.entity.Role;
import lombok.Data;

@Data
public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
    private Role role;
}
