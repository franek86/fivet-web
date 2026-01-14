export interface ShipTypeData {
  id: string;
  name: string;
  description: string;
}

export type ShipTypeResponse = ShipTypeData[];

export interface NumericFieldsResponse {
  _min: Record<string, number>;
  _max: Record<string, number>;
}

export interface ShipFilters {
  shipType?: string[];
  minTonnage?: number;
  maxTonnage?: number;
  beam?: [number, number];
}

export interface Ship {
  id: string;
  shipName: string;
  imo: number;
  typeId: string;
  shipType:{
      name:string
      },
  refitYear: number;
  buildYear: number;
  price: number;
  location: string;
  latitude: number;
  longitude: number;
  mainEngine: string;
  lengthOverall: number;
  beam: number;
  length: number;
  depth: number;
  draft: number;
  tonnage: number;
  cargoCapacity: string;
  buildCountry: string;
  remarks: string;
  description: string;
  mainImage: string | null;
  images: string[];
}

export interface ShipsResponse {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: Ship[];
}
