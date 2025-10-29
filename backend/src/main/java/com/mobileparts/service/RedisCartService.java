package com.mobileparts.service;

import com.mobileparts.entity.Component;
import com.mobileparts.model.RedisCartItem;
import com.mobileparts.repository.ComponentRepository;
import com.mobileparts.repository.RedisCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Service for managing shopping cart using Redis
 */
@Service
@Transactional
public class RedisCartService {
    
    @Autowired
    private RedisCartRepository redisCartRepository;
    
    @Autowired
    private ComponentRepository componentRepository;
    
    /**
     * Add item to cart or update quantity if already exists
     */
    public RedisCartItem addToCart(Long userId, Long componentId, Integer quantity) {
        // Get component details
        Component component = componentRepository.findById(componentId)
                .orElseThrow(() -> new RuntimeException("Component not found: " + componentId));
        
        // Check if item already in cart
        String cartItemId = RedisCartItem.generateId(userId, componentId);
        Optional<RedisCartItem> existingItem = redisCartRepository.findById(cartItemId);
        
        RedisCartItem cartItem;
        if (existingItem.isPresent()) {
            // Update quantity
            cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            // Create new cart item
            cartItem = RedisCartItem.builder()
                    .id(cartItemId)
                    .userId(userId)
                    .componentId(componentId)
                    .componentName(component.getName())
                    .componentType(component.getComponentType().name())
                    .modelName(component.getModel() != null ? component.getModel().getName() : "")
                    .brandName(component.getModel() != null && component.getModel().getBrand() != null 
                            ? component.getModel().getBrand().getName() : "")
                    .price(component.getPrice())
                    .quantity(quantity)
                    .imageUrl(component.getImageUrl())
                    .quantityAvailable(component.getQuantityAvailable())
                    .build();
        }
        
        // Validate quantity against available stock
        if (cartItem.getQuantity() > component.getQuantityAvailable()) {
            throw new RuntimeException("Requested quantity exceeds available stock");
        }
        
        return redisCartRepository.save(cartItem);
    }
    
    /**
     * Get all cart items for a user
     */
    public List<RedisCartItem> getCartItems(Long userId) {
        return redisCartRepository.findByUserId(userId);
    }
    
    /**
     * Get cart item count for a user
     */
    public long getCartItemCount(Long userId) {
        return redisCartRepository.countByUserId(userId);
    }
    
    /**
     * Update cart item quantity
     */
    public RedisCartItem updateQuantity(Long userId, Long componentId, Integer quantity) {
        String cartItemId = RedisCartItem.generateId(userId, componentId);
        RedisCartItem cartItem = redisCartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        // Validate quantity
        Component component = componentRepository.findById(componentId)
                .orElseThrow(() -> new RuntimeException("Component not found"));
        
        if (quantity > component.getQuantityAvailable()) {
            throw new RuntimeException("Requested quantity exceeds available stock");
        }
        
        if (quantity <= 0) {
            redisCartRepository.deleteById(cartItemId);
            return null;
        }
        
        cartItem.setQuantity(quantity);
        return redisCartRepository.save(cartItem);
    }
    
    /**
     * Remove item from cart
     */
    public void removeFromCart(Long userId, Long componentId) {
        String cartItemId = RedisCartItem.generateId(userId, componentId);
        redisCartRepository.deleteById(cartItemId);
    }
    
    /**
     * Clear all items from cart
     */
    public void clearCart(Long userId) {
        redisCartRepository.deleteByUserId(userId);
    }
    
    /**
     * Get cart total
     */
    public BigDecimal getCartTotal(Long userId) {
        List<RedisCartItem> items = getCartItems(userId);
        return items.stream()
                .map(RedisCartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    /**
     * Sync cart to database (for checkout)
     */
    public void syncCartToDatabase(Long userId) {
        // This will be called during checkout to persist cart items to database
        // For now, we'll keep items in Redis until order is placed
    }
}
