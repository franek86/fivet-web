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
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const ShipFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* Get all ship type from api */
  const { data } = useQuery({
    queryKey: ["allShipType"],
    queryFn: getAllShipTypes,
  });

  /* Default filters values */
  const defaultFilters: ShipFiltersProps = {
    shipType: [],
    beam: [0, 2000],
    minTonnage: undefined,
    maxTonnage: undefined,
    limit: 10,
    page: 1,
    search: "",
    sortBy: "",
  };

  /*  Local filter state */
  const [filters, setFilters] = useState<ShipFiltersProps>(() => parseShipFiltersFromUrl(searchParams, defaultFilters));
  const [searchInput, setSearchInput] = useState(filters.search);
  const [sort, setSort] = useState(filters.sortBy);

  /*  Initial valuse from URL */
  useEffect(() => {
    /*  Parse ship type to e.g. "Cargo,Cruiser" */
    const shipTypeParam = searchParams.get("shipType")?.split(",") ?? [];

    /*  Parse beam to single params e.g. "0-2000" */
    const beamParam = searchParams.get("beam") ?? "0-2000";
    const [min, max] = beamParam?.split("-").map((b) => Number(b));

    const minTonnageParam = searchParams.get("minTonnage");
    const maxTonnageParam = searchParams.get("maxTonnage");

    const searchParam = searchParams.get("search") ?? "";
    const sortParam = searchParams.get("sortBy") ?? "";
    const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");

    setFilters({
      shipType: shipTypeParam,
      beam: [isNaN(min) ? 0 : min, isNaN(max) ? 2000 : max],

      minTonnage: minTonnageParam ? Number(searchParams.get("minTonnage")) : undefined,
      maxTonnage: maxTonnageParam && !isNaN(Number(maxTonnageParam)) ? Number(searchParams.get("maxTonnage")) : undefined,

      search: searchParam,
      limit: limitParam ? Number(searchParams.get("limit")) : 10,
      page: pageParam ? Number(searchParams.get("page")) : 1,
      sortBy: sortParam,
    });
  }, [searchParams]);

  /* Update filter change */
  const handleFilterChange = <K extends keyof ShipFiltersProps>(key: K, value: ShipFiltersProps[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /* Update ship types */
  const handleToggleShipType = (type: string) => {
    setFilters((prev) => {
      const newShipType = prev.shipType.includes(type);
      return { ...prev, shipType: newShipType ? prev.shipType.filter((t) => t !== type) : [...prev.shipType, type] };
    });
  };

  /*  Handle apply filters */
  const handleApplyFilters = () => {
    const query = buildShipSearchParams({ ...filters });
    router.push(`/ships/?${query}`);
  };

  /* Handle sort */

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: value,
    }));

    const query = buildShipSearchParams({ ...filters, sortBy: value });
    router.push(`/ships/?${query}`);
  };

  /* Debounce search */
  /* const debouncedSearch = useDebounce(filters.search, 500);
   */
  /* Handle search */
  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchInput,
      page: 1,
    }));
    const query = buildShipSearchParams({ ...filters, search: searchInput, page: 1 });
    router.push(`/ships/?${query}`);
  };

  /* Sync URL when debounced value changes */
  /*  useEffect(() => {
    if (debouncedSearch.trim().length === 0) return;
    const query = buildShipSearchParams({
      ...filters,
      search: debouncedSearch,
      page: 1,
    });

    router.push(`/ships?${query}`, { scroll: false });
  }, [debouncedSearch]); */

  /* Handle clear all filters */
  const handleClearAllFilter = () => {
    setFilters(defaultFilters);
    setSearchInput("");

    router.push("/ships", { scroll: false });
  };

  return (
    <div>
      <button className='btn btn-sm btn-solid mb-6' onClick={handleClearAllFilter}>
        Clear all filters
      </button>

      <div className='mb-6'>
        <div className='flex flex-col mb-1'>
          <Label className='font-bold text-lg' htmlFor='search'>
            Search
          </Label>
          <div className='relative'>
            <Search className='absolute left-2 top-4 h-4 w-4 text-muted-foreground' />
            <Input
              id='search'
              className='pl-8'
              placeholder='Imo,Name ...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button className='btn btn-sm btn-gradient mt-2' onClick={() => handleSearch()}>
            Search now
          </button>
        </div>
      </div>

      <div className='mb-6'>
        <div className='flex flex-col space-x-2 mb-1'>
          <Label className='font-bold text-lg mb-2' htmlFor='sort'>
            Sort by
          </Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='name-asc'>Name: A → Z</SelectItem>
              <SelectItem value='name-desc'>Name: Z → A</SelectItem>
              <SelectItem value='price-asc'>Price: Low → High</SelectItem>
              <SelectItem value='price-desc'>Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
