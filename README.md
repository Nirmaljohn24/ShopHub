# 🛒 ShopHub - React Admin & Product Management Simulation

---

## Description
**ShopHub** is a React-based e-commerce simulation project featuring:

- Dynamic product listing with search and sorting.  
- Stock management: products with `stock = 0` cannot be added to cart or wishlist.  
- User authentication using Google OAuth (Firebase).  
- User dashboard with Cart, Wishlist, and Order History.  
- Checkout flow with multiple saved addresses.  
- Admin simulation: order status management (`On Process → Shipped → Delivered`).  

The project uses a fake REST API (`json-server` or [fakestoreapi.com](https://fakestoreapi.com)) for products, orders, and users.

---

## Features

### Product Management
- Dynamic product listing  
- Stock control: products with `stock = 0` cannot be added to cart or wishlist  
- Search & sorting functionality  

### User Authentication & Dashboard
- Google OAuth login  
- Dashboard with Cart, Wishlist, and Order History  

### Checkout & Order Flow
- Multiple saved addresses for shipping  
- Order confirmation  
- Admin order status management (`On Process → Shipped → Delivered`)  

---

## Technologies Used
- React 18  
- TypeScript (if used)  
- Tailwind CSS / Material UI / Bootstrap  
- Firebase (Google OAuth)  
- JSON Server or Fakestore API  

---

## Getting Started

### Install Dependencies
```bash
npm install
```

---
 ## Folder Structure

shophub/
├─ public/
├─ src/
│  ├─ components/       # Reusable UI components
│  ├─ pages/            # Page components (Home, Dashboard, Cart, Wishlist, OrderHistory, Login)
│  ├─ services/         # API calls and Firebase auth setup (api.js, firebase.ts)
│  ├─ store/            # Redux or Context API store
│  ├─ context/          # AuthContext.tsx for user & admin state
│  ├─ App.tsx
│  └─ index.tsx
├─ db.json              # Fake backend JSON for json-server
├─ package.json
└─ README.md

---

## Important Notes

- Modify AuthContext.tsx to configure admin privileges.

- Update firebase.ts with your Firebase project credentials.

- db.json acts as a fake backend for products, users, and orders.

- Products with stock = 0 cannot be added to cart or wishlist.

---


