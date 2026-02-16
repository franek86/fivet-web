import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ShipFiltersProps } from "@/types/ships";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";

import { getAllShipTypes } from "@/libs/api/ships";
import { buildShipSearchParams } from "@/helpers/buildShipSearchParams";
import { parseShipFiltersFromUrl } from "@/helpers/parseShipFilters";

const ShipFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get all ship type from api
  const { data } = useQuery({
    queryKey: ["allShipType"],
    queryFn: getAllShipTypes,
  });

  //Default filters values
  const defaultFilters: ShipFiltersProps = {
    shipType: [],
    beam: [0, 2000],
    minTonnage: undefined,
    maxTonnage: undefined,
  };

  // Local filter state
  const [filters, setFilters] = useState<ShipFiltersProps>(() => parseShipFiltersFromUrl(searchParams, defaultFilters));

  // Initial valuse from URL
  useEffect(() => {
    //Parse ship type to e.g. "Cargo,Cruiser"
    const shipTypeParam = searchParams.get("shipType")?.split(",") ?? [];

    //Parse beam to single params e.g. "0-2000"
    const beamParam = searchParams.get("beam") ?? "0-2000";
    const [min, max] = beamParam?.split("-").map((b) => Number(b));

    const minTonnageParam = searchParams.get("minTonnage");
    const maxTonnageParam = searchParams.get("maxTonnage");

    console.log(minTonnageParam, maxTonnageParam);

    setFilters({
      shipType: shipTypeParam,
      beam: [isNaN(min) ? 0 : min, isNaN(max) ? 2000 : max],
      minTonnage: minTonnageParam ? Number(searchParams.get("minTonnage")) : undefined,
      maxTonnage: maxTonnageParam && !isNaN(Number(maxTonnageParam)) ? Number(searchParams.get("maxTonnage")) : undefined,
    });
  }, [searchParams]);

  //Active filters
  const hasActiveFilters =
    filters.shipType.length > 0 ||
    filters.minTonnage != null ||
    filters.maxTonnage != null ||
    filters.beam[0] !== 0 ||
    filters.beam[1] !== 2000;

  //Active filter count
  const paramsArray = Array.from(searchParams.keys());
  const count = paramsArray.length;

  //Update filter change
  const handleFilterChange = <K extends keyof ShipFiltersProps>(key: K, value: ShipFiltersProps[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  //Update ship types
  const handleToggleShipType = (type: string) => {
    setFilters((prev) => {
      const newShipType = prev.shipType.includes(type);
      return { ...prev, shipType: newShipType ? prev.shipType.filter((t) => t !== type) : [...prev.shipType, type] };
    });
  };

  //Handle apply filters
  const handleApplyFilters = () => {
    const query = buildShipSearchParams(filters);
    router.push(`/search/?${query}`);
  };

  //Handle clear all filters
  const handleClearAllFilter = () => {
    setFilters(defaultFilters);

    router.push("/search", { scroll: false });
  };

  return (
    <div>
      <div>
        <button className='btn btn-sm btn-solid mb-6' onClick={handleClearAllFilter}>
          Clear all filters
        </button>
      </div>
      <div className='mb-6'>
        <h4 className='font-bold text-lg mb-2'>Ship type</h4>
        {data?.map((shipType) => (
          <div key={shipType.id} className='flex items-center space-x-2 mb-1'>
            <Checkbox
              id={shipType.id}
              checked={filters.shipType.includes(shipType.name)}
              onCheckedChange={() => handleToggleShipType(shipType.name)}
            />
            <Label htmlFor={shipType.id}>{shipType.name}</Label>
          </div>
        ))}
      </div>
      <div className='mb-6'>
        <div className='flex flex-col space-x-2 mb-1'>
          <Label className='font-bold text-lg mb-2' htmlFor='beam'>
            Beam
          </Label>
          <Slider
            id='beam'
            min={0}
            max={200}
            value={filters.beam}
            onValueChange={(value: [number, number]) => handleFilterChange("beam", value)}
            step={1}
          />
          <div className='flex justify-between items-center mt-2'>
            <span className='text-sm'>{filters.beam[0]}</span>
            <span className='text-sm'>{filters.beam[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className='font-bold text-lg mb-2'>Tonnage</h4>
        <div className='flex gap-3 mb-6'>
          <div>
            <Label htmlFor='minTonnage'>Min tonnage</Label>
            <Input
              id='minTonnage'
              placeholder='Min...'
              value={filters.minTonnage ?? ""}
              onChange={(e) => handleFilterChange("minTonnage", Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor='maxTonnage'>Max tonnage</Label>
            <Input
              id='maxTonnage'
              placeholder='Max...'
              value={filters.maxTonnage ?? ""}
              onChange={(e) => handleFilterChange("maxTonnage", Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className='flex w-full mb-5'>
        <button onClick={handleApplyFilters} className='btn btn-lg w-full btn-gradient'>
          Apply filters
        </button>
      </div>
    </div>
  );
};

export default ShipFilters;
