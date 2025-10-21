package com.mobileparts.repository;

import com.mobileparts.entity.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComponentRepository extends JpaRepository<Component, Long> {

    List<Component> findByModelId(Long modelId);

    @Query("SELECT c FROM Component c WHERE c.model.id = :modelId AND c.approvalStatus = 'APPROVED' AND c.isActive = true AND c.quantityAvailable > 0")
    List<Component> findAvailableComponentsByModelId(@Param("modelId") Long modelId);

    List<Component> findByVendorId(Long vendorId);

    List<Component> findByApprovalStatus(Component.ApprovalStatus status);

    @Query("SELECT c FROM Component c WHERE c.componentType = :type AND c.approvalStatus = 'APPROVED' AND c.isActive = true")
    List<Component> findByComponentType(@Param("type") Component.ComponentType type);

    @Query("SELECT c FROM Component c WHERE c.model.id = :modelId AND c.componentType = :type AND c.approvalStatus = 'APPROVED' AND c.isActive = true")
    List<Component> findByModelIdAndComponentType(@Param("modelId") Long modelId, @Param("type") Component.ComponentType type);

    @Query("SELECT c FROM Component c WHERE c.sku = :sku")
    Optional<Component> findBySku(@Param("sku") String sku);

    @Query("SELECT c FROM Component c WHERE (c.name LIKE %:searchTerm% OR c.description LIKE %:searchTerm% OR c.sku LIKE %:searchTerm%) AND c.approvalStatus = 'APPROVED' AND c.isActive = true")
    List<Component> searchComponents(@Param("searchTerm") String searchTerm);

    @Query("SELECT COUNT(c) FROM Component c WHERE c.approvalStatus = 'PENDING'")
    long countPendingApprovals();
}
