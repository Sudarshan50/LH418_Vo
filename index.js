import express from "express";
import morgan from "morgan";
import database from "./lib/database.js";
import dotenv from "dotenv";
import {
  SuccessResponse,
  ErrorResponse,
  errorHandler,
  asyncHandler,
} from "./utils/index.js";
import r from "./routes/index.js";
import Health from "./models/Health.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get(
  "/health",
  asyncHandler(async (req, res) => {
    const healthStatus = await Health.findById(process.env.H_ID);
    if (!healthStatus) {
      throw ErrorResponse.notFound("Health status not found");
    }
    return SuccessResponse.ok(
      res,
      "Health status retrieved successfully",
      healthStatus.status
    );
  })
);

app.use("/api", r);

//NOTE: Don't add route after this..
app.use(errorHandler);

app.use((req, res) => {
  const error = ErrorResponse.notFound(`Route ${req.originalUrl} not found`);
  return error.send(res);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  try {
    await database.disconnect();
  } catch (error) {
    console.error("Error during shutdown:", error);
  }
  process.exit(0);
});

// Start server with proper async/await
async function startServer() {
  try {
    await database.connect();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
