// constants/styles.js

export const inputBaseStyle = {
    borderRadius: 8,
    border: "1px solid var(--border-node)",
    padding: "6px 8px",
    fontSize: 12,
    lineHeight: 1.4,
    color: "var(--text-primary)",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    background: "var(--bg-node)",
    transition: "all 0.2s ease", 
};

export const textareaStyle = {
    ...inputBaseStyle,
    minHeight: 64,
    resize: "vertical",
};

export const baseContainerStyle = {
    width: 400,
    minHeight: 140,
    borderRadius: 14,
    border: "1px solid var(--border-node)",
    background: "var(--bg-node-gradient)",
    boxShadow: "0 12px 24px rgba(15, 23, 42, 0.15)",
    padding: "4px 6px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontFamily: "'Open Sans', 'Roboto', sans-serif",
    color: "var(--text-primary)",
    transition: "background 0.3s ease, border-color 0.3s ease",
};

export const checkboxStyle = {
    width: "auto",
    background: "transparent",
    border: "none",
    boxShadow: "none",
};