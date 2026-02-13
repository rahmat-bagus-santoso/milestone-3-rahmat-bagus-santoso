import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function PUT(
    request: Request,
    { params }: { params: { id: string }}
) {
    const body = await request.json()
    const response = await fetch(`${API_URL}/products/${params.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    })

    const data = await response.json();
    return NextResponse.json(data);
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string }}
) {
    await fetch(`${API_URL}/products/${params.id}`, {
        method: 'DELETE',
    })
    return NextResponse.json({ success: true })
}