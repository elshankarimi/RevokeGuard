import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { EthereumClient, w3mProvider, w3mConnectors, Web3Modal } from '@web3modal/ethereum'
import App from './App'
import './index.css'

// 1️⃣ پیکربندی شبکه‌ها و provider ها
const chains = [mainnet]
const projectId = "REPLACE_WITH_YOUR_PROJECT_ID"

const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient: w3mProvider({ projectId })(chains)
})

const ethereumClient = new EthereumClient(config, chains)

// 2️⃣ رندر برنامه
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  </React.StrictMode>
)
