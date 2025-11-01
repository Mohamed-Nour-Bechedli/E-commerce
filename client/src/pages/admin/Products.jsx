import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import axiosInstance from "../../api/axiosConfig";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const Products = () => {
    const { products, loading } = useContext(ProductContext);
    const [productList, setProductList] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    // Sync local list with context products
    useEffect(() => {
        setProductList(products);
    }, [products]);

    // Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axiosInstance.delete(`/products/${id}`);
            setProductList(productList.filter((p) => p._id !== id));
            toast.success("Product deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete product");
        }
    };

    // Start editing
    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    // Save updated product
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", editingProduct.name);
            formData.append("price", editingProduct.price);
            formData.append("stock", editingProduct.stock);
            formData.append("description", editingProduct.description);
            formData.append("category", editingProduct.category);
            if (editingProduct.image instanceof File) {
                formData.append("image", editingProduct.image);
            }

            const res = await axiosInstance.put(
                `/products/${editingProduct._id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            // Update local state
            setProductList((prev) =>
                prev.map((p) => (p._id === editingProduct._id ? res.data : p))
            );

            toast.success("✅ Product updated successfully!");
            setEditingProduct(null);
        } catch (error) {
            console.error("Update error:", error);
            toast.error("❌ Failed to update product");
        }
    };

    if (loading) return <p className="text-center py-8">Loading products...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4">Image</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Price</th>
                            <th className="py-2 px-4">Stock</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((p) => (
                            <tr key={p._id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="py-2 px-4">{p.name}</td>
                                <td className="py-2 px-4">${p.price}</td>
                                <td className="py-2 px-4">{p.stock}</td>
                                <td className="py-2 px-4 flex justify-center gap-4">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => handleEdit(p)}
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(p._id)}
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Edit Product
                        </h3>
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
                            <input
                                type="number"
                                value={editingProduct.stock}
                                onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, stock: e.target.value })
                                }
                                placeholder="Stock"
                                className="border p-2 rounded"
                            />
                            <textarea
                                value={editingProduct.description}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Description"
                                className="border p-2 rounded"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        image: e.target.files[0],
                                    })
                                }
                                className="border p-2 rounded"
                            />

                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Save
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
