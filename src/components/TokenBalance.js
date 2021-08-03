import React, { useEffect } from "react";
import useSWR from "swr";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { formatUnits } from "@ethersproject/units";
// import { Contract } from "@ethersproject/contracts";
import { fetcher } from "../utils/fetcher";
// import ERC20ABI from "../ABI/ERC20.abi.json";
import myContractABI from "../ABI/myContract.abi.json";

export const TokenBalance = ({ symbol, address, decimals }) => {
  const { account, library } = useWeb3React();
  const { data: counter, error } = useSWR([address, "getCounter"], {
    fetcher: fetcher(library, myContractABI),
  });

  const increase = (e) => {
    e.preventDefault();
    const methodName = "increase";
    // const { data, error } = fetcher(library, myContractABI)(address, methodName);
    const contract = new Contract(address, myContractABI, library.getSigner());
    // console.debug(contract);
    // console.debug(contract[methodName]);
    // contract[methodName]();
    contract.increase();
    // console.debug(data);
  };

  const reset = (e) => {
    e.preventDefault();
    const contract = new Contract(address, myContractABI, library.getSigner());
    contract.reset();
  };

  const failForNonZero = async (e) => {
    e.preventDefault();
    const contract = new Contract(address, myContractABI, library.getSigner());
    try {
      await contract.failForNonZero(5);
    } catch (error) {
      console.debug(error.data);
    }
  };

  // const { data: balance2 } = useSWR([address, "increase"], {
  //   fetcher: fetcher(library, myContractABI),
  // });

  // useEffect(() => {
  //   // listen for changes on an Ethereum address
  //   console.log(`listening for Transfer...`);
  //   const contract = new Contract(address, myContractABI);

  //   console.log(contract);
  //   // const fromMe = contract.filters.Transfer(account, null);
  //   // library.on(fromMe, (from, to, amount, event) => {
  //   //   console.log("Transfer|sent", { from, to, amount, event });
  //   //   mutate(undefined, true);
  //   // });
  //   // const toMe = contract.filters.Transfer(null, account);
  //   // library.on(toMe, (from, to, amount, event) => {
  //   //   console.log("Transfer|received", { from, to, amount, event });
  //   //   mutate(undefined, true);
  //   // });

  //   // remove listener when the component is unmounted
  //   // return () => {
  //   //   library.removeAllListeners(toMe);
  //   //   library.removeAllListeners(fromMe);
  //   // };
  //   // trigger the effect only on component mount
  // }, []);

  if (error) {
    return (
      <div style={{ color: "red" }}>
        Error loading {symbol}: {error.message}
      </div>
    );
  }

  if (!counter) {
    return <div>Loading counter........</div>;
  }

  return (
    <div>
      getCounter: {formatUnits(counter, 0)}{" "}
      <button onClick={increase} type="button">
        Increase
      </button>{" "}
      <button style={{ backgroundColor: "red" }} onClick={reset} type="button">
        Reset
      </button>
      <button style={{ backgroundColor: "blue" }} onClick={failForNonZero} type="button">
      failForNonZero
      </button>
      {/* {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol} */}
    </div>
  );
};
