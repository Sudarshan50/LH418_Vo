import e from "express";
import health from "../controllers/healthController.js";

const hr = e.Router();

hr.post('/',health.changeStatus);
hr.get('/',health.reflectStatus);

export default hr;
