import { useAccount, useWriteContract } from 'wagmi';
import { useState, useCallback } from 'react';
import { config } from '..[/wagmi](https://farcaster.xyz/~/channel/wagmi).config';
import { toast } from 'react-hot-toast';

// ABI استاندارد ERC20
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: 'success', type: 'bool' }],
    type: 'function'
  }
];

// لیست توکن‌ها و spenderها بر اساس chain.id
const TOKENS = [
  {
    name: 'USDC',
    addresses: {
      1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',       // Ethereum
      137: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',     // Polygon
      42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',    // Arbitrum
      // شبکه‌های دیگر...
    },
    riskySpenders: [
      '0x1111111254EEB25477B68fb85Ed929f73A960582',          // 1inch Router
      // spender بیشتر اضافه کن
    ]
  },
  // توکن بیشتر...
];

// --- هوک اسکن مجوزها (Approvals) ---
export function useCheckApprovals() {
  const { address, chain } = useAccount();
  const [approvals, setApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // هرجا chain تغییر کرد، توکن‌ها را استخراج کن
  const tokensToCheck = TOKENS
    .map(token => ({
      name: token.name,
      address: token.addresses[chain?.id],
      riskySpenders: token.riskySpenders
    }))
    .filter(t => t.address);

  const scanForApprovals = useCallback(async () => {
    if (!address || !chain) return;
    setIsLoading(true);
    setApprovals([]);

    try {
      const client = config.getClient({ chainId: chain.id });

      for (const t of tokensToCheck) {
        for (const spender of t.riskySpenders) {
          const allowance = await client.readContract({
            address: t.address,
            abi: ERC20_ABI,
            functionName: 'allowance',
            args: [address, spender]
          });

          if (allowance > 0n) {
            setApprovals(prev => [
              ...prev,
              {
                token: t.name,
                tokenAddress: t.address,
                spender,
                amount: allowance,
                chain: chain.name
              }
            ]);
          }
        }
      }
      toast.success('Scan complete!');
    } catch (error) {
      toast.error('Approval scan failed.');
      console.error('Approval scan failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [address, chain, tokensToCheck]);

  return { approvals, isLoading, scanForApprovals };
}

// --- هوک لغو مجوز (Revoke) ---
export function useRevokeApproval() {
  const { writeContractAsync } = useWriteContract();
  const [isRevoking, setIsRevoking] = useState(false);

  const revokeApproval = useCallback(
    async (approvalItem) => {
      setIsRevoking(true);
      try {
        // فراخوانی approve با مقدار 0 (لغو مجوز spender)
        const hash = await writeContractAsync({
          address: approvalItem.tokenAddress,
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [approvalItem.spender, 0n]
        });

        toast.success(`Transaction sent! TX: ${String(hash).slice(0, 8)}...`);
      } catch (error) {
        toast.error('Revoke failed or cancelled by user.');
        console.error('Revoke error:', error);
      } finally {
        setIsRevoking(false);
      }
    },
    [writeContractAsync]
  );

  return { revokeApproval, isRevoking };
}
