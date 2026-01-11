// nodes/utils/stateHelpers.js

export const buildInitialState = (fields, { id, data }) => {
  return fields.reduce((acc, field) => {
    const { key, defaultValue } = field;
    if (!key) return acc;

    if (data?.[key] !== undefined) {
      acc[key] = data[key];
      return acc;
    }

    if (typeof defaultValue === "function") {
      acc[key] = defaultValue({ id, data });
      return acc;
    }

    acc[key] = defaultValue ?? "";
    return acc;
  }, {});
};
