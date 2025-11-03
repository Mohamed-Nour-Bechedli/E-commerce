import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
    const { products, loading, deleteProduct, updateProduct } = useContext(ProductContext);

    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); 

    // Filter products by search
    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            (product.subCategory && product.subCategory.toLowerCase().includes(query)) ||
            product._id.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    // Delete Product
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        const success = await deleteProduct(id);
        if (success) toast.success("Product deleted successfully!");
        else toast.error("Failed to delete product");
    };

    // Edit Modal
    const handleEdit = (product) => {
        setEditingProduct({ ...product });
        setSelectedImage(null);
        setIsModalOpen(true);
    };

    // Handle image select
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setEditingProduct((prev) => ({
                ...prev,
                image: URL.createObjectURL(file), 
            }));
        }
    };

    // Update product
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingProduct._id) return toast.error("Invalid product.");

        const formData = new FormData();
        formData.append("name", editingProduct.name);
        formData.append("price", editingProduct.price);
        formData.append("description", editingProduct.description);
        formData.append("category", editingProduct.category);
        formData.append("subCategory", editingProduct.subCategory);
        formData.append("stock", editingProduct.stock);
        formData.append("brand", editingProduct.brand || "");
        formData.append("salePrice", editingProduct.salePrice || "");
        formData.append("isNew", editingProduct.isNew || false);
        formData.append("isFeatured", editingProduct.isFeatured || false);

        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        const res = await updateProduct(editingProduct._id, formData, true); 
        if (res) {
            toast.success("Product updated successfully!");
            setIsModalOpen(false);
            setEditingProduct(null);
            setSelectedImage(null);
        } else {
            toast.error("Failed to update product");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading products...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">🛍️ All Products</h2>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name, category, subcategory, or product ID..."
                    className="w-full border rounded p-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center relative"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-40 h-40 object-cover rounded-md"
                            />
                            <h3 className="text-lg font-medium mt-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm">{product.category}</p>
                            {product.subCategory && (
                                <p className="text-gray-500 text-sm">{product.subCategory}</p>
                            )}
                            <p className="text-blue-600 font-semibold mt-1">${product.price}</p>

                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="text-yellow-500 hover:text-yellow-600 transition transform hover:scale-110"
                                    title="Edit"
                                >
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="text-red-500 hover:text-red-600 transition transform hover:scale-110"
                                    title="Delete"
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            {/* Edit Product Modal */}
            {isModalOpen && editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
                        <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                            <input
                                type="text"
                                value={editingProduct.name}
                                onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, name: e.target.value })
                                }
                                placeholder="Product Name"
                                className="border p-2 rounded"
                            />
                            <input
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, price: e.target.value })
                                }
                                placeholder="Price"
                                className="border p-2 rounded"
                            />
                            <textarea
                                value={editingProduct.description}
                                onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, description: e.target.value })
                                }
                                placeholder="Description"
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                value={editingProduct.category}
                                onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, category: e.target.value })
                                }
                                placeholder="Category"
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                value={editingProduct.subCategory}
                                onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, subCategory: e.target.value })
                                }
                                placeholder="Subcategory"
                                className="border p-2 rounded"
                            />
                            <input
                                type="number"
                                value={editingProduct.stock}
                                onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, stock: e.target.value })
                                }
                                placeholder="Stock"
                                className="border p-2 rounded"
                            />

                            {/* Image Upload */}
                            <div className="flex items-center gap-3">
                                <label className="bg-blue-600 text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-700">
                                    Choose Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                {editingProduct.image && (
                                    <img
                                        src={editingProduct.image}
                                        alt="Preview"
                                        className="w-14 h-14 object-cover rounded border"
                                    />
                                )}
                            </div>

                            <div className="flex justify-between mt-3">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
