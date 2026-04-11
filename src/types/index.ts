// src/types/index.ts

// User Types
export type UserRole = "depot" | "marketer" | "driver" | "admin";

export interface User {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

// Product Types
export type ProductType = "PMS" | "AGO" | "DPK" | "LPG" | "JET_A1";

export type ProductColor = "clear" | "clear-straw" | "light-amber" | "amber" | "dark";

export type StockLevel = "high" | "medium" | "low" | "out_of_stock";

export interface ProductSpecification {
  color: ProductColor;
  colorCode: string;
  density: number; // kg/m³
  source: string;
  testDate: string;
  sulfurContent?: string;
  flashPoint?: string;
  octaneRating?: string;
}

export interface Product {
  id: string;
  type: ProductType;
  name: string;
  pricePerLitre: number;
  previousPrice: number;
  priceChange: number;
  stockLevel: StockLevel;
  stockLitres: number;
  specifications: ProductSpecification;
  updatedAt: string;
}

// Depot Types
export type SubscriptionTier = "free" | "starter" | "professional" | "enterprise";

export interface Tank {
  id: string;
  product: ProductType;
  capacity: number;
  currentLevel: number;
}

export interface DepotStats {
  totalOrders: number;
  completedOrders: number;
  averageLoadingTime: string;
  onTimeRate: number;
}

export interface Depot {
  id: string;
  name: string;
  slug: string;
  address: string;
  state: string;
  lga: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  subscriptionTier: SubscriptionTier;
  operatingHours: string;
  products: Product[];
  tanks: Tank[];
  stats: DepotStats;
  createdAt: string;
}

// Refinery Types
export type RefineryStatus = "active" | "limited" | "inactive" | "coming-soon";

export interface RefineryProduct {
  type: ProductType;
  exWorksPrice: number;
  previousPrice: number;
  lastUpdated: string;
  availability: "available" | "limited" | "unavailable";
}

export interface Refinery {
  id: string;
  name: string;
  location: string;
  status: RefineryStatus;
  capacity: string;
  logo: string;
  products: RefineryProduct[];
  expectedLaunch?: string;
}

// Marketer Types
export interface Marketer {
  id: string;
  userId: string;
  businessName: string;
  phone: string;
  email: string;
  walletBalance: number;
  totalOrders: number;
  totalVolume: number;
  createdAt: string;
}

// Driver Types
export interface Driver {
  id: string;
  userId: string;
  marketerId: string;
  name: string;
  phone: string;
  licenseNumber: string;
  createdAt: string;
}

// Truck Types
export interface Truck {
  id: string;
  marketerId: string;
  plateNumber: string;
  capacity: number;
  createdAt: string;
}

// Order Types
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in-transit"
  | "at-depot"
  | "loading"
  | "loaded"
  | "completed"
  | "cancelled"
  | "disputed";

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface OrderEscrow {
  status: "locked" | "released" | "refunded" | "disputed";
  amount: number;
  lockedAt: string;
  releasedAt?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  marketer: {
    id: string;
    businessName: string;
    phone: string;
  };
  depot: {
    id: string;
    name: string;
    address: string;
  };
  product: {
    type: ProductType;
    quantity: number;
    pricePerLitre: number;
    totalAmount: number;
    platformFee: number;
    specifications: ProductSpecification;
  };
  truck: {
    id: string;
    plateNumber: string;
    capacity: number;
  };
  driver: {
    id: string;
    name: string;
    phone: string;
  };
  qrCode: string;
  timeline: OrderTimeline[];
  escrow: OrderEscrow;
  pickupDate: string;
  createdAt: string;
  updatedAt: string;
}

// Rating Types
export interface Rating {
  id: string;
  orderId: string;
  depotId: string;
  marketerId: string;
  rating: number;
  review: string;
  createdAt: string;
}

// Transaction Types
export type TransactionType = "credit" | "debit" | "escrow_lock" | "escrow_release" | "refund" | "fee";

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  reference: string;
  orderId?: string;
  createdAt: string;
}

// Alert Types
export interface PriceAlert {
  id: string;
  marketerId: string;
  productType: ProductType;
  targetPrice: number;
  isActive: boolean;
  createdAt: string;
}

// Notification Types
export type NotificationType = "order" | "price" | "payment" | "system" | "alert";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

// Analytics Types
export interface AnalyticsDataPoint {
  date: string;
  value: number;
}

export interface DepotAnalytics {
  revenue: AnalyticsDataPoint[];
  orders: AnalyticsDataPoint[];
  volume: AnalyticsDataPoint[];
  topProducts: { product: ProductType; volume: number; revenue: number }[];
  topCustomers: { name: string; orders: number; volume: number }[];
}

export interface PlatformAnalytics {
  totalUsers: number;
  totalDepots: number;
  totalMarketers: number;
  totalDrivers: number;
  totalTransactions: number;
  totalVolume: number;
  gmv: number;
  dailyActiveUsers: number;
  transactionTrends: AnalyticsDataPoint[];
  userGrowth: AnalyticsDataPoint[];
}

// Order with Multiple Trucks
export interface TruckOrder {
  id: string;
  plateNumber: string;
  capacity: number;
  quantity: number;
  driverName?: string;
  driverPhone?: string;
  nupengTicket?: string;
  qrCode: string;
  qrVerified: boolean;
  qrVerifiedAt?: string;
  status: "pending" | "verified" | "loading" | "loaded" | "completed";
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled" | "disputed";
  
  marketer: {
    id: string;
    businessName: string;
    phone: string;
  };
  
  depot: {
    id: string;
    name: string;
    address: string;
    phone: string;
  };
  
  product: {
    type: ProductType;
    name: string;
    pricePerLitre: number;
  };
  
  // Multiple trucks
  trucks: TruckOrder[];
  
  // Totals
  totalQuantity: number;
  productCost: number;
  marketerFee: number; // quantity × 0.25
  depotFee: number; // quantity × 0.25 (deducted from settlement)
  totalAmount: number; // productCost + marketerFee
  
  // Escrow
  escrow: {
    status: "pending" | "locked" | "partial_release" | "released" | "refunded" | "disputed";
    lockedAt?: string;
    releasedAt?: string;
  };
  
  // Dates
  pickupDate: string;
  createdAt: string;
  updatedAt: string;
}

// Chat/Messages
export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: "marketer" | "depot";
  content: string;
  attachments?: {
    type: "image" | "document";
    url: string;
    name: string;
  }[];
  status: "sent" | "delivered" | "read";
  createdAt: string;
}

export interface Conversation {
  id: string;
  marketerId: string;
  depotId: string;
  orderId?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: {
    marketer: number;
    depot: number;
  };
  createdAt: string;
}

// Disputes
export type DisputeType = 
  | "short_loading"
  | "quality_issue"
  | "payment_issue"
  | "delay"
  | "unauthorized_charges"
  | "fraud"
  | "other";

export type DisputeStatus = 
  | "pending"
  | "under_review"
  | "resolved"
  | "escalated"
  | "closed";

export interface Dispute {
  id: string;
  orderId: string;
  reportedBy: "marketer" | "depot";
  reporterId: string;
  againstId: string;
  type: DisputeType;
  description: string;
  expectedResolution?: string;
  evidence: {
    type: "image" | "document";
    url: string;
    name: string;
  }[];
  status: DisputeStatus;
  nmdpraRef?: string;
  nmdpraResponse?: string;
  resolution?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Brent Crude
export interface BrentCrudeData {
  price: number; // USD per barrel
  change: number;
  changePercent: number;
  exchangeRate: number; // USD to NGN
  lastUpdated: string;
}