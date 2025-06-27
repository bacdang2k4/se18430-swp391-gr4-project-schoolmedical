package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.CreateEventRequest;
import com.dinhbachihi.spring_security.dto.response.ConsentFormReviewResponse;
import com.dinhbachihi.spring_security.entity.ConsentForm;
import com.dinhbachihi.spring_security.entity.Event;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.entity.User;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.ConsentFormRepository;
import com.dinhbachihi.spring_security.repository.EventRepository;
import com.dinhbachihi.spring_security.repository.StudentRepository;
import com.dinhbachihi.spring_security.repository.UserRepository;
import com.dinhbachihi.spring_security.service.EmailService;
import com.dinhbachihi.spring_security.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final StudentRepository studentRepository;
    private final ConsentFormRepository consentFormRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;


    public Event createEvent(CreateEventRequest request) {
        Event event = new Event();
        event.setName(request.getName());
        event.setType(request.getType());
        event.setEventDate(request.getEventDate());
        event.setDescription(request.getDescription());
        return eventRepository.save(event);
    }
    public String sendNotification(Long id) {
        List<Student> students = studentRepository.findAll();
        Event event = eventRepository.getReferenceById(id);
        for(Student student : students) {
            if(student.getParent()!=null){
            ConsentForm cf = new ConsentForm();
            emailService.sendEmail(student.getParent().getEmail(),event.getName(),event.getDescription());
            cf.setEvent(event);
            cf.setStudent(student);
            cf.setParent(student.getParent());
            consentFormRepository.save(cf);}
        }
        return "Successfully sent notification";
    }

    public ConsentFormReviewResponse acceptConsent(Long id) {
        ConsentForm cf = consentFormRepository.getReferenceById(id);
        cf.setConsent("Accepted");
        consentFormRepository.save(cf);
        ConsentFormReviewResponse response = new ConsentFormReviewResponse();
        response.setType(cf.getEvent().getType());
        response.setDescription(cf.getEvent().getDescription());
        response.setEventDate(cf.getEvent().getEventDate());
        response.setStatus(cf.getConsent());
        response.setStudentName(cf.getStudent().getLastName()+cf.getStudent().getFirstName());
        response.setEventName(cf.getEvent().getName());
        return response;
    }
    public ConsentFormReviewResponse rejectConsent(Long id) {
        ConsentForm cf = consentFormRepository.getReferenceById(id);
        cf.setConsent("Rejected");
        consentFormRepository.save(cf);
        ConsentFormReviewResponse response = new ConsentFormReviewResponse();
        response.setType(cf.getEvent().getType());
        response.setDescription(cf.getEvent().getDescription());
        response.setEventDate(cf.getEvent().getEventDate());
        response.setStatus(cf.getConsent());
        response.setStudentName(cf.getStudent().getLastName()+cf.getStudent().getFirstName());
        response.setEventName(cf.getEvent().getName());
        return response;
    }
    public List<ConsentForm> getConsentForms() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User parent = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return parent.getForms();
    }
    public List<Student> getStudentAccept(Long id) {
        List<Student> students = consentFormRepository.findByConsent("accepted")
                .stream()
                .map(ConsentForm::getStudent)
                .collect(Collectors.toList());
        return students;
    }


}
