
"use client";

import { useState } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { type Listing } from "@/types";
import { Plus, X } from "lucide-react";

interface CreateListingFormProps {
  onSubmit: (listing: Omit<Listing, 'listingId' | 'landlordId' | 'createdAt' | 'status'>) => void;
  onCancel: () => void;
}

export function CreateListingForm({ onSubmit, onCancel }: CreateListingFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    amenities: [] as string[],
    newAmenity: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      location: formData.location,
      amenities: formData.amenities,
      images: [], // Will be handled by image upload component
    });
  };

  const addAmenity = () => {
    if (formData.newAmenity.trim() && !formData.amenities.includes(formData.newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, prev.newAmenity.trim()],
        newAmenity: '',
      }));
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity),
    }));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-heading">Create New Listing</h2>
          <Button variant="secondary" size="sm" onClick={onCancel}>
            <X size={16} />
          </Button>
        </div>

        <div className="space-y-md">
          <div>
            <label className="block text-sm font-medium text-neutral-1 mb-2">
              Title
            </label>
            <Input
              placeholder="Beautiful room in downtown..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-1 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your room, neighborhood, and what makes it special..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-field w-full h-24 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div>
              <label className="block text-sm font-medium text-neutral-1 mb-2">
                Monthly Rent ($)
              </label>
              <Input
                type="number"
                placeholder="1200"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-1 mb-2">
                Location
              </label>
              <Input
                placeholder="New York, NY"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-1 mb-2">
              Amenities
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="e.g., WiFi, Parking, Kitchen Access"
                value={formData.newAmenity}
                onChange={(e) => setFormData(prev => ({ ...prev, newAmenity: e.target.value }))}
                className="flex-1"
              />
              <Button type="button" onClick={addAmenity} size="sm">
                <Plus size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-sm"
                >
                  <span className="text-sm text-accent">{amenity}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(amenity)}
                    className="text-accent hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-1 mb-2">
              Photos
            </label>
            <div className="border-2 border-dashed border-neutral-3/20 rounded-md p-lg text-center">
              <p className="text-neutral-3">Click to upload photos (Coming soon)</p>
            </div>
          </div>
        </div>

        <div className="flex gap-md">
          <Button type="submit" className="flex-1">
            Create Listing
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
