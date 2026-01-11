import { useCallback } from "react";
import { useStore } from "../../store";

export const useNodeFieldUpdater = (nodeId) => {
    const updateNodeData = useStore((s) => s.updateNodeData);

    return useCallback(
        (key, value) => {
            updateNodeData(nodeId, key, value);
        },
        [nodeId, updateNodeData]
    );
};
