package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateEventRequest;
import com.dinhbachihi.spring_security.dto.response.ConsentFormReviewResponse;
import com.dinhbachihi.spring_security.entity.ConsentForm;
import com.dinhbachihi.spring_security.entity.Event;

import java.util.List;

public interface EventService {
    Event createEvent(CreateEventRequest request);
    String sendNotification(Long id);
    ConsentFormReviewResponse acceptConsent(Long id);
    ConsentFormReviewResponse rejectConsent(Long id);
    List<ConsentForm> getConsentForms();
}
