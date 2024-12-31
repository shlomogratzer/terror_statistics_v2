import { handleBadRequest } from "../utils/ErrorHandle";
import Attack from "../models/terrorAtack";

export const getTopGroups = async (region_txt: string) => {
  try {
    const tAttack = await Attack.aggregate([
      {
        $match: {
          region_txt,
        },
      },
      {
        $group: {
          _id: "$gname",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return tAttack;
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};
export const getAllGroupsByRegion = async (region_txt: string) => {
  try {
    const tAttack = await Attack.aggregate([
      {
        $match: {
          region_txt,
        },
      },
      {
        $group: {
          _id: "$gname",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const amountGrops = tAttack.length;
    return { tAttack, amountGrops };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};

export const getGroupsByYearActivity = async (iyear: number) => {
  try {
    const [tAttack, amountGrop] = await Promise.all([
      Attack.aggregate([
        {
          $match: {
            iyear,
          },
        },
        {
          $group: {
            _id: "$gname",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        { $limit: 5 },
      ]),
      Attack.aggregate([
        {
          $match: {
            iyear,
          },
        },
        {
          $group: {
            _id: "$gname",
            count: { $sum: 1 },
          },
        },
        { $count: "totaltGroups" },
      ]),
    ]);
    const amountGrops = tAttack.length;
    return { tAttack, amountGrops, amountGrop };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};

export const getAttacksByGroups = async (gname: string) => {
  try {
    const [tAttack, allRegionActivity] = await Promise.all([
      Attack.aggregate([
        {
          $match: {
            gname,
          },
        },
        {
          $group: {
            _id: "$region_txt",
            SumCasualties: { $sum: { $sum: ["$nwound", "$nkill"] } },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),
      Attack.aggregate([
        {
          $match: {
            gname,
          },
        },
        {
          $group: {
            _id: "$region_txt",
            count: { $sum: 1 },
          },
        },
        {
          $count: "totaltGroups",
        },
      ]),
    ]);
    const amountGrops = tAttack.length;
    return { tAttack, allRegionActivity, amountGrops };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};
