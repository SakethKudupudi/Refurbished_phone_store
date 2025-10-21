package com.mobileparts.resolver;

import com.mobileparts.entity.*;
import com.mobileparts.service.*;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MutationResolver implements GraphQLMutationResolver {

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

    // User Mutations
    public User createUser(String name, String email, String password, String phone, String address, String role) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPasswordHash(password); // Should be hashed in real implementation
        user.setPhone(phone);
        user.setAddress(address);
        user.setRole(User.Role.valueOf(role));
        return userService.createUser(user);
    }

    public User updateUser(Long id, String name, String email, String phone, String address) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setAddress(address);
        return userService.updateUser(id, user);
    }

    public Boolean deleteUser(Long id) {
        userService.deleteUser(id);
        return true;
    }

    // Brand Mutations
    public Brand createBrand(String name, String category, String logoUrl, String description) {
        Brand brand = new Brand();
        brand.setName(name);
        brand.setCategory(Brand.Category.valueOf(category));
        brand.setLogoUrl(logoUrl);
        brand.setDescription(description);
        return brandService.createBrand(brand);
    }

    public Brand updateBrand(Long id, String name, String category, String logoUrl, String description) {
        Brand brand = new Brand();
        brand.setName(name);
        brand.setCategory(Brand.Category.valueOf(category));
        brand.setLogoUrl(logoUrl);
        brand.setDescription(description);
        return brandService.updateBrand(id, brand);
    }

    public Boolean deleteBrand(Long id) {
        brandService.deleteBrand(id);
        return true;
    }

    // Model Mutations
    public Model createModel(Long brandId, String name, Integer releaseYear, String imageUrl, String specifications) {
        Brand brand = brandService.getBrandById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        
        Model model = new Model();
        model.setBrand(brand);
        model.setName(name);
        model.setReleaseYear(releaseYear);
        model.setImageUrl(imageUrl);
        model.setSpecifications(specifications);
        return modelService.createModel(model);
    }

    public Boolean deleteModel(Long id) {
        modelService.deleteModel(id);
        return true;
    }

    // Component Mutations
    public Component createComponent(Long modelId, Long vendorId, String name, String type, 
                                    String description, String price, Integer quantityInStock,
                                    String imageUrl, String specifications) {
        Model model = modelService.getModelById(modelId)
                .orElseThrow(() -> new RuntimeException("Model not found"));
        User vendor = userService.getUserById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        
        Component component = new Component();
        component.setModel(model);
        component.setVendor(vendor);
        component.setName(name);
        component.setType(Component.ComponentType.valueOf(type));
        component.setDescription(description);
        component.setPrice(new java.math.BigDecimal(price));
        component.setQuantityInStock(quantityInStock);
        component.setImageUrl(imageUrl);
        component.setSpecifications(specifications);
        
        return componentService.createComponent(component);
    }

    public Component approveComponent(Long id) {
        return componentService.approveComponent(id);
    }

    public Component rejectComponent(Long id, String reason) {
        return componentService.rejectComponent(id, reason);
    }

    public Boolean deleteComponent(Long id) {
        componentService.deleteComponent(id);
        return true;
    }

    // Cart Mutations
    public CartItem addToCart(Long userId, Long componentId, Integer quantity) {
        return cartService.addToCart(userId, componentId, quantity);
    }

    public CartItem updateCartItemQuantity(Long cartItemId, Integer quantity) {
        return cartService.updateCartItemQuantity(cartItemId, quantity);
    }

    public Boolean removeFromCart(Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return true;
    }

    public Boolean clearCart(Long userId) {
        cartService.clearCart(userId);
        return true;
    }

    // Order Mutations
    public Order createOrder(Long userId, String shippingAddress, String paymentMethod) {
        return orderService.createOrder(userId, shippingAddress, paymentMethod);
    }

    public Order updateOrderStatus(Long orderId, String status) {
        return orderService.updateOrderStatus(orderId, Order.Status.valueOf(status));
    }

    public Order updatePaymentStatus(Long orderId, String paymentStatus) {
        return orderService.updatePaymentStatus(orderId, Order.PaymentStatus.valueOf(paymentStatus));
    }
}
