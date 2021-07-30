import React, { useEffect } from "react";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { formatUnits } from "@ethersproject/units";
import { Contract } from "@ethersproject/contracts";
import { fetcher } from "../utils/fetcher";
import ERC20ABI from "../ABI/ERC20.abi.json";

export const TokenBalance = ({ symbol, address, decimals }) => {
  const { account, library } = useWeb3React();
  const { data: balance, mutate, error } = useSWR([address, "balanceOf", account], {
    fetcher: fetcher(library, ERC20ABI),
  });

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`);
    const contract = new Contract(address, ERC20ABI, library.getSigner());
    const fromMe = contract.filters.Transfer(account, null);
    library.on(fromMe, (from, to, amount, event) => {
      console.log("Transfer|sent", { from, to, amount, event });
      mutate(undefined, true);
    });
    const toMe = contract.filters.Transfer(null, account);
    library.on(toMe, (from, to, amount, event) => {
      console.log("Transfer|received", { from, to, amount, event });
      mutate(undefined, true);
    });
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners(toMe);
      library.removeAllListeners(fromMe);
    };
    // trigger the effect only on component mount
  }, []);

  if (error) {
    return <div style={{ color:"red"}}>Error loading {symbol} balance: {error.message}</div>
  }

  if (!balance) {
    return <div>Loading...{symbol}</div>;
  }
  return (
    <div>
      {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol}
    </div>
  );
};
