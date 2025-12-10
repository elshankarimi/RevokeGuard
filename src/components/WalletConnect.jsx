import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

export default function WalletConnect() {
  const { connect } = useConnect({
    connector: new InjectedConnector()
  })
  const { connect: wcConnect } = useConnect({
    connector: new WalletConnectConnector({ options: { qrcode: true } })
  })
  const { disconnect } = useDisconnect()
  const { isConnected, address } = useAccount()

  if (isConnected)
    return (
      <div>
        <p>متصل شده به: {address}</p>
        <button onClick={() => disconnect()}>قطع اتصال کیف پول</button>
      </div>
    )

  return (
    <div>
      <button onClick={() => connect()}>اتصال MetaMask</button>
      <button onClick={() => wcConnect()}>اتصال WalletConnect</button>
    </div>
  )
}
