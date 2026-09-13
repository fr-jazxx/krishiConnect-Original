/* ============================================
   KRISHI CONNECT — MOCK DATA
   Consistent prototype data for all screens
   ============================================ */

// ── Farmer Profile ──
export const farmer = {
  id: 'F1028',
  name: 'Ramesh Kumar',
  location: 'Bardhaman, West Bengal',
  type: 'Farmer',
  account: '•••• 4821',
  avatar: null,
};

// ── Produce Listings ──
export const produceListings = [
  {
    id: 'P102',
    crop: 'Tomato',
    quantity: 1250,
    unit: 'kg',
    grade: 'A',
    price: 29,
    location: 'Bardhaman',
    harvestDate: '2026-09-08',
    status: 'listed',
    photos: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'P103',
    crop: 'Paddy',
    quantity: 850,
    unit: 'kg',
    grade: 'A',
    price: 27,
    location: 'Bardhaman',
    harvestDate: '2026-09-05',
    status: 'listed',
    photos: [
      'https://images.unsplash.com/photo-1728895604559-a4e16081504e?w=800&auto=format&fit=crop&q=80',
    ],
  },
];

// ── Market Data ──
export const marketData = {
  tomato: {
    crop: 'Tomato',
    minPrice: 26,
    maxPrice: 31,
    avgPrice: 28.5,
    farmerPrice: 29,
    demandLevel: 'HIGH',
    demandTrend: '+12%',
    nearbyBuyers: 14,
  },
  paddy: {
    crop: 'Paddy',
    minPrice: 24,
    maxPrice: 29,
    avgPrice: 26.5,
    farmerPrice: 27,
    demandLevel: 'MODERATE',
    demandTrend: '+5%',
    nearbyBuyers: 8,
  },
};

// ── Market Board Listings ──
export const marketBoard = [
  {
    id: 'ML001',
    crop: 'Tomato',
    grade: 'A',
    quantity: 1250,
    unit: 'kg',
    price: 29,
    location: 'Bardhaman',
    distance: '18 km',
    seller: 'Ramesh Kumar',
    sellerType: 'Farmer',
    photos: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'ML002',
    crop: 'Paddy',
    grade: 'A',
    quantity: 8400,
    unit: 'kg',
    price: 27,
    location: 'Durgapur',
    distance: '31 km',
    seller: 'Anil Singh',
    sellerType: 'FPO',
    photos: [
      'https://images.unsplash.com/photo-1728895604559-a4e16081504e?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'ML003',
    crop: 'Onion',
    grade: 'B',
    quantity: 2200,
    unit: 'kg',
    price: 22,
    location: 'Asansol',
    distance: '45 km',
    seller: 'Vikram Patel',
    sellerType: 'Farmer',
    photos: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'ML004',
    crop: 'Wheat',
    grade: 'A',
    quantity: 5000,
    unit: 'kg',
    price: 24,
    location: 'Bankura',
    distance: '52 km',
    seller: 'Suresh FPO',
    sellerType: 'FPO',
    photos: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'ML005',
    crop: 'Rice',
    grade: 'A',
    quantity: 3200,
    unit: 'kg',
    price: 32,
    location: 'Hooghly',
    distance: '28 km',
    seller: 'Manoj Das',
    sellerType: 'Farmer',
    photos: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    ],
  },
];

// ── Buyer Offer ──
export const buyerOffer = {
  buyer: 'FreshMart Retail',
  buyerVerified: true,
  crop: 'Tomato',
  quantity: 1000,
  unit: 'kg',
  offerPrice: 29,
  grossValue: 29000,
  estimatedLogistics: 800,
  platformFee: 290,
  estimatedPayout: 27910,
  status: 'accepted',
};

// ── Transaction ──
export const transaction = {
  id: 'KC-10284',
  crop: 'Tomato',
  grade: 'A',
  weight: 1247.5,
  pricePerKg: 29,
  grossValue: 36177.5,
  logistics: 800,
  platformFee: 362,
  otherDeductions: 0,
  netPayout: 35015.5,
  status: 'payment_confirmed',
  priceLocked: true,
  steps: [
    { id: 'listed', label: 'Listed', done: true },
    { id: 'offer', label: 'Offer', done: true },
    { id: 'accepted', label: 'Accepted', done: true },
    { id: 'weighed', label: 'Weighed', done: true },
    { id: 'paid', label: 'Paid', done: true },
  ],
};

