import Navbar from "@/components/layout/Navbar";
import SpecialOfferRibbon from "@/components/layout/SpecialOfferRibbon";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SpecialOfferRibbon />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
