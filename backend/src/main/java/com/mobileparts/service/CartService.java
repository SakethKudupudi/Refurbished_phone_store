package com.mobileparts.service;

import com.mobileparts.entity.CartItem;
import com.mobileparts.entity.Component;
import com.mobileparts.entity.User;
import com.mobileparts.repository.CartItemRepository;
import com.mobileparts.repository.ComponentRepository;
import com.mobileparts.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ComponentRepository componentRepository;

    public CartItem addToCart(Long userId, Long componentId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Component component = componentRepository.findById(componentId)
                .orElseThrow(() -> new RuntimeException("Component not found"));

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdWithDetails(userId).stream()
                .filter(item -> item.getComponent().getId().equals(componentId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepository.save(item);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setComponent(component);
            cartItem.setQuantity(quantity);
            // CartItem doesn't have a price field - price comes from component
            return cartItemRepository.save(cartItem);
        }
    }

    public List<CartItem> getCartItems(Long userId) {
        return cartItemRepository.findByUserIdWithDetails(userId);
    }

    public CartItem updateCartItemQuantity(Long cartItemId, Integer quantity) {
        return cartItemRepository.findById(cartItemId)
                .map(item -> {
                    item.setQuantity(quantity);
                    return cartItemRepository.save(item);
                })
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
    }

    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    public BigDecimal getCartTotal(Long userId) {
        List<CartItem> items = getCartItems(userId);
        return items.stream()
                .map(item -> item.getComponent().getPrice().multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Integer getCartItemCount(Long userId) {
        List<CartItem> items = getCartItems(userId);
        return items.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
    }
}
