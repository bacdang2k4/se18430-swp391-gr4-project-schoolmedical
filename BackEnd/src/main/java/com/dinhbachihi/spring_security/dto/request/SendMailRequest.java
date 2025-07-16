package com.dinhbachihi.spring_security.dto.request;

import lombok.Data;

@Data
public class SendMailRequest {
    String subject;
    String body;
}
