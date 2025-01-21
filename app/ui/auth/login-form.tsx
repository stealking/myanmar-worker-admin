"use client";

import { authenticate } from "@/app/lib/actions/auth";
import { CircleAlertIcon } from "lucide-react";
import { useActionState } from "react";

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <form className="space-y-4" action={formAction}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                    type="text"
                    name="username"
                    defaultValue={"system@admin.com"}
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
                    defaultValue={"111111aaa"}
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
