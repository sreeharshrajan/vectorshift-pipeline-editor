import { useEffect, useState, useCallback, useRef } from "react";
import { useStore } from "../store";
import { HiX } from "react-icons/hi";
import { TOAST_TYPES } from "../constants";

export const Toast = ({
    message,
    type = "success",
    onClose,
    duration = 5000,
}) => {
    const theme = useStore((state) => state.theme);
    const colorMode = theme === "dark" ? "dark" : "light";

    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const remainingTimeRef = useRef(duration);
    const lastTickRef = useRef(Date.now());
    const progressIntervalRef = useRef(null);

    const config = TOAST_TYPES[type] || TOAST_TYPES.success;
    const Icon = config.icon;

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    }, [onClose]);

    useEffect(() => {
        const entranceTimeout = setTimeout(() => setIsVisible(true), 10);

        if (!isPaused) {
            lastTickRef.current = Date.now();
            progressIntervalRef.current = setInterval(() => {
                const now = Date.now();
                const delta = now - lastTickRef.current;
                lastTickRef.current = now;
                remainingTimeRef.current -= delta;

                const newProgress = (remainingTimeRef.current / duration) * 100;

                if (newProgress <= 0) {
                    setProgress(0);
                    handleClose();
                } else {
                    setProgress(newProgress);
                }
            }, 50);
        }

        return () => {
            clearTimeout(entranceTimeout);
            if (progressIntervalRef.current)
                clearInterval(progressIntervalRef.current);
        };
    }, [isPaused, duration, handleClose]);

    return (
        <div
            role="alert"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`fixed top-6 right-6 z-[100] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isVisible
                    ? "translate-x-0 opacity-100 scale-100"
                    : "translate-x-12 opacity-0 scale-95"
                }`}
        >
            <div
                className={`relative min-w-[340px] max-w-md overflow-hidden rounded-xl border shadow-2xl backdrop-blur-xl transition-colors duration-300
                ${colorMode === "dark"
                        ? "bg-slate-900/90 border-white/10 shadow-black/40"
                        : "bg-white/90 border-slate-200/80 shadow-slate-200/50"
                    } ${config.border}`}
            >
                <div className="flex items-start gap-4 p-4">
                    {/* Icon Container */}
                    <div
                        className={`flex-shrink-0 rounded-lg p-2 ${colorMode === "dark"
                                ? "bg-white/5 ring-1 ring-white/10"
                                : config.bg
                            }`}
                    >
                        <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-0.5">
                        <h3
                            className={`font-bold text-sm tracking-tight ${colorMode === "dark" ? "text-slate-100" : "text-slate-900"
                                }`}
                        >
                            {config.title}
                        </h3>
                        <p
                            className={`mt-1 text-sm leading-relaxed ${colorMode === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                        >
                            {message}
                        </p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className={`group flex-shrink-0 rounded-md p-1 transition-all ${colorMode === "dark" ? "hover:bg-white/10" : "hover:bg-slate-100"
                            }`}
                        aria-label="Close notification"
                    >
                        <HiX
                            className={`w-4 h-4 transition-colors ${colorMode === "dark"
                                    ? "text-slate-500 group-hover:text-white"
                                    : "text-slate-400 group-hover:text-slate-900"
                                }`}
                        />
                    </button>
                </div>

                {/* Progress Bar Track */}
                <div
                    className={`absolute bottom-0 left-0 w-full h-[3px] ${colorMode === "dark" ? "bg-white/5" : "bg-slate-100"
                        }`}
                >
                    {/* Progress Bar Fill */}
                    <div
                        className={`h-full transition-all duration-75 ease-linear ${config.color.replace(
                            "text",
                            "bg"
                        )}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
