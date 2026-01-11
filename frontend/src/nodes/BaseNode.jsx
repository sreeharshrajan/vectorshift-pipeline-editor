import React, { memo, useMemo, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { renderField } from "./utils/fieldRenderer";
import { getHandleId } from "./utils/handleHelpers";

const BaseNode = memo(({ id, data = {}, nodeConfig }) => {
  const {
    title = "Node",
    description,
    fields = [],
    handles = [],
    accentColor = "#7c3aed",
  } = nodeConfig;

  const leftHandles = useMemo(
    () => handles.filter((h) => h.position === Position.Left),
    [handles]
  );

  const rightHandles = useMemo(
    () => handles.filter((h) => h.position === Position.Right),
    [handles]
  );

  const noop = useCallback(() => {}, []);

  return (
    <div
      className="
            w-[350px] min-h-[150px] rounded-xl border transition-all duration-200
            bg-white border-slate-200 text-slate-900
            dark:bg-[#1a1f2e] dark:border-[#2e374a] dark:text-slate-100
            hover:border-violet-500/50 shadow-lg
        "
    >
      {leftHandles.map((h) => (
        <Handle
          key={h.idSuffix || `left-${h.id}`}
          type={h.type}
          position={Position.Left}
          id={getHandleId(h, id)}
          className="!w-3 !h-3 !border-2 border-white dark:border-[#1a1f2e] !bg-slate-400"
        />
      ))}

      <div className="px-4 py-4 border-b border-slate-100 dark:border-[#2e374a]">
        <h3 className="font-bold text-base flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            {description}
          </p>
        )}
      </div>

      <div className="p-4 space-y-5">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-2">
            {field.label && (
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {field.label}
              </label>
            )}
            <div
              className="
                            rounded-md overflow-hidden text-sm
                            bg-slate-50 border border-slate-200 text-slate-900
                            dark:bg-[#2e374a] dark:border-transparent dark:text-white
                        "
            >
              <div
                className="
                                [&_input]:bg-transparent [&_select]:bg-transparent 
                                [&_input]:text-inherit [&_select]:text-inherit 
                                [&_option]:bg-[#1a1f2e] [&_option]:text-white
                                [&_input]:w-full [&_input]:p-2 [&_select]:w-full [&_select]:p-2 
                                [&_select]:outline-none [&_input]:outline-none
                            "
              >
                {renderField(field, data[field.key], noop)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {rightHandles.map((h) => (
        <Handle
          key={h.idSuffix || `right-${h.id}`}
          type={h.type}
          position={Position.Right}
          id={getHandleId(h, id)}
          className="!w-3 !h-3 !border-2 border-white dark:border-[#1a1f2e] !bg-slate-400"
        />
      ))}
    </div>
  );
});

BaseNode.displayName = "BaseNode";
export default BaseNode;
