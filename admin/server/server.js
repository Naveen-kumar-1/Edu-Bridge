import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import entranceRoutes from "./routes/EntranceRoutes.js"
import redis from "./config/redis.js";

dotenv.config();

// Initialize the express app
const app = express();

// Connect Database
await connectDB();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working...!");
});


// API calls
app.use('/api/entrance/',entranceRoutes)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Pord ${PORT}`);
});
