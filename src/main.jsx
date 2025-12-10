import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { Web3Modal } from '@web3modal/wagmi/react'
import { walletConnect } from 'wagmi/connectors'
import App from './App'
import './index.css'

// 1️⃣ تنظیمات Web3Modal
const projectId = 'REPLACE_WITH_YOUR_PROJECT_ID'

// 2️⃣ ساخت config برای wagmi
const config = createConfig({
  connectors: [walletConnect({ projectId })],
  transports: {
    [mainnet.id]: http(),
  },
  autoConnect: true,
})

// 3️⃣ رندر برنامه
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <App />
      <Web3Modal projectId={projectId} />
    </WagmiProvider>
  </React.StrictMode>
)
