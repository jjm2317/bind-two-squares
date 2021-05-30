const removeEventInAllNodes = (iterable, eventName) =>
  [...iterable].forEach((node) => (node[eventName] = null));

export { removeEventInAllNodes };
