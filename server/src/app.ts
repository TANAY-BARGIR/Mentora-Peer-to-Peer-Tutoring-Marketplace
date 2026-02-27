import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.route";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.use("/api/health", healthRouter);

export default app;
