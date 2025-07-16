package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.MedicalEventRequest;
import com.dinhbachihi.spring_security.dto.response.MedicalEventResponse;
import com.dinhbachihi.spring_security.entity.MedicalEvent;

import java.util.List;
import java.util.Map;

public interface MedicalEventService {
    MedicalEventResponse createMedicalEvent(MedicalEventRequest request, String id );
    List<MedicalEvent> getMedicalEvents ();
    String deleteMedicalEventById(Long medicalEventId);
    Map<String, Object> getMedicalEventReport();
}
