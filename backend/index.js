require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jobRoutes = require("./routes/jobs");

const app = express();
app.use(express.json());
const allowedOrigins = [
  'https://job-list-frontend-nine.vercel.app',
  'https://job-list-frontend-git-main-rajaiswal6544s-projects.vercel.app',
  'https://job-list-frontend-f4rotci69-rajaiswal6544s-projects.vercel.app'
];

// Configure CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed list
      if (!allowedOrigins.includes(origin)) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"));

app.use("/api", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
