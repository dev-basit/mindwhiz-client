"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/services/products";
import Image from "next/image";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, addToCart, clearCart, cartTotal } = useCart();

  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-800">
          ✕
        </button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-zinc-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200">
                  <Image
                    src={item.imageUrl || "/window.svg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-zinc-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-zinc-600">
                    PKR {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-500 hover:text-zinc-800"
                    >
                      -
                    </button>
                    <span className="text-sm text-zinc-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item as Product)}
                      className="text-zinc-500 hover:text-zinc-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t p-4">
        <div className="flex justify-between text-base font-semibold text-zinc-900 mb-2">
          <p>Subtotal:</p>
          <p>PKR {cartTotal.toFixed(2)}</p>
        </div>
        <button
          onClick={clearCart}
          disabled={cart.length === 0}
          className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-60"
        >
          Clear Cart
        </button>
        <button
          disabled={cart.length === 0}
          className="mt-2 w-full rounded-md bg-[#39B54A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2f9a3d] disabled:opacity-60"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
