import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import Link from "next/link";

type ProductGridProps = {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-14 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`} className="block transition-transform hover:-translate-y-1">
          <ProductCard product={product} />
        </Link>
      ))}
      
    </div>
  )
}

export default ProductGrid