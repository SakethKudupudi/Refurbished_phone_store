package com.mobileparts.service;

import com.mobileparts.entity.Component;
import com.mobileparts.repository.ComponentRepository;
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

    public Component createComponent(Component component) {
        // New components start in PENDING status
        component.setApprovalStatus(Component.ApprovalStatus.PENDING);
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
                    component.setName(updatedComponent.getName());
                    component.setType(updatedComponent.getType());
                    component.setDescription(updatedComponent.getDescription());
                    component.setPrice(updatedComponent.getPrice());
                    component.setQuantityInStock(updatedComponent.getQuantityInStock());
                    component.setImageUrl(updatedComponent.getImageUrl());
                    component.setSpecifications(updatedComponent.getSpecifications());
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
                    component.setQuantityInStock(component.getQuantityInStock() + quantity);
                    componentRepository.save(component);
                });
    }
}
