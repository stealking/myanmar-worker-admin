import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get("session")?.value;

    const isAuthenticated = !!token;
    if (!isAuthenticated && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
