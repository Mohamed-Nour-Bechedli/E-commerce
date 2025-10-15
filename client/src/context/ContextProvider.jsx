import { AuthContextProvider } from "./AuthContext";
import { CartContextProvider } from "./CartContext";
import { ProductContextProvider } from "./ProductContext";

const ContextProvider = ({ children }) => {
    return (
        <AuthContextProvider>
            <ProductContextProvider>
                <CartContextProvider>{children}</CartContextProvider>
            </ProductContextProvider>
        </AuthContextProvider>
    );
};

export default ContextProvider;



