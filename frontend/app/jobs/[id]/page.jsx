"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // ✅ Import useRouter
import { motion, AnimatePresence } from "framer-motion";

const JobDetails = () => {
  const params = useParams();
  const router = useRouter(); // ✅ Define router
  const id = params.id;

  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const applyToJob = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      setMessage("⚠️ You need to log in first!");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        router.push("/login");
      }, 2000);
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      let data;
      try {
        data = await res.json(); // ✅ Try parsing JSON
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        setMessage("❌ Server error. Try again later.");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        return;
      }
  
      setMessage(res.ok ? "✅ Successfully applied!" : data.message || "❌ Failed to apply.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Try again later.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };
  
  if (!job) return <p className="text-white">Loading job details...</p>;

  return (
    <div 
    style={{ backgroundImage: "url('/back.jpg')" }} className="min-h-screen bg-center bg-cover text-white p-6 flex justify-center items-center flex-col">
      {/* Animated Alert at the Top (Mobile-Friendly) */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed top-6 right-10 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg text-center z-50 text-sm md:text-base w-64 md:w-auto"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg shadow-lg mt-12">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-gray-400">{job.company}</p>
        <p className="text-green-400 font-bold">${job.salary}</p>
        <p className="text-sm mt-2">{job.location}</p>
        <p className="mt-4">{job.description}</p>

        {/* Apply Button */}
        <button
          onClick={applyToJob}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition transform hover:scale-105 shadow-md"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
