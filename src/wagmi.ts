import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { http, createConfig } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const config = createConfig({
  chains: [base, mainnet],
  connectors: [
    farcasterFrame(), // digunakan jika dalam Farcaster Frame
    new MetaMaskConnector({ chains: [base, mainnet] }), // fallback untuk web biasa
  ],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
