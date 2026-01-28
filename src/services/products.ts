import axios from "axios";
import { config } from "@/config";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl?: string;
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/products`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/products/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }
  try {
    const response = await axios.post(`${config.apiBaseUrl}/products`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
