"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { AddProductForm } from "@/components/AddProductForm";
import { getProducts, type Product } from "@/services/products";
import { useCart } from "@/context/CartContext";
import { Cart } from "@/components/Cart";
import { CartButton } from "@/components/CartButton";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(window.localStorage.getItem("role"));
    }
  }, []);

  useEffect(() => {
     fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("email");
    }
    setRole(null);
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-[520px] w-full max-w-5xl flex-col gap-6 rounded-xl bg-[#f5f5f5] px-10 py-8 shadow-sm">
        <header className="mb-2 flex items-center justify-between">
          <div className="text-sm font-semibold text-zinc-900">Mindwhiz</div>
          <div className="flex gap-2">
            <CartButton onClick={() => setIsCartOpen(true)} />
            <button
              onClick={() => {
                if (role) {
                  handleLogout();
                } else {
                  router.push("/login");
                }
              }}
              className="rounded-md bg-[#39B54A] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#2f9a3d]"
            >
              {role ? "Logout" : "Login"}
            </button>
          </div>
        </header>

        <section className="flex gap-6">
          <div className="flex-1 rounded-xl bg-white p-5 shadow-sm border border-zinc-200">
            <h2 className="mb-4 text-sm font-semibold text-zinc-900">
              Product Listing
            </h2>
            {loading && (
              <div className="text-xs text-zinc-600">Loading products...</div>
            )}
            {error && (
              <div className="text-xs text-red-600 mb-2">{error}</div>
            )}
            {!loading && !error && (
              <div>
                {role === "admin" && (
                  <AddProductForm
                    onCreated={(created) => setProducts((prev) => [...prev, created])}
                  />
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onViewDetails={() => setSelected(p)}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
