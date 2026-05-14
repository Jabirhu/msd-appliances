package com.ecommerce.backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "ds7isy7lg", 
            "api_key", "314799517314259",      
            "api_secret", "hw9gd2iCkM3sFBHGZWHDTtumTnQ" 
            // CLOUDINARY_URL=cloudinary://314799517314259:hw9gd2iCkM3sFBHGZWHDTtumTnQ@ds7isy7lg
        ));
    }
}
