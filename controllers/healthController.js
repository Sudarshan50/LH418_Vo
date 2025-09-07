import Health from "../models/Health.js";
import {
  asyncHandler,
  ErrorResponse,
  SuccessResponse,
} from "../utils/index.js";

let health = {};

health.changeStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) {
    throw ErrorResponse.badRequest("Health status is required");
  }
  const healthStatus = await Health.findById(process.env.H_ID);
  if (!healthStatus) {
    throw ErrorResponse.notFound("Health status not found");
  }
  healthStatus.status = status;
  await healthStatus.save();
  return SuccessResponse.ok(
    res,
    "Health status updated successfully",
    healthStatus
  );
});

health.reflectStatus = asyncHandler(async (req, res) => {
  const healthPoint = await Health.findById(process.env.H_ID);
  if (!healthPoint) {
    throw ErrorResponse.notFound("Health point not found");
  }
  const lastCheckedTimestamp = healthPoint.lastCheckedTimestamp;
  const currentTimestamp = Date.now();
  if (currentTimestamp - lastCheckedTimestamp > 11000) {
    return SuccessResponse.ok(res, "Health is degraded", {
      status: "Degraded",
    });
  }
  return SuccessResponse.ok(res, "Health is normal", { status: "Healthy" });
});

export default health;
