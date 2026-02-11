"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callback") || "/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setLoading(true);
        
        try {
            await login(email,password)
            router.push(callbackUrl);
        } catch (error) {
                setError("Email or password is incorrect");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-6">
      <div className="max-w-md w-full border border-zinc-200 bg-white p-12 shadow-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif italic text-4xl mb-2">Welcome Back</h1>
          <p className="text-[10px] uppercase tracking-widest text-zinc-400">Enter your credentials to access your account</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              placeholder="name@domain.com"
              className="w-full border-b border-zinc-200 py-2 text-sm focus:outline-none focus:border-zinc-900 transition-colors bg-transparent"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full border-b border-zinc-200 py-2 text-sm focus:outline-none focus:border-zinc-900 transition-colors bg-transparent"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {error && (<p className="text-xs text-red-500 mt-2">{error}</p>)}
          </div>
          <button type="submit" disabled={loading} className="w-full bg-zinc-900 text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] mt-8 hover:bg-zinc-700 transition-all">
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
    );
}