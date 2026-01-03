"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* Minimal blue spinner with rotation animation */}
        <style>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-loader {
            animation: spin 1s linear infinite;
          }
        `}</style>
        <div className="w-12 h-12 border-3 border-blue-200 dark:border-blue-900 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin-loader" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading</p>
      </div>
    </div>
  );
}
