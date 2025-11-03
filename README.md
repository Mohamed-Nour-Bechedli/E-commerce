# E-commerce

Description:

This project is a full-stack E-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to provide a seamless online shopping experience, allowing users to browse products, add items to their cart, and complete purchases securely. The application also includes an admin dashboard for managing products, orders, and users efficiently.

Key Features:

*User Authentication & Authorization: Secure login and registration for users and admins.

*Product Management: Browse, search, filter, and sort products by category.

*Shopping Cart & Checkout: Add items to cart, adjust quantities.

*Responsive Design: Mobile-friendly interface for optimal user experience across devices.

*Admin Dashboard: Admins can manage products, categories, and users.

Technologies Used:

*Frontend: React.js, Tailwind CSS 

*Backend: Node.js, Express.js

*Database: MongoDB with Mongoose

*Authentication: JWT (JSON Web Tokens)

Folder structure:

Frontend structure:

```
├── public
│   └── vite.svg
├── src
│   ├── api
│   │   └── axiosConfig.js
│   ├── assets
│   │   ├── Accessories.png
│   │   ├── Custom PC Build Alpha.webp
│   │   ├── Custom PC Build Beta.webp
│   │   ├── Custom PC Build Gamma.png
│   │   ├── Ergonomic Mouse.jpg
│   │   ├── Gaming Laptop Lite.jpg
│   │   ├── Gaming Laptop Pro 16.jpg
│   │   ├── Gaming Laptop Ultra 18.avif
│   │   ├── Gaming Monitor 27 144Hz.webp
│   │   ├── Gaming Monitor 32 165Hz.webp
│   │   ├── Gaming Mouse Pro.webp
│   │   ├── Mechanical Gaming Keyboard Mini.jpg
│   │   ├── Mechanical Gaming Keyboard.jpg
│   │   ├── Noise Cancelling Headphones.webp
│   │   ├── OnePlus 11.png
│   │   ├── OnePlus 12 Pro.png
│   │   ├── OnePlus 12.png
│   │   ├── PC_Gamer.jpg
│   │   ├── Samsung Galaxy S23.jpg
│   │   ├── Samsung Galaxy S24 Ultra.jpg
│   │   ├── Samsung Galaxy S24.jpg
│   │   ├── Smartphones.jpg
│   │   ├── Wireless Gaming Mouse.jpg
│   │   ├── Wireless Headphones.jpg
│   │   ├── Wireless Mechanical Keyboard.jpg
│   │   ├── iPhone 14.png
│   │   ├── iPhone 15 Plus.jpg
│   │   ├── iPhone 15 Pro.webp
│   │   └── logo.png
│   ├── components
│   │   ├── admin
│   │   │   ├── AdminLayout.jsx
│   │   │   └── AdminProtectedRoute.jsx
│   │   ├── cart
│   │   │   └── CartSidebar.jsx
│   │   ├── common
│   │   │   ├── Loader.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── layout
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NavbarCategories.jsx
│   │   │   ├── NavbarIcons.jsx
│   │   │   ├── NavbarLogo.jsx
│   │   │   ├── NavbarMobileMenu.jsx
│   │   │   └── NavbarSearch.jsx
│   │   ├── products
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductTabs.jsx
│   │   └── HeroCarousel.jsx
│   ├── context
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── ContextProvider.jsx
│   │   └── ProductContext.jsx
│   ├── pages
│   │   ├── admin
│   │   │   ├── CreateProduct.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Category.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── OrderDetails.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── VerifyEmail.jsx
│   │   └── VerifyNotice.jsx
│   ├── routes
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

Backend structure:


```
├── config
│   └── db.js
├── controllers
│   ├── adminController.js
│   ├── orderController.js
│   ├── productController.js
│   ├── updateValidater.js
│   ├── userController.js
│   └── userValidater.js
├── middlewares
│   ├── authRole.js
│   ├── authUser.js
│   └── upload.js
├── models
│   ├── order.js
│   ├── product.js
│   └── user.js
├── routes
│   ├── adminRouter.js
│   ├── orderRouter.js
│   ├── productRouter.js
│   └── userRouter.js
├── uploads
│   ├── 1762164778967-Gaming_Laptop_Pro_16.jpg
│   ├── 1762164838750-Gaming_Laptop_Ultra_18.avif
│   ├── 1762164903982-Custom_PC_Build_Alpha.webp
│   ├── 1762164979402-Custom_PC_Build_Beta.webp
│   ├── 1762165063931-Gaming_Monitor_27_144Hz.webp
│   ├── 1762165122140-Gaming_Monitor_32_165Hz.webp
│   ├── 1762165177563-iPhone_15_Pro.webp
│   ├── 1762165220252-iPhone_15_Plus.jpg
│   ├── 1762165285090-Samsung_Galaxy_S24.jpg
│   ├── 1762165344300-Samsung_Galaxy_S24_Ultra.jpg
│   ├── 1762165391060-OnePlus_12.png
│   ├── 1762165436300-OnePlus_12_Pro.png
│   ├── 1762165485781-Mechanical_Gaming_Keyboard.jpg
│   ├── 1762165529679-Wireless_Mechanical_Keyboard.jpg
│   ├── 1762165589228-Gaming_Mouse_Pro.webp
│   ├── 1762165647169-Wireless_Gaming_Mouse.jpg
│   ├── 1762165732308-Noise_Cancelling_Headphones.webp
│   ├── 1762165795465-Wireless_Headphones.jpg
│   ├── 1762165905294-Gaming_Laptop_Lite.jpg
│   ├── 1762165947180-Custom_PC_Build_Gamma.png
│   ├── 1762165994178-iPhone_14.png
│   ├── 1762166054089-Samsung_Galaxy_S23.jpg
│   ├── 1762166090927-OnePlus_11.png
│   ├── 1762166127876-Mechanical_Gaming_Keyboard_Mini.jpg
│   └── 1762166167995-Ergonomic_Mouse.jpg
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

Commands:

# 1. Clone the repository
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app

# 2. Setup Backend
cd backend
npm install               # Install backend dependencies
# Create a .env file with variables: PORT, MONGO_URI, JWT_SECRET, STRIPE_KEY
npm run dev               # Start backend server (localhost:5000)

# 3. Setup Frontend
cd ../frontend
npm install               # Install frontend dependencies
npm start                 # Start frontend server (localhost:3000)

# Optional: Seed database (if you have a seeder file)
cd ../backend
node seeder.js

# Optional: Build frontend for production
cd ../frontend
npm run build
