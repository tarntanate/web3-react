import React, { Suspense } from "react";
import { TOKENS_BY_NETWORK } from "../utils/TOKENS_BY_NETWORK";
import { ERC20View } from "./ERC20View";
import { EtherView } from "./EtherView";

export const DisplayInfo = ({ chainId }) => {
  console.debug(TOKENS_BY_NETWORK[chainId]);

  return (
    <>
      <Suspense fallback={<pre>Ether...</pre>}>
        <EtherView />
      </Suspense>
      <hr />
      <Suspense fallback={<pre>Tokens...</pre>}>
        {TOKENS_BY_NETWORK[chainId].map((token) => (
        //   <ERC20View key={token.address} {...token} />
          <div>{token.name} : {token.address} </div>
        ))}
      </Suspense>
    </>
  );
};
