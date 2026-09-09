import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, ShieldCheck, TrendingUp, Truck, CheckCircle2,
  Filter, Search, ArrowRight, Clock, Award, Building2, X
} from 'lucide-react';
import CropImage from '../../components/common/CropImage';
import { marketBoard, adminStats } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import './BuyerDashboard.css';

export default function BuyerDashboard() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [bidSuccess, setBidSuccess] = useState(false);

  const availableLots = marketBoard.filter(
    (lot) => activeFilter === 'All' || lot.crop.toLowerCase() === activeFilter.toLowerCase()
  );

  const handleOpenBid = (lot) => {
    setSelectedBatch(lot);
    setBidModalOpen(true);
    setBidSuccess(false);
  };

  const handleConfirmBid = (e) => {
    e.preventDefault();
    setBidSuccess(true);
    setTimeout(() => {
      setBidModalOpen(false);
      setBidSuccess(false);
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

      {/* Lot Sourcing Section */}
      <div className="buyer-sourcing-section">
        <div className="sourcing-toolbar">
          <div className="sourcing-toolbar__left">
            <h3>Verified Farm Lots Ready for Dispatch</h3>
            <p>Direct institutional purchase with price lock and scheduled refrigerated transport</p>
          </div>

          <div className="filter-chips">
            {['All', 'Tomato', 'Paddy', 'Onion', 'Wheat', 'Rice'].map((crop) => (
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
          {availableLots.map((lot) => (
            <div key={lot.id} className="lot-card">
              <div className="lot-card__top">
                <div className="lot-crop-visual">
                  <CropImage crop={lot.crop} size={42} />
                  <div>
                    <h4 className="lot-crop-name">{lot.crop}</h4>
                    <span className="lot-grade-badge">Grade {lot.grade} · AGMARK</span>
                  </div>
                </div>
                <div className="lot-price-tag">
                  <span className="lot-price">₹{lot.price}</span>
                  <span className="lot-unit">/{lot.unit}</span>
                </div>
              </div>

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
                  <span className="detail-value">{lot.distance}</span>
                </div>
              </div>

              <div className="lot-card__footer">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => handleOpenBid(lot)}
                >
                  <span>Purchase / Lock Contract</span>
                  <ArrowRight size={16} />
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
    </div>
  );
}
