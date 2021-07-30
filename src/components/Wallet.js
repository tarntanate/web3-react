import React from "react";
import { UnsupportedChainIdError } from "@web3-react/core";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../connectors/injectedConnector";
import { Balance } from "./Balance";


export const Wallet = () => {
  const { chainId, account, activate, active, error } = useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  const onClick = () => {
    activate(injectedConnector);
  };

  if (isUnsupportedChainIdError)
    return (
      <div>
        Error: Unsupported chain Id!!
      </div>
    );

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (
        <div>
          <Balance />
          {/* <DisplayInfo chainId={chainId} /> */}
        </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  );
};
