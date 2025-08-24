
export interface User {
  userId: string;
  walletAddress: string;
  username: string;
  email: string;
  role: "landlord" | "tenant";
}

export interface Listing {
  listingId: string;
  landlordId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
  createdAt: string;
}

export interface Application {
  applicationId: string;
  listingId: string;
  tenantId: string;
  applicationDate: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
}

export interface Payment {
  paymentId: string;
  applicationId: string;
  amount: number;
  paymentMethod: "fiat" | "onchain";
  status: "pending" | "completed" | "failed";
  transactionHash?: string;
  createdAt: string;
}
