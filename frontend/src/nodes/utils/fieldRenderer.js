// nodes/utils/fieldRenderer.js

export const renderField = (field, value, onChange) => {
  const { inputType = "text", options, inputProps } = field;

  const baseInputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";

  const textareaClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
    "transition-colors resize-none min-h-[80px]";

  const selectClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";

  /**
   * IMPORTANT:
   * Checkbox must stay visually native.
   * No padding, no width, no border overrides.
   */
  const checkboxClasses = "h-4 w-4 cursor-pointer accent-blue-600";

  // ─────────────────────────────────────────────
  // SELECT
  // ─────────────────────────────────────────────
  if (inputType === "select") {
    return (
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={selectClasses}
        {...inputProps}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  // ─────────────────────────────────────────────
  // TEXTAREA
  // ─────────────────────────────────────────────
  if (inputType === "textarea") {
    return (
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={textareaClasses}
        {...inputProps}
      />
    );
  }

  // ─────────────────────────────────────────────
  // CHECKBOX (FIXED)
  // ─────────────────────────────────────────────
  if (inputType === "checkbox") {
    return (
      <label className="flex items-center gap-2 select-none">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className={checkboxClasses}
          {...inputProps}
        />
      </label>
    );
  }

  // ─────────────────────────────────────────────
  // NUMBER
  // ─────────────────────────────────────────────
  if (inputType === "number") {
    return (
      <input
        type="number"
        value={value === undefined || value === null ? "" : value}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? "" : Number(v));
        }}
        className={baseInputClasses}
        {...inputProps}
      />
    );
  }

  // ─────────────────────────────────────────────
  // TEXT (DEFAULT)
  // ─────────────────────────────────────────────
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={baseInputClasses}
      {...inputProps}
    />
  );
};
