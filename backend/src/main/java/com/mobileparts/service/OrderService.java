package com.mobileparts.service;

import com.mobileparts.entity.*;
import com.mobileparts.repository.OrderRepository;
import com.mobileparts.repository.OrderItemRepository;
import com.mobileparts.repository.UserRepository;
import com.mobileparts.repository.ComponentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ComponentRepository componentRepository;

    @Autowired
    private CartService cartService;

    public Order createOrder(Long userId, String shippingAddress, String paymentMethod) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CartService.CartItemDTO> cartItems = cartService.getCartItems(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Create order
        Order order = new Order();
        order.setCustomer(user);
        order.setStatus(Order.OrderStatus.PENDING);
        // Parse shipping address - for now just set the name field
        // In production, parse the address string properly
        order.setShippingName(user.getFullName());
        order.setShippingAddressLine1(shippingAddress != null ? shippingAddress : "");
        order.setShippingCity("");
        order.setShippingState("");
        order.setShippingPostalCode("");
        order.setShippingCountry("");
        order.setPaymentMethod(paymentMethod);
        order.setPaymentStatus(Order.PaymentStatus.PENDING);
        
        BigDecimal subtotal = BigDecimal.ZERO;

        // Save order first to get ID
        order = orderRepository.save(order);

        // Create order items from cart items
        for (CartService.CartItemDTO cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            
            // Fetch component from database
            Component component = componentRepository.findById(cartItem.getComponentId())
                    .orElseThrow(() -> new RuntimeException("Component not found: " + cartItem.getComponentId()));
            
            orderItem.setComponent(component);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getPrice());
            orderItem.setComponentName(cartItem.getComponentName());
            orderItem.setComponentSku(component.getSku());
            orderItem.calculateTotalPrice();
            
            BigDecimal itemTotal = cartItem.getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
            subtotal = subtotal.add(itemTotal);
            
            orderItemRepository.save(orderItem);

            // Update component stock
            component.setQuantityAvailable(component.getQuantityAvailable() - cartItem.getQuantity());
            componentRepository.save(component);
        }

        order.setSubtotal(subtotal);
        order.setTotalAmount(subtotal.add(order.getTaxAmount()).add(order.getShippingAmount()));
        order = orderRepository.save(order);

        // Clear cart
        cartService.clearCart(userId);

        return order;
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setStatus(status);
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updatePaymentStatus(Long orderId, Order.PaymentStatus paymentStatus) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setPaymentStatus(paymentStatus);
                    if (paymentStatus == Order.PaymentStatus.CAPTURED) {
                        order.setStatus(Order.OrderStatus.PROCESSING);
                    }
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<OrderItem> getOrderItems(Long orderId) {
        return orderItemRepository.findAll().stream()
                .filter(item -> item.getOrder().getId().equals(orderId))
                .toList();
    }

    public BigDecimal getTotalRevenue(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.getTotalRevenueByDateRange(startDate, endDate);
    }

    public List<Object[]> getTopSellingComponents(int limit) {
        return orderItemRepository.findTopSellingComponents(limit);
    }
}
