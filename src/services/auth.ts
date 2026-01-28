import axios from "axios";
import { config } from "@/config";

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: "admin" | "customer";
  };
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try{
    const response = await axios.post(`${config.apiBaseUrl}/login`, { email, password });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
