import express, { Request, Response, NextFunction } from "express";
import { handleError } from "../utils/ErrorHandle";
import {
  getAllGroupsByRegion,
  getAttacksByGroups,
  getGroupsByYearActivity,
  getTopGroups,
} from "../service/relationshipsService";

const router = express.Router();

//end point ---> api/relationships/top-groups/
//   לפי ארועים----
router.get("/top-groups/:region_txt", async (req: Request, res: Response) => {
  try {
    const { region_txt } = req.params;
    const { top } = req.query;
    if (region_txt && top === "true") {
      const tAttacks = await getTopGroups(region_txt);
      console.log(tAttacks);
      res.json(tAttacks);
    } else if (region_txt) {
      const tAttacks = await getAllGroupsByRegion(region_txt);
      console.log(tAttacks);
      res.json(tAttacks);
    }
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

//end point ---> api/relationships/groups-by-year/
router.get("/groups-by-year/:iyear", async (req: Request, res: Response) => {
  try {
    const { iyear } = req.params;
    if (!iyear) {
      throw new Error("iyear params is missing");
    }
    const year = parseInt(iyear);
    const tAttacks = await getGroupsByYearActivity(year);
    console.log(tAttacks);
    res.json(tAttacks);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

//end point ---> api/relationships/deadliest-regions/
router.get(
  "/deadliest-regions/:name_group",
  async (req: Request, res: Response) => {
    try {
      const { name_group } = req.params;
      if (!name_group) {
        throw new Error("name_group params is missing");
      }
      const tAttacks = await getAttacksByGroups(name_group);
      console.log(tAttacks);
      res.json(tAttacks);
    } catch (error: any) {
      handleError(res, error.status || 404, error.message);
    }
  }
);
export default router;
