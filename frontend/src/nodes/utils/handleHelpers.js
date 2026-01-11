export const getHandleId = (handle, nodeId) => {
  return handle.idSuffix ? `${nodeId}-${handle.idSuffix}` : nodeId;
};

export const resolveHandleId = (handleConfig, context) => {
  const { idSuffix } = handleConfig;

  if (idSuffix) {
    return `${context.id}-${idSuffix}`;
  }

  return context.id;
};
