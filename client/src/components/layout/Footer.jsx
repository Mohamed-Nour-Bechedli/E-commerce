import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row justify-between gap-8">

                    {/* Logo & Description */}
                    <div className="flex-1">
                        <img src={Logo} alt="Shop Logo" className="h-12 w-auto mb-4" />
                        <p className="text-gray-400">
                            Your one-stop shop for gaming PCs, smartphones, accessories, and more. Quality products with fast shipping!
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 grid grid-cols-2 gap-8 sm:grid-cols-3">
                        <div>
                            <h3 className="text-gray-100 font-semibold mb-3">Categories</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white transition">PC Gamers</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">Smartphones</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">Accessories</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-gray-100 font-semibold mb-3">Support</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white transition">Help Center</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">Contact Us</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">Shipping & Returns</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-gray-100 font-semibold mb-3">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white transition">About Us</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">Careers</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Social Media */}
                <div className="mt-8 flex justify-center lg:justify-start space-x-4">
                    <a href="#" className="hover:text-white transition">
                        <FaFacebookF size={20} />
                    </a>
                    <a href="#" className="hover:text-white transition">
                        <FaTwitter size={20} />
                    </a>
                    <a href="#" className="hover:text-white transition">
                        <FaInstagram size={20} />
                    </a>
                    <a href="#" className="hover:text-white transition">
                        <FaLinkedinIn size={20} />
                    </a>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Your Shop Name. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
