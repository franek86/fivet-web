import Link from "next/link";
import LogoIcon from "@/assets/logo.svg";

const Logo = () => {
  return (
    <div className='z-10 w-max leading-0.5'>
      <Link className='flex gap-x-1' href='/'>
        <LogoIcon className='w-7 md:w-9 h-7 md:h-9' />
        <div className='text-xl md:text-2xl font-bold relative bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text text-nowrap'>
          Fivet
        </div>
      </Link>
    </div>
  );
};

export default Logo;
