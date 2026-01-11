export const renderField = (field, value, onChange) => {
  const { inputType = "text", options = [], inputProps = {} } = field;

  const baseClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none";

  switch (inputType) {
    case "select":
      return (
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          {...inputProps}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "textarea":
      return (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          {...inputProps}
        />
      );

    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          {...inputProps}
        />
      );

    case "number":
      return (
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) =>
            onChange(e.target.value === "" ? "" : Number(e.target.value))
          }
          className={baseClass}
          {...inputProps}
        />
      );

    default:
      return (
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          {...inputProps}
        />
      );
  }
};
