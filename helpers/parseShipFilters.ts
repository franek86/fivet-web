import { ShipFiltersProps } from "@/types/ships";
import { parseRangeParam } from "./parseRange";

type ShipFilterDefaults = Partial<{
  beam: [number, number];
  price: [number, number];
  tonnage: [number, number];
}>;

/* Deserialize query params into typed filters */
export const parseShipFiltersFromUrl = (searchParams: URLSearchParams, defaults?: ShipFilterDefaults): ShipFiltersProps => {
  return {
    shipType: searchParams.get("shipType")?.split(",") ?? [],
    minTonnage: searchParams.get("minTonnage") ? Number(searchParams.get("minTonnage")) : undefined,
    maxTonnage: searchParams.get("maxTonnage") ? Number(searchParams.get("maxTonnage")) : undefined,
    beam: parseRangeParam(searchParams.get("beam"), defaults?.beam ?? [0, 2000]),
  };
};
