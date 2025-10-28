package com.mobileparts.service;

import com.mobileparts.entity.Brand;
import com.mobileparts.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    public Optional<Brand> getBrandById(Long id) {
        return brandRepository.findById(id);
    }

    public List<Brand> getAllBrands() {
        return brandRepository.findAllActive();
    }

    public List<Brand> getBrandsByCategory(Brand.BrandCategory category) {
        return brandRepository.findByCategory(category);
    }

    public Brand updateBrand(Long id, Brand updatedBrand) {
        return brandRepository.findById(id)
                .map(brand -> {
                    brand.setName(updatedBrand.getName());
                    brand.setCategory(updatedBrand.getCategory());
                    brand.setLogoUrl(updatedBrand.getLogoUrl());
                    brand.setDescription(updatedBrand.getDescription());
                    return brandRepository.save(brand);
                })
                .orElseThrow(() -> new RuntimeException("Brand not found with id: " + id));
    }

    public void deleteBrand(Long id) {
        brandRepository.findById(id)
                .ifPresent(brand -> {
                    brand.setIsDeleted(true);
                    brandRepository.save(brand);
                });
    }
}
