"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Registration successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(data.message || "❌ Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div 
    style={{ backgroundImage: "url('/back1.jpg')" }}
      className="min-h-screen flex items-center justify-center bg-center bg-cover text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {message && <p className="text-center text-red-400 mb-4">{message}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-gray-700 text-white mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
