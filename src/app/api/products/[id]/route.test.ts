jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => data,
    }),
  },
}));
import { API_URL } from "@/lib/api";
import { PUT, DELETE } from "./route";
import { getSession } from "@/lib/auth";

jest.mock("@/lib/auth", () => ({
  getSession: jest.fn(),
}));

describe("update product", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("allow admin to update product", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      role: "admin",
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 }),
    }) as jest.Mock;

    const request = {
      json: async () => ({
        title: "Product A",
        price: 100,
        description: "Description A",
        category: "electronics",
      }),
    } as any;

    const response = await PUT(request, { params: Promise.resolve({ id: "1" }) as any });
    expect(response.status).toBe(200);
  });

  it("reject non-admin user", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      role: "customer",
    });
    const request = {
      json: async () => ({
        title: "Product A",
        price: 100,
        description: "Description A",
        category: "electronics",
      }),
    } as any;
    const response = await PUT(request, { params: Promise.resolve({ id: "1" }) as any });
    expect(response.status).toBe(403);
  });
});

describe("delete product", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("allow admin to delete product", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      role: "admin",
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    }) as jest.Mock;

    const response = await DELETE({} as any, { params: Promise.resolve({ id: "1" }) as any });
    const data = await response.json();
    expect(response.status).toBe(200);
  });

  it("reject non-admin user", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      role: "customer",
    });
    const response = await DELETE({} as any, { params: Promise.resolve({ id: "1" }) as any });

    expect(response.status).toBe(403);
  });
});
