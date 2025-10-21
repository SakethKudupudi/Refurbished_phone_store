package com.mobileparts.repository;

import com.mobileparts.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

    Optional<Brand> findByName(String name);

    List<Brand> findByCategory(Brand.BrandCategory category);

    @Query("SELECT b FROM Brand b WHERE b.isActive = true AND b.isDeleted = false ORDER BY b.name")
    List<Brand> findAllActive();

    @Query("SELECT b FROM Brand b WHERE b.category = :category AND b.isActive = true ORDER BY b.name")
    List<Brand> findActiveBrandsByCategory(Brand.BrandCategory category);

    boolean existsByName(String name);
}
