"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
    user?: {
        id?: string;
        username?: string;
    };
    token: string;
};

const sessionKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(sessionKey);

export async function createSession(payload: Session) {
    const expiredAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiredAt)
        .sign(encodedKey);
    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: expiredAt,
        path: "/",
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    if (!cookie) return null;
    try {
        const { payload } = await jwtVerify(cookie, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload as Session;
    } catch (error) {
        console.error("Failed to verify the session", error);
        redirect("/login");
    }
}

export async function deleteSession() {
    (await cookies()).delete("session");
}
