"use server";

import { FormState, LoginFormSchema } from "@/app/lib/types";
import axiosClient from "@/app/lib/axiosClient";
import { redirect } from "next/navigation";
import { createSession } from "../session";

export const authenticate = async (state: FormState, formData: FormData): Promise<FormState> => {
    const validateFields = LoginFormSchema.safeParse({
        username: formData.get("username") as string,
        password: formData.get("password") as string,
    });

    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors,
        };
    }

    let success = false;
    let response = null;
    try {
        const data = JSON.stringify(validateFields.data);
        response = await axiosClient.post("/auth/api/login", data);
        success = response?.status === 200;
    } catch (error) {
        console.log(error);
    }
    if (success) {
        await createSession({
            token: response?.data,
            user: {
                username: validateFields.data.username,
            },
        });

        redirect("/dashboard");
    }

    return {
        message: "Invalid credentials",
    };
};
