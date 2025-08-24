
"use client";

import { Card } from "./Card";
import { Button } from "./Button";
import { PaymentToggle } from "./PaymentToggle";
import { useState } from "react";

interface DashboardProps {
  userRole: "tenant" | "landlord";
  onPayRent: () => void;
}

export function Dashboard({ userRole, onPayRent }: DashboardProps) {
  const [paymentMethod, setPaymentMethod] = useState<"fiat" | "onchain">("fiat");

  const tenantData = {
    currentRoom: "Cozy bedroom in downtown apartment",
    rentDue: "March 1, 2024",
    rentAmount: 800,
    landlord: "Sarah Johnson",
  };

  const landlordData = {
    totalListings: 3,
    totalApplications: 7,
    monthlyRevenue: 2400,
    pendingPayments: 1,
  };

  if (userRole === "tenant") {
    return (
      <div className="space-y-lg animate-fade-in">
        <h2 className="heading-text">Tenant Dashboard</h2>
        
        <div className="grid gap-lg">
          <Card>
            <h3 className="heading-text mb-md">Current Room</h3>
            <div className="space-y-sm">
              <p className="text-neutral-2">{tenantData.currentRoom}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-3">Landlord:</span>
                <span className="font-medium">{tenantData.landlord}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-3">Monthly Rent:</span>
                <span className="font-bold text-accent">${tenantData.rentAmount}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="heading-text mb-md">Upcoming Payment</h3>
            <div className="space-y-md">
              <div className="flex justify-between items-center">
                <span className="text-neutral-3">Due Date:</span>
                <span className="font-medium text-red-500">{tenantData.rentDue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-3">Amount:</span>
                <span className="text-xl font-bold text-accent">${tenantData.rentAmount}</span>
              </div>
              
              <PaymentToggle
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
              
              <Button onClick={onPayRent} className="w-full">
                Pay Rent ({paymentMethod === "fiat" ? "Credit Card" : "USDC"})
              </Button>
            </div>
          </Card>

          <Card variant="transparent">
            <div className="text-center">
              <p className="text-neutral-3 text-sm mb-md">
                View your complete payment history
              </p>
              <Button variant="secondary">
                View on Base Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-lg animate-fade-in">
      <h2 className="heading-text">Landlord Dashboard</h2>
      
      <div className="grid grid-cols-2 gap-md">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{landlordData.totalListings}</div>
            <div className="text-neutral-3 text-sm">Active Listings</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{landlordData.totalApplications}</div>
            <div className="text-neutral-3 text-sm">Applications</div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="heading-text mb-md">Monthly Overview</h3>
        <div className="space-y-sm">
          <div className="flex justify-between items-center">
            <span className="text-neutral-3">Total Revenue:</span>
            <span className="text-xl font-bold text-accent">${landlordData.monthlyRevenue}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-3">Pending Payments:</span>
            <span className="font-medium text-orange-500">{landlordData.pendingPayments}</span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="heading-text mb-md">Recent Applications</h3>
        <div className="space-y-md">
          <div className="flex justify-between items-center p-sm bg-neutral-3/5 rounded-md">
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-neutral-3">Downtown Apartment</p>
            </div>
            <div className="flex space-x-sm">
              <Button variant="secondary" className="text-xs px-sm py-xs">
                View
              </Button>
              <Button className="text-xs px-sm py-xs">
                Accept
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center p-sm bg-neutral-3/5 rounded-md">
            <div>
              <p className="font-medium">Jane Smith</p>
              <p className="text-sm text-neutral-3">Studio Apartment</p>
            </div>
            <div className="flex space-x-sm">
              <Button variant="secondary" className="text-xs px-sm py-xs">
                View
              </Button>
              <Button className="text-xs px-sm py-xs">
                Accept
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
