import Navbar from "@/components/sections/Navbar";

export default function Blogs() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Blogs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our latest articles and insights on web development and
            technology.
          </p>
        </div>
      </div>
    </main>
  );
}
