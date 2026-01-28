"use client";

import Image from "next/image";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl?: string;
};

type Props = {
  product: Product;
  onViewDetails: () => void;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({ product, onViewDetails, onAddToCart }: Props) {
  return (
    <div className="flex flex-col rounded-lg bg-white shadow-sm border border-zinc-200 p-4">
      <div className="relative mb-3 h-28 w-full overflow-hidden rounded-md bg-zinc-100">
        <Image
          src={product.imageUrl || "/window.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="text-sm font-semibold text-zinc-900 mb-1">
        {product.name}
      </div>
      <div className="text-xs text-emerald-600 font-semibold mb-3">
        PKR {product.price.toFixed(2)}
      </div>
      <div className="mt-auto flex gap-2">
        <button
          onClick={onViewDetails}
          className="flex-1 rounded-md border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-50"
        >
          View Details
        </button>
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="flex-1 rounded-md bg-[#39B54A] px-3 py-1 text-xs font-semibold text-white hover:bg-[#2f9a3d] disabled:opacity-60"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

