import React, { useEffect } from "react";
import { Web3ReactProvider, UnsupportedChainIdError } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { formatEther } from "@ethersproject/units";
import useSWR from "swr";
// import { EtherView } from "./components/EtherView";
import { DisplayInfo } from "./components/DisplayInfo";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    56, // BSC Mainnet(ChainID 0x38, 56 in decimal)
    97, // BSC Testnet(ChainID 0x61, 97 in decimal)
  ],
});

function getLibrary(provider) {
  console.debug(provider);

  const library = new Web3Provider(provider);

  console.debug(library);
  library.pollingInterval = 12000;
  return library;
}

const fetcher =
  (library) =>
  (...args) => {
    const [method, ...params] = args;
    console.log(method, params);
    return library[method](...params);
  };

export const Wallet = () => {
  const { chainId, account, activate, active, error } = useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  const onClick = () => {
    activate(injectedConnector);
  };

  if (isUnsupportedChainIdError) return (
    <div>
      Error: Unsupported chain Id!!
    </div>
  )

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

export const Balance = () => {
  const { account, library } = useWeb3React();
  // console.debug(account);
  // console.debug(library);

  const { data: balance, mutate } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for blocks...`);
    library.on("block", () => {
      console.log("update balance...");
      mutate(undefined, true);
    });
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners("block");
    };
    // trigger the effect only on component mount
  }, []);

  if (!balance) {
    return <div>...</div>;
  }
  return <div>Balance: {parseFloat(formatEther(balance)).toPrecision(4)}</div>;
};

export const App = () => {
  return (
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Wallet />
      </Web3ReactProvider>
    </React.StrictMode>
  );
};

// https://consensys.net/blog/developers/how-to-fetch-and-update-data-from-ethereum-with-react-and-swr/
export default App;
