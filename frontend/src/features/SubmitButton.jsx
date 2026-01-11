import { HiRocketLaunch } from "react-icons/hi2";
import { useState } from "react";

export const SubmitButton = ({ nodes, edges }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze pipeline");
      }

      const data = await response.json();

      // Display the result in a nice alert
      let message = "";

      if (data.num_nodes === 0 && data.num_edges === 0) {
        message =
          "⚠️ Empty Pipeline\n\nYour pipeline has no nodes. Drag some nodes from the sidebar to get started!";
      } else {
        message = `
╔════════════════════════════════╗
║   PIPELINE ANALYSIS RESULTS    ║
╚════════════════════════════════╝

📊 Total Nodes:  ${data.num_nodes}
🔗 Total Edges:  ${data.num_edges}
${data.is_dag ? "✅" : "❌"} Graph Type:  ${
          data.is_dag ? "Valid DAG (no cycles)" : "Has Cycles (invalid DAG)"
        }

${
  data.is_dag
    ? "✨ Great! This pipeline forms a valid Directed Acyclic Graph.\nNo circular dependencies detected."
    : "⚠️  Warning: This pipeline contains cycles.\nPlease remove circular connections."
}
        `.trim();
      }

      alert(message);
    } catch (error) {
      alert(
        `Error: ${error.message}\n\nMake sure the backend server is running on http://127.0.0.1:8000`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`
          group relative flex items-center gap-2 px-8 py-3 
          rounded-2xl font-bold text-sm uppercase tracking-widest
          transition-all duration-300 active:scale-95
          bg-indigo-600 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)]
          hover:bg-indigo-500 hover:shadow-[0_15px_25px_-5px_rgba(79,70,229,0.5)]
          hover:-translate-y-1
          dark:bg-indigo-500 dark:hover:bg-indigo-400
        `}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Analyzing...
          </>
        ) : (
          <>
            <HiRocketLaunch className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>Submit Pipeline</span>

            {/* Subtle Shine Effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </div>
          </>
        )}
      </button>
    </div>
  );
};
