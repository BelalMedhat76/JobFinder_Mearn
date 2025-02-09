require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");
const app = express();


app.use(express.json());
app.use(cors());


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.get("/", (req, res) => {
  res.send("🚀 Job Finder API is running...");
});
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/jobs");
app.use("/api/jobs", jobRoutes);
const authRoutes = require("./routes/auth");
app.use("/api/users", userRoutes);  // ✅ Mount user routes
app.use("/api/auth", authRoutes);


// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
