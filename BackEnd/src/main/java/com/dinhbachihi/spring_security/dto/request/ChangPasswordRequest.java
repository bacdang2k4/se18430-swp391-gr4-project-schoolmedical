package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class ChangPasswordRequest {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
