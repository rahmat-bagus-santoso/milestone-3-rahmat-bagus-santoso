import { getProductById } from "../../../lib/api";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";


type ProductDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: ProductDetailProps) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return <p className="p-10 text-center">Product not found</p>;
  }

  return (
    <>
    <Header />
    <main className="px-4 py-12">
      <div className="relative mx-auto max-w-4xl">
        <Link
          href="/"
          aria-label="Close and return to products"
          className="
            absolute
            right-2
            top-2
            z-10
            text-xs
            font-light
            tracking-widest
            text-zinc-400
            transition
            hover:text-zinc-900
          "
        >
          X
        </Link>

        <div className="flex flex-col md:flex-row border border-zinc-200 bg-white">
          <div
            className="
              w-full
              md:w-20
              bg-zinc-900
              flex
              md:flex-col
              items-center
              justify-between
              p-6
              text-white
            "
          >
            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.5em]
                md:[writing-mode:vertical-lr]
                md:rotate-180
              "
            >
              {product.category.name}
            </span>
          </div>

          <div
            className="
              flex-1
              p-12
              flex
              items-center
              justify-center
              bg-[#fdfdfd]
            "
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="
                w-64
                md:w-72
                lg:w-80
                mix-blend-multiply
                transition-transform
                duration-1000
                hover:scale-110
              "
            />
          </div>

          <div
            className="
              w-full
              md:w-80
              p-12
              border-t
              md:border-t-0
              md:border-l
              border-zinc-100
              space-y-8
            "
          >
            <h1
              className="
                text-3xl
                font-light
                tracking-tighter
                leading-tight
              "
            >
              {product.title}
            </h1>

            <p className="text-xs text-zinc-400 leading-relaxed">{product.description}</p>

            <div className="pt-8 flex flex-col gap-4">
              <span className="text-2xl font-light">${product.price}</span>

              <button
                className="
                  w-full
                  py-3
                  bg-zinc-900
                  text-white
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  transition
                  hover:bg-zinc-800
                "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default page;
