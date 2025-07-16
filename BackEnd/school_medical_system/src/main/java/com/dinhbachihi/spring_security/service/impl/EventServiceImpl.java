package com.dinhbachihi.spring_security.service.impl;

import com.dinhbachihi.spring_security.dto.request.CreateEventRequest;
import com.dinhbachihi.spring_security.dto.request.RecordVaccinationResult;
import com.dinhbachihi.spring_security.dto.request.UpdateVaccinationRequest;
import com.dinhbachihi.spring_security.dto.response.ConsentFormReviewResponse;
import com.dinhbachihi.spring_security.entity.*;
import com.dinhbachihi.spring_security.exception.AppException;
import com.dinhbachihi.spring_security.exception.ErrorCode;
import com.dinhbachihi.spring_security.repository.*;
import com.dinhbachihi.spring_security.service.EmailService;
import com.dinhbachihi.spring_security.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final StudentRepository studentRepository;
    private final VaccinationConsentRepository vaccinationConsentRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final VaccinationResultRepository vaccinationResultRepository;

    public Event createEvent(CreateEventRequest request) {
        Event event = new Event();
        event.setName(request.getName());
        event.setType(request.getType());
        event.setEventDate(request.getEventDate());
        event.setDescription(request.getDescription());
        return eventRepository.save(event);
    }
    public Event updateEvent(UpdateVaccinationRequest request , Long id) {
        Event event = eventRepository.getReferenceById(id);
        event.setDescription(request.getDescription());
        event.setEventDate(request.getEventDate());
        return eventRepository.save(event);
    }
    public Event updateEvent( Long id) {
        Event event = eventRepository.getReferenceById(id);
        event.setStatus("finished");
        return eventRepository.save(event);
    }
    public String deleteEvent(Long id) {
        Event event = eventRepository.getReferenceById(id);
        eventRepository.delete(event);
        return "Event deleted";
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    public String sendNotification(Long id) {
        List<Student> students = studentRepository.findAll();
        Event event = eventRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));
        event.setStatus("isgoing");
        for(Student student : students) {
            boolean notExists = vaccinationConsentRepository
                    .findByStudentAndEvent(student, event)
                    .isEmpty();
            if(notExists) {
            if(student.getParent()!=null){
            VaccinationConsent cf = new VaccinationConsent();
            emailService.sendEmail(student.getParent().getEmail(),event.getName(),event.getDescription());
            cf.setEvent(event);
            cf.setStudent(student);
            cf.setParent(student.getParent());
            vaccinationConsentRepository.save(cf);}}
        }
        return "Successfully sent notification";
    }

    public ConsentFormReviewResponse acceptConsent(Long id) {
        VaccinationConsent cf = vaccinationConsentRepository.getReferenceById(id);
        cf.setConsent("Accepted");
        vaccinationConsentRepository.save(cf);
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
        VaccinationConsent cf = vaccinationConsentRepository.getReferenceById(id);
        cf.setConsent("Rejected");
        vaccinationConsentRepository.save(cf);
        ConsentFormReviewResponse response = new ConsentFormReviewResponse();
        response.setType(cf.getEvent().getType());
        response.setDescription(cf.getEvent().getDescription());
        response.setEventDate(cf.getEvent().getEventDate());
        response.setStatus(cf.getConsent());
        response.setStudentName(cf.getStudent().getLastName()+cf.getStudent().getFirstName());
        response.setEventName(cf.getEvent().getName());
        return response;
    }
    public List<VaccinationConsent> getConsentForms() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User parent = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return parent.getForms();
    }
    public VaccinationResult recordVaccinationResult(Long Id , RecordVaccinationResult request) {
        VaccinationResult vr = vaccinationResultRepository.findById(Id).orElseThrow(() -> new AppException(ErrorCode.VR_NOT_FOUND));
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User nurse = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        vr.setNote(request.getNote());
        vr.setVaccine(request.getVaccine());
        vr.setNurse(nurse);
        return vaccinationResultRepository.save(vr);
    }
    public List<VaccinationResult> getVaccinationResultList(Long id){
        Event event = eventRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));
        return vaccinationResultRepository.findByEvent(event);

    }
    public List<VaccinationConsent> getStudentAccepts(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));
        List<VaccinationConsent> list = vaccinationConsentRepository.findByConsentAndEvent("Accepted", event);
        for (VaccinationConsent vc : list) {
            Student student = vc.getStudent();
            boolean exists = vaccinationResultRepository
                    .findByStudentAndEvent(student, event).isEmpty();

            if (exists) {
                VaccinationResult vr = new VaccinationResult();
                vr.setStudent(student);
                vr.setEvent(event);
                vr.setVaccinationDate(event.getEventDate());
                vaccinationResultRepository.save(vr);
            }
        }
        return list;
    }

    public List<VaccinationConsent> getStudentRejects(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));
        List<VaccinationConsent> list = vaccinationConsentRepository.findByConsentAndEvent("Rejected", event);

        return list;
    }

    public VaccinationResult getVaccinationResultOfStudent(Long id ){
        VaccinationResult rs = vaccinationResultRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.VR_NOT_FOUND));
        return rs;
    }

    public Map<String, Object> getVaccinationReport() {
        List<Event> allEvents = eventRepository.findAll()
                .stream()
                .filter(e -> "Tiêm phòng".equalsIgnoreCase(e.getType()))
                .collect(Collectors.toList());

        int totalCampaigns = allEvents.size();
        long completedCampaigns = allEvents.stream().filter(e -> "finished".equalsIgnoreCase(e.getStatus())).count();

        // Đếm số học sinh đã tiêm
        long studentsVaccinated = vaccinationResultRepository.count();

        // Tổng số học sinh
        long totalStudents = studentRepository.count();

        // Tỷ lệ tiêm chủng
        double vaccinationRate = totalStudents > 0 ? (studentsVaccinated * 100.0 / totalStudents) : 0;

        // Số học sinh chờ tiêm (có consent accepted nhưng chưa có VaccinationResult)
        long pendingVaccinations = vaccinationConsentRepository.findByConsent("Accepted")
                .stream()
                .filter(vc -> vaccinationResultRepository.findByStudentAndEvent(vc.getStudent(), vc.getEvent()).isEmpty())
                .count();

        Map<String, Object> report = new HashMap<>();
        report.put("totalCampaigns", totalCampaigns);
        report.put("completedCampaigns", completedCampaigns);
        report.put("studentsVaccinated", studentsVaccinated);
        report.put("vaccinationRate", vaccinationRate);
        report.put("pendingVaccinations", pendingVaccinations);

        return report;
    }

}
