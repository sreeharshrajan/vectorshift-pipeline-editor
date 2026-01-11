export const buildNodeData = (fields, { id, data = {} }) => {
  return fields.reduce((acc, field) => {
    if (!field.key) return acc;

    if (data[field.key] !== undefined) {
      acc[field.key] = data[field.key];
    } else if (typeof field.defaultValue === "function") {
      acc[field.key] = field.defaultValue({ id, data });
    } else {
      acc[field.key] = field.defaultValue ?? "";
    }

    return acc;
  }, {});
};
