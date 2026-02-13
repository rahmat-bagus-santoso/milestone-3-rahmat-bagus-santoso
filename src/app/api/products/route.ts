import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET() {
  const response = await fetch(`${API_URL}/products?offset=0&limit=20`);
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
