"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { VesselsSelectInput } from "./filterFields";
import { Input } from "./ui/input";

import { buildShipSearchParams } from "@/helpers/buildShipSearchParams";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const SearchBar = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [selectedShipType, setSelectedShipType] = useState<string[]>([]);
  const [beam, setBeam] = useState<[number, number]>([0, 2000]);
  const [minTonnage, setMinTonnage] = useState<number | undefined>();
  const [maxTonnage, setMaxTonnage] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = buildShipSearchParams({
      shipType: selectedShipType,
      beam,
      minTonnage: minTonnage ?? null,
      maxTonnage: maxTonnage ?? null,
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
            <Label className='labelInput mb-4 font-bold' htmlFor='Beam'>
              Beam
            </Label>
            <div className="flex flex-col justify-center 'h-[46px]">
              <Slider id='beam' value={beam} onValueChange={(value: [number, number]) => setBeam(value)} min={0} max={2000} step={100} />
              <div className='flex items-center justify-between gap-2 mt-1'>
                <span className='text-muted-foreground text-sm'>{beam[0]}</span>
                <span className='text-muted-foreground text-sm'>{beam[1]}</span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label className='labelInput mb-3 font-bold' htmlFor='minTonnage'>
                Min tonnage
              </Label>
              <Input className='h-[46px]' id='minTonnage' placeholder='Min...' onChange={(e) => setMinTonnage(Number(e.target.value))} />
            </div>
            <div>
              <Label className='labelInput mb-3 font-bold' htmlFor='maxTonnage'>
                Max tonnage
              </Label>
              <Input className='h-[46px]' id='maxTonnage' placeholder='Max...' onChange={(e) => setMaxTonnage(Number(e.target.value))} />
            </div>
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
