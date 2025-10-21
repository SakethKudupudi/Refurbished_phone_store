package com.mobileparts.repository;

import com.mobileparts.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrderId(Long orderId);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.component.id = :componentId")
    List<OrderItem> findByComponentId(@Param("componentId") Long componentId);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.customer.id = :customerId")
    List<OrderItem> findByCustomerId(@Param("customerId") Long customerId);

    @Query("SELECT oi.component.id, SUM(oi.quantity) FROM OrderItem oi GROUP BY oi.component.id ORDER BY SUM(oi.quantity) DESC")
    List<Object[]> findTopSellingComponents(@Param("limit") int limit);
}
