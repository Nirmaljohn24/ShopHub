# ShopHub - E-Commerce Platform Setup Guide

## 🚀 Features

- **Product Management**: Browse products from fake REST API (fakestoreapi.com)
- **Dynamic Search & Filtering**: Search products, filter by category, sort by price/rating
- **Stock Management**: Products with 0 stock cannot be added to cart/wishlist
- **Google OAuth**: Sign in with Google using Firebase
- **User Dashboard**: View wishlist, cart, and order history
- **Address Management**: Save multiple delivery addresses
- **Checkout Flow**: Complete order process with address selection
- **Admin Panel**: Manage order status (On Process, Shipped, Delivered)
- **Responsive Design**: Works on all devices

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account (for Google OAuth)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase for Google Authentication**

   a. Go to [Firebase Console](https://console.firebase.google.com)
   
   b. Create a new project or select existing one
   
   c. Enable Google Authentication:
      - Navigate to Authentication → Sign-in method
      - Enable Google provider
   
   d. Get your Firebase config:
      - Go to Project Settings
      - Scroll to "Your apps" section
      - Add a web app or select existing one
      - Copy the firebaseConfig object
   
   e. Update Firebase configuration:
      - Open `src/lib/firebase.ts`
      - Replace the demo config with your Firebase config:
        ```typescript
        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };
        ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:8080`

## 🎯 Usage Guide

### For Users

1. **Browse Products**
   - View all products on the home page
   - Use search bar to find specific items
   - Filter by category using dropdown
   - Sort by price, rating, or name

2. **Shopping**
   - Click on product cards to view details
   - Add items to cart (if in stock)
   - Save favorites to wishlist
   - Products with 0 stock are disabled

3. **Checkout**
   - View cart and update quantities
   - Sign in with Google
   - Add delivery addresses
   - Select address and place order

4. **Dashboard**
   - View order history
   - Check order status
   - Manage wishlist and cart

### For Admin

1. **Access Admin Panel**
   - Sign in with Google
   - Navigate to Admin Panel from user menu
   
2. **Manage Orders**
   - View all customer orders
   - Update order status:
     - On Process (default)
     - Shipped
     - Delivered
   - View customer details and delivery addresses

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.tsx           # Navigation bar with cart/wishlist badges
│   ├── ProductCard.tsx      # Product card component
│   └── ui/                  # Shadcn UI components
├── contexts/
│   ├── AuthContext.tsx      # Firebase authentication context
│   └── ShopContext.tsx      # Shopping cart, wishlist, orders state
├── lib/
│   └── firebase.ts          # Firebase configuration
├── pages/
│   ├── Index.tsx           # Home page with products
│   ├── Products.tsx        # Product detail page
│   ├── Cart.tsx            # Shopping cart
│   ├── Wishlist.tsx        # Saved items
│   ├── Checkout.tsx        # Checkout with address selection
│   ├── Dashboard.tsx       # User dashboard
│   └── Admin.tsx           # Admin order management
└── App.tsx                 # Main app with routing
```

## 🎨 Design System

The app uses a modern design system with:
- **Primary Colors**: Purple-to-blue gradient
- **Accent**: Coral for CTAs
- **Components**: Shadcn UI with custom styling
- **Animations**: Smooth transitions throughout
- **Responsive**: Mobile-first design

## 📦 Data Management

- **Products**: Fetched from [FakeStoreAPI](https://fakestoreapi.com)
- **User Data**: Stored in localStorage (cart, wishlist, addresses, orders)
- **Authentication**: Firebase Auth with Google provider

## 🔐 Security Notes

- Firebase config contains public API keys (safe for client-side)
- Security handled through Firebase Security Rules
- No sensitive data stored in localStorage

## 🚧 Known Limitations

- Product stock is randomly generated (demo purposes)
- No real payment processing
- Local storage only (data clears on browser clear)
- Admin panel accessible to all logged-in users (no role-based auth)

## 🎓 Learning Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [FakeStore API Docs](https://fakestoreapi.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.
