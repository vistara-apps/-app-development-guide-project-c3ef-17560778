
"use client";

import { useState } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { type Listing } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface ApplicationFormProps {
  listing: Listing;
  onSubmit: (applicationData: { message: string }) => void;
  onBack: () => void;
}

export function ApplicationForm({ listing, onSubmit, onBack }: ApplicationFormProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ message });
  };

  return (
    <div className="space-y-lg">
      <div className="flex items-center gap-md">
        <Button variant="secondary" size="sm" onClick={onBack}>
          <ArrowLeft size={16} />
        </Button>
        <h1 className="text-heading">Apply for Room</h1>
      </div>

      <Card variant="transparent">
        <div className="space-y-md">
          <h3 className="font-semibold">{listing.title}</h3>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-3">{listing.location}</span>
            <span className="font-semibold text-accent">{formatPrice(listing.price)}/month</span>
          </div>
        </div>
      </Card>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-lg">
          <div>
            <h2 className="text-heading mb-md">Application Details</h2>
            <p className="text-sm text-neutral-3 mb-lg">
              Tell the landlord why you'd be a great tenant for this room.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-1 mb-2">
              Message to Landlord
            </label>
            <textarea
              placeholder="Hi! I'm interested in your room. I'm a responsible tenant with stable income..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field w-full h-32 resize-none"
              required
            />
          </div>

          <div className="bg-accent/5 p-md rounded-md">
            <h4 className="font-semibold text-sm mb-2">What happens next?</h4>
            <ul className="text-sm text-neutral-3 space-y-1">
              <li>• Your application will be sent to the landlord</li>
              <li>• They'll review and may contact you for more details</li>
              <li>• If approved, you'll receive payment instructions</li>
            </ul>
          </div>

          <div className="flex gap-md">
            <Button type="submit" className="flex-1">
              Submit Application
            </Button>
            <Button variant="secondary" onClick={onBack}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
