import { useCartStore } from "./cart-store";
import { render, act } from "@testing-library/react";

describe("useCartStore", () => {
  beforeEach(() => {
    act(() => {
      useCartStore.setState({ items: [] });
    });
    localStorage.clear();
  });

  it('start with empty cart', () => {
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it('can add item to cart', () => {
    act(() => {
      useCartStore.getState().addItem({
        id: 1,
        title: "Test product",
        price: 100,
      });
    });
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(1);
  });

  it('increases quantity of existing item', () => {
    act(() => {
      const store = useCartStore.getState();
      store.addItem({
        id: 1,
        title: "Test product",
        price: 100,
      });
      store.addItem({
        id: 1,
        title: "Test product",
        price: 100,
      });
    })
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  })

  it('can remove item from cart', () => {
    act(() => {
      useCartStore.getState().addItem({
        id: 1,
        title: "Test product",
        price: 100,
      });
      useCartStore.getState().removeItem(1);
    });
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it('can clear cart', () => {
    act(() => {
      useCartStore.getState().addItem({
        id: 1,
        title: "Test product",
        price: 100,
      });
      useCartStore.getState().clearCart();
    });
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it('can get total price', () => {
    act(() => {
      useCartStore.getState().addItem({
        id: 1,
        title: "Test product",
        price: 100,
      });
      useCartStore.getState().addItem({
        id: 2,
        title: "Test product",
        price: 200,
      });
    });
    const { getTotalPrice } = useCartStore.getState();
    expect(getTotalPrice()).toBe(300);
  });
});

//   act(() => {
//     useCartStore.getState().addItem({
//       id: 1,
//       title: "Test product",
//       price: 100,
//     });
//   })
//   const items = useCartStore.getState().items;
//   expect(items.length).toBe(1);
// });

// test("can remove item from cart", () => {
//     act(() => {
//         useCartStore.getState().addItem({
//             id: 1,
//             title: "Test product",
//             price: 100,
//         });
//         useCartStore.getState().removeItem(1);
//     }) 
//     const items = useCartStore.getState().items;
//     expect(items.length).toBe(0); 
// });
