import { ShipFilters } from "@/types/ships";
/* Serialize filters into query string */
export const buildShipQuery = (filters?: ShipFilters): string => {
  if (!filters) return "";

  const params = new URLSearchParams();

  if (filters.shipType?.length) {
    params.set("shipType", filters.shipType.join(","));
  }

  if (filters.minTonnage !== undefined) {
    params.set("minTonnage", String(filters.minTonnage));
  }

  if (filters.maxTonnage !== undefined) {
    params.set("maxTonnage", String(filters.maxTonnage));
  }

  if (filters.beam) {
    params.set("beam", `${filters.beam[0]}-${filters.beam[1]}`);
  }

  return params.toString();
};
