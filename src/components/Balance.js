import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const Balance = () => {
  const { account, library } = useWeb3React();
  console.debug(account);
  // console.debug(library);
  const { data: balance, mutate: mutateBalance, error } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });

  useEffect(() => {
    // listen for changes on an Ethereum address
    library.on("block", (value) => {
      console.log("on.('block') event ...", value);
      // When block is updating, just set the balance to undefined and re-validate
      mutateBalance(undefined, true);
    });

    library.on("blockNumber", (blockNumber) => {
      console.log({ blockNumber });
    });
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners("block");
    };
    // trigger the effect only on component mount
  }, []);

  if (error) {
    return <div>Error loading balance!</div>
  }

  if (!balance) {
    return <div>Loading balance...</div>;
  }
  return <div>Balance: {parseFloat(formatEther(balance)).toPrecision(6)}</div>;
};
