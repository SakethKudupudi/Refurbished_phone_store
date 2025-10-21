package com.mobileparts.service;

import com.mobileparts.entity.*;
import com.mobileparts.repository.CartItemRepository;
import com.mobileparts.repository.OrderRepository;
import com.mobileparts.repository.OrderItemRepository;
import com.mobileparts.repository.UserRepository;
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
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ComponentService componentService;

    public Order createOrder(Long userId, String shippingAddress, String paymentMethod) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CartItem> cartItems = cartService.getCartItems(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Create order
        Order order = new Order();
        order.setCustomer(user);
        order.setStatus(Order.Status.PENDING);
        order.setShippingAddress(shippingAddress);
        order.setPaymentMethod(paymentMethod);
        order.setPaymentStatus(Order.PaymentStatus.PENDING);
        
        BigDecimal totalAmount = BigDecimal.ZERO;

        // Save order first to get ID
        order = orderRepository.save(order);

        // Create order items from cart items
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setComponent(cartItem.getComponent());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            
            BigDecimal itemTotal = cartItem.getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);
            
            orderItemRepository.save(orderItem);

            // Update component stock
            Component component = cartItem.getComponent();
            component.setQuantityInStock(component.getQuantityInStock() - cartItem.getQuantity());
        }

        order.setTotalAmount(totalAmount);
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

    public Order updateOrderStatus(Long orderId, Order.Status status) {
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
                    if (paymentStatus == Order.PaymentStatus.PAID) {
                        order.setStatus(Order.Status.PROCESSING);
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
        return orderItemRepository.findTopSellingComponents().stream()
                .limit(limit)
                .toList();
    }
}
