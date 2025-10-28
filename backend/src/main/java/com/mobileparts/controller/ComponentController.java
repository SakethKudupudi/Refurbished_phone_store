package com.mobileparts.controller;

import com.mobileparts.entity.Component;
import com.mobileparts.service.ComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/components")
@CrossOrigin(origins = "http://localhost:4200")
public class ComponentController {

    @Autowired
    private ComponentService componentService;

    @GetMapping
    public ResponseEntity<List<Component>> getAllComponents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Component> componentPage = componentService.getAllComponents(pageable);
        return ResponseEntity.ok(componentPage.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Component> getComponentById(@PathVariable Long id) {
        return componentService.getComponentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/model/{modelId}")
    public ResponseEntity<List<Component>> getComponentsByModel(@PathVariable Long modelId) {
        return ResponseEntity.ok(componentService.getComponentsByModelId(modelId));
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<Component>> getComponentsByVendor(@PathVariable Long vendorId) {
        return ResponseEntity.ok(componentService.getComponentsByVendorId(vendorId));
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Component>> getPendingApprovals() {
        return ResponseEntity.ok(componentService.getPendingApprovals());
    }

    @PostMapping
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<Component> createComponent(@RequestBody Component component) {
        Component created = componentService.createComponent(component);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    public ResponseEntity<Component> updateComponent(@PathVariable Long id, @RequestBody Component component) {
        try {
            Component updated = componentService.updateComponent(id, component);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteComponent(@PathVariable Long id) {
        componentService.deleteComponent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Component> approveComponent(@PathVariable Long id) {
        try {
            Component approved = componentService.approveComponent(id);
            return ResponseEntity.ok(approved);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Component> rejectComponent(@PathVariable Long id, @RequestBody RejectRequest request) {
        try {
            Component rejected = componentService.rejectComponent(id, request.getReason());
            return ResponseEntity.ok(rejected);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DTO for reject request
    static class RejectRequest {
        private String reason;

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }
    }
}
