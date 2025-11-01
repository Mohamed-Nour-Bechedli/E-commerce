import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all products from backend
    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get("/products");
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Delete a product globally
    const deleteProduct = async (id) => {
        try {
            await axiosInstance.delete(`/products/${id}`);
            setProducts((prev) => prev.filter((p) => p._id !== id));
            return true;
        } catch (err) {
            console.error("Delete product error:", err);
            return false;
        }
    };

    // Update product globally
    const updateProduct = async (id, updatedData) => {
        try {
            const formData = new FormData();
            Object.entries(updatedData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const res = await axiosInstance.put(`/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Replace updated product in context
            setProducts((prev) =>
                prev.map((p) => (p._id === id ? res.data : p))
            );

            return res.data;
        } catch (err) {
            console.error("Update product error:", err);
            return null;
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                fetchProducts,
                deleteProduct,
                updateProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
