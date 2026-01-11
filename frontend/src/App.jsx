import { useEffect } from "react";
import { useStore } from "./store";
import { PipelineToolbar } from "./features/PipelineToolbar";
import { PipelineUI } from "./features/PipelineUI";
import { SubmitButton } from "./features/SubmitButton";

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

        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
