require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jobRoutes = require("./routes/jobs");

const app = express();



app.use(
  cors({
    origin: "https://job-list-frontend-nine.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"));

app.use("/api", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
