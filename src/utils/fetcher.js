import { Contract } from "@ethersproject/contracts";
import { isAddress } from "@ethersproject/address";

export const fetcher_old =
  (library) =>
  (...args) => {
    const [method, ...params] = args;
    console.debug("fetcher method:", method);
    // console.debug(params);
    // console.debug("library[method]:", library[method]);
    return library[method](...params);
  };

export const fetcher =
  (library, abi) =>
  (...args) => {
    const [arg1, arg2, ...params] = args;

    if (isAddress(arg1)) {
      // it's a contract
      console.debug("Fetcher: It's a contract.");
      const address = arg1;
      const method = arg2;
      const contract = new Contract(address, abi, library.getSigner());
      return contract[method](...params);
    }
    // it's a eth call
    console.debug("Fetcher: It's a eth call.");
    const method = arg1;
    return library[method](arg2, ...params);
  };
