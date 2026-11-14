import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Solutions } from "@/components/site/solutions";
import { Delivery } from "@/components/site/delivery";
import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Solutions />
        <Delivery />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
