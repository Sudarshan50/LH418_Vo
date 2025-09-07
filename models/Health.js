import mongoose from "mongoose";

const healthStatusEnum = ["Healthy", "Destroy"];

const HealthSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: healthStatusEnum,
      required: true,
      default: "Healthy",
    },
    lastChecked: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Health", HealthSchema);
