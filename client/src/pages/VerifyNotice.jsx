import { Link } from "react-router-dom";

const VerifyNotice = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-green-600">Almost there!</h2>
                <p className="text-gray-600 mb-6">
                    We’ve sent a verification link to your email. Please check your inbox and click the link to verify your account.
                </p>
                <Link to="/login" className="text-blue-600 hover:underline">
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default VerifyNotice;
