import Link from "next/link";

import { ShipWheelIcon } from "lucide-react";

const Logo = () => {
  return (
    <div className='z-10 w-max leading-0.5'>
      <Link className='flex space-x-2' href='/'>
        <div className='bg-gradient-linear flex items-center rounded-[50%] p-2.5'>
          <ShipWheelIcon size={24} color='#ffffff' />
        </div>
        <div className='text-xl md:text-3xl font-semibold flex items-center relative bg-linear-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-nowrap'>
          Fivet
        </div>
      </Link>
    </div>
  );
};

export default Logo;
