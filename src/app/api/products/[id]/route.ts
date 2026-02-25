import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { requireAdmin } from "@/lib/require-admin";
import { productSchema } from "@/lib/product-schema";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const isValid = await requireAdmin();
  if (isValid) return isValid;
  
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const parsed = productSchema.safeParse(await request.json());
  if(!parsed.success) {
    return NextResponse.json({ error: 'Invalid product' }, { status: 442 });
  }
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const isValid = await requireAdmin();
  if (isValid) return isValid;
  
  const { id } = await params;
  await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  return NextResponse.json({ success: true });
}
