import { getAllShipTypes } from "@/libs/api/ships";
import { SelectType } from "@/types/global";
import { ShipFilters } from "@/types/ships";
import { create } from "zustand";

interface FilterShipStore extends ShipFilters {
  getVessels: SelectType[] | null;
  selectedVesel: SelectType | null;

  setSelectedVesel: (vesel: SelectType | null) => void;

  setVessels: (vessels: string[]) => void;
  setBeam: (beam: [number, number]) => void;
  setMinTonnage: (value?: number) => void;
  setMaxTonnage: (value?: number) => void;
  reset: () => void;

  loading: boolean;
  error: string | null;

  fetchShipTypes: () => Promise<void>;
}

export const useFilterStore = create<FilterShipStore>((set) => ({
  getVessels: [],
  shipType: [],
  beam: [0, 2000],
  minTonnage: undefined,
  maxTonnage: undefined,

  selectedVesel: null,
  setSelectedVesel: (vesel) => {
    set({ selectedVesel: vesel });
  },

  setVessels: (shipType) => set({ shipType }),
  setBeam: (beam) => set({ beam }),
  setMinTonnage: (minTonnage) => set({ minTonnage }),
  setMaxTonnage: (maxTonnage) => set({ maxTonnage }),
  reset: () => {
    set({
      shipType: [],
      beam: [0, 2000],
      minTonnage: undefined,
      maxTonnage: undefined,
    });
  },

  loading: false,
  error: null,

  fetchShipTypes: async () => {
    try {
      set({ loading: true, error: null });

      const data = await getAllShipTypes();
      const response = data.map((v) => ({ id: v.id, label: v.name }));
      set({ getVessels: response });
    } catch (err) {
      set({ error: "Failed to load ship types" });
    } finally {
      set({ loading: false });
    }
  },
}));
