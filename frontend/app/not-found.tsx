"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import notFound from "../public/assets/notFound.png"; // Import your image
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  useEffect(() => {
    const redirectHome = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(redirectHome);
  }, [router]);

  return (
    <div className="flex justify-center h-screen bg-primary text-white">
      <div className="text-center dark:text-white text-black py-10">
        <Image src={notFound} width={400} height={400} alt="" />
        <h1 className="800px:text-5xl font-bold  dark:text-white text-black mb-5">
          404 - Page Not Found
        </h1>
        <a href="/" className="text-lg underline  dark:text-white text-black ">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
