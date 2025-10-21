package com.mobileparts.repository;

import com.mobileparts.entity.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    List<Model> findByBrandId(Long brandId);

    @Query("SELECT m FROM Model m WHERE m.brand.id = :brandId AND m.isActive = true AND m.isDeleted = false ORDER BY m.releaseYear DESC, m.name")
    List<Model> findActiveModelsByBrandId(@Param("brandId") Long brandId);

    @Query("SELECT m FROM Model m WHERE m.isActive = true AND m.isDeleted = false")
    List<Model> findAllActive();

    @Query("SELECT m FROM Model m WHERE (m.name LIKE %:searchTerm% OR m.modelNumber LIKE %:searchTerm%) AND m.isActive = true")
    List<Model> searchModels(@Param("searchTerm") String searchTerm);

    Optional<Model> findByNameAndBrandId(String name, Long brandId);

    boolean existsByNameAndBrandId(String name, Long brandId);
}
