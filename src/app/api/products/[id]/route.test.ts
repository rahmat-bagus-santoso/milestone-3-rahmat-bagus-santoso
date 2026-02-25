import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { PUT, DELETE } from "./route";
import { getSession } from "@/lib/auth";

jest.mock("@/lib/auth", () => ({
  getSession: jest.fn(),
}));

describe("update product", () => {
  it("allow admin to update product", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      role: "admin",
    });
    const request = new Request(`${API_URL}/products`, {
      method: "PUT",
      body: JSON.stringify({
        title: "Product A - Updated",
        price: 200,
        description: "Description A",
        categoryId: 1,
        images: ["image1.jpg", "image2.jpg"],
      }),
    });
    const response = await PUT(request, { params: Promise.resolve({ id: "1" }) });
    expect(response.status).toBe(201);
  });

  it("reject non-admin user", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      role: "customer",
    });
    const request = new Request(`${API_URL}/products`, {
      method: "PUT",
      body: JSON.stringify({
        title: "Product A",
        price: 100,
        description: "Description A",
        categoryId: 1,
        images: ["image1.jpg", "image2.jpg"],
      }),
    });
    const response = await PUT(request, { params: Promise.resolve({ id: "1" }) });
    expect(response.status).toBe(403);
  });
});

describe("delete product", () => {
  it("allow admin to delete product", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      role: "admin",
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    }) as jest.Mock;

    const request = await DELETE(
        new Request(`${API_URL}/products/1`, {
      method: "DELETE"
    }),
      { params: Promise.resolve({ id: "1" }) }
    )
      expect(request.status).toBe(200);
  });

  it("reject non-admin user", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      role: "customer",
    });
    const response = await DELETE(
        new Request(`${API_URL}/products`, {
      method: "DELETE",
    }),
      { params: Promise.resolve({ id: "1" }) }
    )
        

    expect(response.status).toBe(403);
  });
});
