package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.MedicineSentRequest;
import com.dinhbachihi.spring_security.entity.MedicineSent;

public interface MedicineSentService {
    MedicineSent createMedicineSent(MedicineSentRequest request, String stdId , String nurID);
}
