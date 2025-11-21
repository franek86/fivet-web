"use client";

import { useFilterStore } from "@/store/filterStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Search = () => {
  const searchParams = useSearchParams();

  const setVessel = useFilterStore((s) => s.setVessel);
  const setBeam = useFilterStore((s) => s.setBeam);
  const setTonnage = useFilterStore((s) => s.setTonnage);

  useEffect(() => {
    const vessel = searchParams.get("vessel");
    const beam = searchParams.get("beam");
    const tonnage = searchParams.get("tonnage");

    if (vessel) setVessel({ id: vessel, label: vessel });
    if (beam) setBeam(Number(beam));
    if (tonnage) setTonnage(tonnage);
  }, []);

  const filteredShips = useFilterStore.getState();
  console.log(filteredShips);

  return (
    <div>
      <div className='pt-40 bg-gray-100 rounded'></div>
    </div>
  );
};

export default Search;
