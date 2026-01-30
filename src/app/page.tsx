"use client";

import { useState, useEffect } from "react";
import { Product } from "./types/product";
import { getAllProducts } from "./lib/api";
import ProductGrid from "./components/ProductGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if(loading) return <p>Loading...</p>

  if(products.length === 0) return <p>No products found</p>
  return (
    <>
      <Header />
      <main className="m-auto max-w-6xl px-4 pb-24">
        <h1 className="text-2xl font-semibold mb-4">All Products</h1>
        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  );
}
