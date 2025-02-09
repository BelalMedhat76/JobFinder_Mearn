"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p className="text-white text-center">Checking authentication...</p>;
  }

  return children;
};

export default AuthGuard;
