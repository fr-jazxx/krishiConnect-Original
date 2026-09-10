import { useState } from 'react';
import {
  Store, Search, Filter, ShieldCheck, CheckCircle2,
  ArrowRight, Truck, Building2, Eye, Camera, Send,
  Scale, Clock, Award, X, Sparkles, Layers, ChevronRight
} from 'lucide-react';
import CropImage from '../../components/common/CropImage';
import { useKrishi } from '../../context/KrishiContext';
import { useLanguage } from '../../context/LanguageContext';
import './WholesaleMarket.css';

const wholesaleLotsData = [
  {
    id: 'WS-LOT-801',
    crop: 'Tomato',
    variety: 'Hybrid Pusa Ruby',
    grade: 'A',
    quantity: 6500,
    unit: 'kg',
    moq: 1000,
    price: 27.5,
    mandiBenchmark: 31,
    location: 'Bardhaman Cold Cluster',
    distance: '14 km',
    seller: 'Bardhaman Vegetable FPO',
    sellerType: 'Registered FPO · 420 Farmers',
    verified: true,
    moisture: '88%',
    shelfLife: '12 Days (Refrigerated)',
    photos: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'WS-LOT-802',
    crop: 'Paddy',
    variety: 'Gobindobhog Aromatic',
    grade: 'A',
    quantity: 18000,
    unit: 'kg',
    moq: 3000,
    price: 34,
    mandiBenchmark: 38.5,
    location: 'Katwa Milling Hub',
    distance: '28 km',
    seller: 'Damodar Valley Grain Collective',
    sellerType: 'Agri Cooperative · APMC Lic #8812',
    verified: true,
    moisture: '12.4%',
    shelfLife: '18 Months',
    photos: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'WS-LOT-803',
    crop: 'Potato',
    variety: 'Jyoti Grade 1',
    grade: 'A',
    quantity: 24000,
    unit: 'kg',
    moq: 5000,
    price: 19.8,
    mandiBenchmark: 23,
    location: 'Memari Central Cold Storage',
    distance: '34 km',
    seller: 'Hooghly Potato Consortium',
    sellerType: 'FPO Syndicate · 1,100 Farmers',
    verified: true,
    moisture: '78%',
    shelfLife: '4 Months Cold Stored',
    photos: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'WS-LOT-804',
    crop: 'Onion',
    variety: 'Nashik Red Extra Bulky',
    grade: 'B',
    quantity: 12500,
    unit: 'kg',
    moq: 2000,
    price: 31,
    mandiBenchmark: 36,
    location: 'Asansol Logistics Yard',
    distance: '45 km',
    seller: 'Chandan Agri Hub',
    sellerType: 'Direct Farmer Collective',
    verified: true,
    moisture: '14%',
    shelfLife: '45 Days Ventilated',
    photos: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'WS-LOT-805',
    crop: 'Wheat',
    variety: 'Sharbati Milling Grade',
    grade: 'A',
    quantity: 32000,
    unit: 'kg',
    moq: 5000,
    price: 26.2,
    mandiBenchmark: 29.5,
    location: 'Durgapur Industrial Silos',
    distance: '22 km',
    seller: 'Bengal Agro Multi-State Coop',
    sellerType: 'Certified Processor & Silo Hub',
    verified: true,
    moisture: '11.8%',
    shelfLife: '24 Months',
    photos: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'WS-LOT-806',
    crop: 'Mustard',
    variety: 'Yellow Mustard High Oil 42%',
    grade: 'A',
    quantity: 8500,
    unit: 'kg',
    moq: 1500,
    price: 52,
    mandiBenchmark: 58,
    location: 'Kalna APMC Yard',
    distance: '39 km',
    seller: 'Bhagirathi Bio Producers',
    sellerType: 'Organic FPO Group',
    verified: true,
    moisture: '8.2%',
    shelfLife: '12 Months',
    photos: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&auto=format&fit=crop&q=80'
    ]
  }
];

