import { getAllProducts } from "../lib/api";
import ProductGrid from "../components/ProductGrid";

export const revalidate = 60;
export default async function Home() {
  const products = await getAllProducts();

  if (products.length === 0) return <p>No products found</p>;
  return (
    <>
      <main className="m-auto max-w-6xl px-4 pb-24">
        <h1 className="text-2xl font-semibold mt-4">All Products</h1>
        <ProductGrid products={products} />
      </main>
    </>
  );
}
