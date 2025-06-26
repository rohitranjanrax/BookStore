import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./Routes/bookRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/Book', bookRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to the Bookstore Backend");
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected successfully");
    const PORT = process.env.PORT || 5500;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
