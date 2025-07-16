package com.dinhbachihi.spring_security.controller;

import com.dinhbachihi.spring_security.dto.request.*;
import com.dinhbachihi.spring_security.dto.response.ApiResponse;
import com.dinhbachihi.spring_security.dto.response.MedicalEventResponse;
import com.dinhbachihi.spring_security.dto.response.MedicineResponse;
import com.dinhbachihi.spring_security.dto.response.MedicineSentResponse;
import com.dinhbachihi.spring_security.entity.*;
import com.dinhbachihi.spring_security.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/nurse")
@RequiredArgsConstructor
public class NurseController {
    private final BlogService blogService;
    private final MedicalEventService medicalEventService;
    private final MedicineSentService medicineSentService;
    private final EventService eventService;
    private final MedicineService medicineService;
    private final HealthRecordService healthRecordService;
    private final AdminService adminService;
    private final CheckUpEventService checkUpEventService;


    @GetMapping
    public ResponseEntity<String> welcome(){
        return ResponseEntity.ok("Hello Nurse");
    }

    @PostMapping("/blog")
    public ApiResponse<Blog> createBlog(@RequestBody CreateBlogRequest request){
        ApiResponse<Blog> response = new ApiResponse<>();
        response.setResult(blogService.createBlog(request));
        response.setMessage("Successfully created blog");
        return response;
    }

    @PutMapping("/blog/{blog-id}")
    public ApiResponse<Blog> updateBlog(@PathVariable("blog-id") Long blogId, @RequestBody UpdateBlogRequest request){
        ApiResponse<Blog> response = new ApiResponse<>();
        response.setResult(blogService.updateBlog(request,blogId));
        response.setMessage("Successfully updated blog");
        return response;
    }

    @DeleteMapping("/blog/{blog-id}")
    public ApiResponse<String> updateBlog(@PathVariable("blog-id") Long blogId){
        ApiResponse<String> response = new ApiResponse<>();
        response.setResult(blogService.deleteBlog(blogId));
        response.setMessage("Successfully updated blog");
        return response;
    }

    @GetMapping("/blog")
    public ApiResponse<List<Blog>> updateBlog(){
        ApiResponse<List<Blog>> response = new ApiResponse<>();
        response.setResult(blogService.getAllBlogs());
        return response;
    }
    @PostMapping("/medical-event/{id}")
    public ApiResponse<MedicalEventResponse> createMedicalEventApiResponse(@RequestBody MedicalEventRequest request, @PathVariable("id") String id){
        ApiResponse<MedicalEventResponse> response = new ApiResponse<>();
        response.setResult(medicalEventService.createMedicalEvent(request,id));
        response.setMessage("Successfully created medicine event");
        return response;
    }
    @GetMapping("/medical-event/list")
    public ApiResponse<List<MedicalEvent>> getMedicalEventList(){
        ApiResponse<List<MedicalEvent>> response = new ApiResponse<>();
        response.setResult(medicalEventService.getMedicalEvents());
        return response;
    }
    @GetMapping("/medical-sent/list")
    public ApiResponse<List<MedicineSentResponse>> getMedicalSents(){
        ApiResponse<List<MedicineSentResponse>> response = new ApiResponse<>();
        response.setResult(medicineSentService.getMedicineSents());
        return response;
    }
    @PutMapping("/medical-sent/{id}")
    public ApiResponse<MedicineSent> acceptMedicalSent(@PathVariable("id") Long id){
        ApiResponse<MedicineSent> response = new ApiResponse<>();
        response.setResult(medicineSentService.acceptMedicineSent(id));
        response.setMessage("Successfully accepted medicine sent");
        return response;
    }

    @PutMapping("/set-use/{id}")
    public ApiResponse<MedicineSent> setUse(@PathVariable("id") Long id){
        ApiResponse<MedicineSent> response = new ApiResponse<>();
        response.setResult(medicineSentService.setUse(id));
        response.setMessage("Successfully set use");
        return response;
    }

    @GetMapping("/event/parti/{id}")
    public ApiResponse<List<VaccinationConsent>> getListParticipant(@PathVariable("id") Long id){
        ApiResponse<List<VaccinationConsent>> response = new ApiResponse<>();
        response.setResult(eventService.getStudentAccepts(id));
        return response;
    }

    @GetMapping("/event/reject/{id}")
    public ApiResponse<List<VaccinationConsent>> getListReject(@PathVariable("id") Long id){
        ApiResponse<List<VaccinationConsent>> response = new ApiResponse<>();
        response.setResult(eventService.getStudentRejects(id));
        return response;
    }
    @GetMapping("/event/record/list/{id}")
    public ApiResponse<List<VaccinationResult>> getListRecord(@PathVariable Long id){
        ApiResponse<List<VaccinationResult>> response = new ApiResponse<>();
        response.setResult(eventService.getVaccinationResultList(id));
        return response;
    }
    @PutMapping("/event/record/{id}")
    public ApiResponse<VaccinationResult> recordVaccination(@PathVariable("id") Long id, @RequestBody RecordVaccinationResult request) {
        ApiResponse<VaccinationResult> response = new ApiResponse<>();
        response.setResult(eventService.recordVaccinationResult(id,request));
        response.setMessage("Successfully record vaccination");
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
    @GetMapping("/health-record/list")
    public ApiResponse<List<Student>> getAllHealthRecords() {
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(healthRecordService.getAllHealthRecord());
        response.setMessage("Fetched health record list successfully");
        return response;
    }
    @GetMapping("/student/list")
    public ApiResponse<List<Student>> getAllStudents() {
        ApiResponse<List<Student>> response = new ApiResponse<>();
        response.setResult(adminService.getStudents());
        return response;
    }
    @GetMapping("/medicine/history")
    public ApiResponse<List<UsedMedicine>> getMedicineHistory(){
        ApiResponse<List<UsedMedicine>> response = new ApiResponse<>();
        response.setResult(medicineService.getUsedMedicines());
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
    @PutMapping("/checkup/record/{id}")
    public ApiResponse<CheckUpEventResult> recordCheckupEventResult(@PathVariable("id") Long id, @RequestBody RecordCheckUpEventRequest request) {
        ApiResponse<CheckUpEventResult> response = new ApiResponse<>();
        response.setResult(checkUpEventService.recordCheckupEventResult(id,request));
        response.setMessage("Successfully record checkup");
        return response;
    }
    @GetMapping("checkup/list")
    public ApiResponse<List<CheckUpEventResult>> getCheckUpEventResult(){
        ApiResponse<List<CheckUpEventResult>> response = new ApiResponse<>();
        response.setResult(checkUpEventService.getCheckUpEventResults());
        return response;
    }

    @GetMapping("/vaccination")
    public ApiResponse<List<Event>> getAllEvent(){
        ApiResponse<List<Event>> response = new ApiResponse<>();
        response.setResult(eventService.getAllEvents());
        return response;
    }

    @GetMapping("/checkupEvent")
    public ApiResponse<List<CheckUpEvent>>getAllCheckUpEvents(){
        ApiResponse<List<CheckUpEvent>> response = new ApiResponse<>();
        response.setResult(checkUpEventService.getAllCheckUpEvents());
        return response;
    }
}
