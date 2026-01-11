import {
  HiChevronRight,
  HiChevronLeft,
  HiSquare3Stack3D,
  HiCpuChip,
  HiArrowRightOnRectangle,
  HiDocumentText,
} from "react-icons/hi2";
import { DraggableNode } from "./draggableNode";
import { ThemeToggle } from "./components/ThemeToggle";
import { useStore } from "./store";

const nodeIcons = {
  customInput: <HiSquare3Stack3D className="w-5 h-5" />,
  llm: <HiCpuChip className="w-5 h-5" />,
  customOutput: <HiArrowRightOnRectangle className="w-5 h-5" />,
  text: <HiDocumentText className="w-5 h-5" />,
};

export const PipelineToolbar = () => {
  const sidebarCollapsed = useStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  return (
    <aside
      className={`
        fixed left-6 top-1/2 -translate-y-1/2 z-50
        bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl
        border border-neutral-200 dark:border-neutral-800
        rounded-[2rem] shadow-2xl 
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        flex flex-col overflow-hidden
        h-fit max-h-[80vh]
        ${sidebarCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="pt-6 px-6 pb-2 flex items-center justify-between">
        {!sidebarCollapsed && (
          <h2 className="font-bold text-xs uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Nodes
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className={`group p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-indigo-500 hover:text-white transition-all ${
            sidebarCollapsed ? "mx-auto" : ""
          }`}
        >
          {sidebarCollapsed ? <HiChevronRight /> : <HiChevronLeft />}
        </button>
      </div>

      {/* Node Palette */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {Object.entries(nodeIcons).map(([type, icon]) => (
          <DraggableNode
            key={type}
            type={type}
            label={type.replace(/([A-Z])/g, " $1").trim()} // Turns customInput into "custom Input"
            icon={icon}
            collapsed={sidebarCollapsed}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        className={`p-6 mt-auto flex items-center ${
          sidebarCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!sidebarCollapsed && (
          <span className="text-[10px] font-bold uppercase opacity-40">
            Mode
          </span>
        )}
        <ThemeToggle />
      </div>
    </aside>
  );
};
