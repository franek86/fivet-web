"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { BeamRange, TonnageInput, VesselsSelectInput } from "./filterFields";
import { buildShipQuery } from "@/helpers/buildShipQuery";

const SearchBar = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [selectedShipType, setSelectedShipType] = useState<string[]>([]);
  const [beam, setBeam] = useState<[number, number]>([0, 2000]);
  const [minTonnage, setMinTonnage] = useState<number>();
  const [maxTonnage, setMaxTonnage] = useState<number>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = buildShipQuery({
      shipType: selectedShipType,
      beam,
      minTonnage,
      maxTonnage,
    });

    router.replace(`/search?${query}`, { scroll: false });
  };

  return (
    <section className='w-full md:w-4/5'>
      <div className='shadow-lg bg-white px-5 md:px-10 py-5 rounded-xl'>
        <form onSubmit={handleSubmit} className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col'>
            <VesselsSelectInput value={selectedShipType} onChange={setSelectedShipType} />
          </div>

          <div className='flex flex-col'>
            <BeamRange value={beam} onChange={setBeam} />
          </div>
          <div className='flex flex-col'>
            <TonnageInput minValue={minTonnage} maxValue={maxTonnage} onMinChange={setMinTonnage} onMaxChange={setMaxTonnage} />
          </div>
          <div className='flex flex-col justify-end'>
            <button className='btn btn-gradient leading-1.5'>{t("search.find")}</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
