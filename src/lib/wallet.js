import { createConfig, http } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'

const projectId = 'ac634d78fb9387e384997db507c695b3'

const chains = [mainnet, polygon, arbitrum, optimism, base]

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    walletConnect({ projectId, chains }),
    injected({ chains })
  ],
  transports: Object.fromEntries(chains.map(chain => [chain.id, http()])),
})

export { chains }
