import React, { memo, useMemo, useRef, useLayoutEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { renderField, resolveHandleId } from "./utils";
import { buildInitialState } from "./utils/stateHelpers";
import { useNodeFieldUpdater } from "./hooks/useNodeFieldUpdater";

const BaseNode = memo(({ id, data = {}, nodeConfig }) => {
  const nodeRef = useRef(null);
  const fieldRefs = useRef({});
  const [dimensions, setDimensions] = useState({});

  const {
    title = "Node",
    description,
    fields = [],
    handles = [],
    accentColor = "#7c3aed",
  } = nodeConfig;

  const values = useMemo(
    () => buildInitialState(fields, { id, data }),
    [fields, id, data]
  );

  const leftHandles = useMemo(
    () => handles.filter((h) => h.position === Position.Left),
    [handles]
  );

  const rightHandles = useMemo(
    () => handles.filter((h) => h.position === Position.Right),
    [handles]
  );

  useLayoutEffect(() => {
    if (!nodeRef.current) return;

    const dims = {};
    const nodeRect = nodeRef.current.getBoundingClientRect();

    Object.entries(fieldRefs.current).forEach(([key, el]) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        dims[key] = {
          top: rect.top - nodeRect.top,
          height: rect.height,
        };
      }
    });

    setDimensions(dims);
  }, [fields, data]);

  const updateField = useNodeFieldUpdater(id);

  const calculateHandleTop = (handle, sideHandles) => {
    const sameGroupHandles = sideHandles.filter(
      (h) => h.fieldKey === handle.fieldKey && h.anchor === handle.anchor
    );
    const indexInGroup = sameGroupHandles.findIndex((h) => h.id === handle.id);
    const groupSize = sameGroupHandles.length;

    let baseTop = 0;
    let availableHeight = 0;

    if (handle.fieldKey && dimensions[handle.fieldKey]) {
      baseTop = dimensions[handle.fieldKey].top;
      availableHeight = dimensions[handle.fieldKey].height;
    } else if (handle.anchor === "header") {
      baseTop = 0;
      availableHeight = 70;
    } else {
      return `${
        ((sideHandles.indexOf(handle) + 1) * 100) / (sideHandles.length + 1)
      }%`;
    }

    const step = availableHeight / (groupSize + 1);
    return baseTop + step * (indexInGroup + 1);
  };

  return (
    <div
      ref={nodeRef}
      className="
        w-[350px] min-h-[150px] rounded-xl border transition-all duration-200
        bg-white border-slate-200 text-slate-900
        dark:bg-[#1a1f2e] dark:border-[#2e374a] dark:text-slate-100
        hover:border-violet-500/50 shadow-lg relative
      "
    >
      {leftHandles.map((handle) => (
        <Handle
          key={`${id}-left-${handle.id}`}
          type={handle.type}
          position={Position.Left}
          id={resolveHandleId(handle, { id })}
          style={{ top: calculateHandleTop(handle, leftHandles) }}
          className="!w-3 !h-3 !border-2 border-white dark:border-[#1a1f2e] !bg-violet-400"
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
          <div
            key={field.key}
            ref={(el) => (fieldRefs.current[field.key] = el)}
            className="flex flex-col gap-2"
          >
            {field.label && (
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {field.label}
              </label>
            )}
            <div className="rounded-md overflow-hidden text-sm bg-slate-50 border border-slate-200 dark:bg-[#2e374a] dark:border-transparent">
              <div className="[&_input:not([type=checkbox])]:bg-transparent [&_input:not([type=checkbox])]:w-full [&_input:not([type=checkbox])]:p-2 [&_input:not([type=checkbox])]:outline-none [&_select]:bg-transparent [&_select]:w-full [&_select]:p-2 [&_select]:outline-none">
                {renderField(field, values[field.key], (next) =>
                  updateField(field.key, next)
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {rightHandles.map((handle) => (
        <Handle
          key={`${id}-right-${handle.id}`}
          type={handle.type}
          position={Position.Right}
          id={resolveHandleId(handle, { id })}
          style={{ top: calculateHandleTop(handle, rightHandles) }}
          className="!w-3 !h-3 !border-2 border-white dark:border-[#1a1f2e] !bg-emerald-400"
        />
      ))}
    </div>
  );
});

BaseNode.displayName = "BaseNode";
export default BaseNode;
