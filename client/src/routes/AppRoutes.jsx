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

const UserLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
    </div>
);

const AppRoutes = () => {
    return (
        <Routes>
            {/* USER LAYOUT */}
            <Route
                path="/"
                element={
                    <UserLayout>
                        <Home />
                    </UserLayout>
                }
            />
            <Route
                path="/login"
                element={
                    <UserLayout>
                        <Login />
                    </UserLayout>
                }
            />
            <Route
                path="/register"
                element={
                    <UserLayout>
                        <Register />
                    </UserLayout>
                }
            />
            <Route
                path="/category/:categoryName"
                element={
                    <UserLayout>
                        <Category />
                    </UserLayout>
                }
            />
            <Route
                path="/product/:id"
                element={
                    <UserLayout>
                        <ProductDetails />
                    </UserLayout>
                }
            />
            <Route
                path="/verify-notice"
                element={
                    <UserLayout>
                        <VerifyNotice />
                    </UserLayout>
                }
            />
            <Route
                path="/verify/:token"
                element={
                    <UserLayout>
                        <VerifyEmail />
                    </UserLayout>
                }
            />
            <Route
                path="/orders/:id"
                element={
                    <ProtectedRoute>
                        <UserLayout>
                            <OrderDetails />
                        </UserLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <UserLayout>
                            <Orders />
                        </UserLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <UserLayout>
                            <Profile />
                        </UserLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/cart"
                element={
                    <ProtectedRoute>
                        <UserLayout>
                            <Cart />
                        </UserLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/checkout"
                element={
                    <ProtectedRoute>
                        <UserLayout>
                            <Checkout />
                        </UserLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/products"
                element={
                    <UserLayout>
                        <Products />
                    </UserLayout>
                }
            />

            {/* ADMIN LAYOUT */}
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
