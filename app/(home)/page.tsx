import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const WhyStarix = dynamic(() => import("@/components/WhyStarix"));
const Solution = dynamic(() => import("@/components/Solution"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const FAQ = dynamic(() => import("@/components/FAQ"));

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Hero />
        <WhyStarix />
        <Solution />
        <HowItWorks />
        <FAQ />
      </main>
    </div>
  );
}
