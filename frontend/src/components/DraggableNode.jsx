export const DraggableNode = ({ type, label, icon, collapsed }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    // Subtle visual feedback for drag
    event.target.style.opacity = "0.4";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.opacity = "1")}
      className={`
        group relative flex items-center cursor-grab active:cursor-grabbing
        transition-all duration-300 rounded-2xl border shrink-0
        bg-white/40 dark:bg-slate-800/40 backdrop-blur-md
        border-neutral-200/50 dark:border-slate-700/50
        hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10
        hover:border-indigo-400 dark:hover:border-indigo-500/50 
        hover:shadow-lg
        ${
          collapsed
            ? "justify-center h-10 w-10 mx-auto"
            : "justify-start h-12 w-full px-4"
        }
      `}
    >
      {/* Icon Wrapper */}
      <div
        className={`
          flex items-center justify-center transition-all duration-300 
          text-slate-500 dark:text-slate-400 
          group-hover:text-indigo-600 dark:group-hover:text-indigo-400 
          group-hover:scale-110
          [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-[18px] md:[&>svg]:h-[18px]
        `}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className={`font-bold text-[10px] uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300 text-slate-700 dark:text-slate-200 ${
          collapsed ? "w-0 opacity-0 ml-0" : "w-auto opacity-100 ml-3"
        }`}
      >
        {label}
      </span>

      {/* Tooltip for Collapsed State */}
      {collapsed && (
        <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-8px] group-hover:translate-x-0 whitespace-nowrap z-[100] shadow-2xl border border-slate-700">
          {label}
          <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45 border-l border-b border-slate-700" />
        </div>
      )}
    </div>
  );
};
