package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.PurchaseOrder;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody PurchaseOrder order) {
        // 1. Check if product exists
        return productRepository.findById(order.getProductId()).map(product -> {
            
            // 2. Get the quantity requested from React (default to 1 if null)
            int requestedQty = (order.getQuantity() != null) ? order.getQuantity() : 1;

            // 3. Validation: Check if enough stock is available
            if (product.getQuantity() < requestedQty) {
                return ResponseEntity.badRequest()
                    .body("Insufficient stock for " + product.getName() + ". Available: " + product.getQuantity());
            }

            // 4. Update Stock: Subtract the ACTUAL requested quantity
            product.setQuantity(product.getQuantity() - requestedQty);
            productRepository.save(product);

            // 5. Save the Order
            order.setStatus("PENDING"); // Ensure initial status is PENDING
            PurchaseOrder savedOrder = orderRepository.save(order);
            
            return ResponseEntity.ok(savedOrder);
            
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public PurchaseOrder updateStatus(@PathVariable Long id, @RequestBody String newStatus) {
        PurchaseOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // Clean the status string (removes extra quotes if sent from React)
        String cleanStatus = newStatus.replace("\"", "");
        order.setStatus(cleanStatus);
        
        return orderRepository.save(order);
    }

    @GetMapping
    public List<PurchaseOrder> getAllOrders() {
        return orderRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
}