import { http, createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains'
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  injectedWallet
} from '@rainbow-me/rainbowkit/wallets'

// توجه: wagmi v2 فقط از RainbowKit برای کانکتورها استفاده می‌کند
// و دیگر "walletConnect" یا "injected" به صورت مستقیم وجود ندارد.

export const projectId = 'ac634d78fb9387e384997db507c695b3'

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http()
  }
})

export const connectors = [
  metaMaskWallet({ projectId, chains: config.chains }),
  rainbowWallet({ projectId, chains: config.chains }),
  walletConnectWallet({ projectId, chains: config.chains }),
  injectedWallet({ chains: config.chains })
] 
