package com.mobileparts.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Model entity representing specific device models (iPhone 15, Galaxy S24, etc.)
 */
@Entity
@Table(name = "models", indexes = {
    @Index(name = "idx_model_name", columnList = "name"),
    @Index(name = "idx_model_brand", columnList = "brand_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Model extends BaseEntity {

    @NotBlank
    @Size(min = 2, max = 150)
    @Column(nullable = false, length = 150)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(length = 1000)
    private String description;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "release_year")
    private Integer releaseYear;

    @Column(name = "model_number", length = 100)
    private String modelNumber;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @OneToMany(mappedBy = "model", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Component> components = new HashSet<>();

    public String getFullName() {
        return brand != null ? brand.getName() + " " + name : name;
    }
}
