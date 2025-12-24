import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WhyStarix from "@/components/WhyStarix";

export default function Home() {
  return (
    <div className="bg-lines">
      <main className="">
        <Navbar />
        <Hero />
        <WhyStarix />
        <Footer />
      </main>
    </div>
  );
}