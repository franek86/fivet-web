import { create } from "zustand";

export type SelectType = {
  id: number | string;
  label: string;
};

type FilterType = {
  vessel: SelectType | null;
  tonnage: string;
  beam: number;
  setVessel: (v: SelectType | null) => void;
  setBeam: (v: number) => void;
  setTonnage: (v: string) => void;
  reset: () => void;
};

export const useFilterStore = create<FilterType>((set) => ({
  vessel: null,
  tonnage: "",
  beam: 0,

  setVessel: (vessel) => set({ vessel }),
  setBeam: (beam) => set({ beam }),
  setTonnage: (tonnage) => set({ tonnage }),
  reset: () =>
    set({
      vessel: null,
      beam: 0,
      tonnage: "",
    }),
}));
