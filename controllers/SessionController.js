import e from "express";
import { asyncHandler, SuccessResponse } from "../utils/index.js";
import Session from "../models/Session.js";

const ses = e.Router();


//Session Creation
ses.create = asyncHandler(async (req, res) => {
    const {fileData} = req.body;
    if(!fileData) {
        return ErrorResponse.badRequest("File data is required");
    }
    const timeStamp = new Date().toLocaleString("en-IN").replace(',', '').replace(/\//g, '/').replace(/ /g, ':');
    const randomNum = Math.floor(Math.random() * 1000);
    const sessionInit = `COPY:${timeStamp}:${randomNum}`;
    const session = new Session({
        sessionName: sessionInit,
        structure: fileData,
    })
    await session.save();
    if(!session) {
        return ErrorResponse.internal("Failed to create session");
    }
    return SuccessResponse.created(res, "Session created successfully", session);
});

//Session StatusPoint
ses.status = asyncHandler(async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return ErrorResponse.badRequest("Session ID is required");
    }
    const session = await Session.findById(id);
    if(!session) {
        return ErrorResponse.notFound("Session not found");
    }
    return SuccessResponse.ok(res, "Session retrieved successfully", session);
});

//Session Update
ses.update = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const newStatus = req.body.status;
    if(!id) {
        return ErrorResponse.badRequest("Session ID is required");
    }
    const session = await Session.findById(id);
    if(!session) {
        return ErrorResponse.notFound("Session not found");
    }
    session.status = newStatus;
    await session.save();
    return SuccessResponse.ok(res, "Session updated successfully", session);
});

ses.getAll = asyncHandler(async (req, res) => {
    const sessions = await Session.find();
    return SuccessResponse.ok(res, "Sessions retrieved successfully", sessions);
});

export default ses;