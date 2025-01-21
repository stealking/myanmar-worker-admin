import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/lib/session";

export default async function middleware(req: NextRequest) {
    const session = await getSession();

    const isAuthenticated = !!(session && session.token);

    if (!isAuthenticated && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
