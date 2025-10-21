package com.mobileparts.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

/**
 * CartItem entity representing items in a user's shopping cart
 */
@Entity
@Table(name = "cart_items", indexes = {
    @Index(name = "idx_cart_user", columnList = "user_id"),
    @Index(name = "idx_cart_component", columnList = "component_id")
}, uniqueConstraints = {
    @UniqueConstraint(name = "uk_user_component", columnNames = {"user_id", "component_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "component_id", nullable = false)
    private Component component;

    @NotNull
    @Min(1)
    @Column(nullable = false)
    private Integer quantity;

    public void incrementQuantity(int amount) {
        this.quantity += amount;
    }

    public void decrementQuantity(int amount) {
        if (amount >= this.quantity) {
            this.quantity = 0;
        } else {
            this.quantity -= amount;
        }
    }
}
