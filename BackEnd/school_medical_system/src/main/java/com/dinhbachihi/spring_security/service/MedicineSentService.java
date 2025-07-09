package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.MedicineSentRequest;
import com.dinhbachihi.spring_security.dto.response.MedicineSentResponse;
import com.dinhbachihi.spring_security.entity.MedicineSent;

import java.util.List;

public interface MedicineSentService {
    MedicineSent createMedicineSent(MedicineSentRequest request, String stdId);
    List<MedicineSentResponse> getMedicineSents();
    MedicineSent acceptMedicineSent( Long id );
    List<MedicineSentResponse> getMedicineSentsByCurrentParent();
}
