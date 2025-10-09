import ProductCard from './ProductCard';

const ProductList = () => {
    const products = [
        { id: 1, name: "Apple Watch", price: 599, image: "/images/apple-watch.png" },
        { id: 2, name: "Gaming Laptop", price: 1299, image: "/images/laptop.png" },
        { id: 3, name: "Smartphone", price: 999, image: "/images/phone.png" },
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
