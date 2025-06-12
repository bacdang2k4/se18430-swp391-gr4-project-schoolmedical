package com.dinhbachihi.spring_security.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/nurse")
@RequiredArgsConstructor
public class NurseController {

    @GetMapping
    public ResponseEntity<String> welcome(){
        return ResponseEntity.ok("Hello Nurse");
    }
}
