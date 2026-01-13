"use client";

import AsideSearch from "@/components/AsideSearch";
import Ships from "@/components/Ships";
import { parseRangeParam } from "@/helpers/parseRange";
import { useFilterStore } from "@/store/filterStore";
import { Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <main className='h-screen grid grid-cols-12 pt-6 md:pt-16'>
      <aside className={`col-span-3 p-4 transition-all duration-300 ${sideBarOpen ? "flex" : "hidden"}`}>
        <AsideSearch />
      </aside>
      <section className={`${sideBarOpen ? "col-span-9" : "col-span-12"} transition-all duration-300 bg-gray-100 p-4`}>
        <div
          className='flex items-center gap-2 bg-gradient-linear px-2 py-1 w-max rounded cursor-pointer hover:opacity-60'
          onClick={() => setSideBarOpen(!sideBarOpen)}
        >
          <Menu size={22} color='#ffffff' />
          <p className='text-base text-white font-semibold'>Filters</p>
        </div>

        <Ships />
      </section>
    </main>
  );
};

export default Search;
