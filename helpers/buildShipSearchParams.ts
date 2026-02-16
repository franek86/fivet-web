import { ShipFiltersProps } from "@/types/ships";
/* Serialize filters into query string */
export const buildShipSearchParams = (filters: ShipFiltersProps): string => {
  const params = new URLSearchParams();

  if (filters.shipType.length > 0) {
    params.set("shipType", filters.shipType.join(","));
  }

  if (filters.minTonnage != null) {
    params.set("minTonnage", String(filters.minTonnage));
  }

  if (filters.maxTonnage != null) {
    params.set("maxTonnage", String(filters.maxTonnage));
  }

  // Beam (only if not default)
  const isDefaultBeam = filters.beam[0] === 0 && filters.beam[1] === 2000;

  if (!isDefaultBeam) {
    params.set("beam", `${filters.beam[0]}-${filters.beam[1]}`);
  }

  /* if (filters.beam) {
    params.set("beam", `${filters.beam[0]}-${filters.beam[1]}`);
  } */

  return params.toString();
};
