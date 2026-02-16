"use client";
import Link from "next/link";
import Image from "next/image";

import { Price } from "./Price";

import { Ship } from "@/types/ships";

type ShipDataProps = {
  ship: Ship;
};

const ShipCard = ({ ship }: ShipDataProps) => {
  const { mainImage, shipName, imo, price, shipType, slug } = ship;
  return (
    <article className='max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white'>
      {mainImage ? (
        <figure className='relative'>
          <Image src={mainImage} width={500} height={500} alt={shipName} className='aspect-3/2 w-full object-cover' />
          <figcaption className='sr-only'>Product preview image</figcaption>
        </figure>
      ) : (
        <img src='https://placehold.co/600x400' alt={shipName} className='aspect-4/5 w-full object-cover' />
      )}

      <header className='p-4'>
        <h1 className='text-lg font-semibold text-gray-900'>{shipName} </h1>
        <div className='flex items-center justify-between mb-1'>
          <h2 className='text-sm font-semibold text-primary'>{shipType?.name}</h2>
          <p className='mt-1 text-sm text-gray-600'>IMO: {imo}</p>
        </div>
      </header>

      <section className='px-4'>
        <p className='text-xl font-bold text-gray-900'>
          <Price amount={price} currency='USD' />
        </p>
      </section>

      <footer className='p-4 flex items-center justify-between'>
        <Link href={`/ship/${encodeURIComponent(slug)}`} className='w-full'>
          <button className='btn btn-sm btn-gradient cursor-pointer w-full'>
            <p className='text-white text-md'>View details</p>
          </button>
        </Link>
      </footer>
    </article>
  );
};

export default ShipCard;
