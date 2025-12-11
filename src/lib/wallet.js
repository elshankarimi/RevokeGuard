// src/lib/wallet.js

import { configureChains, createClient, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'

// ------------------------
// Configure chains and providers
// ------------------------
export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.arbitrum, chain.optimism, chain.base],
  [publicProvider()]
)

// ------------------------
// Wallet connectors
// ------------------------
export const connectors = [
  injectedWallet({ chains }),
  metaMaskWallet({ chains }),
  rainbowWallet({ chains }),
  walletConnectWallet({ chains })
]

// ------------------------
// Create Wagmi client
// ------------------------
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
}) 
