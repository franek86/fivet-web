import { buildShipQuery } from "@/helpers/buildShipQuery";
import { apiClient } from "./axios";
import { NumericFieldsResponse, ShipFilters, ShipsResponse, ShipTypeResponse } from "@/types/ships";

/* get all ship types */
export const getAllShipTypes = async (): Promise<ShipTypeResponse> => {
  try {
    const res = await apiClient.get("/shipType/all");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* get numeric ship fields e.g min-max price max tonnage */
export const getShipNumericFields = async () => {
  try {
    const res = await apiClient.get("/ships/numeric-fields");
    return res.data.numericStats;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* get all published ships with query filters and pagination */
export const fetchShips = async (filters?: ShipFilters): Promise<ShipsResponse> => {
  try {
    const query = buildShipQuery(filters);
    const response = await apiClient.get(`/ships/published?${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
