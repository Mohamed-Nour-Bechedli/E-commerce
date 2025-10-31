import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Products from "../pages/Products";
import Category from "../pages/Category";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import VerifyNotice from "../pages/VerifyNotice";
import VerifyEmail from "../pages/VerifyEmail";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Dashboard from "../pages/admin/Dashboard";
import CreateProduct from "../pages/admin/CreateProduct";
import AdminOrders from "../pages/admin/Orders";
import AdminLayout from "../components/admin/AdminLayout";

const AppRoutes = () => {
    return (
        <Routes>
            {/* User Layout */}
            <Route
                path="/"
                element={
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-1">
                            <Routes>
                                {/* Public routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/category/:categoryName" element={<Category />} />
                                <Route path="/product/:id" element={<ProductDetails />} />

                                {/* Verification */}
                                <Route path="/verify-notice" element={<VerifyNotice />} />
                                <Route path="/verify/:token" element={<VerifyEmail />} />

                                {/* Protected user routes */}
                                <Route
                                    path="/orders/:id"
                                    element={
                                        <ProtectedRoute>
                                            <OrderDetails />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/orders"
                                    element={
                                        <ProtectedRoute>
                                            <Orders />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/cart"
                                    element={
                                        <ProtectedRoute>
                                            <Cart />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/checkout"
                                    element={
                                        <ProtectedRoute>
                                            <Checkout />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="/products" element={<Products />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                }
            />

            {/* Admin Layout */}
            <Route
                path="/admin"
                element={
                    <AdminProtectedRoute>
                        <AdminLayout />
                    </AdminProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="products" element={<CreateProduct />} />
                <Route path="orders" element={<AdminOrders />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
