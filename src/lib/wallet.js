// src/lib/wallet.js
import { configureChains, createClient } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains'
import { injectedWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
// مسیر درست publicProvider در نسخه‌های جدید
import { publicProvider } from 'wagmi/providers/public'

const chains = [mainnet, polygon, arbitrum, optimism, base]

// پیکربندی شبکه‌ها و providers
const { connectors } = configureChains(chains, [publicProvider()])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
}) 
