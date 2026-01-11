import { Position } from "reactflow";
import BaseNode from "../BaseNode";

import { NODE_ACCENTS, INPUT_NAME_PREFIX } from "../../constants";
import { getNextIndexedName } from "../utils";

const inputNodeConfig = {
  title: "Input",
  description: "Pass values of various data types into your pipeline",
  accentColor: NODE_ACCENTS.OUTPUT,

  fields: [
    {
      key: "inputName",
      label: "Name",
      inputType: "text",
      defaultValue: ({ id, data }) =>
        data?.inputName || getNextIndexedName(INPUT_NAME_PREFIX),
      helperText: "Unique identifier surfaced to downstream nodes.",
      inputProps: {
        placeholder: "Input name",
      },
    },
    {
      key: "inputType",
      label: "Type",
      inputType: "select",
      defaultValue: ({ data }) => data?.inputType || "Text",
      options: [
        { label: "Text", value: "Text" },
        { label: "Number", value: "Number" },
        { label: "File", value: "File" },
      ],
    },
  ],

  handles: [
    {
      type: "source",
      position: Position.Right,
      idSuffix: "value",
      style: { top: "50%" },
    },
  ],
};

const InputNode = (props) => {
  return <BaseNode {...props} nodeConfig={inputNodeConfig} />;
};

export default InputNode;
