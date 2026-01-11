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
        transition-all duration-300 rounded-2xl border
        /* Glassmorphism Logic */
        bg-white/40 dark:bg-slate-800/40 backdrop-blur-md
        border-neutral-200/50 dark:border-slate-700/50
        
        /* Hover States */
        hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10
        hover:border-indigo-400 dark:hover:border-indigo-500/50 
        hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)]
        dark:hover:shadow-[0_8px_25px_-6px_rgba(99,102,241,0.2)]

        ${
          collapsed
            ? "justify-center h-12 w-12 mx-auto px-0"
            : "justify-start h-14 w-full px-4"
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
          ${collapsed ? "m-0" : "mr-0"} 
        `}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className={`
          font-bold text-[11px] uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300
          text-slate-700 dark:text-slate-200
          ${collapsed ? "w-0 opacity-0 ml-0" : "w-auto opacity-100 ml-3"}
        `}
      >
        {label}
      </span>

      {/* Enhanced Tooltip for Collapsed State */}
      {collapsed && (
        <div className="absolute left-16 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 shadow-2xl border border-slate-700">
          {label}
        </div>
      )}
    </div>
  );
};
