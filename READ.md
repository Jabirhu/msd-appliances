# MSD Appliances - Full Stack E-Commerce System

A professional Full-Stack E-Commerce application designed for appliance management, featuring a Spring Boot backend and a React (Vite) frontend.

## 🚀 Project Overview
This system allows for product management, user authentication, and order processing. It is built to be lightweight, scalable, and easy to deploy.

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Database:** MySQL
- **Images:** Local storage / Cloudinary Integration

---

## 🛠️ Step-by-Step Implementation Guide

Follow these steps to get the project running on your local machine.

### 1. Prerequisites
Ensure you have the following installed:
* **Java 17** or higher
* **Node.js** (v18 or higher)
* **MySQL Server**
* **Maven** (optional, wrapper included)

### 2. Database Setup
1.  Open your MySQL terminal or Workbench.
2.  Create a new database:
    ```sql
    CREATE DATABASE ecommerce_db;
    ```
3.  Update the backend configuration:
    * Navigate to `backend/src/main/resources/application.properties`
    * Update `spring.datasource.username` and `password` to match your local MySQL credentials.

### 3. Running the Backend (Spring Boot)
1.  Open a terminal in the `backend` folder.
2.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
3.  The server will start at: `http://localhost:8080`

### 4. Running the Frontend (React)
1.  Open a **new** terminal in the `frontend` folder.
2.  Install the required packages:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  The website will be live at: `http://localhost:5173`

---

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
