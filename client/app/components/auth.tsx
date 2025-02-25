"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthPage({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: type === "register" ? "" : undefined,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = type === "login" ? "/auth/login" : "/auth/register";
    const apiUrl = `http://127.0.0.1:5000${endpoint}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      if (type === "login") {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.role);
        toast(`Logged in as ${formData.email}!`, {'type': 'success'})
        router.push("/");
      } else {
        toast(`Signed up with ${formData.email}! Please login now.`, {'type': 'success'})
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <div className=" p-10 border rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-4">
          {type === "login" ? "Log In" : "Sign Up"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-3 text-black"
        >
          {type === "register" && (
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full  py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center"
          >
            {loading
              ? "Processing..."
              : type === "login"
              ? "Log In"
              : "Sign Up"}
          </button>
        </form>
        <p className="mt-3 text-sm">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <a
            href={type === "login" ? "/register" : "/login"}
            className="text-blue-500 ml-1"
          >
            {type === "login" ? "Sign Up" : "Log In"}
          </a>
        </p>
      </div>
    </main>
  );
}
