import { fetchShip } from "@/libs/api/ships";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const shipSlug = (await params).slug;

  const ship = await fetchShip(shipSlug);
  if (!ship) {
    return <p>Ship not found</p>;
  }

  const { shipName } = ship;

  return <div>{shipName}</div>;
};

export default page;
