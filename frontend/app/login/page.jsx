"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("✅ Login successful!");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setMessage(data.message || "❌ Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div  
    style={{ backgroundImage: "url('/back1.jpg')" }}
    className="min-h-screen flex items-center justify-center bg-center bg-cover text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {message && <p className="text-center text-red-400 mb-4">{message}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-700 text-white mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-700 text-white mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          No account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
