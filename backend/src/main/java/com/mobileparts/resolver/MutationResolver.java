package com.mobileparts.resolver;

import com.mobileparts.entity.*;
import com.mobileparts.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class MutationResolver {

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
    public User createUser(String firstName, String lastName, String email, String password, String phoneNumber, String addressLine1, String role) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        // Note: password should be hashed in real implementation
        user.addRole(User.UserRole.valueOf(role));
        user.setPhoneNumber(phoneNumber);
        user.setAddressLine1(addressLine1);
        return userService.createUser(user);
    }

    public User updateUser(Long id, String firstName, String lastName, String email, String phoneNumber, String addressLine1) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setAddressLine1(addressLine1);
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
        brand.setCategory(Brand.BrandCategory.valueOf(category));
        brand.setLogoUrl(logoUrl);
        brand.setDescription(description);
        return brandService.createBrand(brand);
    }

    public Brand updateBrand(Long id, String name, String category, String logoUrl, String description) {
        Brand brand = new Brand();
        brand.setName(name);
        brand.setCategory(Brand.BrandCategory.valueOf(category));
        brand.setLogoUrl(logoUrl);
        brand.setDescription(description);
        return brandService.updateBrand(id, brand);
    }

    public Boolean deleteBrand(Long id) {
        brandService.deleteBrand(id);
        return true;
    }

    // Model Mutations
    public Model createModel(Long brandId, String name, Integer releaseYear, String imageUrl, String description) {
        Brand brand = brandService.getBrandById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        
        Model model = new Model();
        model.setBrand(brand);
        model.setName(name);
        model.setReleaseYear(releaseYear);
        model.setImageUrl(imageUrl);
        model.setDescription(description);
        return modelService.createModel(model);
    }

    public Boolean deleteModel(Long id) {
        modelService.deleteModel(id);
        return true;
    }

    // Component Mutations
    public Component createComponent(Long modelId, Long vendorId, String name, String type, 
                                    String description, String price, Integer quantityAvailable,
                                    String imageUrl, String manufacturer) {
        Model model = modelService.getModelById(modelId)
                .orElseThrow(() -> new RuntimeException("Model not found"));
        User vendor = userService.getUserById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        
        Component component = new Component();
        component.setModel(model);
        component.setVendor(vendor);
        component.setName(name);
        component.setComponentType(Component.ComponentType.valueOf(type));
        component.setDescription(description);
        component.setPrice(new java.math.BigDecimal(price));
        component.setQuantityAvailable(quantityAvailable);
        component.setImageUrl(imageUrl);
        component.setManufacturer(manufacturer);
        
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
    public CartService.CartItemDTO addToCart(Long userId, Long componentId, Integer quantity) {
        return cartService.addToCart(userId, componentId, quantity);
    }

    public CartService.CartItemDTO updateCartItemQuantity(Long userId, Long componentId, Integer quantity) {
        return cartService.updateCartItemQuantity(userId, componentId, quantity);
    }

    public Boolean removeFromCart(Long userId, Long componentId) {
        cartService.removeFromCart(userId, componentId);
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
        return orderService.updateOrderStatus(orderId, Order.OrderStatus.valueOf(status));
    }

    public Order updatePaymentStatus(Long orderId, String paymentStatus) {
        return orderService.updatePaymentStatus(orderId, Order.PaymentStatus.valueOf(paymentStatus));
    }
}
