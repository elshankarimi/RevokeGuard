import { ethers } from 'ethers'

// توابع کمکی برای اتصال به شبکه و قراردادها
export async function fetchApprovals(address, chainId = 1) {
  // آدرس RPC یا Alchemy/Infura باید در env var ذخیره شود
  const rpcUrl = import.meta.env.VITE_RPC_URL || 'https://mainnet.infura.io/v3/your-api-key'
  const provider = new ethers.JsonRpcProvider(rpcUrl)

  // TODO: جایگزین با real token list یا Farcaster API
  // نمونه mock
  const approvals = [
    { token: 'USDT', spender: '0xabc123...', allowance: '1000' },
    { token: 'DAI', spender: '0xdef456...', allowance: '500' }
  ]

  // در آینده: فراخوانی smart contract و ERC20 allowance
  return approvals
}

export async function revokeApproval(tokenAddress, spender, signer) {
  const ERC20_ABI = [
    'function approve(address spender, uint256 amount) external returns (bool)'
  ]
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
  const tx = await contract.approve(spender, 0)
  await tx.wait()
  return tx.hash
}
