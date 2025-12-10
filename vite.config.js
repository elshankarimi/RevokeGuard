import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' },
  },
  optimizeDeps: {
    include: [
      'viem',
      'wagmi',
      '@web3modal/wagmi',
      '@walletconnect/universal-provider'
    ],
  },
  server: { port: 3000 },
  build: { outDir: 'dist' },
})
