import { createContext, useContext, useState } from 'react';
import { produceListings as initialProduce, marketBoard as initialMarketBoard, buyerOffer as initialBuyerOffer, activeOrders as initialOrders, logisticsRoutes as initialRoutes } from '../data/mockData';

const KrishiContext = createContext(null);

export function KrishiProvider({ children }) {
  // Produce listings (Farmer listings)
  const [listings, setListings] = useState([
    ...initialProduce,
    {
      id: 'P104',
      crop: 'Wheat',
      quantity: 2400,
      unit: 'kg',
      grade: 'A',
      price: 28,
      location: 'Bardhaman',
      harvestDate: '2026-09-07',
      status: 'listed',
      photos: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'],
      farmerName: 'Ramesh Kumar',
      farmerPhone: '+91 98452 11029',
    },
    {
      id: 'P105',
      crop: 'Onion',
      quantity: 1800,
      unit: 'kg',
      grade: 'B',
      price: 32,
      location: 'Durgapur',
      harvestDate: '2026-09-06',
      status: 'listed',
      photos: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'],
      farmerName: 'Anil Singh',
      farmerPhone: '+91 98321 44521',
    },
  ]);

  // Active buyer offers presented to farmer
  const [buyerOffers, setBuyerOffers] = useState([
    {
      id: 'BO-201',
      buyer: 'FreshMart Supermarkets',
      buyerVerified: true,
      crop: 'Tomato',
      grade: 'A',
      quantity: 1000,
      unit: 'kg',
      offeredPrice: 30, // Farmer listed at 29, buyer offers 30
      mandiBenchmark: 28.5,
      totalValue: 30000,
      status: 'pending',
      timestamp: '10 mins ago',
    },
    {
      id: 'BO-202',
      buyer: 'GrainWorld Agro Exports',
      buyerVerified: true,
      crop: 'Paddy',
      grade: 'A',
      quantity: 850,
      unit: 'kg',
      offeredPrice: 28,
      mandiBenchmark: 26.5,
      totalValue: 23800,
      status: 'pending',
      timestamp: '35 mins ago',
    },
  ]);

  // Shared Orders (accessible by both Farmer and Buyer)
  const [orders, setOrders] = useState([
    ...initialOrders,
    {
      id: 'KC-10290',
      crop: 'Tomato',
      quantity: 1000,
      unit: 'kg',
      grade: 'A',
      price: 30,
      farmer: 'Ramesh Kumar',
      buyer: 'FreshMart Supermarkets',
      status: 'in_transit',
      pickupLocation: 'Bardhaman Farmer Gate',
      deliveryLocation: 'Kolkata APMC Terminal',
      eta: '45 mins',
      progress: 68,
      driverName: 'Sanjay Yadav',
      driverPhone: '+91 94310 88219',
      truckNumber: 'WB-39B-8921',
      currentTemp: '4.2°C',
    },
  ]);

  // Sample Requests from Buyers
  const [sampleRequests, setSampleRequests] = useState([
    {
      id: 'SMP-01',
      crop: 'Tomato',
      grade: 'A',
      quantity: '2 kg',
      buyerName: 'BigBasket Wholesale',
      farmerName: 'Ramesh Kumar',
      address: 'Plot 4B, Sector V, Salt Lake, Kolkata',
      status: 'Dispatched',
      date: 'Today, 09:30 AM',
    },
  ]);

  // Registered Users for Admin Verification Management
  const [users, setUsers] = useState([
    { id: 'U101', name: 'Ramesh Kumar', role: 'Farmer', location: 'Bardhaman, WB', phone: '+91 98452 11029', status: 'verified', joinDate: '2026-08-12', tradeCount: 14 },
    { id: 'U102', name: 'FreshMart Supermarkets', role: 'Buyer', location: 'Kolkata, WB', phone: '+91 98300 12345', status: 'verified', joinDate: '2026-07-20', tradeCount: 88 },
    { id: 'U103', name: 'Anil Singh', role: 'Farmer (FPO)', location: 'Durgapur, WB', phone: '+91 98321 44521', status: 'verified', joinDate: '2026-08-25', tradeCount: 9 },
    { id: 'U104', name: 'Metro Fresh Trading', role: 'Buyer', location: 'Asansol, WB', phone: '+91 97480 55667', status: 'pending', joinDate: '2026-09-08', tradeCount: 1 },
    { id: 'U105', name: 'Kishan Lal', role: 'Farmer', location: 'Bankura, WB', phone: '+91 94340 77112', status: 'flagged', joinDate: '2026-09-01', tradeCount: 2 },
  ]);

  // Actions
  const addProduceListing = (newListing) => {
    setListings((prev) => [newListing, ...prev]);
  };

  const acceptBuyerOffer = (offerId) => {
    setBuyerOffers((prev) =>
      prev.map((offer) => {
        if (offer.id === offerId) {
          const updated = { ...offer, status: 'accepted' };
          // Auto create a shared active order
          const newOrder = {
            id: `KC-${Math.floor(10000 + Math.random() * 90000)}`,
            crop: offer.crop,
            quantity: offer.quantity,
            unit: offer.unit,
            grade: offer.grade,
            price: offer.offeredPrice,
            farmer: 'Ramesh Kumar',
            buyer: offer.buyer,
            status: 'in_transit',
            pickupLocation: 'Bardhaman Farmer Gate',
            deliveryLocation: 'Kolkata APMC Terminal',
            eta: '2 hrs 15 mins',
            progress: 25,
            driverName: 'Rajesh Sharma',
            driverPhone: '+91 98311 02938',
            truckNumber: 'WB-41A-4491',
            currentTemp: '4.5°C',
          };
          setOrders((o) => [newOrder, ...o]);
          return updated;
        }
        return offer;
      })
    );
  };

  const requestSample = (sampleData) => {
    const newSample = {
      id: `SMP-0${sampleRequests.length + 1}`,
      ...sampleData,
      status: 'Requested',
      date: 'Just now',
    };
    setSampleRequests((prev) => [newSample, ...prev]);
  };

  const toggleUserStatus = (userId, newStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  };

  return (
    <KrishiContext.Provider
      value={{
        listings,
        addProduceListing,
        buyerOffers,
        acceptBuyerOffer,
        orders,
        sampleRequests,
        requestSample,
        users,
        toggleUserStatus,
      }}
    >
      {children}
    </KrishiContext.Provider>
  );
}

export function useKrishi() {
  const context = useContext(KrishiContext);
  if (!context) {
    throw new Error('useKrishi must be used within a KrishiProvider');
  }
  return context;
}
