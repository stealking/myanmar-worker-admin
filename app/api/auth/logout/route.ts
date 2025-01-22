import { deleteSession } from "@/app/lib/session";
import { redirect, RedirectType } from "next/navigation";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    console.log("logout", req.body);

    await deleteSession();

    redirect("/login", RedirectType.push);
}
