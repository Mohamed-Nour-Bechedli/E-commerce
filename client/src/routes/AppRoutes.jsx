import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import Home from "../pages/Home";
// import NotFound from "./pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Checkout from "./pages/Checkout";

const AppRoutes = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                <Route path="/product/:id" element={<ProductDetails />} />
                {/* <Route path="/cart" element={<Cart />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/register" element={<Register />} /> */}
                {/* <Route path="/checkout" element={<Checkout />} /> */}
            </Routes>
            {/* <Footer /> */}
        </div >
    )
}

export default AppRoutes

