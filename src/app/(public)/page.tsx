import Hero from "@/components/home/Hero";
import SignatureDishes from "@/components/home/SignatureDishes";
import ChefSection from "@/components/home/ChefSection";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col bg-[#111111]">
      <Hero />
      <SignatureDishes />
      <ChefSection />
      <Testimonials />
    </main>
  );
}
