import React, { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import RevokeRow from './RevokeRow'
import { fetchApprovals } from './revokeScanner'

export default function RevokeScanner() {
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()
  const [approvals, setApprovals] = useState([])
  const [loading, setLoading] = useState(false)

  const scanApprovals = async () => {
    if (!address) return
    setLoading(true)
    try {
      const data = await fetchApprovals(address)
      setApprovals(data)
    } catch (err) {
      console.error(err)
      alert('خطا در اسکن دسترسی‌ها')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!isConnected && <p>لطفاً کیف پول خود را متصل کنید.</p>}
      {isConnected && (
        <>
          <button onClick={scanApprovals}>اسکن دسترسی‌ها</button>
          {loading && <p>در حال اسکن...</p>}
          <div>
            {approvals.map((a, idx) => (
              <RevokeRow key={idx} approval={a} signer={signer} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
