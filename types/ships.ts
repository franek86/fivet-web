interface ShipTypeData {
  id: string;
  name: string;
  description: string;
}

export interface ShipTypeResponse {
  data: ShipTypeData[];
}
