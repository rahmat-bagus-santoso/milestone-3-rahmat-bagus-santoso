import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const items = get().items;
        const existing = items.find(
          (existingItem) => existingItem.id === newItem.id,
        );
        if (existing) {
          set({
            items: items.map((existingItem) =>
              existingItem.id === newItem.id
                ? { ...existingItem, quantity: existingItem.quantity + 1 }
                : existingItem,
            ),
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          });
        }
      },
      removeItem: (id) =>
        set({
          items: get().items.filter((item) => item.id !== id),
        }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
    },
  ),
);
