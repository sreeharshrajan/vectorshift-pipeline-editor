import React from "react";
import { FaProjectDiagram, FaPlus } from "react-icons/fa";

export const WelcomeBox = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-6">
            {/* Dynamic Background Glow - Scaled for mobile */}
            <div className="absolute w-48 h-48 md:w-64 md:h-64 bg-blue-400/10 dark:bg-indigo-500/5 rounded-full blur-[80px] md:blur-[100px]" />

            <div
                className="relative group text-center 
                      p-8 md:p-12 
                      rounded-[2rem] md:rounded-[2.5rem] 
                      border border-dashed border-slate-300 dark:border-slate-700 
                      bg-white/40 dark:bg-slate-900/40 backdrop-blur-md 
                      transition-all duration-500 hover:border-blue-400
                      w-full max-w-[320px] md:max-w-md"
            >
                {/* Animated Icon Stack - Scaled down on small screens */}
                <div className="relative mx-auto mb-6 md:mb-8 w-20 h-20 md:w-24 md:h-24">
                    <div
                        className="relative flex items-center justify-center w-full h-full 
                          bg-white dark:bg-slate-950 
                          border border-slate-200 dark:border-slate-800 
                          rounded-2xl md:rounded-3xl shadow-xl shadow-blue-500/5"
                    >
                        <FaProjectDiagram className="text-blue-600 dark:text-blue-400 w-8 h-8 md:w-10 md:h-10" />

                        <div
                            className="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-blue-600 dark:bg-blue-500 
                            text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                            <FaPlus size={8} className="md:size-[10px] animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
                        Start Building Your Pipeline
                    </h3>
                    <p className="openSansRegular text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-[240px] md:max-w-[280px] mx-auto leading-relaxed">
                        Drag nodes from the sidebar to visualize your data flow on the
                        canvas.
                    </p>
                </div>

                {/* Interactive Visual Cue - Hidden on very small screens to save space */}
                <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 md:gap-3">
                    <span className="h-[1px] w-6 md:w-8 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-700" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold text-slate-400 dark:text-slate-500">
                        Drag & Drop
                    </span>
                    <span className="h-[1px] w-6 md:w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-700" />
                </div>
            </div>
        </div>
    );
};