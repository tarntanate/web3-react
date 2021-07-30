import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import ERC20ABI from "../ABI/ERC20.abi.json";

export const Balance = () => {
  const { account, library } = useWeb3React();
  console.debug(account);
  // console.debug(library);
  const {
    data: balance,
    mutate: mutateBalance,
    error,
  } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library, ERC20ABI),
  });

  // Initially, SWR will fetch the account balance,
  // and then every time it receives a block event it will use mutate to trigger a re-fetch.
  useEffect(() => {
    // listen for changes on an Ethereum address
    // The events will be depend on which library you're using
    library.on("block", (value) => {
      console.log("on.('block') event ...", value);
      // When block is updating, just set the balance to undefined and re-validate
      mutateBalance(undefined, true);
    });

    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners("block");
    };
    // trigger the effect only on component mount
  }, []);

  if (error) {
    return <div>Error loading balance!</div>;
  }

  if (!balance) {
    return <div>Loading balance...</div>;
  }
  return <div>Balance: {parseFloat(formatEther(balance)).toPrecision(6)}</div>;
};
