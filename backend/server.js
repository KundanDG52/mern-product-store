import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// GET
app.get("/", (req, res) => {});

app.listen(5000, () => {
  connectDB();
  console.log("Server started on port http://localhost:5000");
});
