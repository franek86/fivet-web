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

  // Only include page if it is > 1
  if (filters.page != null && filters.page > 1) {
    params.set("page", String(filters.page));
  }

  // Only include limit if it’s different from default (e.g., 10)
  if (filters.limit != null && filters.limit !== 10) {
    params.set("limit", String(filters.limit));
  }

  // Only include search if it’s not empty
  if (filters.search && filters.search.trim().length > 0) {
    params.set("search", filters.search.trim());
  }

  // Add sort only if it exists
  if (filters.sortBy && filters.sortBy.trim().length > 0) {
    params.set("sortBy", filters.sortBy.trim());
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
