import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/products"); 
            setProducts(res.data.products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
