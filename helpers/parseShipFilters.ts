import { ShipFilters } from "@/types/ships";

/* Deserialize query params into typed filters */
export const parseShipFiltersFromUrl = (searchParams: URLSearchParams): ShipFilters => {
  const filters: ShipFilters = {};

  // ship type multi select
  const shipTypeParam = searchParams.get("shipType")?.split(",") ?? [];
  if (shipTypeParam) filters.shipType;

  //beam range
  const beamParam = searchParams.get("beam");
  if (beamParam) {
    const [min, max] = beamParam.split("-").map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      filters.beam = [min, max];
    }
  }

  //Min tonnage
  const minTonnageParam = searchParams.get("minTonnage");
  if (minTonnageParam) filters.minTonnage = Number(minTonnageParam);

  //Max tonnage
  const maxTonnageParam = searchParams.get("maxTonnage");
  if (maxTonnageParam) filters.maxTonnage = Number(maxTonnageParam);

  return filters;
};
