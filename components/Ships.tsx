import { fetchShips } from "@/libs/api/ships";

import { Ship } from "@/types/ships";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Ships = () => {
  const searchParams = useSearchParams();
  const [ships, setShips] = useState<Ship[]>([]);
  const [errorShips, setErrorShips] = useState<string | null>(null);
  const [loadingShips, setLoadingShips] = useState(false);

  const [currentVessel, setCurrentVessel] = useState<string[]>(searchParams.get("shipType")?.split(",") || []);
  const [currentBeam, setCurrentBeam] = useState<[number, number]>([0, 2000]);
  const [currentMinTonnage, setCurrentMinTonnage] = useState<number>();
  const [currentMaxTonnage, setCurrentMaxTonnage] = useState<number>();

  const vessels = searchParams.get("shipType")?.split(",") || [];
  const beamStr = searchParams.get("beam");
  const minTonnage = searchParams.get("minTonnage");
  const maxTonnage = searchParams.get("maxTonnage");

  const beamParsed = beamStr ? (beamStr.split("-").map(Number) as [number, number]) : undefined;
  const maxTonnageParsed = maxTonnage ? Number(maxTonnage) : undefined;
  const minTonnageParsed = minTonnage ? Number(minTonnage) : undefined;

  const loadShips = async () => {
    setLoadingShips(true);
    setErrorShips(null);
    try {
      const { data } = await fetchShips({
        shipType: vessels,
        beam: beamParsed,
        minTonnage: minTonnageParsed,
        maxTonnage: maxTonnageParsed,
      });
      setShips(data);
    } catch (error) {
      console.log(error);
      setErrorShips("Gettin ships error");
    } finally {
      setLoadingShips(false);
    }
  };

  useEffect(() => {
    loadShips();
  }, []);

  if (loadingShips) return <p>Loading products...</p>;
  if (errorShips) return <p>Error: {errorShips}</p>;

  return (
    <div>
      {!ships || ships.length === 0 ? (
        <div>No ships found</div>
      ) : (
        ships?.map((s) => (
          <div key={s.id}>
            <p className='text-2xl'>{s.shipName}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Ships;
