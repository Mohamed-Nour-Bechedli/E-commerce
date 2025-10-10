import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, salePrice, image, isNew }) => {
    const isOnSale = salePrice && salePrice < price;

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 mx-auto sm:mx-0 relative">

            {/* Sale / New Badge */}
            {isOnSale && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    SALE
                </span>
            )}
            {!isOnSale && isNew && (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    NEW
                </span>
            )}

            {/* Product image links to details */}
            <Link to={`/product/${id}`}>
                <img
                    className="p-4 sm:p-6 rounded-t-lg object-contain h-48 sm:h-60 w-full"
                    src={image}
                    alt={name}
                />
            </Link>

            <div className="px-4 sm:px-5 pb-5">
                <Link to={`/product/${id}`}>
                    <h5 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 hover:text-blue-600 transition line-clamp-1">
                        {name}
                    </h5>
                </Link>

                <div className="flex items-center justify-between">
                    {/* Price Section */}
                    <div>
                        {isOnSale ? (
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500 line-through text-sm">
                                    ${price}
                                </span>
                                <span className="text-red-600 font-bold text-xl">
                                    ${salePrice}
                                </span>
                            </div>
                        ) : (
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                ${price}
                            </span>
                        )}
                    </div>

                    {/* Add to cart */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg">
                        <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

