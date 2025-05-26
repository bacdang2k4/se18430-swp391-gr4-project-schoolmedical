package com.dinhbachihi.spring_security.exception;

public enum ErrorCode {
    USER_NOT_FOUND(404, "User Not Found"),
    USER_ALREADY_EXISTS(409, "User Already Exists"),
    USERNAME_INVALID(400, "Username at least 3 characters"),
    PASSWORD_INVALID(400, "Password at least 8 characters"),
    UNCAUGHT_EXCEPTION(500, "Uncaught Exception"),
    INVALID_USERNAME_OR_PASSWORD(400, "Invalid User Name or Password"),
    TOKEN_EXPIRED(400, "Token Expired"),
    INVALID_PASSWORD_FORMAT(400, "Password must be at least 8 characters and contain both letters and numbers"),
    DONT_LEFT_BLANK(400, "Don't Left Blank"),
    ;
    private int code;
    private String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
