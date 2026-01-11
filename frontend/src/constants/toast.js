import {
    HiCheckCircle,
    HiXCircle,
    HiInformationCircle,
    HiExclamation,
} from "react-icons/hi";

export const TOAST_TYPES = {
    success: {
        icon: HiCheckCircle,
        color: "text-emerald-500",
        border: "border-emerald-500/50",
        bg: "bg-emerald-50",
        title: "Success",
    },
    error: {
        icon: HiXCircle,
        color: "text-rose-500",
        border: "border-rose-500/50",
        bg: "bg-rose-50",
        title: "Error",
    },
    warning: {
        icon: HiExclamation,
        color: "text-amber-500",
        border: "border-amber-500/50",
        bg: "bg-amber-50",
        title: "Warning",
    },
    info: {
        icon: HiInformationCircle,
        color: "text-blue-500",
        border: "border-blue-500/50",
        bg: "bg-blue-50",
        title: "Information",
    },
};
