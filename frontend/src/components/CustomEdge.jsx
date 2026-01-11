import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "reactflow";
import { useState } from "react";
import { useStore } from "../store";

function CustomEdge({ id, sourceX, sourceY, targetX, targetY, markerEnd }) {
  const { deleteElements } = useReactFlow();
  const theme = useStore((s) => s.theme);

  const [confirming, setConfirming] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isDark = theme === "black";

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleDelete = () => {
    deleteElements({ edges: [{ id }] });
    setConfirming(false);
  };

  return (
    <>
      {/* Edge path */}
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />

      {/* Edge actions */}
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan"
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          {!confirming ? (
            <button
              aria-label="Delete edge"
              onClick={() => setConfirming(true)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="
                w-7 h-7 rounded-full
                bg-red-500/10 border border-red-500/30
                flex items-center justify-center
                transition-all duration-200
                hover:bg-red-500/20 hover:border-red-500/50
                hover:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]
                active:scale-95
                backdrop-blur-sm
                text-red-500
              "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                className={`transition-transform duration-200 ${
                  hovered ? "rotate-90 scale-110" : ""
                }`}
              >
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : (
            <div
              className={`
                flex gap-2 p-1.5 rounded-lg border backdrop-blur-xl animate-slideDown
                                 ${
                                   isDark
                                     ? "bg-[#121212]/95 border-red-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                                     : "bg-white/95 border-red-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
                                 }`}
            >
              <button
                onClick={() => setConfirming(false)}
                className={`px-3 py-1.5 text-xs rounded border transition-all duration-200 active:scale-95 ${
                  isDark
                    ? "bg-[#0d0d0d] text-white border-white/10 hover:bg-white/10"
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }
                `}
              >
                No
              </button>

              <button
                onClick={handleDelete}
                className={`
                                    px-3 py-1.5 text-xs rounded text-white
                                    bg-gradient-to-br from-red-500 to-red-600
                                    border border-red-500/50
                                    shadow-[0_2px_10px_rgba(239,68,68,0.35)]
                                    transition-all duration-300
                                    hover:from-red-600 hover:to-red-700
                                    hover:-translate-y-0.5
                                    active:translate-y-0 active:scale-95
                                    `}
              >
                Yes
              </button>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export const edgeTypes = {
  "custom-edge": CustomEdge,
};
