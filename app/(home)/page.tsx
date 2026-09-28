
import Hero from "@/components/Hero";
// import Navbar from "@/components/Navbar";
import WhyStarix from "@/components/WhyStarix";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Solution from "@/components/Solution";

export default function Home() {
  return (
    <div className="">
      <main className="">
        {/* <Navbar /> */}
        <Hero />
        <WhyStarix />
        <Solution />
        <HowItWorks />
        <FAQ />
      </main>
    </div>
  );
}