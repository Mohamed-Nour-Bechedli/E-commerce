import { useContext, useState } from "react";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom"; 
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import Modal from "../components/common/Modal";

const ProductDetails = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false); 
    const navigate = useNavigate(); 

    const product = products.find((p) => p.id.toString() === id) || {
        name: "Loading...",
        price: 0,
        image: "",
        description: "",
        category: "",
        stock: 0,
    };

    // Handle add to cart
    const handleAddToCart = () => {
        addToCart(product); 
        setModalOpen(true); 
        setButtonClicked(true); 

        // Close modal and redirect to cart after 1 second
        setTimeout(() => {
            setModalOpen(false);
            navigate("/cart"); 
        }, 1000);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Back link */}
                <div className="mb-6">
                    <Link
                        to="/"
                        className="flex items-center text-gray-600 hover:text-blue-600 transition"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Home
                    </Link>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden">
                    {/* Image */}
                    <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-contain w-full max-h-96 rounded-lg"
                        />
                    </div>

                    {/* Info */}
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 text-sm mb-4">{product.category}</p>
                            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                            <p className="text-3xl font-semibold text-blue-600 mb-6">${product.price}</p>
                            <p className={`mb-6 font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                            </p>
                        </div>

                        {/* Add to Cart Button with animation */}
                        <button
                            onClick={handleAddToCart}
                            className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg
                                ${buttonClicked ? "animate-bounce" : ""} 
                            `}
                        >
                            <FaShoppingCart className="mr-2" /> Add to Cart
                        </button>
                    </div>
                </div>

                {/* Modal */}
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Product Added!">
                    <p>The product has been added to your cart successfully.</p>
                </Modal>
            </div>
        </div>
    );
};

export default ProductDetails;
