"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect if not logged in
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setProfileImage(data.profileImage ? `http://localhost:5000${data.profileImage}` : "/default-avatar.png");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (selectedImage) formData.append("profileImage", selectedImage);

    try {
      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Profile updated successfully!");
        if (data.profileImage) {
          setProfileImage(`http://localhost:5000${data.profileImage}`);
        }
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Error updating profile.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  if (loading) return <p className="text-white text-center animate-pulse">Loading profile...</p>;

  return (
    <div  
    style={{ backgroundImage: "url('/back1.jpg')" }} className="min-h-screen flex items-center justify-center bg-center bg-cover text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Profile</h2>

        {message && <p className="text-yellow-400 mb-4">{message}</p>}

        <div className="flex flex-col items-center">
          <label htmlFor="profileImage" className="cursor-pointer">
            <img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 transition-transform transform hover:scale-105"
            />
          </label>
          <input
            type="file"
            id="profileImage"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-6">
          <label className="block text-gray-400">Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3 focus:outline-none focus:ring focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block text-gray-400 mt-4">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3 focus:outline-none focus:ring focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <motion.button
            onClick={updateProfile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition mt-4"
          >
            Update Profile
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
