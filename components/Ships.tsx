"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Ship } from "@/types/ships";

import { fetchShips } from "@/libs/api/ships";
import { parseShipFiltersFromUrl } from "@/helpers/parseShipFilters";

import ShipCard from "./ShipCard";
import ShipsCardSkeleton from "./ShipCardSkeleton";

const Ships = () => {
  const searchParams = useSearchParams();
  const filters = parseShipFiltersFromUrl(searchParams);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ships", filters],
    queryFn: () => fetchShips(filters),
  });

  if (isLoading) return <ShipsCardSkeleton />;
  if (isError) return <div>Error loading ships: {(error as Error).message}</div>;
  if (!data || data.data.length === 0) return <div>No ships found</div>;

  return (
    <section className='my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8'>
      {data?.data?.map((ship) => (
        <div key={ship.id}>
          <ShipCard ship={ship} />
        </div>
      ))}
    </section>
  );
};

export default Ships;
