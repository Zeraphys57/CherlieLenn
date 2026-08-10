import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Programs from "@/components/Programs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

/**
 * Halaman utama.
 *
 * Urutannya mengikuti lib/content.ts. Yang masih menyusul di Fase 4: Footer
 * (kontak & sosial), metadata SEO, Open Graph, JSON-LD, sitemap, dan robots.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="konten">
        <Hero />
        <Story />
        <Programs />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
