"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full text-white">
      {/* Hero Section */}
      <section
        className="relative w-full  flex h-full flex-col items-center justify-center text-center px-6 py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/back1.jpg')" }}
      >
     
        <div className="relative z-10 w-full max-w-6xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold text-blue-400"
          >
            Find Your Dream Job
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-base sm:text-lg text-gray-300"
          >
            Discover top opportunities and land your next role effortlessly.
          </motion.p>

          {/* Animated Job Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
          >
            {[
              { title: "Tech Jobs", image: "/back.jpg" },
              { title: "Marketing", image: "/back2.jpg" },
              { title: "Finance", image: "/back3.jpg" },
              { title: "Healthcare", image: "/back4.jpg" },
              { title: "Education", image: "/back5.jpg" },
              { title: "Freelance", image: "/back6.jpg" },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group w-full"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:opacity-80 transition-all"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-lg sm:text-xl font-bold text-white text-center px-2">
                    {category.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8"
          >
            <Link href="/jobs">
              <button className="bg-blue-500 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all">
                Browse Jobs
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
