# MSD Appliances - Full Stack E-Commerce System

A professional Full-Stack E-Commerce application designed for appliance management, featuring a Spring Boot backend and a React (Vite) frontend.

## 🚀 Project Overview
This system allows for product management, user authentication, and order processing. It is built to be lightweight, scalable, and easy to deploy.

------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------

## 🛠️ Step-by-Step Implementation Guide

Follow these steps to get the project running on your local machine.

------------------------------------------------------------------------------
### 1. Tech Stack & Versions
------------------------------------------------------------------------------

| Technology      | Version   | Purpose                        |
| :-------------- | :-------- | :----------------------------- |
| **Java** | 17 LTS    | Backend Logic                  |
| **Spring Boot** | 3.x.x     | Application Framework          |
| **Node.js** | 18+       | Frontend Environment           |
| **React** | 18.x      | User Interface (Vite)          |
| **MySQL** | 8.0       | Relational Database            |
| **Cloudinary** | Latest    | Image Hosting & Optimization  |
| **Maven** | 3.9+      | Dependency Management          |

------------------------------------------------------------------------------
### 2. Database Setup
------------------------------------------------------------------------------

* Open your MySQL terminal or Workbench.
* Create a new database:
    ```sql
    CREATE DATABASE ecommerce_db;
    ```
* Update the backend configuration:
    1. Navigate to `backend/src/main/resources/application.properties`
    2. Set the credentials:
       ```properties
       spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
       spring.datasource.username=root
       spring.datasource.password=Your_MySQL_Password_Here
       spring.jpa.hibernate.ddl-auto=update
       spring.jpa.show-sql=true
       ```

------------------------------------------------------------------------------
### 3. ☁️ Cloudinary Setup (For Product Images)
------------------------------------------------------------------------------

To handle images like the iPhone 17 Pro Max or Samsung S26 via the cloud:

* Create a free account at Cloudinary.com.
* Go to your Dashboard and find your credentials.
* Update `backend/src/main/resources/application.properties`:
    ```properties
    cloudinary.cloud_name=your_cloud_name
    cloudinary.api_key=your_api_key
    cloudinary.api_secret=your_api_secret
    ```

------------------------------------------------------------------------------
### 4. Running the Backend (Spring Boot)
------------------------------------------------------------------------------

1. Open Git Bash in the `backend` folder.
2. Run the command:
    ```bash
    ./mvnw clean spring-boot:run
    ```

* **Server URL:** http://localhost:8080
* **Default Admin:** admin@msd.com / admin123 (Initialized via DataLoader.java)

------------------------------------------------------------------------------
### 5. Running the Frontend (React)
------------------------------------------------------------------------------

1. Open a new Git Bash terminal in the `frontend` folder.
2. Install the required packages:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

* **Website URL:** http://localhost:5173

------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------

## 📂 Project Structure

```text
ECOMMERCE-APP/
├── backend/           # Spring Boot Application
│   ├── src/           # Java Source Code
│   └── pom.xml        # Maven Dependencies
├── frontend/          # React Vite Application
│   ├── src/           # React Components & Pages
│   └── package.json   # Node Dependencies
└── .gitignore         # Master Ignore File
```



## 🖼️ Project Gallery

### 🛡️ Secure Admin Portal
![Admin Login](screenshots/admin_login.png)

### 📦 Inventory Control Center
![Admin Panel](screenshots/admin_panel.png)

### ➕ Stock Entry Management
![Adding Inventory](screenshots/adding_inventory.png)

### 🛒 Customer Storefront
![Product Card](screenshots/card_add_checkout.png)

### 🛍️ Checkout & Basket
![Customer Details](screenshots/customer_details_in_basket.png)

### 🧾 Professional Generated Invoice
![Invoice Bill](screenshots/invoice_bill.png)












👤 Author
JABIR - Authorized Signatory - MSD Appliances
GitHub: @Jabirhu
Ph: +91 8310426460
