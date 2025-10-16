import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
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
// import NotFound from "../pages/NotFound";

const AppRoutes = () => {
    return (
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

                    {/* Email verification flow */}
                    <Route path="/verify-notice" element={<VerifyNotice />} />
                    <Route path="/verify/:token" element={<VerifyEmail />} />

                    {/* Protected routes */}
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

                    {/* NotFound (optional)
          <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default AppRoutes;
