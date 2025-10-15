import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { verifyEmail } = useContext(AuthContext);

    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const verifyUser = async () => {
            const result = await verifyEmail(token);

            if (result.success) {
                setStatus("success");
                setMessage("Email verified successfully! Redirecting to home...");

                setTimeout(() => {
                    navigate("/"); 
                }, 2000);
            } else {
                setStatus("failed");
                setMessage(result.message || "Verification failed.");
            }
        };

        verifyUser();
    }, [token, verifyEmail, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                {status === "verifying" && (
                    <>
                        <div className="loader mx-auto mb-4 border-4 border-blue-500 border-t-transparent w-10 h-10 rounded-full animate-spin"></div>
                        <h2 className="text-lg font-semibold text-gray-700">{message}</h2>
                    </>
                )}
                {status === "success" && (
                    <>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">✅ Verified!</h2>
                        <p className="text-gray-700">{message}</p>
                    </>
                )}
                {status === "failed" && (
                    <>
                        <h2 className="text-2xl font-bold text-red-600 mb-2">❌ Verification Failed</h2>
                        <p className="text-gray-700">{message}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
