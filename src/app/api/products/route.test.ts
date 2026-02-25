import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { POST } from "./route";
import { getSession } from "@/lib/auth";

jest.mock("@/lib/auth", () => ({
  getSession: jest.fn(),
}));

it('allow admin to post product', async () => {
  (getSession as jest.Mock).mockResolvedValue({
    role: 'admin',
  });
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ 
      id: 1,
      title: 'Product A',
      price: 100, 
      description: 'Description A',
      categoryId: 1,
      images: ['image1.jpg', 'image2.jpg'],
    }),
  }) as jest.Mock;

  const request = new Request(`${API_URL}/products`, {
    method: 'POST',
    body: JSON.stringify({ 
      title: 'Product A',
      price: 100, 
      description: 'Description A',
      categoryId: 1,
      images: ['image1.jpg', 'image2.jpg'],
    }),
  })
  const response = await POST(request);
  const data = await response.json();
  expect(response.status).toBe(201);
  expect(data.id).toBe('Product');
});

it('reject non-admin user', async () => {
  (getSession as jest.Mock).mockResolvedValue({
    role: 'customer',
  });
  const request = new Request(`${API_URL}/products`, {
    method: 'POST',
    body: JSON.stringify({ 
      title: 'Product A',
      price: 100, 
      description: 'Description A',
      categoryId: 1,
      images: ['image1.jpg', 'image2.jpg'],
    }),
  })
  const response = await POST(request);
  const data = await response.json();
  expect(response.status).toBe(403);
  expect(data.error).toBeDefined();
  
})

// import { GET } from './route'

// jest.mock('next/server', () => ({
//   NextResponse: {
//     json: (data: any) => ({
//       json: async () => data,
//     }),
//   },
// }))

// global.fetch = jest.fn()

// describe('GET /api/products', () => {
//   it('returns product list', async () => {
//     ;(fetch as jest.Mock).mockResolvedValue({
//       json: async () => [
//         { id: 1, title: 'Product A' },
//         { id: 2, title: 'Product B' },
//       ],
//     })

//     const response = await GET()
//     const data = await response.json()

//     expect(data.length).toBe(2)
//     expect(data[0].title).toBe('Product A')
//   })
// })