import { useState } from "react";
import { AddProductForm } from "./AddProductForm";
import { Product } from "@/services/products"; // Assuming Product type is defined here

interface AddProductModalProps {
  onCreated: (product: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  onCreated,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleProductCreated = (product: Product) => {
    onCreated(product);
    setIsOpen(false); 
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
      >
        Add Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Add New Product</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <p className="mb-4 text-sm text-gray-500">
              Fill in the details to add a new product.
            </p>
            <AddProductForm onCreated={handleProductCreated} />
          </div>
        </div>
      )}
    </>
  );
};
