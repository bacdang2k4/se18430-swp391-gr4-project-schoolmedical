package com.dinhbachihi.spring_security.service;

import com.dinhbachihi.spring_security.dto.request.CreateCheckUpEventRequest;
import com.dinhbachihi.spring_security.dto.request.RecordCheckUpEventRequest;
import com.dinhbachihi.spring_security.dto.request.UpdateCheckUpRequest;
import com.dinhbachihi.spring_security.dto.response.ConsentFormReviewResponse;
import com.dinhbachihi.spring_security.entity.CheckUpEvent;
import com.dinhbachihi.spring_security.entity.CheckUpEventConsent;
import com.dinhbachihi.spring_security.entity.CheckUpEventResult;
import com.dinhbachihi.spring_security.entity.Student;

import java.util.List;

public interface CheckUpEventService {
    CheckUpEvent addCheckUpEvent(CreateCheckUpEventRequest request);
    CheckUpEvent updateCheckUpEvent(UpdateCheckUpRequest request , Long id);
    String deleteCheckUpEvent(Long id);
    String markCheckUpEvent(Long id);
    List<CheckUpEvent> getAllCheckUpEvents();
    String sendNotification(Long id);
    CheckUpEventConsent acceptCheckUpEventConsent(Long id);
    CheckUpEventConsent rejectCheckUpEventConsent(Long id);
    List<Student> getStudentAccept(Long id);
    CheckUpEventResult recordCheckupEventResult(Long Id , RecordCheckUpEventRequest request);
    List<CheckUpEventResult> getCheckUpEventResults();

}
