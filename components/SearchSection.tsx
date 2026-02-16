"use client";
import { useState } from "react";

import { FunnelPlus, FunnelX } from "lucide-react";

import Ships from "./Ships";
import ShipFilters from "./ShipFilters";
import SelectedShipFilters from "./SelectedShipFilters";

const SearchSection = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <>
      <aside
        className={` ${sideBarOpen ? "flex" : "hidden"} flex-col col-span-3 shadow-xl rounded-lg p-4 border border-gray-200 transition-all duration-300`}
      >
        <ShipFilters />
      </aside>
      <section className={`${sideBarOpen ? "col-span-9" : "col-span-12"} transition-all duration-300`}>
        <div className='flex justify-between items-center'>
          <div
            className='flex items-center gap-2 bg-gradient-linear px-2 py-1 w-max rounded cursor-pointer hover:opacity-60'
            onClick={() => setSideBarOpen(!sideBarOpen)}
          >
            {sideBarOpen ? <FunnelX size={22} color='#ffffff' /> : <FunnelPlus size={22} color='#ffffff' />}

            <p className='text-base text-white font-semibold'>Filters</p>
          </div>
          <SelectedShipFilters />
        </div>
        <Ships />
      </section>
    </>
  );
};

export default SearchSection;
