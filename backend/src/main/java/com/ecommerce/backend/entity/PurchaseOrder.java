package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "purchase_orders")
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String phoneNumber;
    private String address;
    private Double totalAmount;
    private String status = "PENDING"; // Default value for new orders
    private Date orderDate = new Date();
    private Long productId;
    private Integer quantity;
    private String productName;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public Date getOrderDate() { return orderDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getProductId() {return productId;}
    public void setProductId(Long productId) {this.productId = productId;}

    public Integer getQuantity() {return quantity;}
    public void setQuantity(Integer quantity) {this.quantity = quantity;}

    public String getProductName() {return productName;}
    public void setProductName(String productName) {this.productName = productName;}
    

}