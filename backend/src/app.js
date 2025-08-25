import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parse req.cookies into a JSON object

// Routes

// Connect to MongoDB and start the server
console.log("Connecting to MongoDB: ", process.env.MONGO_URI);
connectDB().then(() => {

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server is running on: http://localhost:" + PORT);
  });
});
