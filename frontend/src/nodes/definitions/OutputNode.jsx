import { Position } from "reactflow";
import BaseNode from "../BaseNode";

import { NODE_ACCENTS, OUTPUT_NAME_PREFIX } from "../../constants";

import { getNextIndexedName } from "../utils/namingHelpers";

const outputNodeConfig = {
  title: "Output",
  description: "Pass data out of your pipeline",
  accentColor: NODE_ACCENTS.OUTPUT,

  fields: [
    {
      key: "outputName",
      label: "Output",
      inputType: "text",
      defaultValue: ({ data }) =>
        data?.outputName || getNextIndexedName(OUTPUT_NAME_PREFIX),
      helperText: "Readable label for this pipeline output.",
    },
    {
      key: "outputType",
      label: "Format",
      inputType: "select",
      defaultValue: ({ data }) => data?.outputType || "Text",
      options: [
        { label: "Text", value: "Text" },
        { label: "Image", value: "Image" },
        { label: "JSON", value: "JSON" },
      ],
    },
    {
      key: "isPrimary",
      label: "Mark as primary",
      inputType: "checkbox",
      defaultValue: ({ data }) => Boolean(data?.isPrimary),
      helperText: "Primary outputs surface first in API responses.",
    },
  ],

  handles: [
    {
      type: "target",
      position: Position.Left,
      idSuffix: "value",
      style: { top: "50%" },
    },
  ],
};

const OutputNode = (props) => {
  return <BaseNode {...props} nodeConfig={outputNodeConfig} />;
};

export default OutputNode;
