import {CallCheck} from "../controllers/Spancall.js";
import {GenuieCheck} from "../controllers/Spancall.js";
import {ReportSpam} from "../controllers/ReportSpam.js";
import {ClearData} from "../controllers/ReportSpam.js";
import express from "express";
const router = express.Router();

// router.post("/signup",signup)
router.post("/call",CallCheck)
router.post("/Gen",GenuieCheck)
router.post("/Report",ReportSpam)
router.post("/Clear",ClearData)

export default router;