import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className='z-10'>
      <Link className='font-bold text-2xl text-primary' href='/'>
        Fivet
      </Link>
    </div>
  );
};

export default Logo;
