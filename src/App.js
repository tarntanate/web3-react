import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
// import { EtherView } from "./components/EtherView";
import { DisplayInfo } from "./components/DisplayInfo/DisplayInfo";
import { Wallet } from "./components/Wallet";

function getLibrary(provider) {
  console.debug(provider);

  const library = new Web3Provider(provider);

  console.debug({library});
  library.pollingInterval = 12000;
  return library;
}

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
