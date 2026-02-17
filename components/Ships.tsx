"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { fetchShips } from "@/libs/api/ships";
import { parseShipFiltersFromUrl } from "@/helpers/parseShipFilters";

import ShipCard from "./ShipCard";
import ShipsCardSkeleton from "./ShipCardSkeleton";
import PaginationComponent from "./PaginationComponent";

const Ships = () => {
  const searchParams = useSearchParams();
  const filters = parseShipFiltersFromUrl(searchParams);
  const router = useRouter();

  /* Current page and limit */
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ships", filters, page, limit],
    queryFn: () => fetchShips({ ...filters, page, limit }),
  });

  /* Handle page change */
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

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
    <>
      <section className='my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8'>
        {data?.data?.map((ship) => (
          <div key={ship.id}>
            <ShipCard ship={ship} />
          </div>
        ))}
      </section>
      <PaginationComponent totalPages={data.meta.totalPages} currentPage={page} onPageChange={handlePageChange} />
    </>
  );
};

export default Ships;
