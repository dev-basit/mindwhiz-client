"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@mindwhiz.com");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const data = await login(email, password);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("role", data.user.role);
      window.localStorage.setItem("email", data.user.email);

      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md border border-zinc-200">
        <h1 className="mb-4 text-center text-lg font-semibold text-zinc-900">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#39B54A]"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#39B54A]"
              required
            />
          </div>
          {error && (
            <div className="text-xs text-red-600">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-[#39B54A] py-2 text-xs font-semibold text-white hover:bg-[#2f9a3d] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
