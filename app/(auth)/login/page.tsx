import LoginForm from "@/app/ui/auth/login-form";
import React from "react";

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
