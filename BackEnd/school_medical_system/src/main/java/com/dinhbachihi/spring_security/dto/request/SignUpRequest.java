package com.dinhbachihi.spring_security.dto.request;

import com.dinhbachihi.spring_security.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SignUpRequest {
    @NotBlank(message = "DONT_LEFT_BLANK")
    private String firstName;
    @NotBlank(message = "DONT_LEFT_BLANK")
    private String lastName;
    @NotBlank(message = "DONT_LEFT_BLANK")
    private String phone;
    @Email
    private String email;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "INVALID_PASSWORD_FORMAT")
    private String password;
    private Role role;
}
