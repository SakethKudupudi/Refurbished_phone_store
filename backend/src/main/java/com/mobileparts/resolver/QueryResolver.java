package com.mobileparts.resolver;

import com.mobileparts.entity.*;
import com.mobileparts.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class QueryResolver {

    @Autowired
    private UserService userService;

    @Autowired
    private BrandService brandService;

    @Autowired
    private ModelService modelService;

    @Autowired
    private ComponentService componentService;

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    // User Queries
    public User getUserById(Long id) {
        return userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    public List<User> getUsersByRole(String role) {
        return userService.getUsersByRole(User.UserRole.valueOf(role));
    }

    // Brand Queries
    public Brand getBrandById(Long id) {
        return brandService.getBrandById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
    }

    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }

    public List<Brand> getBrandsByCategory(String category) {
        return brandService.getBrandsByCategory(Brand.BrandCategory.valueOf(category));
    }

    // Model Queries
    public Model getModelById(Long id) {
        return modelService.getModelById(id)
                .orElseThrow(() -> new RuntimeException("Model not found"));
    }

    public List<Model> getAllModels() {
        return modelService.getAllModels();
    }

    public List<Model> getModelsByBrandId(Long brandId) {
        return modelService.getModelsByBrandId(brandId);
    }

    public List<Model> searchModels(String searchTerm) {
        return modelService.searchModels(searchTerm);
    }

    // Component Queries
    public Component getComponentById(Long id) {
        return componentService.getComponentById(id)
                .orElseThrow(() -> new RuntimeException("Component not found"));
    }

    public List<Component> getAllComponents(int page, int size) {
        Page<Component> componentPage = componentService.getAllComponents(PageRequest.of(page, size));
        return componentPage.getContent();
    }

    public List<Component> getComponentsByModelId(Long modelId) {
        return componentService.getComponentsByModelId(modelId);
    }

    public List<Component> getComponentsByVendorId(Long vendorId) {
        return componentService.getComponentsByVendorId(vendorId);
    }

    public List<Component> getPendingApprovals() {
        return componentService.getPendingApprovals();
    }

    public Long countPendingApprovals() {
        return componentService.countPendingApprovals();
    }

    // Cart Queries
    public List<CartService.CartItemDTO> getCartItems(Long userId) {
        return cartService.getCartItems(userId);
    }

    public String getCartTotal(Long userId) {
        return cartService.getCartTotal(userId).toString();
    }

    public Integer getCartItemCount(Long userId) {
        return cartService.getCartItemCount(userId);
    }

    // Order Queries
    public Order getOrderById(Long id) {
        return orderService.getOrderById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderService.getOrdersByCustomerId(customerId);
    }

    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    public List<OrderItem> getOrderItems(Long orderId) {
        return orderService.getOrderItems(orderId);
    }
}
