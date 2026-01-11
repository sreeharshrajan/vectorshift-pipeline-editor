import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";

import "reactflow/dist/style.css";
import { WelcomeBox } from "./components/WelcomeBox";

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
    <div className="flex flex-col flex-1 bg-bg" data-theme={themeMode}>
      <header className="h-14 px-4 flex items-center border-b border-base-300">
        <h1 className="text-lg font-semibold dark:text-white">
          VectorShift Pipeline Editor
        </h1>
      </header>

      <div ref={reactFlowWrapper} className="flex-1">
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
          connectionLineType="smoothstep"
        >
          <Background gap={20} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
