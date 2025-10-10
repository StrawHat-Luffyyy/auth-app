"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {session.user?.name || session.user?.email}</h1>
        <p className="mb-6 text-gray-400">You’re logged in successfully 🎉</p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
