"use client";

import { useState } from "react";

import Nav from "./Nav";
import LangSwitcher from "./LangSwitcher";
import Logo from "./Logo";

import Bar from "@/assets/icons/bar.svg";
import Close from "@/assets/icons/close.svg";

const Header = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const handleOpenMenu = () => {
    setOpenMobile((prev) => !prev);
  };

  return (
    <header className='shadow-sm fixed w-full bg-white z-10'>
      <div className='max-container flex items-center justify-between gap-4 p-3 h-[70px]'>
        <div className='flex'>
          <Logo />
        </div>

        <Nav open={openMobile} />
        <div className='flex items-center gap-x-3 z-10'>
          <LangSwitcher />
          {openMobile ? (
            <Close className='h-7 w-7 block md:hidden cursor-pointer' onClick={() => handleOpenMenu()} />
          ) : (
            <Bar className='h-7 w-7 block md:hidden cursor-pointer' onClick={() => handleOpenMenu()} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
