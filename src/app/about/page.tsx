export const dynamic = "force-static";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function AboutPage() {
  return (
    <><Header />
    <main className="mx-auto max-w-3xl py-12">
      <h1 className="mb-4 text-2xl font-semibold">
        About FakeStore
      </h1>

      <p className="mb-4 text-gray-600">
        FakeStore is a fictional e-commerce platform built as part
        of a fullstack learning project using Next.js.
      </p>

      <p className="mb-4 text-gray-600">
        This page is statically generated to demonstrate the use of
        Static Site Generation (SSG) in Next.js App Router.
      </p>

      <p className="text-gray-600">
        The goal of this project is to understand routing, data
        fetching strategies, and component-based UI development.
      </p>
    </main>
    <Footer /></>
  );
}
