import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { contactRouter } from "./routes/contact.js";
import { accessRouter } from "./routes/access.js";
import { connectDb } from "./db.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: "Too many requests. Please try again later." },
});

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use("/api", accessRouter);
app.use(limiter);
app.use("/api", contactRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
