package com.dinhbachihi.spring_security.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    USER_NOT_FOUND(404, "User Not Found"),
    VR_NOT_FOUND(404, "Vaccination Result Not Found"),
    CR_NOT_FOUND(404, "CheckupEvent Result Not Found"),
    CE_NOT_FOUND(404, "CE Not Found"),
    BLOG_NOT_FOUND(404, "Blog Not Found"),
    CLASS_NOT_FOUND(404, "Class Not Found"),
    USER_ALREADY_EXISTS(409, "User Already Exists"),
    ClASS_ALREADY_EXISTS(409, "Class Already Exists"),
    USERNAME_INVALID(400, "Username at least 3 characters"),
    PASSWORD_INVALID(400, "Password at least 8 characters"),
    UNCAUGHT_EXCEPTION(500, "Uncaught Exception"),
    INVALID_USER(400, "Invalid User"),
    INVALID_USERNAME_OR_PASSWORD(400, "Invalid User Name or Password"),
    TOKEN_EXPIRED(400, "Token Expired"),
    INVALID_PASSWORD_FORMAT(400, "Password must be at least 8 characters and contain both letters and numbers"),
    DONT_LEFT_BLANK(400, "Don't Left Any Fields Blank"),
    ACCOUNT_NOT_ACTIVATED(403, "Account Not Activated"),
    INVALID_OTP(400, "Invalid OTP"),
    STUDENT_NOT_FOUND(404, "Student Not Found"),
    STUDENT_ALREADY_EXISTS(409, "Student Already Exists"),
    PASSWORD_NOT_MATCH(400, "Password Not Match"),
    WRONG_PASSWORD(400, "Wrong Password"),
    HEALTH_RECORD_ALREADY_EXISTS(400, "Health Record Already Exists"),
    HEALTH_RECORD_NOT_FOUND(400, "Health Record Not Found"),
    EVENT_NOT_FOUND(404, "Event Not Found"),
    MEDICAL_EVENT_NOT_FOUND(400, "Medical Event Not Found"),
    ;

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
