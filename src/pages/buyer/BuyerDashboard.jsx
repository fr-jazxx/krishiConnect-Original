import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, ShieldCheck, TrendingUp, Truck, CheckCircle2,
  Filter, Search, ArrowRight, Clock, Award, Building2, X,
  Camera, Sparkles, MapPin, Send, Eye, Percent, ChevronDown
} from 'lucide-react';
import CropImage from '../../components/common/CropImage';
import { marketBoard, adminStats } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { useKrishi } from '../../context/KrishiContext';
import './BuyerDashboard.css';

export default function BuyerDashboard() {
  const { t } = useLanguage();
  const { listings, requestSample } = useKrishi();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [bidSuccess, setBidSuccess] = useState(false);
  const [sampleSuccess, setSampleSuccess] = useState(false);

  // Form state for Request Sample
  const [sampleData, setSampleData] = useState({
    quantity: '2 kg',
    address: 'Plot 4B, Sector V, Salt Lake, Kolkata',
    notes: 'Urgent lab testing for bulk 10-tonne procurement',
  });

  // Safe fallback crop photo mapping to ensure crops are never mismatched
  const getCropPhotos = (crop, existingPhotos) => {
    if (existingPhotos && existingPhotos.length > 0) return existingPhotos;
    const cropImages = {
      tomato: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=80'
      ],
      paddy: [
        'https://images.unsplash.com/photo-1728895604559-a4e16081504e?w=800&auto=format&fit=crop&q=80'
      ],
      rice: [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80'
      ],
      onion: [
        'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'
      ],
      wheat: [
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'
      ],
      potato: [
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80'
      ],
      mustard: [
        'https://images.unsplash.com/photo-1701188542949-210beb8e382c?w=800&auto=format&fit=crop&q=80'
      ]
    };
    return cropImages[crop?.toLowerCase()] || [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
    ];
  };

  // Combine mock lots and newly listed farm lots
  const combinedLots = [
    ...listings.map((l) => ({
      id: l.id,
      crop: l.crop,
      grade: l.grade,
      quantity: l.quantity,
      unit: l.unit,
      price: l.price,
      location: l.location || 'Bardhaman',
      distance: '18 km',
      seller: l.farmerName || 'Ramesh Kumar',
      sellerType: 'Farmer',
      photos: getCropPhotos(l.crop, l.photos),
      harvestDate: l.harvestDate || '2026-09-08',
    })),
    ...marketBoard.map((m) => ({
      ...m,
      photos: getCropPhotos(m.crop, m.photos),
      harvestDate: '2026-09-07',
    })),
  ];

  // Search and filter lots
  const filteredLots = combinedLots.filter((lot) => {
    const matchesFilter = activeFilter === 'All' || lot.crop.toLowerCase() === activeFilter.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || (
      lot.crop.toLowerCase().includes(query) ||
      lot.seller.toLowerCase().includes(query) ||
      lot.location.toLowerCase().includes(query) ||
      `grade ${lot.grade}`.toLowerCase().includes(query)
    );
    return matchesFilter && matchesSearch;
  });

  const handleOpenBid = (lot) => {
    setSelectedBatch(lot);
    setBidModalOpen(true);
    setBidSuccess(false);
  };

  const handleOpenSample = (lot) => {
    setSelectedBatch(lot);
    setSampleModalOpen(true);
    setSampleSuccess(false);
  };

  const handleOpenPhotos = (lot) => {
    setSelectedBatch(lot);
    setPhotoModalOpen(true);
  };

  const handleConfirmBid = (e) => {
    e.preventDefault();
    setBidSuccess(true);
    setTimeout(() => {
      setBidModalOpen(false);
      setBidSuccess(false);
    }, 2000);
  };

  const handleConfirmSample = (e) => {
    e.preventDefault();
    requestSample({
      crop: selectedBatch.crop,
      grade: selectedBatch.grade,
      quantity: sampleData.quantity,
      buyerName: 'FreshMart Procurement',
      farmerName: selectedBatch.seller,
      address: sampleData.address,
    });
    setSampleSuccess(true);
    setTimeout(() => {
      setSampleModalOpen(false);
      setSampleSuccess(false);
    }, 2000);
  };

  return (
    <div className="buyer-dashboard">
      <div className="page-header">
        <div>
          <div className="buyer-badge">
            <span className="badge-dot" /> Institutional Procurement Terminal · APMC Certified Buyer
          </div>
          <h1 className="page-title">Wholesale Sourcing & Direct Farm Contracts</h1>
          <p className="page-subtitle">
            Source high-grade farm produce directly from verified growers and FPOs. Quality certified with automated escrow locks.
          </p>
        </div>

        <div className="buyer-header-stats">
          <div className="buyer-stat-pill">
            <ShieldCheck size={16} className="text-success" />
            <span>Escrow Balance: <strong>₹12,40,000</strong></span>
          </div>
          <Link to="/buyer/orders" className="btn btn-primary">
            <ShoppingBag size={18} />
            <span>My Active Contracts (3)</span>
          </Link>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="buyer-kpis">
        <div className="buyer-kpi-card">
          <div className="buyer-kpi-header">
            <span className="kpi-label">Available Direct Batches</span>
            <Building2 size={18} className="text-primary" />
          </div>
          <div className="kpi-value">{marketBoard.length} Lots Online</div>
          <span className="kpi-sub text-success">Verified APMC & FPO lots</span>
        </div>

        <div className="buyer-kpi-card">
          <div className="buyer-kpi-header">
            <span className="kpi-label">Average Procurement Price</span>
            <TrendingUp size={18} className="text-primary" />
          </div>
          <div className="kpi-value">₹27.80 / kg</div>
          <span className="kpi-sub text-success">8.4% below traditional mandi markups</span>
        </div>

        <div className="buyer-kpi-card">
          <div className="buyer-kpi-header">
            <span className="kpi-label">In-Transit Consignments</span>
            <Truck size={18} className="text-primary" />
          </div>
          <div className="kpi-value">2 Trucks En Route</div>
          <span className="kpi-sub text-muted">Arrival window: 14:30 - 16:45</span>
        </div>

        <div className="buyer-kpi-card">
          <div className="buyer-kpi-header">
            <span className="kpi-label">Certified Grade A Quality</span>
            <Award size={18} className="text-gold" />
          </div>
          <div className="kpi-value">100% Guaranteed</div>
          <span className="kpi-sub text-success">Digital weighbridge calibration</span>
        </div>
      </div>

      {/* Price Comparison Benchmark Tool */}
      <div className="price-comparison-widget">
        <div className="price-comparison-header">
          <div className="price-comparison-title-wrap">
            <div className="price-comparison-icon-wrap">
              <Percent size={18} />
            </div>
            <div>
              <h4 className="price-comparison-title">Comparative Procurement Price Analysis (Mandi vs Direct Farm)</h4>
              <span className="price-comparison-subtitle">Verified real-time rate differentials across major agricultural hubs</span>
            </div>
          </div>
          <span className="price-comparison-badge">
            Average 14.2% Buyer Cost Savings
          </span>
        </div>

        <div className="comparison-commodity-grid">
          <div className="commodity-compare-card">
            <div className="commodity-compare-top">
              <span className="commodity-name">Tomato</span>
              <span className="commodity-grade">Grade A</span>
            </div>
            <div className="commodity-rates-row">
              <div className="direct-rate-box">
                <span className="rate-caption">Direct Farm</span>
                <strong className="rate-val">₹29<span className="rate-unit">/kg</span></strong>
              </div>
              <div className="mandi-rate-box">
                <span className="rate-caption">APMC Mandi</span>
                <span className="mandi-val">₹33/kg</span>
              </div>
            </div>
            <div className="commodity-savings-pill">
              <span className="savings-dot" />
              <span>Save 12.1% direct</span>
            </div>
          </div>

          <div className="commodity-compare-card">
            <div className="commodity-compare-top">
              <span className="commodity-name">Paddy / Rice</span>
              <span className="commodity-grade">Swarna</span>
            </div>
            <div className="commodity-rates-row">
              <div className="direct-rate-box">
                <span className="rate-caption">Direct Farm</span>
                <strong className="rate-val">₹27<span className="rate-unit">/kg</span></strong>
              </div>
              <div className="mandi-rate-box">
                <span className="rate-caption">APMC Mandi</span>
                <span className="mandi-val">₹31/kg</span>
              </div>
            </div>
            <div className="commodity-savings-pill">
              <span className="savings-dot" />
              <span>Save 12.9% direct</span>
            </div>
          </div>

          <div className="commodity-compare-card">
            <div className="commodity-compare-top">
              <span className="commodity-name">Onion</span>
              <span className="commodity-grade">Nasik Hybrid</span>
            </div>
            <div className="commodity-rates-row">
              <div className="direct-rate-box">
                <span className="rate-caption">Direct Farm</span>
                <strong className="rate-val">₹32<span className="rate-unit">/kg</span></strong>
              </div>
              <div className="mandi-rate-box">
                <span className="rate-caption">APMC Mandi</span>
                <span className="mandi-val">₹38/kg</span>
              </div>
            </div>
            <div className="commodity-savings-pill">
              <span className="savings-dot" />
              <span>Save 15.8% direct</span>
            </div>
          </div>

          <div className="commodity-compare-card">
            <div className="commodity-compare-top">
              <span className="commodity-name">Wheat</span>
              <span className="commodity-grade">Sharbati</span>
            </div>
            <div className="commodity-rates-row">
              <div className="direct-rate-box">
                <span className="rate-caption">Direct Farm</span>
                <strong className="rate-val">₹28<span className="rate-unit">/kg</span></strong>
              </div>
              <div className="mandi-rate-box">
                <span className="rate-caption">APMC Mandi</span>
                <span className="mandi-val">₹34/kg</span>
              </div>
            </div>
            <div className="commodity-savings-pill">
              <span className="savings-dot" />
              <span>Save 17.6% direct</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lot Sourcing Section */}
      <div className="buyer-sourcing-section">
        <div className="sourcing-toolbar flex-wrap gap-4">
          <div className="sourcing-toolbar__left">
            <h3>Verified Farm Lots Ready for Dispatch ({filteredLots.length})</h3>
            <p>Direct institutional purchase with price lock, sample request, and scheduled refrigerated transport</p>
          </div>

          <div className="sourcing-toolbar__actions">
            {/* Live Search Bar */}
            <div className="sourcing-search-wrapper">
              <Search size={16} className="sourcing-search-icon" />
              <input
                type="text"
                placeholder="Search crop, seller, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sourcing-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="sourcing-search-clear"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <Link to="/buyer/tracking" className="btn-track-delivery">
              <Truck size={16} className="truck-icon" />
              <span>Track Live Delivery</span>
            </Link>
          </div>

          <div className="filter-chips w-full mt-2">
            {['All', 'Tomato', 'Paddy', 'Onion', 'Wheat', 'Mustard', 'Rice'].map((crop) => (
              <button
                key={crop}
                type="button"
                className={`filter-chip ${activeFilter === crop ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveFilter(crop)}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        <div className="lots-grid">
          {filteredLots.map((lot) => (
            <div key={lot.id} className="lot-card">
              <div className="lot-card__top">
                <div className="lot-crop-visual">
                  <CropImage crop={lot.crop} size={42} />
                  <div>
                    <h4 className="lot-crop-name">{lot.crop}</h4>
                    <span className="lot-grade-badge">Grade {lot.grade} · Verified Batch</span>
                  </div>
                </div>
                <div className="lot-price-tag">
                  <span className="lot-price">₹{lot.price}</span>
                  <span className="lot-unit">/{lot.unit}</span>
                </div>
              </div>

              {/* Produce Media Banner with Frosted Glass View Button */}
              {lot.photos && lot.photos.length > 0 && (
                <div
                  className="lot-media-banner"
                  onClick={() => handleOpenPhotos(lot)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleOpenPhotos(lot)}
                >
                  <img
                    src={lot.photos[0]}
                    alt={`${lot.crop} lot batch`}
                    className="lot-media-image"
                  />
                  <div className="lot-media-overlay" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenPhotos(lot);
                    }}
                    className="btn-view-photos"
                    title={`Inspect ${lot.photos.length} verified farm photos`}
                  >
                    <Camera size={13} className="camera-icon" />
                    <span>View {lot.photos.length} Farmer Photo{lot.photos.length > 1 ? 's' : ''}</span>
                  </button>
                  <span className="lot-media-badge">
                    <CheckCircle2 size={11} className="badge-check-icon" />
                    <span>Verified Batch</span>
                  </span>
                </div>
              )}

              <div className="lot-card__details">
                <div className="detail-row">
                  <span className="detail-label">Batch Volume</span>
                  <span className="detail-value">{lot.quantity.toLocaleString('en-IN')} {lot.unit}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Seller / Origin</span>
                  <span className="detail-value">{lot.seller} ({lot.sellerType}) • {lot.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Distance from Gate</span>
                  <span className="detail-value">{lot.distance || '22 km'}</span>
                </div>
              </div>

              <div className="lot-card__footer flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline flex-1 text-xs py-2"
                  onClick={() => handleOpenSample(lot)}
                >
                  <Send size={13} />
                  <span>Request Sample</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary flex-1 text-xs py-2"
                  onClick={() => handleOpenBid(lot)}
                >
                  <span>Lock Contract</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Booking Modal */}
      {bidModalOpen && selectedBatch && (
        <div className="modal-overlay" onClick={() => setBidModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <CropImage crop={selectedBatch.crop} size={36} />
                <div>
                  <h3>Direct Contract: {selectedBatch.crop}</h3>
                  <span className="text-xs text-muted">Lot ID: {selectedBatch.id} • {selectedBatch.location}</span>
                </div>
              </div>
              <button className="close-btn" onClick={() => setBidModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {bidSuccess ? (
              <div className="modal-success animate-fade-in">
                <CheckCircle2 size={48} className="text-success mx-auto mb-3" />
                <h4>Contract Confirmed with {selectedBatch.seller}!</h4>
                <p>Escrow payment locked. Fleet pickup scheduled for tomorrow 08:00 AM.</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBid} className="modal-form">
                <div className="modal-breakdown">
                  <div className="breakdown-line">
                    <span>Batch Volume</span>
                    <strong>{selectedBatch.quantity} {selectedBatch.unit}</strong>
                  </div>
                  <div className="breakdown-line">
                    <span>Locked Unit Price</span>
                    <strong>₹{selectedBatch.price} / {selectedBatch.unit}</strong>
                  </div>
                  <div className="breakdown-line">
                    <span>Gross Contract Value</span>
                    <strong>₹{(selectedBatch.quantity * selectedBatch.price).toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="breakdown-line">
                    <span>Escrow Platform Fee (1%)</span>
                    <span>₹{((selectedBatch.quantity * selectedBatch.price) * 0.01).toFixed(0)}</span>
                  </div>
                  <div className="breakdown-total">
                    <span>Total Escrow Deposit</span>
                    <strong>₹{((selectedBatch.quantity * selectedBatch.price) * 1.01).toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="modal-perk">
                  <ShieldCheck size={18} className="text-success" />
                  <span>Funds held in protected RBI Escrow until weighment verification at your delivery dock.</span>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setBidModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Deposit Escrow & Lock Lot
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Request Produce Sample Modal */}
      {sampleModalOpen && selectedBatch && (
        <div className="modal-overlay" onClick={() => setSampleModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <CropImage crop={selectedBatch.crop} size={36} />
                <div>
                  <h3>Request Produce Sample: {selectedBatch.crop}</h3>
                  <span className="text-xs text-muted">Grade {selectedBatch.grade} · {selectedBatch.seller}</span>
                </div>
              </div>
              <button className="close-btn" onClick={() => setSampleModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {sampleSuccess ? (
              <div className="modal-success animate-fade-in p-6 text-center">
                <CheckCircle2 size={48} className="text-success mx-auto mb-3" />
                <h4>Sample Request Dispatched!</h4>
                <p className="text-sm text-slate-600">The farmer has been notified to send {sampleData.quantity} of {selectedBatch.crop} for quality lab analysis.</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmSample} className="sample-modal-form">
                <div className="modal-form-group">
                  <label className="modal-form-label">
                    <span>Select Sample Quantity</span>
                    <span className="label-helper">Lab verification batch size</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      className="modal-select-field"
                      value={sampleData.quantity}
                      onChange={(e) => setSampleData({ ...sampleData, quantity: e.target.value })}
                    >
                      <option value="1 kg">1 kg (Quick Visual & Organoleptic Inspection)</option>
                      <option value="2 kg">2 kg (Recommended for Laboratory Moisture / Brix Testing)</option>
                      <option value="5 kg">5 kg (Culinary, Processing & Shelf-Life Assessment)</option>
                    </select>
                    <ChevronDown size={18} className="select-chevron-icon" />
                  </div>
                </div>

                <div className="modal-form-group">
                  <label className="modal-form-label">
                    <span>Buyer Receiving Dock / Address</span>
                    <span className="label-helper">Direct dispatch destination</span>
                  </label>
                  <input
                    type="text"
                    className="modal-input-field"
                    placeholder="e.g. Plot 4B, Sector V, Salt Lake, Kolkata, WB 700091"
                    value={sampleData.address}
                    onChange={(e) => setSampleData({ ...sampleData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-perk-box">
                  <ShieldCheck size={20} className="perk-icon" />
                  <div className="perk-text">
                    <strong>APMC Monitored Courier Logistics</strong>
                    <span>Express cold/ambient dispatch directly from {selectedBatch.location} collection center.</span>
                  </div>
                </div>

                <div className="modal-actions-bar">
                  <button type="button" className="btn-modal-cancel" onClick={() => setSampleModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-modal-confirm">
                    Confirm Sample Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Farmer Produce Photos Review Modal */}
      {photoModalOpen && selectedBatch && (
        <div className="modal-overlay" onClick={() => setPhotoModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <CropImage crop={selectedBatch.crop} size={36} />
                <div>
                  <h3>Farmer Verified Photos: {selectedBatch.crop}</h3>
                  <span className="text-xs text-muted">Grade {selectedBatch.grade} · Harvested: {selectedBatch.harvestDate}</span>
                </div>
              </div>
              <button className="close-btn" onClick={() => setPhotoModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="photo-gallery-container">
              <div className="photo-preview-grid">
                {selectedBatch.photos?.map((photo, i) => (
                  <div key={i} className="photo-preview-card">
                    <img src={photo} alt="Batch produce" className="photo-preview-img" />
                    <span className="photo-preview-badge">
                      Verified Batch Photo #{i + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="photo-audit-notice">
                <CheckCircle2 size={16} className="audit-check-icon" />
                <span>Digitally signed geotagged photo from {selectedBatch.seller}'s farm in {selectedBatch.location}. Verified with Grade {selectedBatch.grade} quality parameters.</span>
              </div>
            </div>

            <div className="modal-actions-bar mt-4 pt-3 border-t border-slate-100">
              <button type="button" className="btn btn-primary w-full" onClick={() => setPhotoModalOpen(false)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

