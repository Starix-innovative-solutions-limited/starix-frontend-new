import Hero from "@/components/Hero";
import WhyStarix from "@/components/WhyStarix";
import HowItWorks from "@/components/HowItWorks";
import Achievements from "@/components/Achievements";
import PlatformBanner from "@/components/PlatformBanner";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <WhyStarix />
      <HowItWorks />
      <Achievements />
      <PlatformBanner />
    </main>
  );
}
