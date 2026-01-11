import { Position } from "reactflow";
import BaseNode from "../BaseNode";
import { NODE_ACCENTS, textareaStyle } from "../../constants";

const buildHandles = (text = "") => {
  const matches = Array.from(
    text.matchAll(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g)
  ).map((m) => m[1]);

  const names = [...new Set(matches)];
  const count = names.length || 1;

  const inputHandles = names.length
    ? names.map((name, i) => ({
        type: "target",
        position: Position.Left,
        idSuffix: name,
        style: {
          top: count === 1 ? "50%" : `${30 + (i * 40) / (count - 1)}%`,
        },
      }))
    : [
        {
          type: "target",
          position: Position.Left,
          idSuffix: "input",
          style: { top: "50%" },
        },
      ];

  return [
    ...inputHandles,
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
  badge: "Utility",
  description: "Combine variables into a static or templated string.",
  accentColor: NODE_ACCENTS.TEXT,

  fields: [
    {
      key: "text",
      label: "Template",
      inputType: "textarea",
      defaultValue: ({ data }) => data?.text || "{{input}}",
      helperText: "Supports moustache-style variables, e.g. {{input}}.",
      render: ({ value = "", onChange }) => {
        const rows = Math.max(4, Math.min(value.split("\n").length, 20));

        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              ...textareaStyle,
              minHeight: rows * 18,
              resize: "none",
            }}
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
};

const TextNode = (props) => {
  const text = props.data?.text || "";

  return (
    <BaseNode
      {...props}
      nodeConfig={{
        ...textNodeConfig,
        handles: buildHandles(text),
      }}
    />
  );
};

export default TextNode;
