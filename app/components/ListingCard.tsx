
"use client";

import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { type Listing } from "@/types";
import { formatPrice } from "@/lib/utils";
import { MapPin, Wifi, Car, Coffee } from "lucide-react";

interface ListingCardProps {
  listing: Listing;
  onView: (listing: Listing) => void;
  onApply?: (listing: Listing) => void;
}

export function ListingCard({ listing, onView, onApply }: ListingCardProps) {
  const amenityIcons = {
    'wifi': Wifi,
    'parking': Car,
    'kitchen': Coffee,
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
      <div className="space-y-md">
        {/* Image placeholder */}
        <div className="w-full h-48 bg-neutral-3/10 rounded-md flex items-center justify-center">
          <span className="text-neutral-3">📷 Room Photo</span>
        </div>

        <div className="space-y-sm">
          <div className="flex justify-between items-start">
            <h3 className="text-heading line-clamp-2">{listing.title}</h3>
            <span className="text-xl font-bold text-accent">{formatPrice(listing.price)}</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-3">
            <MapPin size={16} />
            <span className="text-sm">{listing.location}</span>
          </div>

          <p className="text-body text-neutral-2 line-clamp-2">{listing.description}</p>

          {/* Amenities */}
          <div className="flex gap-2 flex-wrap">
            {listing.amenities.slice(0, 3).map((amenity) => {
              const Icon = amenityIcons[amenity.toLowerCase() as keyof typeof amenityIcons] || Coffee;
              return (
                <div key={amenity} className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-sm">
                  <Icon size={12} />
                  <span className="text-xs text-accent">{amenity}</span>
                </div>
              );
            })}
            {listing.amenities.length > 3 && (
              <span className="text-xs text-neutral-3 px-2 py-1">
                +{listing.amenities.length - 3} more
              </span>
            )}
          </div>

          <div className="flex gap-sm pt-sm">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => onView(listing)}
              className="flex-1"
            >
              View Details
            </Button>
            {onApply && (
              <Button 
                size="sm" 
                onClick={() => onApply(listing)}
                className="flex-1"
              >
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
