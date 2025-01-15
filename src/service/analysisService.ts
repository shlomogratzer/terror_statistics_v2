import { handleBadRequest } from "../utils/ErrorHandle";
import Attack from "../models/terrorAtack";

export const getAllTerrorAttack = async () => {
  try {
    const tAttak = await Attack.find().skip(181600);
    return tAttak;
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};
export const getTerrorAttackByCasualties = async () => {
  try {
    const tAttak = await Attack.aggregate([
      {
        $group: {
          _id: "$attacktype1_txt",
          sumCasualties: {
            $sum: { $sum: ["$nwound", "$nkill"] },
          },
        },
      },
      { $sort: { allhert: -1 } },
    ]);
    const amounts = tAttak.length;
    return { tAttak, amounts };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};

export const getAvgTerrorAttackByRegion = async () => {
  try {
    const tAttak = await Attack.aggregate([
      {
        $group: {
          _id: "$region_txt",
          AverageCasualties: { $avg: { $avg: ["$nwound", "$nkill"] } },
        },
      },
      { $sort: { AverageCasualties: -1 } },
    ]);
    const amountsAttack = tAttak.length;
    return { tAttak, amountsAttack };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};

export const getTerrorAttackByRegion = async (region_txt: string) => {
  try {
    const avgCasualties = await Attack.aggregate([
      {
        $match: { region_txt },
      },
      {
        $group: {
          _id: region_txt,
          AverageCasualties: { $avg: { $sum: ["$nwound", "$nkill"] } },
          SumCasualties: { $sum: { $sum: ["$nwound", "$nkill"] } },
          count: { $sum: 1 },
        },
      },
    ]);
    const tAttak = await Attack.find({ region_txt }).select(
      "-_id country_txt city latitude longitude nkill nwound"
    );
    const amountsAttack = tAttak.length;
    return { tAttak, avgCasualties, amountsAttack };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};

export const getTerrorAttackByCountry = async (country_txt: string) => {
  try {
    const avgCasualties = await Attack.aggregate([
      {
        $match: { country_txt },
      },
      {
        $group: {
          _id: country_txt,
          AverageCasualties: { $avg: { $sum: ["$nwound", "$nkill"] } },
          SumCasualties: { $sum: { $sum: ["$nwound", "$nkill"] } },
          count: { $sum: 1 },
        },
      },
    ]);
    const tAttak = await Attack.find({ country_txt }).select(
      "-_id city latitude longitude nkill nwound"
    );
    const amountsAttack = tAttak.length;
    return { tAttak, avgCasualties, amountsAttack };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};
export const getTerrorAttackByCity = async (city: string) => {
  try {
    const avgCasualties = await Attack.aggregate([
      {
        $match: { city },
      },
      {
        $group: {
          _id: city,
          AverageCasualties: { $avg: { $sum: ["$nwound", "$nkill"] } },
          SumCasualties: { $sum: { $sum: ["$nwound", "$nkill"] } },
          count: { $sum: 1 },
        },
      },
    ]);
    const tAttak = await Attack.find({ city }).select(
      "-_id country_txt latitude longitude nkill nwound"
    );
    const amountsAttack = tAttak.length;
    return { tAttak, avgCasualties, amountsAttack };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};

// async getHighestCasualtyRegions(region?: string): Promise<RegionCasualties[]> {
//   const matchStage: any = {};
//   if (region) {
//     matchStage.region_txt = region;
//   }

//   try {
//     const analysis = await Attack.aggregate([
//       {
//         $match: matchStage
//       },
//       {
//         $group: {
//           _id: {
//             region: "$region_txt",
//             city: "$city",
//             lat: "$latitude",
//             lng: "$longitude"
//           },
//           casualties: {
//             $sum: { $add: ["$nkill", "$nwound"] }
//           },
//           incidents: { $sum: 1 }
//         }
//       },
//       {
//         $group: {
//           _id: "$_id.region",
//           totalCasualties: { $sum: "$casualties" },
//           totalIncidents: { $sum: "$incidents" },
//           coordinates: {
//             $push: {
//               lat: "$_id.lat",
//               lng: "$_id.lng"
//             }
//           }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           region: "$_id",
//           averageCasualties: {
//             $divide: ["$totalCasualties", "$totalIncidents"]
//           },
//           totalIncidents: 1,
//           coordinates: 1
//         }
//       },
//       {
//         $sort: {
//           averageCasualties: -1
//         }
//       }
//     ], {
//       allowDiskUse: true,
//       hint: { region_txt: 1 }
//     });

//     return analysis;
//   } catch (error) {
//     console.error('Error in getHighestCasualtyRegions:', error);
//     throw new Error('Failed to analyze casualty regions');
//   }
// }

export const getAllTerrorAttackByIyear = async (
  iyear: number,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  try {
    const tAttak = await Attack.find({ iyear })
      .select("-_id nkill nwound city gname iyear latitude longitude")
      .skip(skip)
      .limit(limit);
    const amountsAttack = tAttak.length;
    return { tAttak, amountsAttack };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};
export const getAllTerrorAttackByInterval = async (
  start: number,
  end: number,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;
  try {
    const tAttak = await Attack.find({
      iyear: { $gte: start, $lte: end },
    })
      .select("-_id nkill nwound city gname iyear latitude longitude")
      .skip(skip)
      .limit(limit);

    const amountsAttack = tAttak.length;
    return { tAttak, amountsAttack };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};
export const getLastTerrorAttack = async (
  last: number,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;
  try {
    const tAttak = await Attack.find({
      iyear: { $gte: 2017 - (last - 1), $lte: 2017 },
    })
      .select("-_id nkill nwound city gname iyear latitude longitude")
      .skip(skip)
      .limit(limit);
    const amountsAttack = tAttak.length;
    return { tAttak, amountsAttack };
  } catch (err: any) {
    err.status = 404;
    return handleBadRequest("get all error", err);
  }
};
