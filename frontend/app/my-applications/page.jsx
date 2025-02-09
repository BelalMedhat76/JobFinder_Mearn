"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../components/AuthGuard";
const MyApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/jobs/my-applications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch applied jobs");

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [router]);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <AuthGuard>


   
    <div  
     
     style={{ backgroundImage: "url('/back.jpg')" }}     className="min-h-screen bg-center bg-cover text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      {jobs.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-400">{job.company}</p>
              <p className="text-green-400">${job.salary}</p>
              <p className="text-sm mt-2">{job.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </AuthGuard>
  );
};

export default MyApplications;
