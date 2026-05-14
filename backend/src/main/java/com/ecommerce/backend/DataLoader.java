package com.ecommerce.backend;

import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            Product p1 = new Product();
            p1.setName("Front Load Washing Machine");
            p1.setBrand("Samsung");
            p1.setPrice(35000.0);
            p1.setCategory("Washing Machine");
            p1.setDescription("8kg Fully Automatic with Digital Inverter.");
            p1.setImageUrl("https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=1000");
       
            Product p2 = new Product();
            p2.setName("Double Door Refrigerator");
            p2.setBrand("LG");
            p2.setPrice(45000.0);
            p2.setCategory("Refrigerator");
            p2.setDescription("260L Frost Free with Smart Connect.");
            p2.setImageUrl("https://www.lg.com/in/images/refrigerators/md07519100/gallery/GL-S292RPZY-Refrigerators-Front-View-D-01.jpg");
           
            Product p3 = new Product();
            p3.setName("Semi-Automatic Washer");
            p3.setBrand("Whirlpool");
            p3.setPrice(15000.0);
            p3.setCategory("Washing Machine");
            p3.setDescription("7kg Top Load with Ace XL technology.");
            p3.setImageUrl("https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1000");

            productRepository.save(p1);
            productRepository.save(p2);
            productRepository.save(p3);

            System.out.println("Sample products added to MySQL!");
        }
    }
}