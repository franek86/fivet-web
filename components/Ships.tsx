"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { fetchShips } from "@/libs/api/ships";
import { parseShipFiltersFromUrl } from "@/helpers/parseShipFilters";

import ShipCard from "./ShipCard";
import ShipsCardSkeleton from "./ShipCardSkeleton";

const Ships = () => {
  const searchParams = useSearchParams();
  const filters = parseShipFiltersFromUrl(searchParams);
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ships", filters],
    queryFn: () => fetchShips(filters),
  });

  if (isLoading) return <ShipsCardSkeleton />;
  if (isError) return <div>Error loading ships: {(error as Error).message}</div>;
  if (!data || data.data.length === 0)
    return (
      <div className='text-center py-12'>
        <h3 className='text-lg font-semibold'>No ships found</h3>

        <p className='text-muted-foreground'>Try adjusting or clearing your filters</p>

        <button onClick={() => router.push("/search")} className='btn btn-sm btn-gradient'>
          Clear filters
        </button>
      </div>
    );

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
