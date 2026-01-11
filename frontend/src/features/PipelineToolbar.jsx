import {
  HiChevronRight,
  HiChevronLeft,
  HiSquare3Stack3D,
  HiCpuChip,
  HiArrowRightOnRectangle,
  HiDocumentText,
} from "react-icons/hi2";
import { DraggableNode } from "../draggableNode";
import { ThemeToggle } from "../components/ThemeToggle";
import { useStore } from "../store";

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
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
        border border-neutral-200/50 dark:border-slate-700/50
        rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        flex flex-col overflow-hidden
        h-fit max-h-[80vh]
        ${sidebarCollapsed ? "w-24" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="pt-8 px-6 pb-2 flex items-center justify-between">
        {!sidebarCollapsed && (
          <h2 className="font-black text-[10px] uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 opacity-80">
            Nodes
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className={`group p-2.5 rounded-2xl text-neutral-500 dark:text-slate-400 bg-neutral-100/50 dark:bg-slate-800/50 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm ${
            sidebarCollapsed ? "mx-auto" : ""
          }`}
        >
          {sidebarCollapsed ? (
            <HiChevronRight className="w-4 h-4" />
          ) : (
            <HiChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Node Palette */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {Object.entries(nodeIcons).map(([type, icon]) => (
          <DraggableNode
            key={type}
            type={type}
            label={type.replace(/([A-Z])/g, " $1").trim()}
            icon={icon}
            collapsed={sidebarCollapsed}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        className={`
    p-4 mt-auto flex items-center transition-all duration-300
    ${sidebarCollapsed ? "justify-center" : "justify-between px-6"}
        `}
      >
        {!sidebarCollapsed && (
          <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest text-neutral-600 dark:text-slate-400">
            Theme
          </span>
        )}
        <ThemeToggle collapsed={sidebarCollapsed} />
      </div>
    </aside>
  );
};
