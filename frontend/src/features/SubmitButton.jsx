import { useState } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { HiRocketLaunch, HiOutlineArrowPath } from "react-icons/hi2";
import { Toast } from "../components/Toast.jsx";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";
const API_ENDPOINT = `${BACKEND_URL}/pipelines/parse`;

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const { nodes, edges } = useStore(selector, shallow);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      showToast(
        <div>
          <p className="font-bold">Pipeline is Empty</p>
          <p className="text-xs opacity-90">
            Add at least one node to analyze.
          </p>
        </div>,
        "warning"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const result = await response.json();

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
      showToast(
        <div>
          <p className="font-bold">Connection Failed</p>
          <p className="text-xs mb-2 opacity-80">{error.message}</p>
        </div>,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`
           group relative flex items-center gap-2 
      px-5 py-2.5 md:px-8 md:py-3 
      rounded-xl md:rounded-2xl 
      font-bold text-[11px] md:text-sm 
      uppercase tracking-widest
      
      transition-all duration-300 active:scale-95 disabled:opacity-70
      bg-indigo-600 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)]
      hover:bg-indigo-500 hover:shadow-[0_15px_25px_-5px_rgba(79,70,229,0.5)]
      md:hover:-translate-y-1
      dark:bg-indigo-500 dark:hover:bg-indigo-400
          `}
        >
          {isLoading ? (
            <>
              <HiOutlineArrowPath className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <HiRocketLaunch className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-12 group-hover:-translate-y-px" />
              <span className="whitespace-nowrap">Submit Pipeline</span>

              {/* Shimmer Effect Layer */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </div>
            </>
          )}
        </button>
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
