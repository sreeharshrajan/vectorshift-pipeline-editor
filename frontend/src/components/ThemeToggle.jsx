import { HiSun, HiMoon } from "react-icons/hi2";
import { useStore } from "../store";

export const ThemeToggle = ({ collapsed }) => {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-10 h-10 flex items-center justify-center 
        transition-all duration-500
        
        /* Glassmorphism Styling */
        bg-white/40 dark:bg-slate-800/40 backdrop-blur-md
        border border-neutral-200/50 dark:border-slate-700/50
        
        /* Shape and Interaction */
        ${collapsed ? "rounded-2xl" : "rounded-xl"}
        text-slate-500 dark:text-slate-400 
        hover:bg-indigo-50/80 dark:hover:bg-indigo-500/20
        hover:text-indigo-600 dark:hover:text-indigo-400
        hover:border-indigo-400 dark:hover:border-indigo-500/50
        
        active:scale-90 shadow-sm hover:shadow-indigo-500/10
      `}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {theme === "dark" ? (
          <HiSun className="w-5 h-5 transition-all duration-500 transform rotate-0 scale-100" />
        ) : (
          <HiMoon className="w-5 h-5 transition-all duration-500 transform rotate-0 scale-100" />
        )}
      </div>
    </button>
  );
};
