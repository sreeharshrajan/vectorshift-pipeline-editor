export const DraggableNode = ({ type, label, icon, collapsed }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.opacity = "0.5";
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
        transition-all duration-300 rounded-xl border
        bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700
        hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg
        /* Centering Logic */
        ${
          collapsed
            ? "justify-center h-12 w-12 mx-auto px-0"
            : "justify-start h-14 w-full px-4"
        }
      `}
    >
      {/* Icon Wrapper - Ensure no fixed margins interfere with centering */}
      <div
        className={`
          flex items-center justify-center transition-colors
          text-neutral-600 dark:text-neutral-300 group-hover:text-indigo-500
          ${collapsed ? "m-0" : "mr-0"} 
        `}
      >
        {icon}
      </div>

      {/* Label - Use a conditional margin to prevent pushing the icon when width is 0 */}
      <span
        className={`
          font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300
          text-neutral-700 dark:text-neutral-200
          ${collapsed ? "w-0 opacity-0 ml-0" : "w-auto opacity-100 ml-3"}
        `}
      >
        {label}
      </span>

      {/* Tooltip for Collapsed State */}
      {collapsed && (
        <div className="absolute left-16 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
          {label}
        </div>
      )}
    </div>
  );
};
