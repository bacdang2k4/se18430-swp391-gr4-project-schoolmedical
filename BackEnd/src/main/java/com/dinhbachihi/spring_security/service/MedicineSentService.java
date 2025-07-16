package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.MedicineSentRequest;
import com.dinhbachihi.spring_security.dto.response.MedicineSentResponse;
import com.dinhbachihi.spring_security.entity.MedicineSent;

import java.util.List;
import java.util.Map;

public interface MedicineSentService {
    MedicineSent createMedicineSent(MedicineSentRequest request, String stdId);
    List<MedicineSentResponse> getMedicineSents();
    MedicineSent acceptMedicineSent( Long id );
    List<MedicineSentResponse> getMedicineSentsByCurrentParent();
    MedicineSent setUse( Long id );
    Map<String, Object> getMedicineUsageReport();
}
