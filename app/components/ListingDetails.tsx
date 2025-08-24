
"use client";

import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { type Listing } from "@/types";
import { formatPrice } from "@/lib/utils";
import { MapPin, ArrowLeft, Wifi, Car, Coffee } from "lucide-react";

interface ListingDetailsProps {
  listing: Listing;
  onBack: () => void;
  onApply: (listing: Listing) => void;
}

export function ListingDetails({ listing, onBack, onApply }: ListingDetailsProps) {
  const amenityIcons = {
    'wifi': Wifi,
    'parking': Car,
    'kitchen': Coffee,
  };

  return (
    <div className="space-y-lg">
      <div className="flex items-center gap-md">
        <Button variant="secondary" size="sm" onClick={onBack}>
          <ArrowLeft size={16} />
        </Button>
        <h1 className="text-heading">Room Details</h1>
      </div>

      <Card>
        <div className="space-y-lg">
          {/* Image gallery placeholder */}
          <div className="w-full h-64 bg-neutral-3/10 rounded-md flex items-center justify-center">
            <span className="text-neutral-3">📷 Room Photos</span>
          </div>

          <div className="space-y-md">
            <div className="flex justify-between items-start">
              <h2 className="text-heading flex-1">{listing.title}</h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">{formatPrice(listing.price)}</div>
                <div className="text-sm text-neutral-3">per month</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-3">
              <MapPin size={16} />
              <span>{listing.location}</span>
            </div>

            <div className="pt-md border-t border-neutral-3/10">
              <h3 className="font-semibold mb-sm">Description</h3>
              <p className="text-body text-neutral-2 leading-relaxed">{listing.description}</p>
            </div>

            <div className="pt-md border-t border-neutral-3/10">
              <h3 className="font-semibold mb-sm">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {listing.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity.toLowerCase() as keyof typeof amenityIcons] || Coffee;
                  return (
                    <div key={amenity} className="flex items-center gap-2">
                      <Icon size={16} className="text-accent" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-lg border-t border-neutral-3/10">
            <Button onClick={() => onApply(listing)} className="w-full">
              Apply for This Room
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
