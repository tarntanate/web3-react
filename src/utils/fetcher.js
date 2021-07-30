
export const fetcher = (library) => (...args) => {
  const [method, ...params] = args;
  console.debug("fetcher method:", method);
  // console.debug(params);
  // console.debug("library[method]:", library[method]);
  return library[method](...params);
};
