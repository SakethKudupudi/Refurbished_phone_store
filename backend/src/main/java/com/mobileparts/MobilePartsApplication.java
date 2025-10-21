package com.mobileparts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main application class for Mobile Parts E-Commerce Backend
 * 
 * This application provides a GraphQL API for managing mobile device parts
 * with Azure integration for authentication, storage, and AI capabilities.
 * 
 * @author Mobile Parts Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableScheduling
public class MobilePartsApplication {

    public static void main(String[] args) {
        SpringApplication.run(MobilePartsApplication.class, args);
    }
}
