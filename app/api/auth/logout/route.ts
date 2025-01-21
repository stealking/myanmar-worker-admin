import { deleteSession } from "@/app/lib/session";
import { redirect, RedirectType } from "next/navigation";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    await deleteSession();

    redirect("/login", RedirectType.push);
}
