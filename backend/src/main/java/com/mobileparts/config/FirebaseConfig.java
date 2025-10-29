package com.mobileparts.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Firebase Authentication Configuration
 * Initializes Firebase Admin SDK for token verification
 * Can be disabled by setting firebase.enabled=false
 */
@Configuration
@ConditionalOnProperty(name = "firebase.enabled", havingValue = "true", matchIfMissing = false)
public class FirebaseConfig {

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        // Check if Firebase app is already initialized
        if (FirebaseApp.getApps().isEmpty()) {
            try {
                // Try to load service account from classpath (production)
                InputStream serviceAccount = new ClassPathResource("firebase-service-account.json")
                        .getInputStream();
                
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();
                
                return FirebaseApp.initializeApp(options);
                
            } catch (IOException e) {
                // Fallback: Use default credentials (works in development with Firebase CLI)
                System.out.println("⚠️ firebase-service-account.json not found, using default credentials");
                System.out.println("📝 For production, add firebase-service-account.json to src/main/resources/");
                
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.getApplicationDefault())
                        .build();
                
                return FirebaseApp.initializeApp(options);
            }
        }
        return FirebaseApp.getInstance();
    }

    @Bean
    public FirebaseAuth firebaseAuth() throws IOException {
        return FirebaseAuth.getInstance(initializeFirebase());
    }
}
