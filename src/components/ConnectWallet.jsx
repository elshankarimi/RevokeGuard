// src/components/ConnectWallet.jsx
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectWallet() {
  return (
    <div>
      <ConnectButton showBalance={false} />
    </div>
  );
}
