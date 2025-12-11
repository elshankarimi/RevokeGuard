import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, arbitrum, optimism, polygon, base } from 'wagmi/chains';

// 1. Get projectId
export const projectId = 'Ac634d78fb9387e384997db507c695b3';

// 2. Create wagmiConfig
const metadata = {
  name: 'RevokeGuard',
  description: 'RevokeGuard - DeFi Approval Manager',
  url: 'https://revokeguard-frontend.pages.dev', // آدرس سایت شما
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, arbitrum, optimism, polygon, base];

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // در نسخه جدید نیازی به تعریف جداگانه provider نیست، خودکار انجام می‌شود
});
