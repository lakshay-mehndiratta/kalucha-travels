"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import logo from "@/assets/kalucha_travels_logo.png";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-line rounded-brand p-8 w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-[10px] bg-orange flex items-center justify-center text-white font-serif font-bold text-xl mx-auto mb-3">
            <Image
                src={logo}
                alt="Kalucha Travels"
                width={150}
                height={48}
                priority
                className="h-10 w-auto object-contain rounded-lg"
            />
          </div>
          <h1 className="text-xl font-serif font-bold text-navy">Admin Login</h1>
          <p className="text-[13px] text-muted mt-1">Kalucha Travels Dashboard</p>
        </div>

        <div className="space-y-3.5 mb-5">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line rounded-lg px-3.5 py-2.5 text-sm"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-line rounded-lg px-3.5 py-2.5 text-sm"
          />
        </div>

        {error && <p className="text-red-600 text-xs mb-3.5">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange text-white font-semibold rounded-full py-3 hover:bg-orange-dark transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}