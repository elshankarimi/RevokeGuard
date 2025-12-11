// src/lib/wallet.js

import { configureChains, createClient, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { 
  injectedWallet, 
  metaMaskWallet, 
  rainbowWallet, 
  walletConnectWallet 
} from '@rainbow-me/rainbowkit/wallets'

// تنظیم شبکه‌ها و provider
export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.arbitrum, chain.optimism, chain.base],
  [publicProvider()]
)

// تنظیم کانکتور ولت‌ها
export const connectors = [
  injectedWallet({ chains }),
  metaMaskWallet({ chains }),
  rainbowWallet({ chains }),
  walletConnectWallet({ chains })
]

// ساخت Wagmi client
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
}) 
