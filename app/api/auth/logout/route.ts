import { deleteSession } from "@/app/lib/session";
import { redirect, RedirectType } from "next/navigation";

export async function GET() {
    await deleteSession();

    redirect("/login", RedirectType.push);
}
