"use server";

import { getSession } from "@/app/lib/session";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default async function SignInButton() {
    const session = await getSession();
    return (
        <div className="flex items-center gap-2 ml-auto">
            {!session || !session.token ? (
                <>
                    <Link href="/login">Login</Link>
                </>
            ) : (
                <>
                    <p className="font-medium">{session?.user?.username}</p>
                    <Link href="/api/auth/logout">
                        <LogOut />
                    </Link>
                </>
            )}
        </div>
    );
}
