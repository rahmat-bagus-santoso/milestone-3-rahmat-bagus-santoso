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
      addItem: (item) => {
        const items = get().items;
        const existing = items.find((item) => item.id === item.id);
        if (existing) {
          set({
            items: items.map((item) => (item.id === item.id ? { ...item, quantity: item.quantity + 1 } : item)),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
          });
        }
      },
      removeItem: (id) =>
        set({
          items: get().items.filter((item) => item.id !== id),
        }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
);
