import { useEffect, useState, useCallback, useRef } from "react";
import { useStore } from "../store/store";
import { HiX } from "react-icons/hi";
import { TOAST_TYPES } from "../constants";

export const Toast = ({
    message,
    type = "success",
    onClose,
    duration = 5000,
}) => {
    const theme = useStore((state) => state.theme);
    const colorMode = theme === "black" ? "dark" : "light";

    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Use refs to persist values without triggering re-renders or effect re-runs
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
        // Entrance trigger
        const entranceTimeout = setTimeout(() => setIsVisible(true), 10);

        if (!isPaused) {
            lastTickRef.current = Date.now();

            progressIntervalRef.current = setInterval(() => {
                const now = Date.now();
                const delta = now - lastTickRef.current;
                lastTickRef.current = now;

                // Update remaining time
                remainingTimeRef.current -= delta;

                // Calculate progress percentage
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
    }, [isPaused, duration, handleClose]); // 'progress' is no longer a dependency!

    return (
        <div
            role="alert"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`fixed top-6 right-6 z-[100] transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${isVisible
                    ? "translate-x-0 opacity-100 scale-100"
                    : "translate-x-12 opacity-0 scale-95"
                }`}
            data-theme={colorMode}
        >
            <div
                className={`relative min-w-[340px] max-w-md overflow-hidden rounded-xl border shadow-xl backdrop-blur-md bg-panel/90 ${config.border}`}
            >
                <div className="flex items-start gap-4 p-4">
                    <div
                        className={`flex-shrink-0 rounded-full p-1 ${colorMode === "dark" ? "bg-white/5" : config.bg
                            }`}
                    >
                        <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>

                    <div className="flex-1 pt-0.5">
                        <h3
                            className={`font-bold text-sm tracking-tight ${colorMode === "dark" ? "text-white" : "text-slate-900"
                                }`}
                        >
                            {config.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted opacity-90">
                            {message}
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="group flex-shrink-0 rounded-md p-1.5 transition-all hover:bg-black/5 dark:hover:bg-white/10"
                        aria-label="Close notification"
                    >
                        <HiX className="w-4 h-4 text-muted group-hover:text-text" />
                    </button>
                </div>

                {/* Progress Bar with smooth transition */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black/5 dark:bg-white/5">
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
