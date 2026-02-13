"use client";
import Link from "next/link";
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
    <div className="flex flex-col h-full bg-white transition-all">
      <Link href={`/product/${product.id}`} className="group block">
        <section>
          <div className="relative cursor-pointer shadow-md">
            <div className="overflow-hidden bg-stone-100 aspect-[3/4]">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
            </div>
            <div className="mt-4 space-y-1 p-5">
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="text-2xl font-serif tracking-tighter uppercase italic leading-none truncate">{product.title}</h3>
                <span className="text-md font-light tabular-nums text-stone-700">${product.price}</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-semibold border-b border-stone-200 pb-2">{product.category.name}</p>
            </div>
          </div>
        </section>
      </Link>

      <div className="pt-4">
        <button
          onClick={handleAddToCart}
          className="bg-black text-white w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-stone-800 transition-all active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
