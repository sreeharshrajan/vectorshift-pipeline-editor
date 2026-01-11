import { useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { DraggableNode } from "./draggableNode";
import { ThemeToggle } from "./components/ThemeToggle";
import { useStore } from "./store";

export const PipelineToolbar = () => {
  const sidebarCollapsed = useStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  return (
    <aside
      className={`
        h-screen border-r border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200
        flex flex-col ${sidebarCollapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Header */}
      <div className=" bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        {!sidebarCollapsed && (
          <span className="text-sm font-semibold uppercase">
            Nodes
          </span>
        )}

        <button
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-base-300"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? (
            <HiMenu className="w-5 h-5" />
          ) : (
            <HiX className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Node Palette */}
      {!sidebarCollapsed && (
        <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          <DraggableNode type="text" label="Text" />
        </div>
      )}

      {/* Footer Controls */}
      <div className="h-14 border-t border-base-300 flex items-center justify-center">
        <ThemeToggle />
      </div>
    </aside>
  );
};
