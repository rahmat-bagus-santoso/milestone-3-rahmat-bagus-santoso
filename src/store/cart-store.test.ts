import { useCartStore } from "./cart-store";
import { render, act } from "@testing-library/react";

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  test('can add item to cart', () => {});
  act(() => {
    useCartStore.getState().addItem({
      id: 1,
      title: "Test product",
      price: 100,
    });
  })
  const items = useCartStore.getState().items;
  expect(items.length).toBe(1);
});

test("can remove item from cart", () => {
    act(() => {
        useCartStore.getState().addItem({
            id: 1,
            title: "Test product",
            price: 100,
        });
        useCartStore.getState().removeItem(1);
    }) 
    const items = useCartStore.getState().items;
    expect(items.length).toBe(0); 
});
