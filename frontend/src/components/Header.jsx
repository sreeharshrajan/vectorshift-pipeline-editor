import React from "react";
// Changed FaProjectDiagram to FaDiagramProject for Font Awesome 6
import { FaRegCircleDot, FaDiagramProject } from "react-icons/fa6";
import { TfiLink } from "react-icons/tfi";
import { HiOutlineRefresh, HiOutlineSave } from "react-icons/hi";

export const Header = ({ nodeCount, edgeCount, onReset }) => {
    return (
        <header className="h-16 px-6 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md z-10">
            {/* Left Section: Branding & Breadcrumbs */}
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-indigo-600 w-10 h-10 rounded-xl shadow-lg shadow-indigo-500/20">
                    <FaDiagramProject className="text-white w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white leading-none">
                        VectorShift
                    </h1>
                    <nav className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                            Pipeline
                        </span>
                        <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">
                            Editor
                        </span>
                    </nav>
                </div>
            </div>

            {/* Right Section: Stats & Actions */}
            <div className="flex items-center gap-4">
                {/* Connection Status Pill */}
                <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-neutral-50 dark:bg-slate-800/40 border border-neutral-200 dark:border-neutral-700/50 rounded-xl transition-all hover:border-indigo-300 dark:hover:border-indigo-500/30">
                    {/* Node Count */}
                    <div className="flex items-center gap-2 group">
                        <div className="relative flex h-2 w-2">
                            {nodeCount > 0 && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            )}
                            <FaRegCircleDot
                                className={`relative inline-flex rounded-full w-2 h-2 ${nodeCount > 0 ? "text-green-500" : "text-neutral-400"
                                    }`}
                            />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                            {nodeCount} <span className="font-medium opacity-60">Nodes</span>
                        </span>
                    </div>

                    <div className="h-3 w-[1px] bg-neutral-300 dark:bg-neutral-700" />

                    {/* Edge Count */}
                    <div className="flex items-center gap-2">
                        <TfiLink
                            className={`w-3 h-3 ${edgeCount > 0 ? "text-indigo-500" : "text-neutral-400"
                                }`}
                        />
                        <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                            {edgeCount}{" "}
                            <span className="font-medium opacity-60">Connections</span>
                        </span>
                    </div>
                </div>

                {/* Action Group */}
                <div className="flex items-center gap-2 ml-2">
                    {/* SAVE (Coming Soon) */}
                    <div className="relative group">
                        <button
                            disabled
                            className="p-2 text-neutral-400 cursor-not-allowed rounded-lg"
                        >
                            <HiOutlineSave className="w-5 h-5" />
                        </button>

                        {/* Tooltip */}
                        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-[10px] px-2 py-1 rounded-md bg-neutral-900 text-white">
                            Coming soon
                        </div>
                    </div>

                    {/* RESET */}
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white text-xs font-bold rounded-lg shadow-md shadow-indigo-500/20"
                    >
                        <HiOutlineRefresh className="w-4 h-4" />
                        <span className="hidden sm:inline">Reset Canvas</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
