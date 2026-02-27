import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});

// Auth routes
app.use("/api/auth", authRouter);

export default app;
