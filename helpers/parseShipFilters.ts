import { ShipFiltersProps } from "@/types/ships";
import { parseRangeParam } from "./parseRange";

type ShipFilterDefaults = Partial<{
  beam: [number, number];
  price: [number, number];
  tonnage: [number, number];
  limit: number;
}>;

/* Deserialize query params into typed filters */
export const parseShipFiltersFromUrl = (searchParams: URLSearchParams, defaults?: ShipFilterDefaults): ShipFiltersProps => {
  const shipTypeParam = searchParams.get("shipType");
  const minTonnageParam = searchParams.get("minTonnage");
  const maxTonnageParam = searchParams.get("maxTonnage");
  const beamParam = searchParams.get("beam");
  const limitParam = searchParams.get("limit");
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");
  const sortParam = searchParams.get("sortBy");

  return {
    shipType: shipTypeParam?.split(",") ?? [],
    minTonnage: minTonnageParam && !isNaN(Number(minTonnageParam)) ? Number(minTonnageParam) : undefined,
    maxTonnage: maxTonnageParam && !isNaN(Number(maxTonnageParam)) ? Number(maxTonnageParam) : undefined,
    beam: parseRangeParam(beamParam, defaults?.beam ?? [0, 2000]),
    limit: limitParam && !isNaN(Number(limitParam)) ? Number(limitParam) : (defaults?.limit ?? 12),
    page: pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : 1,
    search: searchParam && searchParam ? searchParam : "",
    sortBy: sortParam && sortParam ? sortParam : "",
  };
};
