"use client";
import { Product } from "@/types/product";
import { API_URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
}
export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(data: FormData) {
    setError(null);
    try {
      const payload = {
        title: data.title,
        price: Number(data.price),
        description: data.description,
        categoryId: Number(data.category) || 1,
        images: [data.image],
      };
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to create product");
      const result = await response.json();
      setProducts((prev) => [result, ...prev]);
      setShowForm(false);
      reset();
    } catch (error: any) {
      setError(error.message);
    }
  }

  async function handleUpdate(data: FormData) {
    if (!editing) return;
    setError(null);
    try {
      const payload = {
        title: data.title,
        price: Number(data.price),
      };
      const response = await fetch(`/api/products/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to update product");
      const result = await response.json();
      setProducts((prev) =>
        prev.map((product) => (product.id === editing.id ? result : product)),
      );
      setShowForm(false);
      setEditing(null);
      reset();
    } catch (error: any) {
      setError(error.message);
    }
  }

  function openEditForm(product: Product) {
    setEditing(product);
    setShowForm(true);
    setValue("title", product.title);
    setValue("price", String(product.price));
    setValue("description", product.description);
    setValue("category", String(product.category.id));
    setValue("image", product.images[0]);
  }
  function closeForm() {
    setShowForm(false);
    setEditing(null);
    reset();
  }
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) =>
        prev.filter((product) => product.id !== Number(id)),
      );
    } catch (err: any) {
      setError("Failed to delete product");
    }
  }
  return (
    <div className="min-h-screen bg-zinc-50 flex">
      <aside className="w-64 bg-zinc-900 text-white p-8 space-y-12">
        <h2 className="font-serif italic text-2xl">Admin Console</h2>
        <nav className="space-y-4">
          {["Inventory", "Orders", "Customers", "Analytics"].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <div className="flex justify-between items-end mb-12">
          <h1 className="text-4xl font-serif italic text-zinc-900">
            Dashboard Overview
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-zinc-900 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest"
          >
            Add Product
          </button>
        </div>
        {showForm && (
          <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden">
            <form
              onSubmit={handleSubmit(editing ? handleUpdate : handleCreate)}
            >
              <div className="p-4 space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-xs font-bold uppercase tracking-widest text-zinc-500"
                  >
                    Title
                  </label>
                  <input
                    {...register("title")}
                    type="text"
                    className="mt-1 block w-full border border-zinc-200 rounded-sm p-3 text-xs"
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-xs font-bold uppercase tracking-widest text-zinc-500"
                  >
                    Price
                  </label>
                  <input
                    {...register("price")}
                    type="number"
                    className="mt-1 block w-full border border-zinc-200 rounded-sm p-3 text-xs"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-xs font-bold uppercase tracking-widest text-zinc-500"
                  >
                    Description
                  </label>
                  <input
                    {...register("description")}
                    type="text"
                    className="mt-1 block w-full border border-zinc-200 rounded-sm p-3 text-xs"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-xs font-bold uppercase tracking-widest text-zinc-500"
                  >
                    Category
                  </label>
                  <input
                    {...register("category")}
                    type="text"
                    className="mt-1 block w-full border border-zinc-200 rounded-sm p-3 text-xs"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-xs font-bold uppercase tracking-widest text-zinc-500"
                  >
                    Image
                  </label>
                  <input
                    {...register("image")}
                    type="text"
                    className="mt-1 block w-full border border-zinc-200 rounded-sm p-3 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-zinc-900 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest"
                >
                  {editing ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="bg-zinc-900 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading && (
          <div className="text-center text-zinc-400">Loading products...</div>
        )}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        {!loading && products.length === 0 && !error && (
          <div className="text-center text-zinc-400">No products found.</div>
        )}
        {!loading && products.length > 0 && (
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
                  <tr key={product.id} className="group hover:bg-zinc-100">
                    <td className="p-4 font-serif italic normal-case text-base">
                      {product.id}
                    </td>
                    <td className="p-4 text-emerald-600">{product.title}</td>
                    <td className="p-4 text-right">${product.price}</td>
                    <td className="p-4 text-right space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditForm(product)}>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id.toString())}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
