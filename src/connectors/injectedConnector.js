import { InjectedConnector } from "@web3-react/injected-connector";

// Browser Extension/dApp Browser

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1,
    3,
    4,
    5,
    42,
    56, // BSC MainNet
    97, // BSC Testnet(ChainID 0x61, 97 in decimal)
  ],
});
