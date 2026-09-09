import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ClipboardList, CheckCircle2, AlertTriangle, ShieldCheck,
  Truck, ArrowRight, DollarSign, Clock, FileCheck
} from 'lucide-react';
import CropImage from '../../components/common/CropImage';
import { buyerOffer, activeOrders } from '../../data/mockData';
import './Orders.css';

export default function Orders() {
  const navigate = useNavigate();
  const [offerAccepted, setOfferAccepted] = useState(buyerOffer.status === 'accepted');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'active', 'completed'

  const handleAcceptOffer = () => {
    setOfferAccepted(true);
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Institutional Orders & Contract Offers</h1>
          <p className="page-subtitle">
            Review firm buy offers from corporate procurement and retail chains with upfront price locks and automated escrow settlements.
          </p>
        </div>
      </div>

      {/* Spotlight: FreshMart Institutional Buy Offer */}
      <div className="contract-offer-banner">
        <div className="contract-offer-header">
          <div className="offer-tag-row">
            <span className="badge badge-accent">Direct Purchase Offer</span>
            <span className="contract-id">ID: B-OFFER-9921</span>
          </div>
          <span className="offer-expiry"><Clock size={14} /> Valid for 4 hours</span>
        </div>

        <div className="contract-offer-body">
          <div className="buyer-profile">
            <div className="buyer-logo">FM</div>
            <div>
              <h3>{buyerOffer.buyer}</h3>
              <div className="buyer-compliance">
                <ShieldCheck size={14} className="text-success" />
                <span>GST Registered · Verified Institutional Escrow</span>
              </div>
            </div>
          </div>

          <div className="contract-terms-grid">
            <div className="term-box">
              <span className="term-label">Crop & Grade</span>
              <div className="flex items-center gap-2 mt-1">
                <CropImage crop={buyerOffer.crop} size={28} />
                <strong className="term-value">{buyerOffer.crop} (Grade A)</strong>
              </div>
            </div>
            <div className="term-box">
              <span className="term-label">Committed Volume</span>
              <strong className="term-value">{buyerOffer.quantity} {buyerOffer.unit}</strong>
            </div>
            <div className="term-box">
              <span className="term-label">Locked Unit Price</span>
              <strong className="term-value text-success">₹{buyerOffer.offerPrice}.00 / kg</strong>
            </div>
            <div className="term-box">
              <span className="term-label">Estimated Net Payout</span>
              <strong className="term-value text-gold">₹{buyerOffer.estimatedPayout.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Transparent Deductions Breakdown */}
          <div className="settlement-breakdown">
            <h4>Transparent Settlement Breakdown (No Hidden Deductions)</h4>
            <div className="settlement-rows">
              <div className="s-row">
                <span>Gross Purchase Value ({buyerOffer.quantity} kg × ₹{buyerOffer.offerPrice})</span>
                <span>₹{buyerOffer.grossValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="s-row text-muted">
                <span>Standardized Multi-Stop Transport (Bardhaman Hub to Kolkata)</span>
                <span>- ₹{buyerOffer.estimatedLogistics}</span>
              </div>
              <div className="s-row text-muted">
                <span>Platform Assurance & Quality Inspection Fee (1%)</span>
                <span>- ₹{buyerOffer.platformFee}</span>
              </div>
              <div className="s-row s-row--total">
                <strong>Guaranteed Escrow Net Payout to Farmer</strong>
                <strong className="text-primary-green">₹{buyerOffer.estimatedPayout.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          <div className="contract-offer-actions">
            {offerAccepted ? (
              <div className="accepted-notification">
                <CheckCircle2 size={20} className="text-success" />
                <span>Offer Accepted! Contract registered on Trust Ledger. Proceed to dispatch schedule.</span>
                <Link to="/transaction/KC-10284" className="btn btn-primary btn-sm ml-auto">
                  View Live Transaction Flow <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="action-button-group">
                <button className="btn btn-outline">Counter-Offer (₹30/kg)</button>
                <button onClick={handleAcceptOffer} className="btn btn-primary">
                  <FileCheck size={18} /> Accept Offer & Lock Contract
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* All Orders Table */}
      <div className="orders-table-card">
        <div className="orders-table-header">
          <h3>Active Orders Pipeline</h3>
          <div className="order-tabs">
            <button
              className={`order-tab ${activeTab === 'all' ? 'order-tab--active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Orders ({activeOrders.length})
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Crop</th>
                <th>Buyer</th>
                <th>Quantity</th>
                <th>Price/kg</th>
                <th>Gross Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-mono font-bold">{order.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <CropImage crop={order.crop} size={24} />
                      <span>{order.crop}</span>
                    </div>
                  </td>
                  <td>{order.buyer}</td>
                  <td>{order.quantity} {order.unit}</td>
                  <td>₹{order.price}</td>
                  <td>₹{(order.quantity * order.price).toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <Link to={`/transaction/${order.id}`} className="btn btn-outline btn-xs">
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
