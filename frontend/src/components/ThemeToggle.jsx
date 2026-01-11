import { HiSun, HiMoon } from "react-icons/hi";
import { useStore } from "../store";

export const ThemeToggle = () => {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-base-300 transition"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <HiSun className="w-5 h-5" />
      ) : (
        <HiMoon className="w-5 h-5" />
      )}
    </button>
  );
};
