"use client";
import Image from "next/image";
import { Price } from "../Price";

type ShipData = {
  mainImage: string | null;
  shipName: string;
  imo: number;
  price: number;
};

type ShipDataProps = {
  ship: ShipData;
};

const ShipCard = ({ ship }: ShipDataProps) => {
  const { mainImage, shipName, imo, price } = ship;
  return (
    <article className='max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white'>
      {mainImage ? (
        <figure className='relative'>
          <Image src={mainImage} width={500} height={500} alt={shipName} className='w-full h-56 object-cover' />
          <figcaption className='sr-only'>Product preview image</figcaption>
        </figure>
      ) : (
        <img src='https://placehold.co/600x400' alt={shipName} className='w-full h-56 object-cover' />
      )}

      <header className='p-4'>
        <h2 className='text-lg font-semibold text-gray-900'>{shipName}</h2>
        <p className='mt-1 text-sm text-gray-600'>IMO: {imo}</p>
      </header>

      <section className='px-4'>
        <p className='text-xl font-bold text-gray-900'>
          <Price amount={price} currency='USD' />
        </p>
      </section>

      <footer className='p-4 flex items-center justify-between'>
        <button className='btn btn-sm btn-gradient cursor-pointer'>
          <p className='text-white text-md'>View details</p>
        </button>
      </footer>
    </article>
  );
};

export default ShipCard;
