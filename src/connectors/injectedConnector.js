import { InjectedConnector } from "@web3-react/injected-connector";

import { NetworkConnector } from "@web3-react/network-connector";
import { Networks } from "../utils/Networks";

const POLLING_INTERVAL = 12000;

// https://docs.binance.org/smart-chain/developer/rpc.html
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
  4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
  56: "https://bsc-dataseed.binance.org/",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
};

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  defaultChainId: 97,
  pollingInterval: POLLING_INTERVAL,
});

// Browser's Extension/dApp Browser Connector (Eg. Metamask)
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
    Networks.BSCMainNet, // BSC MainNet
    Networks.BSCTestNet, // BSC TestNet
  ],
})
