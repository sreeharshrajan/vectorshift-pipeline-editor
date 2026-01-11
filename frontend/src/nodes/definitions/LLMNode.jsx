import BaseNode from "../BaseNode";
import { buildNodeData } from "../utils";
import { Position } from "reactflow";
import { NODE_ACCENTS } from "../../constants";

const LLMConfig = {
  title: "LLM",
  description: "This is a LLM, utilize LLMs in your pipelines.",
  badge: "Processor",
  accentColor: NODE_ACCENTS.AI,

  fields: [
    {
      key: "model",
      label: "Provider",
      inputType: "select",
      defaultValue: ({ data }) => data?.model || "gpt-4",
      options: [
        { label: "GPT-4", value: "gpt-4" },
        { label: "GPT-4o Mini", value: "gpt-4o-mini" },
        { label: "Claude 3 Haiku", value: "claude-3-haiku" },
      ],
    },
    {
      key: "prompt",
      label: "Prompt",
      inputType: "textarea",
      defaultValue: ({ data }) => data?.prompt || "",
      inputProps: {
        rows: 4,
      },
      helperText: "Higher values increase creativity. Range 0–1.",
    },
    {
      key: "maxTokens",
      label: "Max tokens",
      inputType: "number",
      defaultValue: ({ data }) => data?.maxTokens || 1024,
      inputProps: {
        min: 64,
        step: 64,
      },
    },
  ],

  handles: [
    { id: "system", type: "target", position: Position.Left, order: 0 },
    { id: "prompt", type: "target", position: Position.Left, order: 1 },
    {
      id: "response",
      type: "source",
      position: Position.Right,
    },
  ],
};

const LLMNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} nodeConfig={LLMConfig} />;
};

LLMNode.defaultData = ({ id, data }) =>
  buildNodeData(LLMConfig.fields, { id, data });

export default LLMNode;
