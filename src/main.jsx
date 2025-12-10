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
  zkSync
} from 'wagmi/chains'
import { Web3Modal } from '@web3modal/wagmi/react'
import { walletConnect, injected } from 'wagmi/connectors'
import App from './App'
import './index.css'

const projectId = 'ac634d78fb9387e384997db507c695b3'

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
  zkSync
]

const config = createConfig({
  autoConnect: true,
  connectors: [
    walletConnect({ projectId, chains }),
    injected({ chains })
  ],
  transports: Object.fromEntries(chains.map(chain => [chain.id, http()])),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <App />
      <Web3Modal projectId={projectId} chains={chains} />
    </WagmiProvider>
  </React.StrictMode>
)
