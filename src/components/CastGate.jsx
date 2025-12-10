// src/components/CastGate.jsx
import React, { useState } from "react";

export default function CastGate({ children }) {
  const [hasCasted, setHasCasted] = useState(false);

  const handleCast = () => {
    // اینجا می‌توانی کد واقعی cast کردن به Farcaster API اضافه کنی
    setHasCasted(true);
  };

  if (!hasCasted) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>برای استفاده از مینی اپ، ابتدا باید لینک را cast کنید.</p>
        <button onClick={handleCast}>Cast Now</button>
      </div>
    );
  }

  return <>{children}</>;
}
