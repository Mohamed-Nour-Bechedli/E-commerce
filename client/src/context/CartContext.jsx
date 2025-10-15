import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

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

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCartItems([]);

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, total }}
        >
            {children}
        </CartContext.Provider>
    );
};
