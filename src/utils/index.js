// import { Web3Provider } from "@ethersproject/providers";
// import { Key } from "swr"
// import { ABI } from "../abi/index";
import { Contract } from "@ethersproject/contracts";
import memoize from "fast-memoize";

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
  
export function buildContract(address, abi, library) {
  return new Contract(address, abi, library.getSigner());
}

export const memoizedBuildContract = memoize(buildContract);

export const ethMethodKey = (args) => {
  return args;
};

export const ethContractKey = (args) => {
  return [...args];
};

export const web3Fetcher =
  (library, ABIs) =>
  async (...args) => {
    // debugger
    const [abi] = args;
    const isContract = ABIs.get(abi) !== undefined;
    if (isContract) {
      const [_, address, method, ...params] = args;
      // extract as buildContract memoized
      const contract = buildContract(address, ABIs.get(abi), library);
      console.log({ contract: address, method, params });
      return contract[method](...params);
    }
    const [method, ...params] = args;
    console.log({ method, params });
    return library[method](...params);
  };


