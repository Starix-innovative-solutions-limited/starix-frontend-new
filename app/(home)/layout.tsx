import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import dynamic from "next/dynamic";

const CTASection = dynamic(() => import("@/components/CTASection"));

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="">
      <Navbar />
      {children}
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomeLayout;
