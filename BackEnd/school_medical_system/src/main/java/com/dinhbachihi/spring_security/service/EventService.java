package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateEventRequest;
import com.dinhbachihi.spring_security.entity.Event;

public interface EventService {
    Event createEvent(CreateEventRequest request);
    String sendNotification(Long id);
}
