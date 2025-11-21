"use client";
import React, { useEffect, useState } from "react";
import { Work_Sans } from "next/font/google";
import Image from "next/image";
import Loader from "@/components/Loader";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => setIsLoading(false);

    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleComplete);
      return () => window.removeEventListener("load", handleComplete);
    }
  }, []);

  if (isLoading) {
    return (
      <main
        className={`h-screen ${workSans.variable} grid place-items-center bg-white`}
      >
        <Loader />
      </main>
    );
  }

  return (
    <main
      className={`h-full w-full  ${workSans.variable} grid place-items-center relative`}
    >
      <div className="grid md:grid-cols-2 md:gap-4 md:m-5  items-center  max-w-7xl ">
        {" "}
        <div className="relative h-screen max-md:hidden flex items-center justify-center">
          {" "}
          <Image
            src={"/images/auth/frame.png"}
            width={550}
            height={600}
            alt="frame"
            className="object-contain h-full"
          />{" "}
        </div>{" "}
        <div className="py-6 flex-1 grid place-items-center-safe   overflow-x-hidden max-md:p-5 min-h-screen">
          {children}
          <Image
            src={"/images/auth/TopLeft.png"}
            width={70}
            height={70}
            alt="frame"
            className="object-contain border absolute top-0 left-0 md:hidden"
          />

          <Image
            src={"/images/auth/BottomRight.png"}
            width={70}
            height={70}
            alt="frame"
            className="object-contain border absolute bottom-0 right-0 md:hidden"
          />
        </div>{" "}
      </div>
    </main>
  );
};

export default AuthLayout;
