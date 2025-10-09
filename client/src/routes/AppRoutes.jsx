import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
// import NotFound from "../pages/NotFound";

const AppRoutes = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/checkout" element={<Checkout />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default AppRoutes;


