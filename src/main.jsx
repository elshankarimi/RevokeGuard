import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 

// 💡 برای تست، کامپوننت‌های Wagmi/Web3Modal را موقتاً حذف می‌کنیم.
// import { WagmiProvider } from 'wagmi';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { createWeb3Modal } from '@web3modal/wagmi';
// import { config } from './wagmi.config.js';

// const projectId = 'Ac634d78fb9387e384997db507c695b3'; 
// const queryClient = new QueryClient();

// createWeb3Modal({
//   wagmiConfig: config,
//   projectId,
//   enableAnalytics: true,
//   enableOnramp: true,
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
