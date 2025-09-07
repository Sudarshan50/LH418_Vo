import e from "express";
import hr from "./healthRouter.js";
import sr from "./SessionRouter.js";

const  r = e.Router();

    
r.use("/health", hr);
r.use("/ses", sr);

export default r;