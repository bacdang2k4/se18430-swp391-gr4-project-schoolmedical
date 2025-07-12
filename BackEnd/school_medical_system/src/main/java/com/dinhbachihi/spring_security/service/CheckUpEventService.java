package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateCheckUpEventRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateCheckUpRequest;
import com.dinhbachihi.spring_security.entity.CheckUpEvent;

import java.util.List;

public interface CheckUpEventService {
    CheckUpEvent addCheckUpEvent(CreateCheckUpEventRequest request);
    CheckUpEvent updateCheckUpEvent(UpdateCheckUpRequest request , Long id);
    String deleteCheckUpEvent(Long id);
    List<CheckUpEvent> getAllCheckUpEvents();
}
