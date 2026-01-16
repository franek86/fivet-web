import { parseShipFiltersFromUrl } from "@/helpers/parseShipFilters";
import { fetchShips } from "@/libs/api/ships";

import { Ship } from "@/types/ships";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ShipCard from "./ui/ShipCard";

const Ships = () => {
  const searchParams = useSearchParams();
  const [ships, setShips] = useState<Ship[]>([]);
  const [errorShips, setErrorShips] = useState<string | null>(null);
  const [loadingShips, setLoadingShips] = useState(false);

  const loadShips = async (params: any) => {
    setLoadingShips(true);
    setErrorShips(null);
    try {
      const { data } = await fetchShips({
        ...params,
        //TO DO: pagination
      });
      setShips(data);
    } catch (error) {
      console.log(error);
      setErrorShips("Error");
    } finally {
      setLoadingShips(false);
    }
  };

  useEffect(() => {
    const filters = parseShipFiltersFromUrl(searchParams);

    loadShips(filters);
  }, [searchParams]);

  if (loadingShips) return <p>Loading products...</p>;
  if (errorShips) return <p>Error: {errorShips}</p>;

  return (
    <section className='my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
      {!ships || ships.length === 0 ? (
        <div>No ships found</div>
      ) : (
        ships?.map((ship) => (
          <div key={ship.id}>
            <ShipCard ship={ship} />
          </div>
        ))
      )}
    </section>
  );
};

export default Ships;
