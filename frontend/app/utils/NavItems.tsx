import Link from "next/link";
import React from "react";

type Props = {
  activeItem: number;
  isMobile: boolean;
  setActiveItem: (index: number) => void;
};

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];
const NavItems = ({ activeItem, isMobile, setActiveItem }: Props) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData.map((nav, index) => (
          <Link href={`${nav.url}`} key={index}>
            <span
              onClick={() => setActiveItem(index)}
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson] "
                  : "dark:text-white text-black"
              } text-[18px] px-6 font-Poppins font-[400]`}
            >
              {nav.name}
            </span>
          </Link>
        ))}
      </div>

      {isMobile && (
        <div className=" mt-5 800px:hidden">
          <div className="w-full text-center py-6">
            <Link
              href={"/"}
              passHref
              className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
            >
              Learnify
            </Link>
          </div>
          {navItemsData.map((nav, index) => (
            <Link href={`${nav.url}`} key={index}>
              <span
                onClick={() => setActiveItem(index)}
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson] "
                    : "dark:text-white text-black"
                } text-[18px] py-5 px-6 block font-Poppins font-[400]`}
              >
                {nav.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
