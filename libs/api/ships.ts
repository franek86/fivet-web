import { buildShipSearchParams } from "@/helpers/buildShipSearchParams";
import { apiClient } from "./axios";
import { Ship, ShipFiltersProps, ShipsResponse, ShipTypeResponse } from "@/types/ships";

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

/* get numeric ship fields e.g min-max price max tonnage beam */
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
export const fetchShips = async (filters?: ShipFiltersProps): Promise<ShipsResponse> => {
  try {
    const query = filters ? buildShipSearchParams(filters) : "";
    const response = await apiClient.get(`/ships/published?${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* fetch single ship */
export const fetchShip = async (slug: string): Promise<Ship> => {
  try {
    const response = await apiClient.get(`/ships/published/${slug}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
