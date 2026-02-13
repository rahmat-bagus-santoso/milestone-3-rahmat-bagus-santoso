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
            <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded shadow text-center">
                <h1 className="text-2xl font-semibold mb-4">Cart</h1>
                <div className="text-zinc-400 mb-4">Your cart is empty.<br/><span className="text-xs">Add some products to continue.</span></div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded shadow">
            <h1 className="text-2xl font-semibold mb-4">Cart</h1>
            <ul className="mb-4 space-y-2">
                {items.map((item) => (
                    <li key = {item.id} className='flex justify-between items-center py-2'>
                        <div>
                        <span className='font-medium'>{item.title}</span>
                        <span className='ml-2 text-zinc-500'>x{item.quantity}</span>
                        </div>
                        <button onClick={() => removeItem(item.id)} className='text-xs text-red-500 hover:underline ml-4'>Remove</button>
                    </li>
                ))}   
            </ul>
            <div className="flex justify-between items-center mb-6">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="w-full block bg-zinc-900 text-white py-3 rounded font-bold uppercase tracking-widest text-center hover:bg-zinc-700 transition-all">
                Checkout</Link>
        </div>
    );
    
}