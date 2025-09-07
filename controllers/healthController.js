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

export default health;
