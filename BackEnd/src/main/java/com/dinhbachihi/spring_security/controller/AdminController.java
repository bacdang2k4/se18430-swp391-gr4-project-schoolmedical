package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.*;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.dto.response.MedicineResponse;
import com.dinhbachihi.spring_security.entity.*;
import com.dinhbachihi.spring_security.repository.BlogRepository;
import com.dinhbachihi.spring_security.repository.MedicineSentRepository;
import com.dinhbachihi.spring_security.repository.StudentRepository;
import com.dinhbachihi.spring_security.service.*;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final EventService eventService;
    private final HealthRecordService healthRecordService;
    private  final MedicalEventService medicalEventService;
    private final MedicineService medicineService;
    private final CheckUpEventService checkUpEventService;
    private final BlogService blogService;

    @GetMapping
    public ApiResponse<String> welcome(){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult("Hello Admin");
        return response;
    }

    @GetMapping("/users")
    public ApiResponse<List<User>> users(){
        ApiResponse<List<User>> response = new ApiResponse<>();
        response.setResult(adminService.getUsers());
        return response;
    }

    @GetMapping("/users/{userId}")
    public ApiResponse<User> user(@PathVariable("userId") String userId){
        ApiResponse<User> response = new ApiResponse<>();
        response.setResult(adminService.getUserById(userId));
        return response;
    }

    @DeleteMapping("/users/{userId}")
    public ApiResponse<String> deleteUser(@PathVariable("userId") String userId){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(adminService.deleteUserById(userId));
        return response;
    }

    @PutMapping("/users/{userId}")
    public ApiResponse<String> updateUser(@PathVariable("userId") String userId
            ,@Valid @RequestBody UserUpdateRequest request){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(adminService.updateUserById(userId, request));
        return response;
    }
    @GetMapping("list-mail")
    public ApiResponse<List<String>> listMail(){
        ApiResponse<List<String>> response = new ApiResponse<>();
        response.setResult(adminService.getAllStudentsEmails());
        return response;
    }
    @PostMapping("send-mail")
    public ApiResponse<String> sendMail(@RequestBody SendMailRequest request) throws MessagingException {
        ApiResponse<String> response = new ApiResponse<>();
        response.setMessage(adminService.sendEmail(request));
        return response;
    }
    @GetMapping("/students/get-all-student")
    public ApiResponse<List<Student>> getStudents(){
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(adminService.getStudents());
        response.setMessage("get all students successfully");
        return response;
    }

    @GetMapping("/students/{studentId}")
    public ApiResponse<Student> getStudent(@PathVariable("studentId") String studentId){
        ApiResponse<Student> response = new ApiResponse<>();
        response.setResult(adminService.getStudentById(studentId));
        response.setMessage("get student successfully");
        return response;
    }

    @PostMapping("/students/add-student")
    public ApiResponse<Student> addStudent(@RequestBody StudentAddRequest request ){
        ApiResponse<Student> response = new ApiResponse<>();
        response.setResult(adminService.addStudent(request));
        response.setMessage("add student successfully");
        return response;
    }

    @DeleteMapping("/students/{studentId}")
    public ApiResponse<String> deleteStudent(@PathVariable("studentId") String studentId){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(adminService.deleteStudentById(studentId));
        return response;
    }

    @PutMapping("/students/{studentId}")
    public ApiResponse<Student> updateStudent(@PathVariable("studentId") String studentId, @RequestBody StudentUpdateRequest request){
        ApiResponse<Student> response = new ApiResponse<>();
        response.setResult(adminService.updateStudentById(studentId, request));
        response.setMessage("update student successfully");
        return response;
    }
    @PostMapping("/classes/add")
    public ApiResponse<Classes> addClass(@RequestBody ClassesAddRequest request){
        ApiResponse<Classes> response = new ApiResponse<>();
        response.setResult(adminService.addClass(request));
        response.setMessage("add class successfully");
        return response;
    }

    @GetMapping("/classes/{id}")
    public ApiResponse<List<Student>> getAllStudentByClass(@PathVariable("id") String id){
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(adminService.getStudentsByClassId(id));
        return response;
    }
    @PostMapping("/vaccination-event")
    public ApiResponse<Event> createEvent(@RequestBody CreateEventRequest request){
        ApiResponse<Event> response = new ApiResponse<>();
        response.setResult(eventService.createEvent(request));
        return response;
    }
    @GetMapping("/vaccination")
    public ApiResponse<List<Event>> getAllEvent(){
        ApiResponse<List<Event>> response = new ApiResponse<>();
        response.setResult(eventService.getAllEvents());
        return response;
    }
    @PutMapping("/vaccination/edit/{id}")
    public ApiResponse<Event> updateEvent(@PathVariable("id") Long id,@RequestBody UpdateVaccinationRequest request){
        ApiResponse<Event> response = new ApiResponse<>();
        response.setResult(eventService.updateEvent(request,id));
        return response;
    }
    @PutMapping("/vaccination/finish/{id}")
    public ApiResponse<Event> updateEvent(@PathVariable("id") Long id){
        ApiResponse<Event> response = new ApiResponse<>();
        response.setResult(eventService.updateEvent(id));
        return response;
    }
    @DeleteMapping("/vaccination/{id}")
    public ApiResponse<String> deleteEvent(@PathVariable("id") Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(eventService.deleteEvent(id));
        return response;
    }

    @PostMapping("/sendNoti/{id}")
    public ApiResponse<String> sendNotifications (@PathVariable("id") Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(eventService.sendNotification(id));
        return response;
    }
    @GetMapping("/health-record/list")
    public ApiResponse<List<Student>> getAllHealthRecords() {
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(healthRecordService.getAllHealthRecord());
        response.setMessage("Fetched health record list successfully");
        return response;
    }
    @GetMapping("/medical-event/list")
    public ApiResponse<List<MedicalEvent>> getMedicalEventList(){
        ApiResponse<List<MedicalEvent>> response = new ApiResponse<>();
        response.setResult(medicalEventService.getMedicalEvents());
        return response;
    }

    @DeleteMapping("/medical-event/{id}")
    public ApiResponse<String> deleteMedicalEvent(@PathVariable("id") Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(medicalEventService.deleteMedicalEventById(id));
        return response;
    }
    @GetMapping("/medicine/list")
    public ApiResponse<List<MedicineResponse>> getAllMedicines() {
        ApiResponse<List<MedicineResponse>> response = new ApiResponse<>();
        response.setResult(medicineService.getAllMedicines());
        response.setMessage("Fetched medicine list successfully");
        return response;
    }
    @PostMapping("/medicine")
    public ApiResponse<Medicine> addMedicine(@RequestBody MedicineAddRequest request){
        ApiResponse<Medicine> response = new ApiResponse<>();
        response.setResult(medicineService.addMedicine(request));
        response.setMessage("Successfully created medicine");
        return response;
    }
    @PutMapping("/medicine/{id}")
    public ApiResponse<Medicine> updateMedicine(@PathVariable("id") Long id, @RequestBody MedicineUpdateRequest request){
        ApiResponse<Medicine> response = new ApiResponse<>();
        response.setResult(medicineService.updateMedicine(request,id));
        response.setMessage("Successfully updated medicine");
        return response;
    }
    @DeleteMapping("/medicine/{id}")
    public ApiResponse<String> deleteMedicine(@PathVariable("id") Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult( medicineService.deleteMedicine(id));
        response.setMessage("Successfully deleted medicine");
        return response;
    }

    @PostMapping("/checkup-event")
    public ApiResponse<CheckUpEvent> createCheckUpEvent(@RequestBody CreateCheckUpEventRequest request){
        ApiResponse<CheckUpEvent> response = new ApiResponse<>();
        response.setResult(checkUpEventService.addCheckUpEvent(request));
        return response;
    }
    @PutMapping("/checkup-event/{id}")
    public ApiResponse<CheckUpEvent> updateCheckUpEvent(@RequestBody UpdateCheckUpRequest request, @PathVariable("id") Long id){
        ApiResponse<CheckUpEvent> response = new ApiResponse<>();
        response.setResult(checkUpEventService.updateCheckUpEvent(request,id));
        return response;
    }
    @DeleteMapping("/checkup-event/{id}")
    public ApiResponse<String> deleteCheckUpEvent(@PathVariable("id") Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(checkUpEventService.deleteCheckUpEvent(id));
        return response;
    }
    @PostMapping("/checkup/sendNoti/{id}")
    public ApiResponse<String> sendNotificationsCheckUp(@PathVariable("id") Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(checkUpEventService.sendNotification(id));
        return response;
    }
    @GetMapping("/checkupEvent")
    public ApiResponse<List<CheckUpEvent>>getAllCheckUpEvents(){
        ApiResponse<List<CheckUpEvent>> response = new ApiResponse<>();
        response.setResult(checkUpEventService.getAllCheckUpEvents());
        return response;
    }

    @GetMapping("/vaccination/parti/{id}")
    public ApiResponse<List<VaccinationConsent>> getListParticipant(@PathVariable("id") Long id){
        ApiResponse<List<VaccinationConsent>> response = new ApiResponse<>();
        response.setResult(eventService.getStudentAccepts(id));
        return response;
    }

    @GetMapping("/vaccination/reject/{id}")
    public ApiResponse<List<VaccinationConsent>> getListRejectVaccine(@PathVariable("id") Long id){
        ApiResponse<List<VaccinationConsent>> response = new ApiResponse<>();
        response.setResult(eventService.getStudentRejects(id));
        return response;
    }
    @PutMapping("/checkup/mark/{id}")
    public ApiResponse<String> markFinished(@PathVariable Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(checkUpEventService.markCheckUpEvent(id));
        return response;
    }
    @GetMapping("/checkup/parti/{id}")
    public ApiResponse<List<CheckUpEventConsent>> getStudentAccept(@PathVariable("id") Long id){
        ApiResponse<List<CheckUpEventConsent>> response = new ApiResponse<>();
        response.setResult(checkUpEventService.getStudentAccept(id));
        return response;
    }
    @GetMapping("/checkup/reject/{id}")
    public ApiResponse<List<CheckUpEventConsent>> getStudentReject(@PathVariable("id") Long id){
        ApiResponse<List<CheckUpEventConsent>> response = new ApiResponse<>();
        response.setResult(checkUpEventService.getStudentReject(id));
        return response;
    }

    @PutMapping("/blog/accept/{id}")
    public ApiResponse<String> acceptBlog(@PathVariable("id") Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(blogService.acceptBlog(id));
        return response;
    }

    @PutMapping("/blog/reject/{id}")
    public ApiResponse<String> rejectBlog(@PathVariable("id") Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(blogService.rejectBlog(id));
        return response;
    }

    @GetMapping("/blog")
    public ApiResponse<List<Blog>> updateBlog(){
        ApiResponse<List<Blog>> response = new ApiResponse<>();
        response.setResult(blogService.getAllBlogs());
        return response;
    }
    @GetMapping("/blog/{id}")
    public ApiResponse<ViewBlogRequest> viewBlogById (@PathVariable("id") Long id){
        ApiResponse<ViewBlogRequest> response = new ApiResponse<>();
        response.setResult(blogService.getBlogById(id));
        return response;
    }
    @GetMapping("/checkup/send-result/{id}")
    public ApiResponse<String> sendResult(@PathVariable("id") Long id){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(checkUpEventService.sendResultForParent(id));
        return response;
    }
}
