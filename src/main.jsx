import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 1. ایمپورت‌های مورد نیاز برای پیکربندی و Modal
import { defaultWagmiConfig } from '@web3modal/wagmi/react'; // روش استاندارد و جدید
import { Web3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 2. شبکه‌های مورد نیاز شما (همه لحاظ شده‌اند)
import {
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base,
  avalanche,
  bsc,
  fantom,
  gnosis,
  celo,
  // zkSync // 💡 zkSync در لیست پیش‌فرض Web3Modal نیست. اگر خطای Build داد، آن را کامنت کنید.
} from 'wagmi/chains';

// 3. تنظیمات عمومی
const projectId = 'ac634d78fb9387e384997db507c695b3';

const chains = [
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base,
  avalanche,
  bsc,
  fantom,
  gnosis,
  celo,
  // zkSync // اگر خطای Build داد، موقتاً این را کامنت کنید.
];

const metadata = {
  name: 'RevokeGuard',
  description: 'RevokeGuard - DeFi Approval Manager',
  url: 'https://revokeguard-frontend.pages.dev',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// 4. ایجاد پیکربندی Wagmi به روش استاندارد Web3Modal
// این روش به طور داخلی transportها (http) و کانکتورها (walletConnect, injected) را مدیریت می‌کند.
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
});

// 5. Setup QueryClient
const queryClient = new QueryClient();

// 6. رندر کردن برنامه
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Web3Modal projectId={projectId} chains={chains} />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
 
