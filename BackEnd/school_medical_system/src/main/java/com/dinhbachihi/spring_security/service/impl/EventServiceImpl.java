package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.CreateEventRequest;
import com.dinhbachihi.spring_security.entity.ConsentForm;
import com.dinhbachihi.spring_security.entity.Event;
import com.dinhbachihi.spring_security.entity.Student;
import com.dinhbachihi.spring_security.repository.ConsentFormRepository;
import com.dinhbachihi.spring_security.repository.EventRepository;
import com.dinhbachihi.spring_security.repository.StudentRepository;
import com.dinhbachihi.spring_security.service.EmailService;
import com.dinhbachihi.spring_security.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final StudentRepository studentRepository;
    private final ConsentFormRepository consentFormRepository;
    private final EmailService emailService;


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


}
