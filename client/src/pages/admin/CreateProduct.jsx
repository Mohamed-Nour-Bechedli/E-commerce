import { useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        stock: "",
        brand: "",
        salePrice: "",
        isNew: false,
        isFeatured: false,
        image: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }

            const res = await axiosInstance.post("/products", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Product created successfully!");
            navigate("/admin/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create product");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Create New Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    rows="3"
                    required
                />

                {/* Price and Sale Price */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                    <input
                        type="number"
                        name="salePrice"
                        placeholder="Sale Price (optional)"
                        value={formData.salePrice}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>

                {/* Category */}
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="PC Gamers">PC Gamers</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Accessories">Accessories</option>
                </select>

                {/* Sub Category */}
                <input
                    type="text"
                    name="subCategory"
                    placeholder="Sub Category (optional)"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />

                {/* Stock & Brand */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>

                {/* Checkboxes */}
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isNew"
                            checked={formData.isNew}
                            onChange={handleChange}
                        />
                        <span>New</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                        />
                        <span>Featured</span>
                    </label>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block mb-1 font-medium">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
