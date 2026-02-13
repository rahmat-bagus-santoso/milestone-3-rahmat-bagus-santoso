"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession, logout } from "@/lib/auth";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useRef } from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);
  const [showNotif, setShowNotif] = useState(false);
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    async function fetchSession() {
      const session = await getSession();
      if (mounted.current && session) setAuth(session, '');
    }
    fetchSession();
    return () => { mounted.current = false; };
  }, [setAuth]);

  useEffect(() => {
    if (mounted.current && cartCount > 0) {
      setShowNotif(true);
      const timer = setTimeout(() => setShowNotif(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const handleLogout = async () => {
    await logout();
    logoutStore();
    router.push("/login");
  };

  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
        <h1 className="text-sm font-semibold tracking-wide">FakeStore</h1>
        <nav className="text-xs text-zinc-500 space-x-6 flex items-center">
          <Link href="/" className="hover:text-zinc-900 transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-zinc-900 transition">
            About
          </Link>
          <Link href="/cart" className="relative hover:text-zinc-900 transition">
            <span className="inline-block align-middle mr-1">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 0 0 7 17h12a1 1 0 0 0 .95-.68l1.54-4.32M7 13V6m0 0L5.4 5M7 6h10" />
              </svg>
            </span>
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-[10px] font-bold">{cartCount}</span>
            )}
          </Link>
          {user ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin" className="hover:text-zinc-900 transition">
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:text-zinc-900 transition bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href={`/login?callbackUrl=${pathname}`}
              className="hover:text-zinc-900 transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
      {showNotif && (
        <div className="fixed top-16 right-6 bg-emerald-500 text-white px-4 py-2 rounded shadow text-xs font-bold z-50 animate-fade-in">
          Item added to cart!
        </div>
      )}
    </header>
  );
};

export default Header;