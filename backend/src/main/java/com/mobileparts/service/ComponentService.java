package com.mobileparts.service;

import com.mobileparts.entity.Component;
import com.mobileparts.entity.User;
import com.mobileparts.repository.ComponentRepository;
import com.mobileparts.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ComponentService {

    @Autowired
    private ComponentRepository componentRepository;

    @Autowired
    private ModelService modelService;

    @Autowired
    private UserRepository userRepository;

    public Component createComponent(Component component) {
        // New components start in PENDING status
        component.setApprovalStatus(Component.ApprovalStatus.PENDING);
        
        // Resolve the model if only ID is provided
        if (component.getModel() != null && component.getModel().getId() != null) {
            Long modelId = component.getModel().getId();
            com.mobileparts.entity.Model fullModel = modelService.getModelById(modelId)
                .orElseThrow(() -> new RuntimeException("Model not found with id: " + modelId));
            component.setModel(fullModel);
        }
        
        // Get current user as vendor if not set
        // TODO: Get from security context when authentication is implemented
        if (component.getVendor() == null || component.getVendor().getId() == null) {
            // For now, use the test vendor ID 5
            User vendor = userRepository.findById(5L)
                .orElseThrow(() -> new RuntimeException("Vendor user not found"));
            component.setVendor(vendor);
        }
        
        return componentRepository.save(component);
    }

    public Optional<Component> getComponentById(Long id) {
        return componentRepository.findById(id);
    }

    public Page<Component> getAllComponents(Pageable pageable) {
        return componentRepository.findAll(pageable);
    }

    public List<Component> getComponentsByModelId(Long modelId) {
        return componentRepository.findAvailableComponentsByModelId(modelId);
    }

    public List<Component> getComponentsByVendorId(Long vendorId) {
        return componentRepository.findAll().stream()
                .filter(c -> c.getVendor().getId().equals(vendorId))
                .toList();
    }

    public List<Component> getPendingApprovals() {
        return componentRepository.findAll().stream()
                .filter(c -> c.getApprovalStatus() == Component.ApprovalStatus.PENDING)
                .toList();
    }

    public Long countPendingApprovals() {
        return componentRepository.countPendingApprovals();
    }

    public Component approveComponent(Long id) {
        return componentRepository.findById(id)
                .map(component -> {
                    component.setApprovalStatus(Component.ApprovalStatus.APPROVED);
                    return componentRepository.save(component);
                })
                .orElseThrow(() -> new RuntimeException("Component not found with id: " + id));
    }

    public Component rejectComponent(Long id, String reason) {
        return componentRepository.findById(id)
                .map(component -> {
                    component.setApprovalStatus(Component.ApprovalStatus.REJECTED);
                    // You could add a rejectionReason field to Component entity
                    return componentRepository.save(component);
                })
                .orElseThrow(() -> new RuntimeException("Component not found with id: " + id));
    }

    public Component updateComponent(Long id, Component updatedComponent) {
        return componentRepository.findById(id)
                .map(component -> {
                    if (updatedComponent.getName() != null) component.setName(updatedComponent.getName());
                    if (updatedComponent.getComponentType() != null) component.setComponentType(updatedComponent.getComponentType());
                    if (updatedComponent.getDescription() != null) component.setDescription(updatedComponent.getDescription());
                    if (updatedComponent.getPrice() != null) component.setPrice(updatedComponent.getPrice());
                    if (updatedComponent.getQuantityAvailable() != null) component.setQuantityAvailable(updatedComponent.getQuantityAvailable());
                    if (updatedComponent.getImageUrl() != null) component.setImageUrl(updatedComponent.getImageUrl());
                    if (updatedComponent.getManufacturer() != null) component.setManufacturer(updatedComponent.getManufacturer());
                    if (updatedComponent.getWarrantyMonths() != null) component.setWarrantyMonths(updatedComponent.getWarrantyMonths());
                    return componentRepository.save(component);
                })
                .orElseThrow(() -> new RuntimeException("Component not found with id: " + id));
    }

    public void deleteComponent(Long id) {
        componentRepository.findById(id)
                .ifPresent(component -> {
                    component.setIsDeleted(true);
                    componentRepository.save(component);
                });
    }

    public void updateStock(Long id, Integer quantity) {
        componentRepository.findById(id)
                .ifPresent(component -> {
                    component.setQuantityAvailable(component.getQuantityAvailable() + quantity);
                    componentRepository.save(component);
                });
    }
}
