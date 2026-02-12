"use client";
import { Product } from "../types/product";
import { useCartStore } from "@/store/cart-store";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  function handleAddToCart() {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
    });
  }
  return (
    <section>
      <div className="relative group cursor-pointer shadow-md">
        <div className="overflow-hidden bg-stone-100 aspect-3/4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
          />
        </div>
        <div className="mt-4 space-y-1 p-5">
          <div className="flex justify-between items-baseline">
            <h3 className="text-2xl font-serif tracking-tighter uppercase italic sm:text-2xl leading-none">{product.title}</h3>
            <span className="text-md font-light tabular-nums text-stone-700">${product.price}</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-semibold border-b border-stone-200 pb-2">{product.category.name}</p>
        </div>
      </div>
      <button onClick={handleAddToCart} className="bg-black text-white w-full py-2 mt-4 hover:bg-zinc-900 transition">Add to Cart</button>
    </section>
  );
};

export default ProductCard;
