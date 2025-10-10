"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "applications/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("Registration successfully REdirecting to Login...");
      router.push("/login");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          className="w-full mb-3 p-2 rounded bg-gray-700 border border-gray-600"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="w-full mb-3 p-2 rounded bg-gray-700 border border-gray-600"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600"
        />
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
