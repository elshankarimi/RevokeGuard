import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import App from './App'
import './styles/index.css'

// react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false }
  }
})

// wagmi chains + client
const { provider, webSocketProvider } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
)
const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>
)
