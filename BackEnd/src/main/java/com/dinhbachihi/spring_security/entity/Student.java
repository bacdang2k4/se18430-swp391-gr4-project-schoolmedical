package com.dinhbachihi.spring_security.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Student {

    @Id
    @Column(name = "student_id", nullable = false, unique = true)
    private String studentId;

    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate dateOfBirth;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private HealthRecord healthRecord;

    @ManyToOne
    @JoinColumn(name="ClassID")
    private Classes classes;

    @ManyToOne
    @JoinColumn(name="ParentID")
    @JsonBackReference("student-user")
    private User parent;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<VaccinationConsent> forms = null;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<VaccinationResult> results = null;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<MedicalEvent> eventList = null;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<CheckUpEventConsent> list = null;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<MedicineSent> medicineSentList = null;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<CheckUpEventResult> listCheckupResult = null;
}
