import express, { IRouter } from "express";
import analysisComtroller from "../controllers/analysisComtroller";
import relationshipsComtroller from "../controllers/relationshipsComtroller";
const router: IRouter = express.Router();
router.use("/analysis", analysisComtroller);
router.use("/relationships", relationshipsComtroller);

export default router;
