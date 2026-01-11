import { HiRocketLaunch } from "react-icons/hi2";

export const SubmitButton = () => {
  const handleSubmit = () => {
    // Pipeline submission logic here
    console.log("Pipeline submitted");
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={handleSubmit}
        className={`
          group relative flex items-center gap-2 px-8 py-3 
          rounded-2xl font-bold text-sm uppercase tracking-widest
          transition-all duration-300 active:scale-95
          /* Colors & Shadow */
          bg-indigo-600 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)]
          hover:bg-indigo-500 hover:shadow-[0_15px_25px_-5px_rgba(79,70,229,0.5)]
          hover:-translate-y-1
          /* Dark mode adjustment */
          dark:bg-indigo-500 dark:hover:bg-indigo-400
        `}
      >
        <HiRocketLaunch className="w-5 h-5 transition-transform group-hover:rotate-12" />
        <span>Submit Pipeline</span>

        {/* Subtle Shine Effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </div>
      </button>
    </div>
  );
};
