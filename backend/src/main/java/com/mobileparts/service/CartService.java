package com.mobileparts.service;

import com.mobileparts.entity.Component;
import com.mobileparts.repository.ComponentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * Redis-based cart service
 * Stores cart items in Redis for fast access and automatic expiration
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ComponentRepository componentRepository;

    private static final String CART_KEY_PREFIX = "cart:";
    private static final long CART_EXPIRATION_HOURS = 24; // Cart expires after 24 hours

    /**
     * Cart item DTO stored in Redis
     */
    public static class CartItemDTO implements Serializable {
        private static final long serialVersionUID = 1L;
        
        private Long id;  // This is the component ID (for backwards compatibility with frontend)
        private Long componentId;
        private String componentName;
        private BigDecimal price;
        private String imageUrl;
        private Integer quantity;

        public CartItemDTO() {}

        public CartItemDTO(Long componentId, String componentName, BigDecimal price, String imageUrl, Integer quantity) {
            this.id = componentId;
            this.componentId = componentId;
            this.componentName = componentName;
            this.price = price;
            this.imageUrl = imageUrl;
            this.quantity = quantity;
        }

        // Getters and setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public Long getComponentId() { return componentId; }
        public void setComponentId(Long componentId) { this.componentId = componentId; }
        
        public String getComponentName() { return componentName; }
        public void setComponentName(String componentName) { this.componentName = componentName; }
        
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    /**
     * Get cart key for user
     */
    private String getCartKey(Long userId) {
        return CART_KEY_PREFIX + userId;
    }

    /**
     * Add item to cart
     */
    public CartItemDTO addToCart(Long userId, Long componentId, Integer quantity) {
        Component component = componentRepository.findById(componentId)
            .orElseThrow(() -> new RuntimeException("Component not found"));

        String cartKey = getCartKey(userId);
        String itemKey = componentId.toString();

        // Check if item already exists in cart
        CartItemDTO existingItem = (CartItemDTO) redisTemplate.opsForHash().get(cartKey, itemKey);

        CartItemDTO cartItem;
        if (existingItem != null) {
            // Update quantity
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            cartItem = existingItem;
        } else {
            // Create new cart item
            cartItem = new CartItemDTO(
                component.getId(),
                component.getName(),
                component.getPrice(),
                component.getImageUrl(),
                quantity
            );
        }

        // Save to Redis
        redisTemplate.opsForHash().put(cartKey, itemKey, cartItem);
        
        // Set expiration
        redisTemplate.expire(cartKey, CART_EXPIRATION_HOURS, TimeUnit.HOURS);

        log.info("Added {} x {} to cart for user {}", quantity, component.getName(), userId);
        return cartItem;
    }

    /**
     * Get all cart items for user
     */
    public List<CartItemDTO> getCartItems(Long userId) {
        String cartKey = getCartKey(userId);
        Map<Object, Object> cartMap = redisTemplate.opsForHash().entries(cartKey);
        
        List<CartItemDTO> items = new ArrayList<>();
        for (Object value : cartMap.values()) {
            items.add((CartItemDTO) value);
        }
        
        return items;
    }

    /**
     * Update cart item quantity
     */
    public CartItemDTO updateCartItemQuantity(Long userId, Long componentId, Integer quantity) {
        String cartKey = getCartKey(userId);
        String itemKey = componentId.toString();

        CartItemDTO cartItem = (CartItemDTO) redisTemplate.opsForHash().get(cartKey, itemKey);
        
        if (cartItem == null) {
            throw new RuntimeException("Cart item not found");
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            redisTemplate.opsForHash().delete(cartKey, itemKey);
            return null;
        }

        cartItem.setQuantity(quantity);
        redisTemplate.opsForHash().put(cartKey, itemKey, cartItem);
        
        // Refresh expiration
        redisTemplate.expire(cartKey, CART_EXPIRATION_HOURS, TimeUnit.HOURS);

        return cartItem;
    }

    /**
     * Remove item from cart
     */
    public void removeFromCart(Long userId, Long componentId) {
        String cartKey = getCartKey(userId);
        String itemKey = componentId.toString();
        redisTemplate.opsForHash().delete(cartKey, itemKey);
        
        log.info("Removed component {} from cart for user {}", componentId, userId);
    }

    /**
     * Clear entire cart
     */
    public void clearCart(Long userId) {
        String cartKey = getCartKey(userId);
        redisTemplate.delete(cartKey);
        
        log.info("Cleared cart for user {}", userId);
    }

    /**
     * Get cart item count
     */
    public Integer getCartItemCount(Long userId) {
        String cartKey = getCartKey(userId);
        Long size = redisTemplate.opsForHash().size(cartKey);
        return size != null ? size.intValue() : 0;
    }

    /**
     * Get cart total
     */
    public BigDecimal getCartTotal(Long userId) {
        List<CartItemDTO> items = getCartItems(userId);
        return items.stream()
            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
