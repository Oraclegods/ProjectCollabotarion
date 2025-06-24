# 🏍️ E-Commerce API

An e-commerce REST API built with Node.js, Express, and MongoDB (native driver). This backend service handles user authentication, product listings, cart operations, order processing, and more.

## 🚀 Features

* User registration and login (JWT Auth)
* Product catalog with categories
* Shopping cart functionality
* Order placement and tracking
* Payment simulation
* Product reviews and ratings
* Admin privileges for product and order management
* Swagger API documentation
* Unit and integration tests with Jest

---

## 🧱 Tech Stack

* **Backend:** Node.js, Express
* **Database:** MongoDB (Native Driver)
* **Authentication:** JWT + bcrypt
* **Documentation:** Swagger
* **Testing:** Jest

---

## 📦 Collections Overview

### 1. `users`

Stores customer data and credentials.

### 2. `products`

Holds all product details.

### 3. `categories`

Defines product groupings (e.g., Electronics, Clothing).

### 4. `orders`

Tracks completed purchases by users.

### 5. `cart`

Stores items a user intends to purchase.

### 6. `payments`

Simulated payment records.

### 7. `reviews`

Stores user-generated feedback on products.

### 8. `admins`

Admin user data for managing the system.

---

## 🔀 User Journey

1. **Register/Login** – User signs up and receives JWT.
2. **Browse Products** – View products filtered by category.
3. **Add to Cart** – Items added to temporary cart.
4. **Place Order** – Cart converted to order.
5. **Make Payment** – Simulated payment created.
6. **Track Order** – Order status updated by admin.
7. **Leave Review** – Review submitted by customer.

---

## 📖 API Documentation

Visit `/api-docs` after starting the server to explore Swagger documentation for all endpoints.

---

## ✅ To Do

* [ ] Add pagination and search filters
* [ ] Implement real payment gateway (Stripe, Paystack)
* [ ] Add product image upload via cloud storage
* [ ] Role-based access control for endpoints

---

## 🔪 Running Tests

```bash
npm test
```

---

## 📬 Contact

Built by https://github.com/Oraclegods and https://github.com/isaacpassnav . 

