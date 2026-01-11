// nodes/utils/namingHelpers.js

import { useStore } from "../../store";

export const getNextIndexedName = (prefix) => {
    const nodes = useStore.getState().nodes;
    const usedIndexes = new Set();

    nodes.forEach((node) => {
        const values = Object.values(node.data || {});
        values.forEach((value) => {
            if (typeof value === "string" && value.startsWith(prefix)) {
                const index = Number(value.slice(prefix.length));
                if (!Number.isNaN(index)) {
                    usedIndexes.add(index);
                }
            }
        });
    });

    let nextIndex = 0;
    while (usedIndexes.has(nextIndex)) {
        nextIndex += 1;
    }

    return `${prefix}${nextIndex}`;
};
