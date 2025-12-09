import { useState } from 'react';
import { connectToMetamask, checkApprovals, revokeToken } from './utils/web3';

function App() {
  const [address, setAddress] = useState('');
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError(null);
      const connectedAddress = await connectToMetamask();
      setAddress(connectedAddress);
    } catch (e) {
      setError(e.message || 'Failed to connect wallet.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckApprovals = async () => {
    if (!address) {
      setError('Please connect your wallet first.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      // Fetch approvals from our Cloudflare Worker backend
      const response = await fetch(`https://revokeguard-worker.yourdomain.com/approvals?address=${address}`); // Placeholder
      const data = await response.json();
      setApprovals(data.approvals || []);
    } catch (e) {
      setError('Failed to fetch approvals from worker.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (approval) => {
    try {
      setLoading(true);
      setError(null);
      await revokeToken(approval.contract, approval.spender);
      alert('Revoked successfully!');
      // Refresh list after revoking
      handleCheckApprovals(); 
    } catch (e) {
      setError(e.message || 'Revocation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>RevokeGuard 🛡️</h1>
      <p>Secure your DeFi assets by reviewing and revoking token allowances.</p>
      
      <button onClick={handleConnect} disabled={loading || address}>
        {address ? `Connected: ${address.slice(0, 6)}...` : 'Connect Wallet'}
      </button>

      {error && <div className="error">{error}</div>}

      <button onClick={handleCheckApprovals} disabled={loading || !address} style={{ marginLeft: '10px' }}>
        {loading ? 'Scanning...' : 'Scan Approvals'}
      </button>
      
      <div className="approvals-list">
        <h2>Your Approvals ({approvals.length})</h2>
        {approvals.map((app, index) => (
          <div key={index} className="approval-item">
            <p><strong>Token:</strong> {app.tokenName || 'Unknown'}</p>
            <p><strong>Spender:</strong> {app.spender.slice(0, 10)}...</p>
            <button onClick={() => handleRevoke(app)} disabled={loading}>Revoke</button>
          </div>
        ))}
        {approvals.length === 0 && !loading && address && <p>No high-risk approvals found or scan failed.</p>}
      </div>
    </div>
  );
}

export default App;
