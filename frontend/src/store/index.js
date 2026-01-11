import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create(
  persist(
    (set, get) => ({
      // -------------------
      // Initial State
      // -------------------
      nodes: [],
      edges: [],
      nodeIDs: {},
      theme: "dark",
      sidebarCollapsed: false,

      // -------------------
      // UI State (FIXED)
      // -------------------
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      // -------------------
      // Node ID Generation
      // -------------------
      getNodeID: (type) => {
        const nodeIDs = { ...get().nodeIDs };
        nodeIDs[type] = (nodeIDs[type] || 0) + 1;
        set({ nodeIDs });
        return `${type}-${nodeIDs[type]}`;
      },

      // -------------------
      // Node Management
      // -------------------
      addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),

      onNodesChange: (changes) =>
        set((state) => ({
          nodes: applyNodeChanges(changes, state.nodes),
        })),

      onEdgesChange: (changes) =>
        set((state) => ({
          edges: applyEdgeChanges(changes, state.edges),
        })),

      onConnect: (connection) =>
        set((state) => ({
          edges: addEdge(
            {
              ...connection,
              type: "smoothstep",
              animated: true,
              markerEnd: {
                type: MarkerType.Arrow,
              },
            },
            state.edges
          ),
        })),

      updateNodeData: (nodeId, key, value) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    [key]: value,
                  },
                }
              : node
          ),
        })),

      setNodeData: (nodeId, data) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId ? { ...node, data: { ...data } } : node
          ),
        })),
    }),
    {
      name: "pipeline-editor-store",
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
