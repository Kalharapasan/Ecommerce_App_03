# 🚀 Advanced E-Commerce Ecosystem

A production-ready, full-stack e-commerce ecosystem featuring a **Spring Boot** backend, a **React** admin dashboard, and a **Flutter** mobile application. This project demonstrates advanced architecture, AI-driven features, and real-time data visualization.

---

## 🏗️ Project Architecture

- **Backend (`/server`)**: Java 21+ Spring Boot, Spring Security (JWT), Hibernate/JPA.
- **Admin Dashboard (`/admin`)**: React 18, Material UI (MUI), Chart.js, Redux Toolkit, Lucide Icons.
- **Mobile Client (`/client`)**: Flutter, Provider State Management, Dio (REST Client), Secure Storage.

---

## ✨ Advanced Features

### 🛠️ Admin Intelligence & Control
- **AI Sales Projections**: Real-time sales forecasting using current revenue data and growth trends.
- **AI Description Generator**: One-click professional product description generation for faster cataloging.
- **Dynamic Content Management**: Remote control of "Popular" and "Upcoming Sale" sections on the mobile app.
- **Inventory Monitoring**: Visual "Low Stock" alerts (threshold-based) to prevent stockouts.
- **Live Dashboard**: Interactive charts (Sales by Category, Forecasts) and recent order tracking.

### 📱 Premium Mobile UX (Flutter)
- **Dynamic Home Screen**: High-contrast carousels for "Popular Products" and "Upcoming Sales".
- **Advanced Product Discovery**: Built-in search, advanced filtering (Price/Sort), and category-wise browsing.
- **Wishlist System**: Personalized "Favorites" list with instant cart integration.
- **Smart Retail Features**: Dynamic pricing (Original vs. Discounted), sale badges, and "People Also Bought" recommendations.
- **Design Excellence**: Modern "eBay Blue" theme, Google Fonts integration, and smooth micro-animations.

### 🔒 Backend & Security
- **JWT Auth**: Secure Bearer token authentication across all modules.
- **Advanced DTO Mapping**: Seamless data transfer with specialized mapping for reviews, stats, and analytics.
- **Order Management**: Full lifecycle management (Pending -> Shipped -> Delivered).

---

## 🚀 Setup & Installation

### 1. Backend (Spring Boot)
1. Ensure **PostgreSQL** is running and create a database: `ecommerce_db`.
2. Update `server/src/main/resources/application.properties` with your DB credentials.
3. Run the server:
   ```bash
   cd server
   mvn spring-boot:run
   ```

### 2. Admin Dashboard (React)
1. Install dependencies:
   ```bash
   cd admin
   npm install
   ```
2. Start the dashboard:
   ```bash
   npm run dev
   ```

### 3. Mobile Client (Flutter)
1. Configure `.env` in the `client` directory:
   ```env
   API_URL=http://localhost:8080/api/v1
   ```
2. Get dependencies and run:
   ```bash
   cd client
   flutter pub get
   flutter run
   ```

---

## 🛠️ Tech Stack Details

- **Database**: PostgreSQL (Relational persistence)
- **UI/UX**: Material UI (Web), Material Design 3 (Mobile)
- **Charts**: Chart.js (Data visualization)
- **State**: Redux (Admin), Provider (Mobile)
- **Networking**: Axios (Web), Dio (Mobile)

---

## 📈 Roadmap (Next Phases)
- [ ] Real-time Push Notifications (Firebase)
- [ ] Stripe Payment Gateway Integration
- [ ] Multi-vendor Support
- [ ] Elasticsearch for Instant Search

---
*Developed with ❤️ as an Advanced Coding Blueprint.*
