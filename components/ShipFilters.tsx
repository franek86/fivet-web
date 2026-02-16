import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

import { getAllShipTypes, getShipNumericFields } from "@/libs/api/ships";
import { ShipFiltersProps, ShipTypeData } from "@/types/ships";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

import { buildShipSearchParams } from "@/helpers/buildShipSearchParams";
import { parseShipFiltersFromUrl } from "@/helpers/parseShipFilters";

const ShipFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  //Local state for data
  const [shipTypesData, setShipTypesData] = useState<ShipTypeData[]>([]);
  const [numericStatsData, setNumericStatsData] = useState<{
    minTonnage: number;
    maxTonnage: number;
    minBeam: number;
    maxBeam: number;
  } | null>(null);

  // Fetch all shipTypes from api
  const fetchShipTypes = useCallback(async () => {
    const data = await getAllShipTypes();
    setShipTypesData(data);
  }, []);

  //Fetch numeric fields from api
  const fetchNumericFields = useCallback(async () => {
    const data = await getShipNumericFields();

    setNumericStatsData({
      minTonnage: data._min.tonnage,
      maxTonnage: data._max.tonnage,
      minBeam: data._min.beam,
      maxBeam: data._max.beam,
    });
  }, []);

  // Load  data
  useEffect(() => {
    fetchShipTypes();
    fetchNumericFields();
  }, [fetchShipTypes, fetchNumericFields]);

  useEffect(() => {
    if (!numericStatsData) return;

    setFilters((prev) => ({
      ...prev,
      minTonnage: prev.minTonnage ?? numericStatsData.minTonnage,
      maxTonnage: prev.maxTonnage ?? numericStatsData.maxTonnage,
      // shipType & beam remain the same
    }));
  }, [numericStatsData]);

  //Deafults value from api
  const apiDefaults: { beam: [number, number] } = {
    beam: [0, numericStatsData?.maxBeam ?? 2000],
  };

  // filters local state
  const [filters, setFilters] = useState<ShipFiltersProps>(() => parseShipFiltersFromUrl(searchParams, apiDefaults));

  //active range
  const isRangeActive = (value: [number, number], defaultValue: [number, number]) =>
    value[0] !== defaultValue[0] || value[1] !== defaultValue[1];

  // active filters
  const shipTypeActive = filters.shipType.length > 0;
  const beamActive = numericStatsData ? isRangeActive(filters.beam, [numericStatsData.minBeam, numericStatsData.maxBeam]) : false;
  const minTonnageActive = numericStatsData && filters.minTonnage !== null && filters.minTonnage !== numericStatsData.minTonnage;
  const maxTonnageActive = numericStatsData && filters.maxTonnage !== null && filters.maxTonnage !== numericStatsData.maxTonnage;

  // which filters is active and count it
  const activeFilters = shipTypeActive || beamActive || minTonnageActive || maxTonnageActive;
  const filterCount = [shipTypeActive, beamActive, minTonnageActive, maxTonnageActive].filter(Boolean).length;

  // Handle filter change
  const handleFilterChange = <K extends keyof ShipFiltersProps>(key: K, value: ShipFiltersProps[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // clear all filters
  const handleClearFilters = () => {
    setFilters({
      shipType: [],
      beam: [0, 100],
      minTonnage: undefined,
      maxTonnage: undefined,
    });
    router.push("/search", { scroll: false });
  };

  // Ship Type toggle
  const handleShipTypeToggle = (type: string) => {
    setFilters((prev) => {
      const isSelected = prev.shipType.includes(type);
      return {
        ...prev,
        shipType: isSelected ? prev.shipType.filter((t) => t !== type) : [...prev.shipType, type],
      };
    });
  };

  //Clear single filter
  const clearSingleFilter = (key: keyof ShipFiltersProps) => {
    setFilters((prev) => {
      if (!numericStatsData) return prev;
      switch (key) {
        case "shipType":
          return { ...prev, shipType: [] };

        case "beam":
          return {
            ...prev,
            beam: [numericStatsData.minBeam, numericStatsData.maxBeam],
          };

        case "minTonnage":
          return {
            ...prev,
            minTonnage: numericStatsData.minTonnage,
          };

        case "maxTonnage":
          return {
            ...prev,
            maxTonnage: numericStatsData.maxTonnage,
          };

        default:
          return prev;
      }
    });
  };

  // Handle Apply filters
  const handleApplyFilters = () => {
    const query = buildShipSearchParams(filters);

    router.push(`/search/?${query}`);
  };

  //Filter label helper
  const FilterLabel = ({
    children,
    filterKey,
    isActive,
  }: {
    children: React.ReactNode;
    filterKey: keyof ShipFiltersProps;
    isActive: Boolean;
  }) => (
    <div className='flex justify-between items-center mb-2'>
      <div className='flex items-center gap-2 '>
        <h4 className='text-[14px] font-bold'>{children}</h4>
        {isActive && <div className='text-center text-[10px] p-1 rounded-sm font-bold bg-gradient-linear text-grey-50 '>Active</div>}
      </div>

      {isActive && (
        <button className='text-muted-foreground text-base cursor-pointer' onClick={() => clearSingleFilter(filterKey)}>
          <X size={15} />
        </button>
      )}
    </div>
  );

  return (
    <>
      {activeFilters && (
        <div className='flex text-sm gap-1 font-bold mb-1 text-muted-foreground'>
          <p>{filterCount}</p>
          <p>{filterCount === 1 ? "filter" : "filters"} applied</p>
        </div>
      )}
      <button className='btn btn-sm bg-gradient-linear text-grey-50 mb-8' onClick={() => handleClearFilters()}>
        Clear all filters
      </button>

      {/* Ship Types */}
      <div className='mb-6'>
        <FilterLabel filterKey='shipType' isActive={shipTypeActive}>
          Ship Type
        </FilterLabel>
        {shipTypesData.map((shipType) => (
          <div key={shipType.id} className='flex items-center space-x-2 mb-2'>
            <Checkbox
              id={shipType.id}
              checked={filters.shipType.includes(shipType.name)}
              onCheckedChange={() => handleShipTypeToggle(shipType.name)}
            />
            <Label htmlFor={shipType.id}>{shipType.name}</Label>
          </div>
        ))}
      </div>

      {/* Beam range */}
      <div className='mb-6'>
        <div className='flex items-center justify-between gap-2'>
          <FilterLabel filterKey='beam' isActive={beamActive}>
            Beam
          </FilterLabel>
          <span className='text-muted-foreground text-sm'>{filters.beam.join(", ")}</span>
        </div>
        <Slider
          id='beam'
          value={filters.beam}
          onValueChange={(value: [number, number]) => handleFilterChange("beam", value)}
          min={0}
          max={numericStatsData?.maxBeam}
          step={1}
        />
      </div>

      {/* Tonnage min and max*/}
      <div className='flex gap-2 mb-6'>
        <div>
          <FilterLabel filterKey='minTonnage' isActive={!!minTonnageActive}>
            Min Tonnage
          </FilterLabel>
          <Input
            id='minTonnage'
            placeholder={filters.minTonnage?.toString()}
            value={filters.minTonnage ?? ""}
            onChange={(e) => handleFilterChange("minTonnage", e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>

        <div>
          <FilterLabel filterKey='maxTonnage' isActive={!!maxTonnageActive}>
            Max Tonnage
          </FilterLabel>
          <Input
            id='maxTonnage'
            placeholder={filters.maxTonnage?.toString()}
            value={filters.maxTonnage ?? ""}
            onChange={(e) => handleFilterChange("maxTonnage", e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>
      </div>

      {/* Apply search */}
      <button onClick={handleApplyFilters} className='btn btn-gradient'>
        Apply filter
      </button>
    </>
  );
};

export default ShipFilters;
