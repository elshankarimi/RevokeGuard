// src/providers/wallet.ts

import { http } from "viem";
import { mainnet, base } from "wagmi/chains";
import { createConfig } from "wagmi";

/**
 * Global Wagmi + Viem Config (wagmi v2)
 * You can add more chains here (Polygon, Arbitrum, etc.)
 */

export const config = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),   // default public RPC
    [base.id]: http(),      // default public RPC
  },
});
