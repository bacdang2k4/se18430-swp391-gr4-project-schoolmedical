package com.dinhbachihi.spring_security.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Classes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Classes {
    @Id

    private String id;
    private String name;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "classes",cascade = CascadeType.ALL)
    @JsonBackReference("student-class")
    private List<Student> studentList = new ArrayList<>();


    @Override
    public String toString() {
        return "Classes{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
