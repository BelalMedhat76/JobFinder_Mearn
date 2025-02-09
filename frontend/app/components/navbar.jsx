"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          Job Finder
        </Link>
        
        {/* Mobile Toggle Button */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/jobs" className="hover:text-blue-400">Jobs</Link>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="hover:text-blue-400">Profile</Link>
              <Link href="/my-applications" className="hover:text-blue-400">My Applications</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400">Login</Link>
              <Link href="/register" className="hover:text-blue-400">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4 absolute top-16 left-0 w-full shadow-lg z-50 flex flex-col space-y-4">
          <Link href="/" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/jobs" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Jobs</Link>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Profile</Link>
              <Link href="/my-applications" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>My Applications</Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Login</Link>
              <Link href="/register" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
