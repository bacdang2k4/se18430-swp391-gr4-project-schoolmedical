package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateEventRequest;
import com.dinhbachihi.spring_security.dto.request.RecordVaccinationResult;
import com.dinhbachihi.spring_security.dto.request.UpdateVaccinationRequest;
import com.dinhbachihi.spring_security.dto.response.ConsentFormReviewResponse;
import com.dinhbachihi.spring_security.entity.VaccinationConsent;
import com.dinhbachihi.spring_security.entity.Event;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.VaccinationResult;

import java.util.List;

public interface EventService {
    Event createEvent(CreateEventRequest request);
    String sendNotification(Long id);
    ConsentFormReviewResponse acceptConsent(Long id);
    ConsentFormReviewResponse rejectConsent(Long id);
    List<VaccinationConsent> getConsentForms();
    List<Student> getStudentAccept(Long id);
    VaccinationResult recordVaccinationResult(Long Id , RecordVaccinationResult request);
    List<Event> getAllEvents();
    Event updateEvent(UpdateVaccinationRequest request , Long id);
    String deleteEvent(Long id);
    Event updateEvent( Long id);
    List<VaccinationResult> getVaccinationResultList();
}