export default function WholesaleMarket() {
  const { t } = useLanguage();
  const { requestSample } = useKrishi();

  const [activeCrop, setActiveCrop] = useState('All');
  const [selectedMinSize, setSelectedMinSize] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);

  // Modals
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [photosModalOpen, setPhotosModalOpen] = useState(false);

  const [bidSuccess, setBidSuccess] = useState(false);
  const [sampleSuccess, setSampleSuccess] = useState(false);

  // Bid form state
  const [bidForm, setBidForm] = useState({
    bidPrice: '',
    quantity: '',
    paymentTerms: '100% Escrow on Weighment',
    deliveryMode: 'KrishiConnect Cold Logistics'
  });

  // Sample form state
  const [sampleForm, setSampleForm] = useState({
    quantity: '2 kg',
    address: 'FreshMart Regional Distribution Center, Sector V, Salt Lake, Kolkata',
    notes: 'Required for laboratory quality & chemical residue screening before 10-tonne contract signoff.'
  });

  const cropsList = ['All', 'Tomato', 'Paddy', 'Potato', 'Onion', 'Wheat', 'Mustard'];

  const filteredLots = wholesaleLotsData.filter((lot) => {
    const matchesCrop = activeCrop === 'All' || lot.crop.toLowerCase() === activeCrop.toLowerCase();
    const matchesSize = lot.quantity >= selectedMinSize;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lot.crop.toLowerCase().includes(q) ||
      lot.seller.toLowerCase().includes(q) ||
      lot.location.toLowerCase().includes(q) ||
      lot.id.toLowerCase().includes(q);
    return matchesCrop && matchesSize && matchesSearch;
  });

  const handleOpenBid = (lot) => {
    setSelectedLot(lot);
    setBidForm({
      bidPrice: lot.price.toString(),
      quantity: lot.moq.toString(),
      paymentTerms: '100% Escrow on Weighment',
      deliveryMode: 'KrishiConnect Cold Logistics'
    });
    setBidModalOpen(true);
    setBidSuccess(false);
  };

  const handleOpenSample = (lot) => {
    setSelectedLot(lot);
    setSampleModalOpen(true);
    setSampleSuccess(false);
  };

  const handleOpenPhotos = (lot) => {
    setSelectedLot(lot);
    setPhotosModalOpen(true);
  };

  const handleConfirmBid = (e) => {
    e.preventDefault();
    setBidSuccess(true);
    setTimeout(() => {
      setBidModalOpen(false);
      setBidSuccess(false);
    }, 2500);
  };

  const handleConfirmSample = (e) => {
    e.preventDefault();
    if (selectedLot) {
      requestSample({
        crop: selectedLot.crop,
        grade: selectedLot.grade,
        quantity: sampleForm.quantity,
        buyerName: 'FreshMart Institutional Procurement',
        farmerName: selectedLot.seller,
        address: sampleForm.address,
      });
    }
    setSampleSuccess(true);
    setTimeout(() => {
      setSampleModalOpen(false);
      setSampleSuccess(false);
    }, 2500);
  };

  return (
    <div className="wholesale-market-page">
      {/* Header Banner */}
      <div className="wholesale-header">
        <div className="wholesale-header__main">
          <div className="wholesale-badge">
            <span className="wholesale-badge__dot" />
            <span>B2B Institutional Wholesale Exchange · APMC & FPO Certified</span>
          </div>
          <h1 className="wholesale-title">Wholesale Agricultural Exchange</h1>
          <p className="wholesale-subtitle">
            Direct institutional procurement from verified FPOs and grower syndicates. Automated tamper-proof escrow contracts, bulk discounts, and audited cold-chain dispatch.
          </p>
        </div>

        <div className="wholesale-stats-strip">
          <div className="wholesale-stat-card">
            <span className="stat-card-label">Active Bulk Tonnage</span>
            <strong className="stat-card-value">112.4 T</strong>
            <span className="stat-card-sub text-emerald-600">Across 6 West Bengal Hubs</span>
          </div>
          <div className="wholesale-stat-card">
            <span className="stat-card-label">Avg Wholesale Savings</span>
            <strong className="stat-card-value text-emerald-700">14.2%</strong>
            <span className="stat-card-sub text-slate-500">vs APMC Mandi Agent Rate</span>
          </div>
          <div className="wholesale-stat-card">
            <span className="stat-card-label">Escrow Settlement</span>
            <strong className="stat-card-value">Instant</strong>
            <span className="stat-card-sub text-slate-500">Upon Digital Gate Weighment</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters, Search, Minimum Tonnage */}
      <div className="wholesale-controls">
        <div className="wholesale-crop-tabs">
          {cropsList.map((c) => (
            <button
              key={c}
              type="button"
              className={`wholesale-tab ${activeCrop === c ? 'wholesale-tab--active' : ''}`}
              onClick={() => setActiveCrop(c)}
            >
              {c !== 'All' && <CropImage crop={c} size={18} className="mr-1.5" />}
              <span>{c === 'All' ? 'All Commodities' : c}</span>
            </button>
          ))}
        </div>

        <div className="wholesale-filter-row">
          <div className="wholesale-search-box">
            <Search size={17} className="search-icon" />
            <input
              type="text"
              placeholder="Search wholesale lot by commodity, FPO seller, or hub..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="wholesale-search-input"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="search-clear">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="wholesale-size-filters">
            <span className="filter-label"><Scale size={14} /> Minimum Lot:</span>
            <button
              type="button"
              className={`size-filter-btn ${selectedMinSize === 0 ? 'active' : ''}`}
              onClick={() => setSelectedMinSize(0)}
            >
              Any
            </button>
            <button
              type="button"
              className={`size-filter-btn ${selectedMinSize === 2000 ? 'active' : ''}`}
              onClick={() => setSelectedMinSize(2000)}
            >
              &gt; 2 Tonnes
            </button>
            <button
              type="button"
              className={`size-filter-btn ${selectedMinSize === 10000 ? 'active' : ''}`}
              onClick={() => setSelectedMinSize(10000)}
            >
              &gt; 10 Tonnes
            </button>
          </div>
        </div>
      </div>

      {/* Wholesale Lots Grid */}
      <div className="wholesale-grid">
        {filteredLots.map((lot) => {
          const discountPct = Math.round(((lot.mandiBenchmark - lot.price) / lot.mandiBenchmark) * 100);
          const totalVal = Math.round(lot.quantity * lot.price);

          return (
            <div key={lot.id} className="wholesale-card">
              {/* Card Header with Commodity, Variety, and Grade */}
              <div className="wholesale-card__header">
                <div className="flex items-center gap-3">
                  <div className="wholesale-crop-avatar">
                    <CropImage crop={lot.crop} size={42} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="wholesale-crop-name">{lot.crop}</h3>
                      <span className="wholesale-grade-badge">Grade {lot.grade}</span>
                      <span className="wholesale-discount-badge">-{discountPct}% vs Mandi</span>
                    </div>
                    <span className="wholesale-variety">{lot.variety} • Lot #{lot.id}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenPhotos(lot)}
                  className="wholesale-photo-chip"
                  title="Inspect Produce Verification Photos"
                >
                  <Camera size={14} />
                  <span>Photos ({lot.photos.length})</span>
                </button>
              </div>

              {/* Specs Grid */}
              <div className="wholesale-specs-grid">
                <div className="spec-cell">
                  <span className="spec-label">Bulk Available</span>
                  <strong className="spec-val">{(lot.quantity / 1000).toFixed(1)} Tonnes</strong>
                  <span className="spec-sub">({lot.quantity.toLocaleString()} kg)</span>
                </div>
                <div className="spec-cell">
                  <span className="spec-label">Min. Order (MOQ)</span>
                  <strong className="spec-val">{lot.moq.toLocaleString()} kg</strong>
                  <span className="spec-sub">Pallet / Truckload</span>
                </div>
                <div className="spec-cell">
                  <span className="spec-label">Wholesale Price</span>
                  <strong className="spec-val text-emerald-800">₹{lot.price}/{lot.unit}</strong>
                  <span className="spec-sub text-rose-700 line-through">Mandi: ₹{lot.mandiBenchmark}</span>
                </div>
                <div className="spec-cell">
                  <span className="spec-label">Moisture / Quality</span>
                  <strong className="spec-val text-slate-800">{lot.moisture}</strong>
                  <span className="spec-sub">{lot.shelfLife}</span>
                </div>
              </div>

              {/* Origin & Seller */}
              <div className="wholesale-origin-row">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-slate-500 flex-shrink-0" />
                  <div>
                    <strong className="seller-name">{lot.seller}</strong>
                    <span className="seller-type">{lot.sellerType} • {lot.location} ({lot.distance})</span>
                  </div>
                </div>
                <span className="escrow-safe-badge">
                  <ShieldCheck size={14} /> Escrow Protected
                </span>
              </div>

              {/* Actions Footer */}
              <div className="wholesale-card__actions">
                <button
                  type="button"
                  onClick={() => handleOpenSample(lot)}
                  className="btn-sample-action"
                >
                  Request Sample (2 kg)
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenBid(lot)}
                  className="btn-bid-action"
                >
                  <span>Place Binding Bid</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLots.length === 0 && (
        <div className="wholesale-empty-state">
          <Store size={48} className="text-slate-400 mb-3" />
          <h3>No wholesale lots matching your filter</h3>
          <p>Try clearing commodity filters or lowering minimum volume requirements.</p>
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={() => {
              setActiveCrop('All');
              setSelectedMinSize(0);
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Place Binding Bid Modal */}
      {bidModalOpen && selectedLot && (
        <div className="modal-backdrop animate-fade-in" onClick={() => !bidSuccess && setBidModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Store size={20} className="text-emerald-700" />
                <h3>Place Binding Wholesale Bid</h3>
              </div>
              <button type="button" onClick={() => setBidModalOpen(false)} className="modal-close-btn">
                <X size={18} />
              </button>
            </div>

            {bidSuccess ? (
              <div className="modal-body text-center py-6">
                <CheckCircle2 size={54} className="text-emerald-600 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-slate-900">Binding Bid Registered!</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Your bid for {bidForm.quantity} kg of {selectedLot.crop} at ₹{bidForm.bidPrice}/kg has been locked in smart contract escrow and sent to {selectedLot.seller}.
                </p>
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-semibold">
                  Contract ID #KC-BID-{Math.floor(1000 + Math.random() * 9000)} · Escrow Bank Lock Active
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBid} className="modal-body">
                <div className="lot-summary-box mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <strong>{selectedLot.crop} ({selectedLot.variety})</strong>
                    <span className="text-emerald-700 font-bold">Grade {selectedLot.grade}</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Seller: {selectedLot.seller} • Listed: ₹{selectedLot.price}/kg • MOQ: {selectedLot.moq} kg
                  </div>
                </div>

                <div className="form-grid-2 mb-3">
                  <div className="form-group">
                    <label className="form-label">Offered Wholesale Rate (₹/kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={bidForm.bidPrice}
                      onChange={(e) => setBidForm({ ...bidForm, bidPrice: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order Volume (kg, Min {selectedLot.moq})</label>
                    <input
                      type="number"
                      min={selectedLot.moq}
                      max={selectedLot.quantity}
                      required
                      value={bidForm.quantity}
                      onChange={(e) => setBidForm({ ...bidForm, quantity: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Escrow Settlement Security</label>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
                    Total Contract Escrow Lock: <strong>₹{((Number(bidForm.bidPrice) || 0) * (Number(bidForm.quantity) || 0)).toLocaleString('en-IN')}</strong>. Funds are frozen in bank escrow until truck digital weighment is confirmed.
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setBidModalOpen(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Lock Escrow & Submit Bid
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Request Sample Modal */}
      {sampleModalOpen && selectedLot && (
        <div className="modal-backdrop animate-fade-in" onClick={() => !sampleSuccess && setSampleModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Send size={18} className="text-emerald-700" />
                <h3>Request Quality Verification Sample</h3>
              </div>
              <button type="button" onClick={() => setSampleModalOpen(false)} className="modal-close-btn">
                <X size={18} />
              </button>
            </div>

            {sampleSuccess ? (
              <div className="modal-body text-center py-6">
                <CheckCircle2 size={54} className="text-emerald-600 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-slate-900">Sample Dispatched!</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  A {sampleForm.quantity} sealed sample batch from Lot #{selectedLot.id} has been requisitioned from {selectedLot.seller} with live GPS courier tracking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmSample} className="modal-body">
                <div className="lot-summary-box mb-4">
                  <strong>{selectedLot.crop} Grade {selectedLot.grade}</strong>
                  <p className="text-xs text-slate-600 mt-0.5">Origin: {selectedLot.seller} ({selectedLot.location})</p>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Sample Size</label>
                  <input
                    type="text"
                    value={sampleForm.quantity}
                    onChange={(e) => setSampleForm({ ...sampleForm, quantity: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Lab Delivery Address</label>
                  <textarea
                    rows={2}
                    value={sampleForm.address}
                    onChange={(e) => setSampleForm({ ...sampleForm, address: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setSampleModalOpen(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Confirm Sample Dispatch
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Photographic Inspection Modal */}
      {photosModalOpen && selectedLot && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setPhotosModalOpen(false)}>
          <div className="modal-dialog modal-dialog--wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-emerald-700" />
                <h3>Produce Verification Photos · Lot #{selectedLot.id}</h3>
              </div>
              <button type="button" onClick={() => setPhotosModalOpen(false)} className="modal-close-btn">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="photo-gallery-grid">
                {selectedLot.photos.map((src, i) => (
                  <div key={i} className="photo-gallery-card">
                    <img src={src} alt={`Batch view ${i + 1}`} className="photo-gallery-img" />
                    <span className="photo-gallery-badge">Verified Lot Specimen #{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded mt-4 text-xs text-slate-600 flex items-center justify-between">
                <span>Certified Grade {selectedLot.grade} · Geo-tagged timestamp verified</span>
                <span className="font-semibold text-emerald-700">Tamper-Proof Audit Pass</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
