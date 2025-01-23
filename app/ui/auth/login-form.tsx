"use client";

import { FormState } from "@/app/lib/types";
import { CircleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const [username, setUsername] = useState("system@admin.com");
    const [password, setPassword] = useState("111111aaa");
    const [isPending, setIsPending] = useState(false);
    const [state, setState] = useState<FormState>(undefined);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsPending(true);
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                router.push("/dashboard");
            } else {
                const { message } = await response.json();
                setState({ ...state, message });
            }
        } catch (err) {
            console.error(err);
            setState({ ...state, message: "An error occurred while logging in" });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="john.doe"
                />
                {state?.error?.username && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                        <CircleAlertIcon size={16} />
                        <span className="ml-1">{state.error.username.join(", ")}</span>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="••••••••"
                />
                {state?.error?.password && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                        <CircleAlertIcon size={16} />
                        <span className="ml-1">{state.error.password.join(", ")}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="isRememberMe"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>

            {state?.message && (
                <div className="flex items-center text-red-500 text-md mt-1 ">
                    <CircleAlertIcon size={16} />
                    <span className="ml-1">{state.message}</span>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-indigo-600 rounded-lg text-white font-bold hover:bg-indigo-500 duration-[500ms,800ms]">
                <div className="flex items-center justify-center m-[10px]">
                    {isPending && (
                        <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4 mr-2"></div>
                    )}
                    Login
                </div>
            </button>
        </form>
    );
}
