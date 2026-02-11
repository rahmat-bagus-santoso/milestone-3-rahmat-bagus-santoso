"use client";

import { useAuthStore } from "@/store/auth-store";

export default function CheckoutPage() {
    const user = useAuthStore((state) => state.user);
    return (
        <div>
            <h1>Checkout Page</h1>
            <p>Current User: {user?.name}</p>
        </div>
    );
}