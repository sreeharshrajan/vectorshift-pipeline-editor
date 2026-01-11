import { HiSun, HiMoon } from "react-icons/hi2"; // Updated to hi2 for consistency
import { useStore } from "../store";

export const ThemeToggle = () => {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-10 h-10 flex items-center justify-center 
        rounded-xl transition-all duration-300
        bg-neutral-100 text-neutral-600 hover:bg-indigo-50 hover:text-indigo-600
        dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-indigo-400
        active:scale-90 shadow-sm
      `}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <HiSun className="w-5 h-5 transition-transform duration-500 rotate-0" />
      ) : (
        <HiMoon className="w-5 h-5 transition-transform duration-500 -rotate-12" />
      )}
    </button>
  );
};