// ── Trust Ledger Events ──
export const ledgerEvents = [
  {
    id: 'LE001',
    timestamp: '2026-09-08T10:42:00',
    type: 'LISTING_CREATED',
    title: 'Listing created',
    detail: '1,250 kg · ₹29/kg',
    actor: 'Ramesh Kumar',
    verified: true,
  },
  {
    id: 'LE002',
    timestamp: '2026-09-08T11:17:00',
    type: 'BUYER_ACCEPTED',
    title: 'Buyer accepted offer',
    detail: 'FreshMart Retail',
    actor: 'FreshMart Retail',
    verified: true,
  },
  {
    id: 'LE003',
    timestamp: '2026-09-08T14:06:00',
    type: 'WEIGHT_VERIFIED',
    title: 'Digital weight recorded',
    detail: '1,247.5 kg',
    actor: 'Collection Center #14',
    verified: true,
  },
  {
    id: 'LE004',
    timestamp: '2026-09-08T14:21:00',
    type: 'QUALITY_VERIFIED',
    title: 'Quality verified',
    detail: 'Grade A',
    actor: 'Quality Inspector',
    verified: true,
  },
  {
    id: 'LE005',
    timestamp: '2026-09-08T16:02:00',
    type: 'PAYMENT_INITIATED',
    title: 'Payment initiated',
    detail: '₹35,015.50',
    actor: 'Krishi Connect Platform',
    verified: true,
  },
  {
    id: 'LE006',
    timestamp: '2026-09-08T16:05:00',
    type: 'PAYMENT_CONFIRMED',
    title: 'Payment confirmed',
    detail: 'Account •••• 4821',
    actor: 'Payment Gateway',
    verified: true,
  },
];

// ── Logistics Routes ──
export const logisticsRoutes = [
  {
    id: 'KC-482',
    stops: ['Farmer A', 'Farmer B', 'Buyer'],
    currentStop: 1,
    distance: 42.6,
    weight: 2.4,
    weightUnit: 'tonnes',
    eta: '15:40',
    status: 'in_transit',
  },
  {
    id: 'KC-483',
    stops: ['Farmer C', 'Collection Hub', 'Buyer'],
    currentStop: 0,
    distance: 31.2,
    weight: 1.8,
    weightUnit: 'tonnes',
    eta: '17:10',
    status: 'in_transit',
  },
  {
    id: 'KC-484',
    stops: ['Farmer D', 'Buyer'],
    currentStop: 1,
    distance: 18.4,
    weight: 1.2,
    weightUnit: 'tonnes',
    eta: '14:20',
    status: 'delivered',
  },
];

// ── Admin Stats ──
export const adminStats = {
  activeFarmers: 12482,
  activeBuyers: 1294,
  todaysTrade: 8420000, // ₹84.2L in paise
  todaysTradeFormatted: '₹84.2L',
  produceMoved: 3842,
  produceMovedUnit: 'T',
  farmerRealization: 27.4,
  buyerAvgPrice: 29.1,
  traditionalEstimate: 22.8,
  improvementPercent: 20.2,
  transactionsToday: 8421,
  verified: 8201,
  underReview: 184,
  flagged: 36,
};

// ── Trust Monitor Data ──
export const trustMonitor = {
  riskEvents: {
    priceAnomalies: 14,
    weightAnomalies: 9,
    paymentAnomalies: 6,
    repeatedComplaints: 7,
  },
  flaggedActor: {
    id: 'A918',
    type: 'Buyer / Agent',
    riskScore: 78,
    maxScore: 100,
    status: 'HIGH RISK',
    reasons: [
      { label: 'Price anomaly', percent: 35 },
      { label: 'Weight anomaly', percent: 30 },
      { label: 'Complaints', percent: 20 },
      { label: 'Payment anomaly', percent: 15 },
    ],
  },
};

// ── Dashboard Summary ──
export const dashboardSummary = {
  avgMarketPrice: 28.5,
  availableProduce: 2450,
  activeOffers: 6,
};

// ── Active Orders ──
export const activeOrders = [
  {
    id: 'KC-10284',
    crop: 'Tomato',
    quantity: 1247.5,
    unit: 'kg',
    price: 29,
    buyer: 'FreshMart Retail',
    status: 'payment_processing',
  },
  {
    id: 'KC-10281',
    crop: 'Paddy',
    quantity: 850,
    unit: 'kg',
    price: 27,
    buyer: 'GrainWorld Ltd',
    status: 'in_transit',
  },
];

// ── Helper: Format Currency ──
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// ── Helper: Format Weight ──
export function formatWeight(kg) {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} tonnes`;
  }
  return `${kg.toLocaleString('en-IN')} kg`;
}

// ── Helper: Format Time ──
export function formatTime(isoString) {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} · ${hours}:${minutes}`;
}

// ── Helper: Status Label ──
export function getStatusLabel(status) {
  const labels = {
    listed: 'Listed',
    accepted: 'Accepted',
    in_transit: 'In Transit',
    payment_processing: 'Payment Processing',
    payment_confirmed: 'Payment Confirmed',
    delivered: 'Delivered',
    under_review: 'Under Review',
    flagged: 'Flagged',
  };
  return labels[status] || status;
}
