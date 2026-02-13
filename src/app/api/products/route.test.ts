import { GET } from './route'

jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any) => ({
      json: async () => data,
    }),
  },
}))

global.fetch = jest.fn()

describe('GET /api/products', () => {
  it('returns product list', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      json: async () => [
        { id: 1, title: 'Product A' },
        { id: 2, title: 'Product B' },
      ],
    })

    const response = await GET()
    const data = await response.json()

    expect(data.length).toBe(2)
    expect(data[0].title).toBe('Product A')
  })
})