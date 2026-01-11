import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { Header } from "../components/Header";

// Nodes
import InputNode from "../nodes/definitions/InputNode";
import LLMNode from "../nodes/definitions/LLMNode";
import OutputNode from "../nodes/definitions/OutputNode";
import TextNode from "../nodes/definitions/TextNode";

import "reactflow/dist/style.css";
import { WelcomeBox } from "../components/WelcomeBox";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  theme: state.theme,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isInteractive, setIsInteractive] = useState(true);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    theme,
  } = useStore(selector, shallow);

  const themeMode = theme === "dark" ? "dark" : "light";

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event.dataTransfer.getData("application/reactflow");
      if (!raw) return;

      const { nodeType } = JSON.parse(raw);
      if (!nodeType) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(nodeType);

      addNode({
        id: nodeID,
        type: nodeType,
        position,
        data: getInitNodeData(nodeID, nodeType),
      });
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden ${
        themeMode === "dark" ? "bg-[#0f172a]" : "bg-white"
      }`}
    >
      <Header nodeCount={nodes.length} edgeCount={edges.length} />

      <div ref={reactFlowWrapper} className="flex-1 relative">
        {nodes.length === 0 && <WelcomeBox />}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          colorMode={themeMode}
          connectionLineType="smoothstep"
          zoomOnScroll={isInteractive}
          panOnScroll={isInteractive}
          panOnDrag={isInteractive}
          fitView
          fitViewOptions={{
            padding: 0.2,
            minZoom: 0.6,
            maxZoom: 0.8,
          }}
          className="rf-edge-hover"
        >
          <Background
            color={themeMode === "dark" ? "#334155" : "#cbd5e1"}
            variant="dots"
          />
          <Controls
            className="flex flex-row dark:bg-slate-800 dark:border-slate-700 shadow-xl"
            position="top-right"
            onInteractiveChange={setIsInteractive}
            showInteractive={true}
            aria-label="React Flow Controls"
          />
          <MiniMap
            className="dark:bg-slate-900 border overflow-hidden dark:border-slate-700 rounded-lg"
            maskColor={
              themeMode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"
            }
            zoomable
            pannable
            nodeStrokeWidth={3}
          />
        </ReactFlow>
      </div>
    </div>
  );
};
