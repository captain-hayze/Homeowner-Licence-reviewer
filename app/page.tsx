"use client"

import Login from "@/components/auth/Login";

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block bg-blue-600" />
      <div className="bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <Login />
        </div>
      </div>
    </main>
  );
}
