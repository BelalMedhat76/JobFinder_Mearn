"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Handle search
  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, jobs]);

  return (
    <div 
    style={{ backgroundImage: "url('/back.jpg')" }} className="min-h-screen bg-center bg-cover text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full max-w-lg p-3 rounded-lg bg-gray-800 text-white outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Job Listings */}
        <motion.div
        
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push(`/jobs/${job._id}`)} // Navigate to job details
              >
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <p className="text-gray-400">{job.company}</p>
                <p className="text-green-400 font-bold">${job.salary}</p>
                <p className="text-sm mt-2">{job.location}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JobListings;
