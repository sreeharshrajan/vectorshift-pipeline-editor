import { useState } from "react";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";
import { HiPlay, HiOutlineRefresh } from "react-icons/hi";
import { Toast } from "../components/Toast.jsx";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

// Environment variable support with local fallback
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";
const API_ENDPOINT = `${BACKEND_URL}/pipelines/parse`;

export const SubmitButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const { nodes, edges } = useStore(selector, shallow);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleSubmit = async () => {
    // 1. Initial Validation
    if (nodes.length === 0) {
      showToast(
        <div>
          <p className="font-bold">Canvas is Empty</p>
          <p className="text-xs opacity-90">
            Add at least one node to analyze the pipeline.
          </p>
        </div>,
        "warning"
      );
      return;
    }

    setIsLoading(true);

    try {
      // 2. API Call
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const result = await response.json();

      // 3. Dynamic Success/Warning Toast
      showToast(
        <div className="w-full">
          <p className="font-bold mb-2">Analysis Complete</p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-black/5 dark:bg-white/5 rounded border border-black/5">
              <span className="block opacity-50 uppercase text-[9px]">
                Nodes
              </span>
              <span className="font-mono text-sm">{result.num_nodes}</span>
            </div>
            <div className="p-2 bg-black/5 dark:bg-white/5 rounded border border-black/5">
              <span className="block opacity-50 uppercase text-[9px]">
                Edges
              </span>
              <span className="font-mono text-sm">{result.num_edges}</span>
            </div>
            <div
              className={`col-span-2 p-2 rounded border flex justify-between items-center ${
                result.is_dag
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-amber-500/10 border-amber-500/20"
              }`}
            >
              <span className="opacity-70">Graph Structure</span>
              <span className="font-bold">
                {result.is_dag ? "Valid DAG ✓" : "Cycles Detected ✗"}
              </span>
            </div>
          </div>
        </div>,
        result.is_dag ? "success" : "warning"
      );
    } catch (error) {
      // 4. Detailed Error Toast
      showToast(
        <div>
          <p className="font-bold">Connection Failed</p>
          <p className="text-xs mb-2 opacity-80">{error.message}</p>
          <div className="text-[10px] p-2 bg-red-500/10 rounded border border-red-500/20">
            Target: <code className="bg-black/20 px-1">{BACKEND_URL}</code>
          </div>
        </div>,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative group">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm
              transition-all duration-300 shadow-lg active:scale-95 disabled:opacity-50
              ${
                isLoading
                  ? "bg-slate-700 text-slate-300 cursor-wait"
                  : "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/40 hover:-translate-y-0.5"
              }
            `}
          >
            {isLoading ? (
              <HiOutlineRefresh className="w-4 h-4 animate-spin" />
            ) : (
              <HiPlay className="w-4 h-4" />
            )}
            <span>{isLoading ? "Running..." : "Run Pipeline"}</span>
          </button>

          {/* Minimal Tooltip */}
          {!isLoading && isHovered && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-slate-800 text-white text-[10px] rounded shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-bottom-1">
              Analyze Current Graph
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 -mt-1" />
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={5000}
        />
      )}
    </>
  );
};
