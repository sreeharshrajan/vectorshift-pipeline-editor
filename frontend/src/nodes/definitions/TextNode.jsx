import { Position } from "reactflow";
import BaseNode from "../BaseNode";

import { NODE_ACCENTS, textareaStyle } from "../../constants";

const extractTemplateVariables = (text = "") => {
  const matches = text.matchAll(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g);
  return Array.from(new Set(Array.from(matches).map((m) => m[1])));
};

const buildHandlesFromText = (text) => {
  const names = extractTemplateVariables(text);
  const count = names.length;

  const leftHandles = names.map((name, i) => {
    const top = count <= 1 ? "50%" : `${30 + (i * 40) / (count - 1)}%`;

    return {
      type: "target",
      position: Position.Left,
      idSuffix: name,
      style: { top },
    };
  });

  return [
    ...leftHandles,
    {
      type: "source",
      position: Position.Right,
      idSuffix: "output",
      style: { top: "50%" },
    },
  ];
};

const textNodeConfig = {
  title: "Text",
  description: "Combine variables into a static or templated string.",
  accentColor: NODE_ACCENTS.TEXT,

  fields: [
    {
      key: "text",
      label: "Template",
      inputType: "textarea",
      defaultValue: ({ data }) => data?.text || "{{input}}",
      helperText: "Supports moustache-style variables, e.g. {{input}}.",
      render: ({ value, onChange }) => {
        const text = value || "";
        const lines = text.split("\n").length;
        const rows = Math.max(4, Math.min(lines, 20));

        return (
          <textarea
            style={{
              ...textareaStyle,
              minHeight: rows * 18,
              resize: "none",
            }}
            value={text}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      },
    },
    {
      key: "trimWhitespace",
      label: "Trim whitespace",
      inputType: "checkbox",
      defaultValue: ({ data }) => Boolean(data?.trimWhitespace),
    },
  ],

  /**
   * BaseNode currently expects handles to be static.
   * This can be safely upgraded later to support functions.
   */
  handles: [
    {
      type: "target",
      position: Position.Left,
      idSuffix: "input",
      style: { top: "50%" },
    },
    {
      type: "source",
      position: Position.Right,
      idSuffix: "output",
      style: { top: "50%" },
    },
  ],
};

const TextNode = (props) => {
  const text = props?.data?.text || "";

  return (
    <BaseNode
      {...props}
      nodeConfig={{
        ...textNodeConfig,
        handles: buildHandlesFromText(text),
      }}
    />
  );
};

export default TextNode;
