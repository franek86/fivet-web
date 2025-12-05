import { create } from "zustand";

export type SelectType = {
  id: number | string;
  label: string;
};

type FilterType = {
  vessel: SelectType | null;
  tonnage: string;
  beam: [number, number];
  setVessel: (v: SelectType | null) => void;
  setBeam: (v: [number, number]) => void;
  setTonnage: (v: string) => void;
  reset: () => void;
};

export const useFilterStore = create<FilterType>((set) => ({
  vessel: { id: "Tanker", label: "Tanker" },
  tonnage: "1000",
  beam: [0, 1500],

  setVessel: (vessel) => set({ vessel }),
  setBeam: (beam) => set({ beam }),
  setTonnage: (tonnage) => set({ tonnage }),
  reset: () =>
    set({
      vessel: null,
      beam: [0, 1500],
      tonnage: "",
    }),
}));
