
import { type Listing, type Application } from "@/types";

export const mockListings: Listing[] = [
  {
    listingId: '1',
    landlordId: 'landlord1',
    title: 'Cozy Studio in Downtown',
    description: 'Beautiful studio apartment in the heart of downtown. Walking distance to restaurants, cafes, and public transportation. Fully furnished with modern amenities.',
    price: 1200,
    location: 'Downtown, San Francisco',
    amenities: ['WiFi', 'Parking', 'Kitchen Access', 'Laundry'],
    images: [],
    createdAt: new Date('2024-01-15'),
    status: 'active',
  },
  {
    listingId: '2',
    landlordId: 'landlord2',
    title: 'Spacious Room with Bay View',
    description: 'Large bedroom with stunning bay views. Shared kitchen and living room with friendly roommates. Perfect for young professionals.',
    price: 950,
    location: 'Mission Bay, San Francisco',
    amenities: ['WiFi', 'Gym Access', 'Bay View', 'Shared Kitchen'],
    images: [],
    createdAt: new Date('2024-01-18'),
    status: 'active',
  },
  {
    listingId: '3',
    landlordId: 'landlord3',
    title: 'Modern Room Near Tech Hub',
    description: 'Contemporary furnished room in a tech-friendly neighborhood. High-speed internet, quiet environment perfect for remote work.',
    price: 1400,
    location: 'SOMA, San Francisco',
    amenities: ['WiFi', 'Office Space', 'Parking', 'Tech Hub Access'],
    images: [],
    createdAt: new Date('2024-01-20'),
    status: 'active',
  },
];

export const mockApplications: Application[] = [
  {
    applicationId: '1',
    listingId: '1',
    tenantId: 'tenant1',
    applicationDate: new Date('2024-01-21'),
    status: 'pending',
    message: 'Hi! I\'m a software engineer looking for a place close to work. I\'m clean, quiet, and responsible.',
  },
];
