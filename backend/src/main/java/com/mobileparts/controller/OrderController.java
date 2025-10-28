package com.mobileparts.controller;

import com.mobileparts.entity.Order;
import com.mobileparts.entity.OrderItem;
import com.mobileparts.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        Order order = orderService.createOrder(
            request.getUserId(),
            buildShippingAddress(request),
            request.getPaymentMethod()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping("/my-orders")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Order>> getMyOrders(@RequestParam Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByCustomerId(userId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('VENDOR')")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request) {
        Order updated = orderService.updateOrderStatus(id, request.getStatus());
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/payment")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updatePaymentStatus(
            @PathVariable Long id,
            @RequestBody UpdatePaymentStatusRequest request) {
        Order updated = orderService.updatePaymentStatus(id, request.getStatus());
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}/items")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<OrderItem>> getOrderItems(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderItems(id));
    }

    @GetMapping("/analytics/revenue")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RevenueResponse> getRevenue(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        BigDecimal revenue = orderService.getTotalRevenue(startDate, endDate);
        return ResponseEntity.ok(new RevenueResponse(revenue));
    }

    @GetMapping("/analytics/top-selling")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Object[]>> getTopSellingComponents(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(orderService.getTopSellingComponents(limit));
    }

    // Helper method to build shipping address string
    private String buildShippingAddress(CreateOrderRequest request) {
        return String.format("%s, %s, %s, %s %s, %s",
            request.getShippingName(),
            request.getShippingAddressLine1(),
            request.getShippingCity(),
            request.getShippingState(),
            request.getShippingPostalCode(),
            request.getShippingCountry());
    }

    // DTOs
    static class CreateOrderRequest {
        private Long userId;
        private String shippingName;
        private String shippingAddressLine1;
        private String shippingAddressLine2;
        private String shippingCity;
        private String shippingState;
        private String shippingPostalCode;
        private String shippingCountry;
        private String paymentMethod;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public String getShippingName() { return shippingName; }
        public void setShippingName(String shippingName) { this.shippingName = shippingName; }

        public String getShippingAddressLine1() { return shippingAddressLine1; }
        public void setShippingAddressLine1(String shippingAddressLine1) { this.shippingAddressLine1 = shippingAddressLine1; }

        public String getShippingAddressLine2() { return shippingAddressLine2; }
        public void setShippingAddressLine2(String shippingAddressLine2) { this.shippingAddressLine2 = shippingAddressLine2; }

        public String getShippingCity() { return shippingCity; }
        public void setShippingCity(String shippingCity) { this.shippingCity = shippingCity; }

        public String getShippingState() { return shippingState; }
        public void setShippingState(String shippingState) { this.shippingState = shippingState; }

        public String getShippingPostalCode() { return shippingPostalCode; }
        public void setShippingPostalCode(String shippingPostalCode) { this.shippingPostalCode = shippingPostalCode; }

        public String getShippingCountry() { return shippingCountry; }
        public void setShippingCountry(String shippingCountry) { this.shippingCountry = shippingCountry; }

        public String getPaymentMethod() { return paymentMethod; }
        public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    }

    static class UpdateStatusRequest {
        private Order.OrderStatus status;

        public Order.OrderStatus getStatus() { return status; }
        public void setStatus(Order.OrderStatus status) { this.status = status; }
    }

    static class UpdatePaymentStatusRequest {
        private Order.PaymentStatus status;

        public Order.PaymentStatus getStatus() { return status; }
        public void setStatus(Order.PaymentStatus status) { this.status = status; }
    }

    static class RevenueResponse {
        private BigDecimal revenue;

        public RevenueResponse(BigDecimal revenue) { this.revenue = revenue; }
        public BigDecimal getRevenue() { return revenue; }
    }
}
