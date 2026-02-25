import { NextResponse } from "next/server";
import { getSession } from "./auth";

export async function requireAdmin() {
    const session = await getSession();
    if (!session || session.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return null;
}