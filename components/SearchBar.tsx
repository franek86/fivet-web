"use client";

import InputBox from "./ui/InputBox";
import RangeBox from "./ui/RangeBox";
import SelectBox from "./ui/SelectBox";
import { useRouter } from "next/navigation";
import { useFilterStore } from "@/store/filterStore";
import { useTranslation } from "react-i18next";

const testData = [
  { id: 1, label: "Tanker" },
  { id: 2, label: "Cargo" },
  { id: 3, label: "Bulk" },
];

const SearchBar = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const vessel = useFilterStore((s) => s.vessel);
  const beam = useFilterStore((s) => s.beam);
  const tonnage = useFilterStore((s) => s.tonnage);

  const setVessel = useFilterStore((s) => s.setVessel);
  const setBeam = useFilterStore((s) => s.setBeam);
  const setTonnage = useFilterStore((s) => s.setTonnage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("vessel", String(vessel?.label));
    params.set("beam", String(beam));
    params.set("tonnage", String(tonnage));

    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className='w-full md:w-4/5'>
      <div className='shadow-lg bg-white px-5 md:px-10 py-5 rounded-xl'>
        <form onSubmit={handleSubmit} className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <SelectBox data={testData} value={vessel} placeholder={t("search.select_vessel")} onChange={(option) => setVessel(option)} />
          </div>

          <div className='flex flex-col'>
            <RangeBox label={t("search.beam")} min={100} max={1200} value={beam} onChange={setBeam} />
          </div>
          <div className='flex flex-col'>
            <InputBox
              label={t("search.tonnage")}
              id='tonage'
              value={tonnage ?? undefined}
              onChange={(value) => setTonnage(value)}
              placeholder={t("search.enter_tonnage")}
            />
          </div>
          <div className='flex flex-col justify-end'>
            <button className='btn btn-gradient'>{t("search.find")}</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
