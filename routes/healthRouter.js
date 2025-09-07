import e from "express";
import health from "../controllers/healthController.js";

const hr = e.Router();

hr.post('/',health.changeStatus);

export default hr;
