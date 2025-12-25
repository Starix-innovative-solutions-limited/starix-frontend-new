import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WhyStarix from "@/components/WhyStarix";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="bg-lines">
      <main className="">
        <Navbar />
        <Hero />
        <WhyStarix />
        <HowItWorks />
        <Footer />
      </main>
    </div>
  );
}