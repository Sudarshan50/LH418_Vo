import mongoose from "mongoose";
import { type } from "os";

const sessionSchema = new mongoose.Schema(
  {
    sessionName: {
      type: String,
      required: true,
    },
    structure: {
      type: String,
      required: false,
    },
    uploadLogs: {
      type: String,
      required: false,
      default: "",
    },
    status: {
      type: String,
      enum: ["copying", "sending", "done"],
      required: true,
      default: "copying",
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
