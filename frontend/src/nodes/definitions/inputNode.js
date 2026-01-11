import BaseNode from "../BaseNode";
import { Position } from "reactflow";

const inputNodeConfig = {
  title: "Input",
  description: "Defines an input value for the pipeline",

  fields: [
    {
      key: "inputName",
      label: "Name",
      inputType: "text",
      inputProps: {
        placeholder: "Input name",
      },
    },
    {
      key: "inputType",
      label: "Type",
      inputType: "select",
      options: [
        { label: "Text", value: "Text" },
        { label: "File", value: "File" },
      ],
    },
  ],

  handles: [
    {
      type: "source",
      position: Position.Right,
      idSuffix: "value",
    },
  ],
};

const InputNode = (props) => {
  return <BaseNode {...props} nodeConfig={inputNodeConfig} />;
};

export default InputNode;
