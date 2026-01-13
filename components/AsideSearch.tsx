import { useEffect, useState } from "react";

import { BeamRange, TonnageInput, VesselsSelectInput } from "./filterFields";

import { useSearchParams, useRouter } from "next/navigation";
import { parseShipFiltersFromUrl } from "@/helpers/parseShipFilters";
import { buildShipQuery } from "@/helpers/buildShipQuery";

const AsideSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = parseShipFiltersFromUrl(searchParams);

  const [selectedShipType, setSelectedShipType] = useState<string[]>(() => searchParams.get("shipType")?.split(",") ?? []);
  const [beam, setBeam] = useState<[number, number]>(filters.beam ?? [0, 2000]);
  const [minTonnage, setMinTonnage] = useState<number | undefined>(0);
  const [maxTonnage, setMaxTonnage] = useState<number | undefined>(1000);

  /*   useEffect(() => {
    setSelectedShipType(filters.shipType ?? []);
    setBeam(filters.beam ?? [0, 100]);
    setMinTonnage(filters.minTonnage ?? 0);
    setMaxTonnage(filters.maxTonnage ?? 1000);
  }, [searchParams.toString()]); */

  useEffect(() => {
    const query = buildShipQuery({
      shipType: selectedShipType,
      beam,
      minTonnage,
      maxTonnage,
    });

    router.replace(`/search?${query}`);
  }, [selectedShipType, beam, minTonnage, maxTonnage, router]);

  return (
    <form className='w-full p-8'>
      <div className='mb-6'>
        <VesselsSelectInput value={selectedShipType} onChange={setSelectedShipType} />
      </div>
      <div className='mb-6'>
        <BeamRange value={beam} onChange={setBeam} />
      </div>
      <div className='mb-6'>
        <TonnageInput minValue={minTonnage} maxValue={maxTonnage} onMinChange={setMinTonnage} onMaxChange={setMaxTonnage} />
      </div>
    </form>
  );
};

export default AsideSearch;
