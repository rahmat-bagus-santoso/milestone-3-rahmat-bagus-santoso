"use client";
import { Product } from "@/types/product";
import { API_URL } from "@/lib/api";
import { useEffect, useState } from "react";

async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`, {
        cache: "no-store"
    });
    return response.json()
}

export default async function AdminDashboard() {
    const products = await getProducts();
  return (
    <div className="min-h-screen bg-zinc-50 flex">
     
      <aside className="w-64 bg-zinc-900 text-white p-8 space-y-12">
        <h2 className="font-serif italic text-2xl">Admin Console</h2>
        <nav className="space-y-4">
          {['Inventory', 'Orders', 'Customers', 'Analytics'].map((item) => (
            <a key={item} href="#" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </nav>
      </aside>

      
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="flex justify-between items-end mb-12">
          <h1 className="text-4xl font-serif italic text-zinc-900">Dashboard Overview</h1>
          <button className="bg-zinc-900 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest">Add Product</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Total Sales', 'Active Orders', 'Inventory Value'].map((stat) => (
            <div key={stat} className="bg-white border border-zinc-200 p-8 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">{stat}</p>
              <p className="text-3xl font-light mt-4">$12,450</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white border border-zinc-200 rounded-sm overflow-hidden">
          <table className="w-full text-left text-xs uppercase tracking-widest">
            <thead className="bg-zinc-50 border-b border-zinc-200 font-black">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Product</th>
                <th className="p-4 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="p-4 font-serif italic normal-case text-base">{product.id}</td>
                  <td className="p-4 text-emerald-600">{product.title}</td>
                  <td className="p-4 text-right">${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}