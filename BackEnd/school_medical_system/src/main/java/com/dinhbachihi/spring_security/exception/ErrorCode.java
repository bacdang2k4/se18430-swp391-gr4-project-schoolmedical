package com.dinhbachihi.spring_security.exception;

public enum ErrorCode {
    USER_NOT_FOUND(404, "User Not Found"),
    USER_ALREADY_EXISTS(409, "User Already Exists"),
    USERNAME_INVALID(400, "Username at least 3 characters"),
    PASSWORD_INVALID(400, "Password at least 8 characters"),
    UNCAUGHT_EXCEPTION(500, "Uncaught Exception"),
    INVALID_USERNAME_OR_PASSWORD(400, "Invalid User Name or Password"),
    TOKEN_EXPIRED(400, "Token Expired"),
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
