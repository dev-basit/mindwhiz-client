"use client";

import { useState } from "react";
import { type Product, createProduct } from "@/services/products";

type Props = {
  onCreated: (product: Product) => void;
};

export function AddProductForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("inStock", String(inStock));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const created = await createProduct(formData);
      onCreated(created);
      setName("");
      setDescription("");
      setPrice("");
      setInStock(true);
      setImageFile(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <h2 className="mb-3 text-sm font-semibold text-zinc-900">
        Add Product
      </h2>

      <div className="mb-2 grid grid-cols-2 gap-3">
      <div className="mb-2">
        <label className="block text-xs font-medium text-zinc-700 mb-1">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#39B54A]"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-xs font-medium text-zinc-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={1}
          className="w-full rounded-md border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#39B54A]"
          required
        />
      </div>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-zinc-700 mb-1">
            Price
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#39B54A]"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-700 mb-1">
            Availability
          </label>
          <select
            value={inStock ? "in" : "out"}
            onChange={(e) => setInStock(e.target.value === "in")}
            className="w-full rounded-md border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#39B54A]"
          >
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-zinc-700 mb-1">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
          className="w-full rounded-md border border-zinc-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#39B54A]"
        />
      </div>
      {error && (
        <div className="mb-2 text-xs text-red-600">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-1 inline-flex items-center justify-center rounded-md bg-[#39B54A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2f9a3d] disabled:opacity-60"
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
