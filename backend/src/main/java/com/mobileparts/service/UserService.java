package com.mobileparts.service;

import com.mobileparts.entity.User;
import com.mobileparts.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(User.UserRole role) {
        return userRepository.findByRole(role);
    }

    public List<User> searchUsers(String searchTerm) {
        return userRepository.searchUsers(searchTerm);
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    if (updatedUser.getFirstName() != null) user.setFirstName(updatedUser.getFirstName());
                    if (updatedUser.getLastName() != null) user.setLastName(updatedUser.getLastName());
                    if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
                    if (updatedUser.getPhoneNumber() != null) user.setPhoneNumber(updatedUser.getPhoneNumber());
                    if (updatedUser.getAddressLine1() != null) user.setAddressLine1(updatedUser.getAddressLine1());
                    if (updatedUser.getAddressLine2() != null) user.setAddressLine2(updatedUser.getAddressLine2());
                    if (updatedUser.getCity() != null) user.setCity(updatedUser.getCity());
                    if (updatedUser.getState() != null) user.setState(updatedUser.getState());
                    if (updatedUser.getPostalCode() != null) user.setPostalCode(updatedUser.getPostalCode());
                    if (updatedUser.getCountry() != null) user.setCountry(updatedUser.getCountry());
                    if (updatedUser.getFirebaseUid() != null) user.setFirebaseUid(updatedUser.getFirebaseUid());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public void deleteUser(Long id) {
        userRepository.findById(id)
                .ifPresent(user -> {
                    user.setIsDeleted(true);
                    userRepository.save(user);
                });
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
