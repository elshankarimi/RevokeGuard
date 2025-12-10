// src/App.jsx
import React from "react"
import { WagmiConfig } from "wagmi"
import { wagmiClient } from "./lib/wallet"
import { createAppKit } from "@reown/appkit/react"
import ConnectWallet from "./components/ConnectWallet"

const appKit = createAppKit({
  projectId: "YOUR_PROJECT_ID",
  metadata: {
    name: "RevokeGuard",
    description: "Manage token allowances safely",
    url: "https://your-domain.com",
    icons: ["https://your-domain.com/icon.png"],
  },
})

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <appKit.Provider>
        <ConnectWallet />
        {/* سایر کامپوننت‌های برنامه */}
      </appKit.Provider>
    </WagmiConfig>
  )
}

export default App 
