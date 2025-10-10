import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validate = (values) => {
        const newErrors = {};

        if (!values.name.trim()) newErrors.name = "Full name is required.";

        if (!values.email) newErrors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
            newErrors.email = "Invalid email format.";

        if (!values.password) newErrors.password = "Password is required.";
        else if (values.password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";

        if (!values.confirmPassword)
            newErrors.confirmPassword = "Please confirm your password.";
        else if (values.confirmPassword !== values.password)
            newErrors.confirmPassword = "Passwords do not match.";

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            setErrors(validate({ ...formData, [name]: value }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors(validate(formData));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
        });

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            console.log("Registering with:", formData);
            setTimeout(() => setIsSubmitting(false), 1500);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.name && touched.name
                                ? "border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                            }`}
                        placeholder="Enter your full name"
                    />
                    {errors.name && touched.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.email && touched.email
                                ? "border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                            }`}
                        placeholder="Enter your email"
                    />
                    {errors.email && touched.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none pr-10 ${errors.password && touched.password
                                    ? "border-red-500"
                                    : "border-gray-300 focus:border-blue-500"
                                }`}
                            placeholder="Enter your password"
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && touched.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="mb-6 relative">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none pr-10 ${errors.confirmPassword && touched.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300 focus:border-blue-500"
                                }`}
                            placeholder="Confirm your password"
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 text-white rounded-lg font-medium transition ${isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

                <p className="text-sm text-gray-600 mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
