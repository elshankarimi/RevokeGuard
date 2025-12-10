// src/lib/wallet.js
import { configureChains, createClient } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains'
import { injectedWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { publicProvider } from '@wagmi/core/providers/public' // <-- مسیر درست

const chains = [mainnet, polygon, arbitrum, optimism, base]

export const { connectors } = configureChains(chains, [publicProvider()])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
}) 
