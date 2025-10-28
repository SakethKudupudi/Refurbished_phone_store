package com.mobileparts.controller;

import com.mobileparts.service.CartService;
import com.mobileparts.service.CartService.CartItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("isAuthenticated()")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getCartItems(@RequestParam Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @GetMapping("/summary")
    public ResponseEntity<CartSummary> getCartSummary(@RequestParam Long userId) {
        List<CartItemDTO> items = cartService.getCartItems(userId);
        BigDecimal totalAmount = cartService.getCartTotal(userId);
        Integer totalItems = cartService.getCartItemCount(userId);
        
        CartSummary summary = new CartSummary(items, totalItems, totalAmount);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/count")
    public ResponseEntity<CountResponse> getCartCount(@RequestParam Long userId) {
        Integer count = cartService.getCartItemCount(userId);
        return ResponseEntity.ok(new CountResponse(count));
    }

    @GetMapping("/total")
    public ResponseEntity<TotalResponse> getCartTotal(@RequestParam Long userId) {
        BigDecimal total = cartService.getCartTotal(userId);
        return ResponseEntity.ok(new TotalResponse(total));
    }

    @PostMapping
    public ResponseEntity<CartItemDTO> addToCart(@RequestBody AddToCartRequest request) {
        CartItemDTO cartItem = cartService.addToCart(
            request.getUserId(),
            request.getComponentId(),
            request.getQuantity()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(cartItem);
    }

    @PutMapping("/{componentId}")
    public ResponseEntity<CartItemDTO> updateCartItemQuantity(
            @PathVariable Long componentId,
            @RequestParam Long userId,
            @RequestBody UpdateQuantityRequest request) {
        CartItemDTO updated = cartService.updateCartItemQuantity(userId, componentId, request.getQuantity());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{componentId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Long componentId,
            @RequestParam Long userId) {
        cartService.removeFromCart(userId, componentId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestParam Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    // DTOs
    static class AddToCartRequest {
        private Long userId;
        private Long componentId;
        private Integer quantity;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public Long getComponentId() { return componentId; }
        public void setComponentId(Long componentId) { this.componentId = componentId; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    static class UpdateQuantityRequest {
        private Integer quantity;

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    static class CountResponse {
        private Integer count;

        public CountResponse(Integer count) { this.count = count; }
        public Integer getCount() { return count; }
    }

    static class TotalResponse {
        private BigDecimal total;

        public TotalResponse(BigDecimal total) { this.total = total; }
        public BigDecimal getTotal() { return total; }
    }

    static class CartSummary {
        private List<CartItemDTO> items;
        private Integer totalItems;
        private BigDecimal totalAmount;

        public CartSummary(List<CartItemDTO> items, Integer totalItems, BigDecimal totalAmount) {
            this.items = items;
            this.totalItems = totalItems;
            this.totalAmount = totalAmount;
        }

        public List<CartItemDTO> getItems() { return items; }
        public Integer getTotalItems() { return totalItems; }
        public BigDecimal getTotalAmount() { return totalAmount; }
    }
}
