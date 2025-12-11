import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// 💡 Web3Modal را از اینجا ایمپورت می‌کنیم
import { defaultWagmiConfig, createWeb3Modal } from '@web3modal/wagmi/react';

// 2. شبکه‌های مورد نیاز شما 
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
];

const metadata = {
  name: 'RevokeGuard',
  description: 'RevokeGuard - DeFi Approval Manager',
  url: 'https://revokeguard-frontend.pages.dev',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// 4. ایجاد پیکربندی Wagmi
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

// 💡 6. ایجاد و فعال‌سازی مودال Web3Modal (به جای رندر کردن کامپوننت)
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
});


// 7. رندر کردن برنامه
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* 💡 توجه: کامپوننت <Web3Modal /> را حذف کردیم چون از createWeb3Modal استفاده کردیم. */}
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
 
