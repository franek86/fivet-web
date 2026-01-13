import { SelectType } from "@/types/global";
import { useEffect } from "react";

type Params = {
  searchParams: URLSearchParams;
  shipType: SelectType[];

  setShipType: (v: SelectType[]) => void;
  /*  setBeam: (v: [number, number]) => void;
  setMinTonnage: (v: number | undefined) => void;
  setMaxTonnage: (v: number | undefined) => void; */
};

export const useUrlToUiFilters = ({ searchParams, shipType, setShipType }: Params) => {
  useEffect(() => {
    if (!shipType.length) return;
    const shipTypeName = searchParams.get("shipType")?.split(",") ?? [];
    setShipType(shipType.filter((t) => shipTypeName.includes(t.label)));
  }, [searchParams]);
};
