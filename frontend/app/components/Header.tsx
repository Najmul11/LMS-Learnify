import Link from "next/link";
import React, { EventHandler, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useAppSelector } from "../redux/hook";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "../redux/api/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};
const Header = ({ activeItem, open, setOpen, route, setRoute }: Props) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const [socialAuth, { error, isSuccess }] = useSocialAuthMutation();
  const { data } = useSession();

  const [social, setSocialAuth] = useState(
    localStorage.getItem("hasSocial") || false
  );

  useEffect(() => {
    if ((social === false || social === "false") && !user && data) {
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data.user?.image,
      });
      localStorage.setItem("hasSocial", "true");
    }
  }, [data, user, socialAuth, social]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
    }
  }, [isSuccess]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") setOpenSidebar(false);
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full  h-[80px] z-[80] border-b dark:border-[#ffffff1c]"
            : " w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        } `}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                passHref
                className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
              >
                Learnify
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              {user ? (
                <div className="hidden 800px:block">
                  <Link href={"profile"}>
                    <Image
                      src={avatar}
                      alt=""
                      className="w-[32px] h-[32px] rounded-full"
                    />
                  </Link>
                </div>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black "
                  onClick={() => setOpen(true)}
                />
              )}
              {/* for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000024]"
            id="screen"
            onClick={handleClose}
          >
            <div className="w-[70%] fixed z-[999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {user ? (
                <button className="w-full py-5 pl-5 ">
                  <Link href={"profile"}>
                    <Image
                      src={avatar}
                      alt=""
                      className="w-[32px] h-[32px] rounded-full"
                    />
                  </Link>
                </button>
              ) : (
                <button
                  className="w-full py-5 pl-5 "
                  onClick={() => setOpen(true)}
                >
                  <HiOutlineUserCircle
                    size={25}
                    className="cursor-pointer  text-black dark:text-white"
                  />
                </button>
              )}

              <br />
              <br />

              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright 2023 Learnify
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              activeItem={activeItem}
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              activeItem={activeItem}
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              activeItem={activeItem}
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
