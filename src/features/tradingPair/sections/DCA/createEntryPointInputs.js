const createEntryPointInputs = (entryPoints, length) => {
  const more = length - entryPoints.length;
  const entryPointInputs = [...entryPoints.slice(0, length)];
  for (let i = 0; i < more; i++) {
    entryPointInputs.push({
      position: -10,
      multiples: 2,
    });
  }
  return entryPointInputs;
};

export default createEntryPointInputs;
