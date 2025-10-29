package com.mobileparts.repository;

import com.mobileparts.model.RedisCartItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Redis repository for cart items
 */
@Repository
public interface RedisCartRepository extends CrudRepository<RedisCartItem, String> {
    
    /**
     * Find all cart items for a specific user
     */
    List<RedisCartItem> findByUserId(Long userId);
    
    /**
     * Find a specific cart item for a user and component
     */
    RedisCartItem findByUserIdAndComponentId(Long userId, Long componentId);
    
    /**
     * Delete all cart items for a user
     */
    void deleteByUserId(Long userId);
    
    /**
     * Count cart items for a user
     */
    long countByUserId(Long userId);
}
