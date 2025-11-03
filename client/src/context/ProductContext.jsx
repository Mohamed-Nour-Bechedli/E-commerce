import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all products
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

    // Delete product
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

    // Update product
    const updateProduct = async (id, updatedData, isMultipart = false) => {
        try {
            const config = isMultipart
                ? { headers: { "Content-Type": "multipart/form-data" } }
                : {};

            const res = await axiosInstance.put(`/products/${id}`, updatedData, config);

            // Update the product in local state
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
