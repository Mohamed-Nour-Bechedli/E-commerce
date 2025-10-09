import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();

    // Temporary product list 
    const products = [
        {
            id: "1",
            name: "Apple Watch Series 9",
            price: 599,
            image: "https://via.placeholder.com/500x400?text=Apple+Watch",
            description:
                "The Apple Watch Series 9 brings faster performance, advanced health features, and an always-on Retina display. Track your workouts, heart rate, and more with precision and style.",
            category: "Smartwatches",
            stock: 12,
        },
        {
            id: "2",
            name: "Gaming Laptop",
            price: 1299,
            image: "https://via.placeholder.com/500x400?text=Gaming+Laptop",
            description:
                "A high-performance gaming laptop with RGB keyboard, RTX graphics, and advanced cooling for serious gamers.",
            category: "Laptops",
            stock: 5,
        },
        {
            id: "3",
            name: "Smartphone Pro X",
            price: 999,
            image: "https://via.placeholder.com/500x400?text=Smartphone+Pro+X",
            description:
                "The latest Smartphone Pro X with a stunning display, AI-powered camera, and ultra-fast 5G connectivity.",
            category: "Smartphones",
            stock: 8,
        },
    ];

    // Find the product matching the route ID
    const product = products.find((p) => p.id === id);

    // Handle invalid product IDs
    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
                <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                    Go back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to="/"
                        className="flex items-center text-gray-600 hover:text-blue-600 transition"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Home
                    </Link>
                </div>

                {/* Product Section */}
                <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden">
                    {/* Product Image */}
                    <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-contain w-full max-h-96 rounded-lg"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 text-sm mb-4">{product.category}</p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {product.description}
                            </p>
                            <p className="text-3xl font-semibold text-blue-600 mb-6">
                                ${product.price}
                            </p>
                            <p
                                className={`mb-6 font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {product.stock > 0
                                    ? `${product.stock} in stock`
                                    : "Out of stock"}
                            </p>
                        </div>

                        <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                            <FaShoppingCart className="mr-2" /> Add to Cart
                        </button>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
                        Related Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {["Gaming Headset", "Smartphone", "Mechanical Keyboard"].map(
                            (name, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition"
                                >
                                    <img
                                        src={`https://via.placeholder.com/300x200?text=${name.replace(
                                            " ",
                                            "+"
                                        )}`}
                                        alt={name}
                                        className="w-full h-40 object-contain mb-4 rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {name}
                                    </h3>
                                    <p className="text-blue-600 font-bold mb-3">$299</p>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition">
                                        View Details
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
