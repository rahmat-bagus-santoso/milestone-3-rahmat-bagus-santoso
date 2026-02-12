"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';

export default function CartPage() {
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const getTotalPrice = useCartStore((state) => state.getTotalPrice);
    const total = getTotalPrice();
    
    if (items.length === 0) {
        return (
            <div className="max-w-xl mx-auto mt-20">
                <h1 className="text-2xl font-semibold mb-4">Cart</h1>
                <p className="text-center">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-20">
            <h1 className="text-2xl font-semibold mb-4">Cart</h1>
            <ul className="mb-4 space-y-2">
                {items.map((item) => (
                    <li key = {item.id}>
                        <span>{item.title}</span>
                        <span>${item.quantity}</span>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}   
            </ul>
            <p className="font-semibold">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="bg-black text-white px-4 py-2">
                Checkout</Link>
        </div>
    );
    
}