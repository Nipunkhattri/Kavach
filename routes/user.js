// import {signup} from "../controllers/user.js";
import {CallCheck} from "../controllers/Spancall.js";
import {ReportSpam} from "../controllers/ReportSpam.js";
import express from "express";
const router = express.Router();

// router.post("/signup",signup)
router.post("/call",CallCheck)
router.post("/Report",ReportSpam)

export default router;