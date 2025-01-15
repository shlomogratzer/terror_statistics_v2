import express, { Request, Response, NextFunction, query } from "express";
import {
  getAllTerrorAttackByInterval,
  getAllTerrorAttackByIyear,
  getLastTerrorAttack,
  getTerrorAttackByCasualties,
  getTerrorAttackByCountry,
  getAvgTerrorAttackByRegion,
  getTerrorAttackByRegion,
  getTerrorAttackByCity,
} from "../service/analysisService";
import { handleError } from "../utils/ErrorHandle";

const router = express.Router();

// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const tAttacks = await getAllTerrorAttack();
//     console.log(tAttacks);

//     res.json(tAttacks);
//   } catch (error: any) {
//     handleError(res, error.status || 404, error.message);
//   }
// });

// end point --->api/analysis/deadliest-attack-types/
router.get("/deadliest-attack-types/", async (req: Request, res: Response) => {
  try {
    const tAttacks = await getTerrorAttackByCasualties();
    console.log(tAttacks);

    res.json(tAttacks);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});
//end point ---> api/analysis/highest-casualty-regions/
router.get("/highest-casualty-regions", async (req: Request, res: Response) => {
  try {
    const { country_txt, region_txt, city } = req.query;
    if (!country_txt && !region_txt && !city) {
      const tAttacks = await getAvgTerrorAttackByRegion();
      console.log(tAttacks);
      res.json(tAttacks);
    } else if (city) {
      const tAttacks = await getTerrorAttackByCity(city as string);
      console.log(tAttacks);
      res.json(tAttacks);
    } else if (country_txt) {
      const tAttacks = await getTerrorAttackByCountry(country_txt as string);
      console.log(tAttacks);
      res.json(tAttacks);
    } else if (region_txt) {
      const tAttacks = await getTerrorAttackByRegion(region_txt as string);
      console.log(tAttacks);
      res.json(tAttacks);
    }
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

//end point --->api/analysis/incident-trends/
router.get("/incident-trends", async (req: Request, res: Response) => {
  try {
    const { iyear, start, end, last, page, limit } = req.query;
    console.log("dlkfhd;glsdfjhgs;", iyear, start, end, last, page, limit);

    if (!page || !limit) {
      throw new Error("page or limit is missing");
    }
    const ipage = parseInt(page as string);
    const ilimit = parseInt(limit as string);
    if (iyear) {
      const year = parseInt(iyear as string);
      const tAttacks = await getAllTerrorAttackByIyear(year, ipage, ilimit);
      console.log(tAttacks);
      res.json(tAttacks);
    }
    if (start && end) {
      const istart = parseInt(start as string);
      const iemd = parseInt(end as string);
      const tAttacks = await getAllTerrorAttackByInterval(
        istart,
        iemd,
        ipage,
        ilimit
      );
      console.log(tAttacks);
      res.json(tAttacks);
    }
    if (last) {
      const ilast = parseInt(last as string);
      const tAttacks = await getLastTerrorAttack(ilast, ipage, ilimit);
      console.log(tAttacks);
      res.json(tAttacks);
    }
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
