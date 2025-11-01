import { useState, useRef } from "react";
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
    const fileInputRef = useRef(null); 

    // Hardcoded categories & subcategories
    const categories = [
        {
            name: "PC Gamers",
            subCategories: ["Gaming Laptop", "Custom PC Build", "Monitors"],
        },
        {
            name: "Smartphones",
            subCategories: ["iPhone", "Android", "Other"],
        },
        {
            name: "Accessories",
            subCategories: ["Keyboard", "Mouse", "Headphones"],
        },
    ];

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

        // Reset subCategory if category changes
        if (name === "category") {
            setFormData((prev) => ({ ...prev, subCategory: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }

            await axiosInstance.post("/products", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Product created successfully!");
            navigate("/admin/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create product");
        }
    };

    // Get subcategories based on selected category
    const subCategories =
        categories.find((c) => c.name === formData.category)?.subCategories || [];

    // Open file selector
    const handleFileButtonClick = () => {
        fileInputRef.current.click();
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
                    {categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {/* Sub Category Dropdown */}
                {subCategories.length > 0 && (
                    <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select Subcategory (optional)</option>
                        {subCategories.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                )}

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
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={handleFileButtonClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                        Choose Image
                    </button>
                    <span className="text-gray-700">
                        {formData.image ? formData.image.name : "No file selected"}
                    </span>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleChange}
                        className="hidden"
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
