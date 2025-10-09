import { createContext, useState, useEffect } from "react";

// Create context
export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Temporary mock data
    const mockProducts = [
        {
            id: 1,
            name: "Apple Watch Series 9",
            price: 599,
            image: "https://via.placeholder.com/400x300?text=Apple+Watch",
            category: "Smartwatches",
            description: "High-quality smartwatch with health tracking.",
            stock: 12,
        },
        {
            id: 2,
            name: "Gaming Laptop",
            price: 1299,
            image: "https://via.placeholder.com/400x300?text=Gaming+Laptop",
            category: "PC Gamers",
            description: "Powerful laptop for gaming and streaming.",
            stock: 5,
        },
        {
            id: 3,
            name: "Mechanical Keyboard",
            price: 99,
            image: "https://via.placeholder.com/400x300?text=Mechanical+Keyboard",
            category: "Accessories",
            description: "RGB mechanical keyboard with tactile keys.",
            stock: 20,
        },
    ];

    useEffect(() => {
        setLoading(true);
        // Simulate fetching data
        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts, loading }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
