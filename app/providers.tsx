"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey="test-api-key"
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "roommatch-theme",
          name: "RoomMatch Base",
        },
      }}
    >
      {props.children}
    </MiniKitProvider>
  );
}
