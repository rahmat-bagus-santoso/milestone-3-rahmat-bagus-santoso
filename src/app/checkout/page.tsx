"use client";

import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const [success, setSuccess] = useState(false);

  function handleCheckout() {
    setSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 1000);
  }

  useEffect(() => {
    setSuccess(false);
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <div className="text-zinc-400 mb-4">
          Your cart is empty. <br />{" "}
          <span className="text-xs">Add some products to continue.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      {success && (
        <div className="mb-4 p-3 bg-emerald-100 text-emerald-700 rounded">
          Checkout Success! Thank you for your purchase.
        </div>
      )}
      <ul className="mb-4 divide-y divide-zinc-100">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between py-2">
            <span className="font-medium">{item.title}</span>
            <span className="text-zinc-500">x{item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold">Total:</span>
        <span className="text-lg font-bold">${total.toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-zinc-900 text-white py-3 rounded font-bold uppercase tracking-widest hover:bg-zinc-700 transition-all disabled:opacity-50"
        disabled={success}
      >
        {success ? "Purchased" : "Pay Now"}
      </button>
    </div>
  );
}
