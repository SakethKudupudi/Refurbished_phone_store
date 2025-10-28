package com.mobileparts.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * Component entity representing mobile parts (screens, batteries, cameras, etc.)
 */
@Entity
@Table(name = "components", indexes = {
    @Index(name = "idx_component_type", columnList = "component_type"),
    @Index(name = "idx_component_model", columnList = "model_id"),
    @Index(name = "idx_component_vendor", columnList = "vendor_id"),
    @Index(name = "idx_component_status", columnList = "approval_status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Component extends BaseEntity {

    @NotBlank
    @Size(min = 2, max = 200)
    @Column(nullable = false, length = 200)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id", nullable = false)
    @JsonBackReference
    private Model model;

    @Enumerated(EnumType.STRING)
    @Column(name = "component_type", nullable = false, length = 50)
    private ComponentType componentType;

    @Column(length = 2000)
    private String description;

    @NotNull
    @DecimalMin(value = "0.01")
    @Digits(integer = 8, fraction = 2)
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull
    @Min(0)
    @Column(name = "quantity_available", nullable = false)
    private Integer quantityAvailable;

    @Column(name = "sku", unique = true, length = 100)
    private String sku;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private User vendor;

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status", nullable = false, length = 20)
    @Builder.Default
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(length = 500)
    private String manufacturer;

    @Column(name = "warranty_months")
    private Integer warrantyMonths;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @Builder.Default
    private Condition condition = Condition.NEW;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    public enum ComponentType {
        SCREEN,
        BATTERY,
        CAMERA_FRONT,
        CAMERA_REAR,
        CHARGING_PORT,
        SPEAKER,
        MICROPHONE,
        MOTHERBOARD,
        POWER_BUTTON,
        VOLUME_BUTTON,
        HOME_BUTTON,
        BACK_COVER,
        SIM_TRAY,
        FLEX_CABLE,
        EARPIECE,
        VIBRATOR,
        ANTENNA,
        WIFI_MODULE,
        BLUETOOTH_MODULE,
        OTHER
    }

    public enum ApprovalStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    public enum Condition {
        NEW,
        REFURBISHED,
        USED_LIKE_NEW,
        USED_GOOD
    }

    public boolean isAvailable() {
        return isActive && 
               approvalStatus == ApprovalStatus.APPROVED && 
               quantityAvailable > 0;
    }

    public void decrementQuantity(int amount) {
        if (amount > quantityAvailable) {
            throw new IllegalArgumentException("Insufficient quantity available");
        }
        this.quantityAvailable -= amount;
    }

    public void incrementQuantity(int amount) {
        this.quantityAvailable += amount;
    }
}
