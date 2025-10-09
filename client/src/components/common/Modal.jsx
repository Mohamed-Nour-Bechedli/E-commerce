import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition"
                >
                    <FaTimes size={20} />
                </button>

                {/* Title */}
                {title && <h2 className="text-xl font-bold mb-4 text-gray-900">{title}</h2>}

                {/* Content */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
