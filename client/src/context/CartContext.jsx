import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add product or increase quantity
    const addToCart = (product) => {
        setCartItems((prev) => {
            const exist = prev.find((item) => item._id === product._id);
            if (exist) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    // Decrease quantity
    const decreaseFromCart = (_id) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity >= 1)
        );
    };

    // Remove item completely
    const removeFromCart = (_id) => {
        setCartItems((prev) => prev.filter((item) => item._id !== _id));
    };

    const clearCart = () => setCartItems([]);

    const updateQuantity = (_id, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) => (item._id === _id ? { ...item, quantity } : item))
        );
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
                decreaseFromCart,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};