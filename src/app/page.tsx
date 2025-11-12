import Navbar from "../components/sections/Navbar";
import Hero from "../components/sections/Hero";
import { LogoTicker } from "../components/sections/LogoTicker";
import { About } from "../components/sections/About";
import { Solvyn } from "../components/sections/Solvyn";
import { Services } from "../components/sections/Services";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Solvyn />
      <Services />
      <LogoTicker />
    </main>
  );
}
