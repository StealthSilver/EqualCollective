import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Solvyn } from "../components/sections/Solvyn";
import { Services } from "../components/sections/Services";
import { Cta } from "../components/sections/Cta";
import { Footer } from "../components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Solvyn />
      <Services />
      <Cta />
      <Footer />
    </main>
  );
}
