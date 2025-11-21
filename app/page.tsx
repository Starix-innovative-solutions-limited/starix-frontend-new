import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-lines">
      <main className=" max-w-[88rem] px-6 mx-auto pt-5 ">
        <Navbar />
        <Hero />
        <Footer />
      </main>
    </div>
  );
}
