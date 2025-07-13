package com.dinhbachihi.spring_security.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
    private Role role;

    private boolean enabled = false;
    private String otpCode;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime otpExpiry;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonManagedReference("student-user")
    private List<Student> students =  null;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "author", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Blog> blogs =  null;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<VaccinationConsent> forms = null;

    @OneToMany(mappedBy = "nurse", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<VaccinationResult> results = null;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<MedicineSent> medicineSent = null;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<CheckUpEventConsent> list = null;

}
