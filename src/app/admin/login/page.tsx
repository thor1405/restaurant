"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1C1C1C] rounded-lg p-8 md:p-10 border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-white tracking-widest mb-2">L'ÉTOILE</h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">Admin Portal</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white/70 text-sm tracking-widest uppercase mb-2">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-(--color-accent) transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm tracking-widest uppercase mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-(--color-accent) transition-colors"
            />
          </div>
          <div className="pt-4">
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
