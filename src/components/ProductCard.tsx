import { Product } from "../types/product";

type ProductCardProps = {
  product: Product
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <section>
    <div className="relative group cursor-pointer shadow-md">
      <div className="overflow-hidden bg-stone-100 aspect-3/4">
        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
      </div>
      <div className="mt-4 space-y-1 p-5">
        <div className="flex justify-between items-baseline">
          <h3 className="text-2xl font-serif tracking-tighter uppercase italic sm:text-2xl leading-none">{product.title}</h3>
          <span className="text-md font-light tabular-nums text-stone-700">${product.price}</span>
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-semibold border-b border-stone-200 pb-2">{product.category.name}</p>
      </div>
    </div>
    </section>
  )
}

export default ProductCard

