package com.mobileparts.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Redis-based cart item for fast cart operations
 */
@RedisHash(value = "cart", timeToLive = 86400) // 24 hours TTL
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RedisCartItem implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    private String id; // Format: userId:componentId
    
    @Indexed
    private Long userId;
    
    @Indexed
    private Long componentId;
    
    private String componentName;
    private String componentType;
    private String modelName;
    private String brandName;
    private BigDecimal price;
    private Integer quantity;
    private String imageUrl;
    private Integer quantityAvailable;
    
    public BigDecimal getSubtotal() {
        return price.multiply(new BigDecimal(quantity));
    }
    
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
    
    public static String generateId(Long userId, Long componentId) {
        return userId + ":" + componentId;
    }
}
