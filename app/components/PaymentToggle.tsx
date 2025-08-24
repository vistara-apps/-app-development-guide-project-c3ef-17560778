
"use client";

interface PaymentToggleProps {
  value: "fiat" | "onchain";
  onChange: (value: "fiat" | "onchain") => void;
}

export function PaymentToggle({ value, onChange }: PaymentToggleProps) {
  return (
    <div className="space-y-sm">
      <p className="text-sm font-medium">Payment Method:</p>
      <div className="flex space-x-sm">
        <button
          onClick={() => onChange("fiat")}
          className={`px-md py-sm rounded-md transition-all duration-200 flex-1 ${
            value === "fiat"
              ? "bg-accent text-white"
              : "bg-surface border border-neutral-3/20 text-neutral-2 hover:bg-neutral-3/10"
          }`}
        >
          💳 Credit Card
        </button>
        <button
          onClick={() => onChange("onchain")}
          className={`px-md py-sm rounded-md transition-all duration-200 flex-1 ${
            value === "onchain"
              ? "bg-accent text-white"
              : "bg-surface border border-neutral-3/20 text-neutral-2 hover:bg-neutral-3/10"
          }`}
        >
          ⛓️ USDC on Base
        </button>
      </div>
      <div className="text-xs text-neutral-3">
        {value === "fiat" 
          ? "Pay with credit card via Stripe"
          : "Pay with USDC on Base network (low fees)"
        }
      </div>
    </div>
  );
}
