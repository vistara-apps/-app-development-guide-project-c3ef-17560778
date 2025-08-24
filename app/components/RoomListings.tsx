"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

interface RoomListingsProps {
  onViewChange: (view: string) => void;
}

interface Room {
  id: string;
  title: string;
  price: number;
  location: string;
  amenities: string[];
  description: string;
  images: string[];
}

const mockRooms: Room[] = [
  {
    id: "1",
    title: "Cozy Studio in Downtown",
    price: 1200,
    location: "Downtown, San Francisco",
    amenities: ["WiFi", "Kitchen", "Laundry"],
    description: "Beautiful studio apartment with great city views",
    images: ["/room1.jpg"],
  },
  {
    id: "2", 
    title: "Spacious Room with Balcony",
    price: 900,
    location: "Mission District, San Francisco",
    amenities: ["WiFi", "Balcony", "Parking"],
    description: "Large room in shared house with outdoor space",
    images: ["/room2.jpg"],
  },
  {
    id: "3",
    title: "Modern Loft Space",
    price: 1500,
    location: "SOMA, San Francisco",
    amenities: ["WiFi", "Gym", "Rooftop"],
    description: "Contemporary loft with premium amenities",
    images: ["/room3.jpg"],
  },
];

export function RoomListings({ onViewChange }: RoomListingsProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filters, setFilters] = useState({
    maxPrice: 2000,
    amenities: [] as string[],
  });

  const filteredRooms = mockRooms.filter(room => 
    room.price <= filters.maxPrice &&
    (filters.amenities.length === 0 || 
     filters.amenities.some(amenity => room.amenities.includes(amenity)))
  );

  const handleApply = (roomId: string) => {
    // In a real app, this would trigger the application flow
    alert(`Application submitted for room ${roomId}!`);
  };

  if (selectedRoom) {
    return (
      <div className="space-y-lg">
        <div className="flex items-center space-x-md">
          <Button
            variant="secondary"
            onClick={() => setSelectedRoom(null)}
          >
            ← Back to Listings
          </Button>
        </div>
        
        <Card>
          <div className="space-y-md">
            <div className="aspect-video bg-neutral-3/10 rounded-md flex items-center justify-center">
              <span className="text-neutral-3">Room Image</span>
            </div>
            
            <div>
              <h2 className="text-heading mb-sm">{selectedRoom.title}</h2>
              <p className="text-body text-neutral-2 mb-md">{selectedRoom.description}</p>
              
              <div className="grid grid-cols-2 gap-md mb-md">
                <div>
                  <span className="text-sm text-neutral-3">Price</span>
                  <p className="text-heading text-accent">${selectedRoom.price}/month</p>
                </div>
                <div>
                  <span className="text-sm text-neutral-3">Location</span>
                  <p className="text-body">{selectedRoom.location}</p>
                </div>
              </div>
              
              <div className="mb-lg">
                <span className="text-sm text-neutral-3 block mb-sm">Amenities</span>
                <div className="flex flex-wrap gap-xs">
                  {selectedRoom.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-sm py-xs bg-accent/10 text-accent text-sm rounded-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={() => handleApply(selectedRoom.id)}
                className="w-full"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-lg">
      <Card>
        <h2 className="text-heading mb-md">Filter Rooms</h2>
        <div className="space-y-md">
          <div>
            <label className="block text-sm text-neutral-3 mb-xs">
              Max Price: ${filters.maxPrice}
            </label>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm text-neutral-3 mb-xs">Amenities</label>
            <div className="flex flex-wrap gap-xs">
              {["WiFi", "Kitchen", "Laundry", "Parking", "Gym", "Balcony"].map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      amenities: prev.amenities.includes(amenity)
                        ? prev.amenities.filter(a => a !== amenity)
                        : [...prev.amenities, amenity]
                    }));
                  }}
                  className={`px-sm py-xs text-sm rounded-sm transition-colors ${
                    filters.amenities.includes(amenity)
                      ? "bg-accent text-white"
                      : "bg-surface border border-neutral-3/20 text-neutral-2"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-md">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <div 
              onClick={() => setSelectedRoom(room)}
              className="space-y-md"
            >
              <div className="aspect-video bg-neutral-3/10 rounded-md flex items-center justify-center">
                <span className="text-neutral-3">Room Image</span>
              </div>
              
              <div>
                <h3 className="text-heading mb-xs">{room.title}</h3>
                <p className="text-body text-neutral-2 mb-sm">{room.description}</p>
                
                <div className="flex justify-between items-center mb-sm">
                  <span className="text-heading text-accent">${room.price}/month</span>
                  <span className="text-sm text-neutral-3">{room.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-xs">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="px-sm py-xs bg-accent/10 text-accent text-xs rounded-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="px-sm py-xs bg-neutral-3/10 text-neutral-3 text-xs rounded-sm">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <div className="text-center py-lg">
            <p className="text-body text-neutral-3">No rooms match your filters</p>
            <Button
              variant="secondary"
              onClick={() => setFilters({ maxPrice: 2000, amenities: [] })}
              className="mt-md"
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
