import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, base } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppKitButton } from "@reown/appkit/react";

const config = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div style={{ padding: 20 }}>
          <AppKitButton />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 
