import React from "react";
import { FaProjectDiagram, FaPlus } from "react-icons/fa";

export const WelcomeBox = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-4">
            {/* Dynamic Background Glow: Subtle blue in light mode, deep indigo in dark mode */}
            <div className="absolute w-64 h-64 bg-blue-400/10 dark:bg-indigo-500/5 rounded-full blur-[100px]" />

            <div
                className="relative group text-center p-10 rounded-[2.5rem] 
                      border border-dashed border-slate-300 dark:border-slate-700 
                      bg-white/40 dark:bg-slate-900/40 backdrop-blur-md 
                      transition-all duration-500 hover:border-blue-400"
            >
                {/* Animated Icon Stack */}
                <div className="relative mx-auto mb-8 w-24 h-24">
                    <div
                        className="relative flex items-center justify-center w-full h-full 
                          bg-white dark:bg-slate-950 
                          border border-slate-200 dark:border-slate-800 
                          rounded-3xl shadow-xl shadow-blue-500/5"
                    >
                        <FaProjectDiagram className="text-blue-600 dark:text-blue-400 w-10 h-10" />

                        <div
                            className="absolute -top-1 -right-1 w-7 h-7 bg-blue-600 dark:bg-blue-500 
                            text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                            <FaPlus size={10} className="animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Text Content with specific dark/light text colors */}
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                        Start Building Your Pipeline
                    </h3>
                    <p className="openSansRegular text-sm text-slate-500 dark:text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                        Drag nodes from the sidebar to visualize your data flow on the
                        canvas.
                    </p>
                </div>

                {/* Interactive Visual Cue */}
                <div className="mt-8 flex items-center justify-center gap-3">
                    <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-700" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-slate-400 dark:text-slate-500">
                        Drag & Drop
                    </span>
                    <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-700" />
                </div>
            </div>
        </div>
    );
};
