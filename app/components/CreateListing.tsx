"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Input } from "./Input";

interface CreateListingProps {
  onBack: () => void;
}

export function CreateListing({ onBack }: CreateListingProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    amenities: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableAmenities = [
    "WiFi", "Kitchen", "Laundry", "Parking", "Gym", "Balcony", 
    "Pool", "Pet Friendly", "Furnished", "Air Conditioning"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Listing created successfully!");
    setIsSubmitting(false);
    onBack();
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="space-y-lg">
      <div className="flex items-center space-x-md">
        <Button variant="secondary" onClick={onBack}>
          ← Back to Listings
        </Button>
      </div>

      <Card>
        <h2 className="text-heading mb-lg">Create New Listing</h2>
        
        <form onSubmit={handleSubmit} className="space-y-lg">
          <div>
            <label className="block text-sm text-neutral-3 mb-xs">
              Room Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Cozy Studio in Downtown"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-3 mb-xs">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your room..."
              rows={4}
              className="input-field w-full resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div>
              <label className="block text-sm text-neutral-3 mb-xs">
                Monthly Rent ($)
              </label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="1200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-neutral-3 mb-xs">
                Location
              </label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Downtown, San Francisco"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-neutral-3 mb-sm">
              Amenities
            </label>
            <div className="grid grid-cols-2 gap-xs">
              {availableAmenities.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-sm py-sm text-sm rounded-md transition-colors text-left ${
                    formData.amenities.includes(amenity)
                      ? "bg-accent text-white"
                      : "bg-surface border border-neutral-3/20 text-neutral-2 hover:bg-neutral-3/5"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-neutral-3 mb-xs">
              Room Images
            </label>
            <div className="border-2 border-dashed border-neutral-3/20 rounded-md p-lg text-center">
              <div className="space-y-sm">
                <div className="w-12 h-12 bg-neutral-3/10 rounded-md mx-auto flex items-center justify-center">
                  <span className="text-neutral-3">📷</span>
                </div>
                <p className="text-sm text-neutral-3">
                  Click to upload images or drag and drop
                </p>
                <p className="text-xs text-neutral-3">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="pt-md border-t border-neutral-3/10">
            <div className="flex items-center justify-between mb-md">
              <span className="text-body">Listing Fee</span>
              <span className="text-heading text-accent">$2.00</span>
            </div>
            <p className="text-sm text-neutral-3 mb-lg">
              One-time fee to list your room on RoomMatch Base
            </p>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Creating Listing..." : "Create Listing & Pay Fee"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
