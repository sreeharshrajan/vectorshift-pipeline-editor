import BaseNode from "../BaseNode";
import { buildNodeData } from "../utils";
import { Position } from "reactflow";
import { NODE_ACCENTS } from "../../constants";


const LLMConfig = {
  title: "LLM",
  description: "This is a LLM, utilize LLMs in your pipelines.",
  badge: "Processor",
  accentColor: NODE_ACCENTS.OUTPUT,


  fields: [],

  handles: [
    {
      id: "system",
      type: "target",
      position: Position.Left,
      idSuffix: "system",
    },
    {
      id: "prompt",
      type: "target",
      position: Position.Left,
      idSuffix: "prompt",
    },
    {
      id: "response",
      type: "source",
      position: Position.Right,
      idSuffix: "response",
    },
    {
      key: "temperature",
      label: "Temperature",
      inputType: "number",
      defaultValue: 0.7,
      inputProps: { min: 0, max: 1, step: 0.1 },
      helperText: "Higher values increase creativity.",
    },
  ],
};

const LLMNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} nodeConfig={LLMConfig} />;
};

LLMNode.defaultData = ({ id, data }) =>
  buildNodeData(LLMConfig.fields, { id, data });

export default LLMNode;
