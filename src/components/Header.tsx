import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
        <h1 className="text-sm font-semibold tracking-wide">FakeStore</h1>

        <nav className="text-xs text-zinc-500 space-x-6">
          <Link href="/" className="hover:text-zinc-900 transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-zinc-900 transition">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
