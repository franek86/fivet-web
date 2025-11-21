import { api } from "./axios";
import { ShipTypeResponse } from "@/types/ships";
import request from "./client";

export const getAllShipTypes = async (): Promise<ShipTypeResponse> => {
  try {
    const res = await api.get<ShipTypeResponse>("/shipType");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const testAllShipsTypes = (): Promise<ShipTypeResponse> => {
  return request("/shipType");
};
