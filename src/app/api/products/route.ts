import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { requireAdmin } from "@/lib/require-admin";
import { productSchema } from "@/lib/product-schema";

export async function GET() {
  const response = await fetch(`${API_URL}/products?offset=0&limit=20`);
  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: response.status });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const isValid = await requireAdmin();
  if (isValid) return isValid;

  const parsed = productSchema.safeParse(await request.json());
  if(!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 442 });
  }

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });
  
  if (!response.ok) {
    return NextResponse.json({ error: "Failed to create product" }, { status: response.status });
  }
  const data = await response.json();
  return NextResponse.json(data, { status: 201 });
}

  // const body = await request.json();
  // const response = await fetch(`${API_URL}/products`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(body),
  // });

  // const data = await response.json();
  // return NextResponse.json(data);
