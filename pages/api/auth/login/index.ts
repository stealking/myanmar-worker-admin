// pages/api/auth/login.ts
import { Session } from "@/app/lib/session";
import { LoginFormSchema } from "@/app/lib/types";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { NextApiRequest, NextApiResponse } from "next";

const sessionKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(sessionKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        const validateFields = LoginFormSchema.safeParse({
            username,
            password,
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
            response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            });

            success = response.ok;
        } catch (error) {
            console.log(error);
        }

        if (success) {
            const token = (await response?.json()).data;

            const expiredAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
            const payload: Session = { user: { username }, token };
            const session = await new SignJWT(payload)
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime(expiredAt)
                .sign(encodedKey);

            res.setHeader(
                "Set-Cookie",
                serialize("session", session, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7,
                })
            );

            return res.status(200).json({ message: "Login successful" });
        }

        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
}
