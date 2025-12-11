// src/utils/wagmiHooks.js

import { useState } from 'react';
import { useAccount } from 'wagmi';

// آدرس Worker شما که در متغیر محیطی Cloudflare Pages تنظیم کردید
// VITE_WORKER_URL = https://love-elshan.workers.dev
const WORKER_URL = import.meta.env.VITE_WORKER_URL;

// --- هوک اصلی برای اسکن مجوزها ---
export function useCheckApprovals() {
  const { address } = useAccount();
  const [approvals, setApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const scanForApprovals = async () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    setIsLoading(true);
    setApprovals([]);

    console.log(`Sending request to Worker: ${WORKER_URL}/approvals?wallet=${address}`);
    
    try {
        // 💡 تست اتصال Worker (Worker فعلاً فقط Mock Data برمی‌گرداند)
        const response = await fetch(`${WORKER_URL}/approvals?wallet=${address}`);
        const data = await response.json();

        if (response.ok) {
            // Worker با موفقیت پاسخ داد (چه داده واقعی چه Mock Data)
            console.log("Worker Response:", data);
            
            // 💡 برای رفع مشکل صفحه سیاه، این خطوط Mock Data را نمایش می‌دهیم
            setApprovals([
                {
                    token: "Mock Token (USDC)",
                    spender: "0xMockSpenderAddress",
                    amount: BigInt(0), // یا یک عدد بزرگ برای تست
                    chainId: 1 
                }
            ]);

        } else {
            console.error("Error from Worker:", data.error);
            alert(`Error scanning approvals: ${data.error}`);
        }

    } catch (error) {
      console.error("Network or Fetch Error:", error);
      alert("Failed to connect to the Worker/Backend.");
    } finally {
      setIsLoading(false);
    }
  };

  // فعلاً فقط Mock Revoke Hook را برمی‌گردانیم تا خطا ندهد
  return { approvals, isLoading, scanForApprovals };
}

// --- هوک ساختگی برای Revoke ---
export function useRevokeApproval() {
    const [isRevoking, setIsRevoking] = useState(false);
    
    // 💡 این تابع فعلاً فقط یک Alert نمایش می‌دهد
    const revokeApproval = (approval) => {
        setIsRevoking(true);
        alert(`Attempting to revoke ${approval.token} approval...`);
        // اینجا منطق واقعی تراکنش (writeContract) با Viem اضافه می‌شود.
        setTimeout(() => setIsRevoking(false), 2000); 
    };

    return { revokeApproval, isRevoking };
}
