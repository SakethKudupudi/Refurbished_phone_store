package com.mobileparts.service;

import com.mobileparts.entity.Model;
import com.mobileparts.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ModelService {

    @Autowired
    private ModelRepository modelRepository;

    public Model createModel(Model model) {
        return modelRepository.save(model);
    }

    public Optional<Model> getModelById(Long id) {
        return modelRepository.findById(id);
    }

    public List<Model> getAllModels() {
        return modelRepository.findAll();
    }

    public List<Model> getModelsByBrandId(Long brandId) {
        return modelRepository.findActiveModelsByBrandId(brandId);
    }

    public List<Model> searchModels(String searchTerm) {
        return modelRepository.searchModels(searchTerm);
    }

    public Model updateModel(Long id, Model updatedModel) {
        return modelRepository.findById(id)
                .map(model -> {
                    model.setName(updatedModel.getName());
                    model.setReleaseYear(updatedModel.getReleaseYear());
                    model.setImageUrl(updatedModel.getImageUrl());
                    model.setSpecifications(updatedModel.getSpecifications());
                    return modelRepository.save(model);
                })
                .orElseThrow(() -> new RuntimeException("Model not found with id: " + id));
    }

    public void deleteModel(Long id) {
        modelRepository.findById(id)
                .ifPresent(model -> {
                    model.setIsDeleted(true);
                    modelRepository.save(model);
                });
    }
}
