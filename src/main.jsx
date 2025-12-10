import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider, createConfig, http } from 'wagmi'
import {
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base,
  avalanche,
  bsc,
  fantom,
  gnosis,
  celo,
  zkSync,
} from 'wagmi/chains'
import { Web3Modal } from '@web3modal/wagmi/react'
import {
  walletConnect,
  injected,
  rabby,
  rainbow,
} from 'wagmi/connectors'
import App from './App'
import './index.css'

// 1️⃣ Project ID از Web3Modal Cloud
const projectId = 'ac634d78fb9387e384997db507c695b3'

// 2️⃣ تعریف همه شبکه‌های EVM
const chains = [
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base,
  avalanche,
  bsc,
  fantom,
  gnosis,
  celo,
  zkSync,
]

// 3️⃣ ساخت config با کیف‌پول‌های مختلف
const config = createConfig({
  autoConnect: true,
  connectors: [
    walletConnect({ projectId, chains }), // WalletConnect → Farcaster Wallet, Base Wallet
    injected({ chains }),                 // MetaMask و کیف‌پول‌های مرورگر
    rainbow({ chains }),                  // Rainbow Wallet
    rabby({ chains }),                    // Rabby Wallet
  ],
  transports: Object.fromEntries(chains.map(chain => [chain.id, http()])),
})

// 4️⃣ رندر برنامه
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <App />
      <Web3Modal projectId={projectId} chains={chains} />
    </WagmiProvider>
  </React.StrictMode>
)
