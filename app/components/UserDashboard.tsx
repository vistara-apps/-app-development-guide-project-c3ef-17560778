"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

interface UserDashboardProps {
  onViewChange: (view: string) => void;
}

export function UserDashboard({ onViewChange }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<"tenant" | "landlord">("tenant");

  const mockApplications = [
    {
      id: "1",
      roomTitle: "Cozy Studio in Downtown",
      status: "pending",
      appliedDate: "2024-01-15",
      rent: 1200,
    },
    {
      id: "2", 
      roomTitle: "Spacious Room with Balcony",
      status: "approved",
      appliedDate: "2024-01-10",
      rent: 900,
    },
  ];

  const mockListings = [
    {
      id: "1",
      title: "Modern Loft Space",
      price: 1500,
      applications: 3,
      status: "active",
    },
    {
      id: "2",
      title: "Cozy Bedroom",
      price: 800,
      applications: 1,
      status: "active",
    },
  ];

  const handlePayRent = (applicationId: string, amount: number) => {
    alert(`Rent payment of $${amount} initiated for application ${applicationId}`);
  };

  const renderTenantView = () => (
    <div className="space-y-lg">
      <Card>
        <h3 className="text-heading mb-md">My Applications</h3>
        <div className="space-y-md">
          {mockApplications.map((app) => (
            <div
              key={app.id}
              className="p-md bg-surface border border-neutral-3/10 rounded-md"
            >
              <div className="flex justify-between items-start mb-sm">
                <h4 className="font-semibold">{app.roomTitle}</h4>
                <span
                  className={`px-sm py-xs text-xs rounded-sm ${
                    app.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : app.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {app.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-md text-sm">
                <div>
                  <span className="text-neutral-3">Applied:</span>
                  <p>{app.appliedDate}</p>
                </div>
                <div>
                  <span className="text-neutral-3">Rent:</span>
                  <p className="text-accent font-semibold">${app.rent}/month</p>
                </div>
              </div>
              
              {app.status === "approved" && (
                <div className="mt-md pt-md border-t border-neutral-3/10">
                  <Button
                    onClick={() => handlePayRent(app.id, app.rent)}
                    size="sm"
                  >
                    Pay Rent
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-heading mb-md">Payment Methods</h3>
        <div className="space-y-md">
          <div className="p-md bg-surface border border-neutral-3/10 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">USDC on Base</h4>
                <p className="text-sm text-neutral-3">On-chain payments</p>
              </div>
              <span className="text-accent">Connected</span>
            </div>
          </div>
          
          <div className="p-md bg-surface border border-neutral-3/10 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Credit Card</h4>
                <p className="text-sm text-neutral-3">Traditional payments</p>
              </div>
              <Button variant="secondary" size="sm">
                Add Card
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderLandlordView = () => (
    <div className="space-y-lg">
      <Card>
        <div className="flex justify-between items-center mb-md">
          <h3 className="text-heading">My Listings</h3>
          <Button onClick={() => onViewChange("create")}>
            + New Listing
          </Button>
        </div>
        
        <div className="space-y-md">
          {mockListings.map((listing) => (
            <div
              key={listing.id}
              className="p-md bg-surface border border-neutral-3/10 rounded-md"
            >
              <div className="flex justify-between items-start mb-sm">
                <h4 className="font-semibold">{listing.title}</h4>
                <span className="text-accent font-semibold">${listing.price}/month</span>
              </div>
              
              <div className="grid grid-cols-2 gap-md text-sm mb-md">
                <div>
                  <span className="text-neutral-3">Applications:</span>
                  <p className="font-semibold">{listing.applications}</p>
                </div>
                <div>
                  <span className="text-neutral-3">Status:</span>
                  <p className="text-green-600 capitalize">{listing.status}</p>
                </div>
              </div>
              
              <div className="flex space-x-sm">
                <Button variant="secondary" size="sm">
                  View Applications
                </Button>
                <Button variant="secondary" size="sm">
                  Edit Listing
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-heading mb-md">Earnings Overview</h3>
        <div className="grid grid-cols-2 gap-md">
          <div className="text-center p-md bg-accent/5 rounded-md">
            <p className="text-2xl font-bold text-accent">$2,300</p>
            <p className="text-sm text-neutral-3">This Month</p>
          </div>
          <div className="text-center p-md bg-accent/5 rounded-md">
            <p className="text-2xl font-bold text-accent">$12,800</p>
            <p className="text-sm text-neutral-3">Total Earned</p>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-lg">
      <Card>
        <div className="flex space-x-sm">
          <button
            onClick={() => setActiveTab("tenant")}
            className={`px-md py-sm rounded-md transition-colors ${
              activeTab === "tenant"
                ? "bg-accent text-white"
                : "bg-surface text-neutral-2 hover:bg-neutral-3/5"
            }`}
          >
            Tenant View
          </button>
          <button
            onClick={() => setActiveTab("landlord")}
            className={`px-md py-sm rounded-md transition-colors ${
              activeTab === "landlord"
                ? "bg-accent text-white"
                : "bg-surface text-neutral-2 hover:bg-neutral-3/5"
            }`}
          >
            Landlord View
          </button>
        </div>
      </Card>

      {activeTab === "tenant" ? renderTenantView() : renderLandlordView()}
    </div>
  );
}
