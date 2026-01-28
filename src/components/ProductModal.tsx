"use client";

import Image from "next/image";
import type { Product } from "./ProductCard";

type Props = {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: () => void;
};

export function ProductModal({ product, onClose, onAddToCart }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-lg font-semibold text-zinc-900">
          {product.name}
        </h2>

        <div className="mb-4 flex justify-center">
          <div className="relative h-40 w-64 overflow-hidden rounded-md bg-zinc-100">
            <Image
              src={product.imageUrl || "/window.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-4 text-sm text-zinc-700">
          <div className="font-semibold mb-1">{product.name}</div>
          <p className="text-xs leading-relaxed mb-3">{product.description}</p>
          <div className="text-xs mb-1">
            <span className="font-semibold">Price:</span>{" "}
            <span>PKR {product.price.toFixed(2)}</span>
          </div>
          <div className="text-xs">
            <span className="font-semibold">Availability:</span>{" "}
            <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="rounded-md bg-[#39B54A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2f9a3d]"
            >
              Add to Cart
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-md border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

