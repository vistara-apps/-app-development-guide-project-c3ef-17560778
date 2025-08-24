"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  usePrimaryButton,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { AppShell } from "./components/AppShell";
import { RoomListings } from "./components/RoomListings";
import { CreateListing } from "./components/CreateListing";
import { UserDashboard } from "./components/UserDashboard";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeView, setActiveView] = useState("listings");
  const [userRole, setUserRole] = useState<"tenant" | "landlord" | null>(null);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  usePrimaryButton(
    { text: "Find a Room" },
    () => {
      setActiveView("listings");
    }
  );

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="text-accent text-sm font-medium hover:text-accent/80 transition-colors"
        >
          + Save Frame
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-accent animate-fade-in">
          <span>✓</span>
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  const renderContent = () => {
    switch (activeView) {
      case "listings":
        return <RoomListings onViewChange={setActiveView} />;
      case "create":
        return <CreateListing onBack={() => setActiveView("listings")} />;
      case "dashboard":
        return <UserDashboard onViewChange={setActiveView} />;
      default:
        return <RoomListings onViewChange={setActiveView} />;
    }
  };

  return (
    <AppShell>
      <div className="w-full max-w-3xl mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-lg">
          <div className="flex items-center space-x-md">
            <h1 className="text-heading text-neutral-1">RoomMatch</h1>
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <nav className="flex space-x-sm mb-lg">
          <button
            onClick={() => setActiveView("listings")}
            className={`px-md py-sm rounded-md transition-colors ${
              activeView === "listings"
                ? "bg-accent text-white"
                : "bg-surface text-neutral-2 hover:bg-neutral-3/5"
            }`}
          >
            Browse Rooms
          </button>
          <button
            onClick={() => setActiveView("create")}
            className={`px-md py-sm rounded-md transition-colors ${
              activeView === "create"
                ? "bg-accent text-white"
                : "bg-surface text-neutral-2 hover:bg-neutral-3/5"
            }`}
          >
            List Room
          </button>
          <button
            onClick={() => setActiveView("dashboard")}
            className={`px-md py-sm rounded-md transition-colors ${
              activeView === "dashboard"
                ? "bg-accent text-white"
                : "bg-surface text-neutral-2 hover:bg-neutral-3/5"
            }`}
          >
            Dashboard
          </button>
        </nav>

        <main className="flex-1 animate-fade-in">
          {renderContent()}
        </main>

        <footer className="mt-lg pt-md flex justify-center">
          <button
            className="text-neutral-3 text-sm hover:text-neutral-2 transition-colors"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </AppShell>
  );
}
