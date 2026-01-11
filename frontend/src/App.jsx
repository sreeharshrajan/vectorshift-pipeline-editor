import { useEffect } from "react";
import { useStore } from "./store";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  const theme = useStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white dark:bg-neutral-900">
      {/* Aside */}
      <PipelineToolbar />

      <div className="flex-1 flex flex-col">
        {/* Main UI */}
        <PipelineUI />

        <footer className="h-14 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
          <SubmitButton />
        </footer>
      </div>
    </div>
  );
}

export default App;
