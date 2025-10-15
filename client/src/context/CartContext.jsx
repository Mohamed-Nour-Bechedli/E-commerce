import { createContext, useState } from "react";
import axiosInstance from "../api/axiosConfig"; 

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add product to cart
    const addToCart = (product) => {
        setCartItems((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });

    };

    // Remove product
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Clear cart
    const clearCart = () => setCartItems([]);

    // Update quantity
    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return; // avoid quantity < 1
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );

    };

    // Total price
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, total }}
        >
            {children}
        </CartContext.Provider>
    );
};


