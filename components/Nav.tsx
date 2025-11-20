"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";

type NavType = {
  href: string;
  labelKey: string;
  dropdown?: {
    href: string;
    label: string;
  }[];
};

const NAV_ITEMS: NavType[] = [
  {
    href: "/about",
    labelKey: "about",
    dropdown: [
      { href: "/about/us", label: "About Us" },
      { href: "/about/us", label: "Mission" },
      { href: "/about/us", label: "Organization" },
    ],
  },
  { href: "/contact", labelKey: "contact" },
];

const Nav = ({ open }: { open: boolean }) => {
  const pathName = usePathname();

  const [menuDropdown, setMenuDropdown] = useState<Record<string, boolean>>({});

  const toggleMenuDropdown = (key: string) => {
    setMenuDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <nav
      className={`${
        open ? "flex" : "hidden"
      } md:flex flex-col justify-center md:flex-row gap-x-8 gap-y-3 md:gap-y-0 items-center fixed md:relative top-0 left-0 h-full md:h-auto w-full bg-gray-50 backdrop-blur-sm md:bg-transparent`}
    >
      {NAV_ITEMS.map((i) => {
        const isActive = pathName === i.href;
        return (
          <div key={i.labelKey} className='relative'>
            <Link
              className={`relative font-semibold text-xl md:text-[16px] capitalize block after:absolute after:-bottom-1 after:left-0 after:content-[''] after:h-1 after:w-0 after:bg-secondary after:transition-all after:duration-300 ${
                isActive ? "after:w-full" : "hover:after:w-full"
              }`}
              href={i.href}
              onClick={() => toggleMenuDropdown(i.labelKey)}
            >
              {i.labelKey}
            </Link>
            {i.dropdown && (
              <div
                className={`bg-gray-50 shadow-lg py-2 rounded-md absolute top-8 left-0 min-w-[100px] transition-all duration-200 ease-out
                  ${
                    menuDropdown[i.labelKey]
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }
                `}
              >
                {i.dropdown?.map((d) => (
                  <div key={d.label}>
                    <Link
                      className='block text-xs font-semibold px-4 py-2 transition-all cursor-pointer hover:text-secondary'
                      href={d.href}
                    >
                      {d.label}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Nav;
