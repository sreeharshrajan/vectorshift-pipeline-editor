export const getHandleId = (handle, nodeId) => {
  return handle.idSuffix ? `${nodeId}-${handle.idSuffix}` : nodeId;
};
