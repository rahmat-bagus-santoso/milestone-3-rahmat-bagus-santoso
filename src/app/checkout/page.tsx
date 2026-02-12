"use client";

import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
    const items = useCartStore((state) => state.items);
    const total = useCartStore((state) => state.getTotalPrice());
    return (
        <div className="max-w-xl mx-auto mt-20">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
            {items.length === 0 ? (
                <p className="text-center">Your cart is empty</p>
            ) : (
                <>
                <ul className="mb-4 space-y-2">
                    {items.map((item) => (
                        <li key = {item.id}>
                            <span>{item.title}</span>
                            <span>${item.quantity}</span>
                        </li>
                    ))}   
                </ul>
                <p className="font-semibold">Total: ${total.toFixed(2)}</p>

                <button onClick={() => alert('Checkout Success')} className="bg-black text-white px-4 py-2">
                    Checkout</button>
                </>
            )
            }
        </div>
    );
}
