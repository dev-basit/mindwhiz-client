"use client";

import { useCart } from "@/context/CartContext";

type CartButtonProps = {
  onClick: () => void;
};

export function CartButton({ onClick }: CartButtonProps) {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="relative rounded-md bg-[#39B54A] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#2f9a3d]"
    >
      Cart ({itemCount})
    </button>
  );
}
