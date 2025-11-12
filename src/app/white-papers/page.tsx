import Navbar from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function WhitePapers() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            White Papers
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Read our in-depth white papers on industry insights and technical
            expertise.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
