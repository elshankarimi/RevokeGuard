import React from 'react'

export default function RevokeRow({ approval }) {
  const handleRevoke = () => {
    alert(`دسترسی ${approval.token} به ${approval.spender} لغو شد (Mock)`)
    // TODO: call contract revoke function
  }

  return (
    <div className="card" style={{ marginTop: '0.5rem', padding: '0.5rem' }}>
      <p>توکن: {approval.token}</p>
      <p>Spender: {approval.spender}</p>
      <p>Allowance: {approval.allowance}</p>
      <button onClick={handleRevoke}>لغو دسترسی</button>
    </div>
  )
}
