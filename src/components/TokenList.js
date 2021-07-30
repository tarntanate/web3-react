import React from "react";
import { TOKENS_BY_NETWORK } from "../utils/TOKENS_BY_NETWORK";
import { TokenBalance } from "./TokenBalance";

export const TokenList = ({ chainId }) => {
  return (
    <>
      {TOKENS_BY_NETWORK[chainId].map((token) => (
        <TokenBalance key={token.address} {...token} />
      ))}
    </>
  );
};
