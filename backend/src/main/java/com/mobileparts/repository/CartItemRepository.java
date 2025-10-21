package com.mobileparts.repository;

import com.mobileparts.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserId(Long userId);

    @Query("SELECT ci FROM CartItem ci JOIN FETCH ci.component c JOIN FETCH c.model WHERE ci.user.id = :userId")
    List<CartItem> findByUserIdWithDetails(@Param("userId") Long userId);

    Optional<CartItem> findByUserIdAndComponentId(Long userId, Long componentId);

    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.user.id = :userId AND ci.component.id = :componentId")
    void deleteByUserIdAndComponentId(@Param("userId") Long userId, @Param("componentId") Long componentId);

    @Query("SELECT COUNT(ci) FROM CartItem ci WHERE ci.user.id = :userId")
    long countByUserId(@Param("userId") Long userId);
}
