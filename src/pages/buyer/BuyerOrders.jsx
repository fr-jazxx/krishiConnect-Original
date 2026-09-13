import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, ShieldCheck, Truck, CheckCircle2,
  Clock, ArrowRight, Download, Eye, DollarSign
} from 'lucide-react';
import CropImage from '../../components/common/CropImage';
import { buyerOffer, logisticsRoutes } from '../../data/mockData';
import './BuyerOrders.css';

export default function BuyerOrders() {
  const [escrowReleased, setEscrowReleased] = useState(false);

  return (
    <div className="buyer-orders-page">
      <div className="page-header">
        <div>
          <div className="buyer-badge">
            <span className="badge-dot" /> Institutional Procurement Orders & Contracts
          </div>
          <h1 className="page-title">Active Consignments & Escrow Settlement</h1>
          <p className="page-subtitle">
            Verify automated weighment slips, monitor refrigerated transit, and release digital escrow bank payouts upon dock delivery.
          </p>
        </div>
      </div>

      {/* Primary Active Contract Spotlight */}
      <div className="contract-spotlight-card">
        {/* Header */}
        <div className="contract-header">
          <div className="contract-header__left">
            <CropImage crop="Tomato" size={52} />
            <div>
              <div className="contract-title-row">
                <h3 className="contract-title">Contract #KC-TOM-9842</h3>
                <span className="contract-status-badge">
                  <span className="badge-dot" /> In Transit (Cold-Chain)
                </span>
              </div>
              <p className="contract-meta">
                <span>Seller: <strong>Ramesh Kumar</strong> (Bardhaman Hub)</span>
                <span className="contract-meta-dot">•</span>
                <span>Escrow Locked: <span className="contract-escrow-pill">₹27,910</span></span>
              </p>
            </div>
          </div>

          <Link to="/logistics" className="contract-track-btn">
            <Truck size={16} />
            <span>Track Delivery Truck (PB-10-CZ-4412)</span>
          </Link>
        </div>

        {/* Milestone Steps: 4 Separate Styled Stage Boxes */}
        <div className="milestones-container">
          <div className="milestones-grid">
            {/* Step 1: Contract Locked */}
            <div className="milestone-box milestone-box--completed">
              <div className="milestone-icon-wrap milestone-icon-wrap--completed">
                <CheckCircle2 size={20} />
              </div>
              <span className="milestone-label">Contract Locked</span>
              <div className="milestone-badge-row">
                <span className="milestone-time">09:15 AM</span>
                <span className="milestone-sub">Fixed ₹29/kg</span>
              </div>
            </div>

            {/* Step 2: Farm Weighment */}
            <div className="milestone-box milestone-box--completed">
              <div className="milestone-icon-wrap milestone-icon-wrap--completed">
                <CheckCircle2 size={20} />
              </div>
              <span className="milestone-label">Farm Weighment</span>
              <div className="milestone-badge-row">
                <span className="milestone-time">11:30 AM</span>
                <span className="milestone-sub">1,000 kg Digital</span>
              </div>
            </div>

            {/* Step 3: In Transit */}
            <div className="milestone-box milestone-box--active">
              <div className="milestone-icon-wrap milestone-icon-wrap--active">
                <Truck size={20} />
              </div>
              <span className="milestone-label">In Transit</span>
              <div className="milestone-badge-row">
                <span className="milestone-time">ETA 15:40</span>
                <span className="milestone-sub">Temp 4.1°C</span>
              </div>
            </div>

            {/* Step 4: Dock Inspection / Settlement */}
            <div className={`milestone-box ${escrowReleased ? 'milestone-box--completed' : 'milestone-box--pending'}`}>
              <div className={`milestone-icon-wrap ${escrowReleased ? 'milestone-icon-wrap--completed' : 'milestone-icon-wrap--pending'}`}>
                <DollarSign size={20} />
              </div>
              <span className="milestone-label">
                {escrowReleased ? 'Escrow Released' : 'Dock Inspection'}
              </span>
              <div className="milestone-badge-row">
                <span className="milestone-time">
                  {escrowReleased ? 'Settled' : 'Gate Scan'}
                </span>
                <span className="milestone-sub">
                  {escrowReleased ? 'Transferred to Bank' : 'Pending Gate Scan'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel & Cold-Chain Telemetry */}
        <div className="contract-footer-strip">
          <div className="telemetry-info">
            <ShieldCheck size={26} className="telemetry-shield-icon" />
            <div className="telemetry-text">
              <div className="telemetry-title">
                <span>IoT Cold-Chain Quality Telemetry:</span>
                <span className="telemetry-status-tag">PASSED</span>
              </div>
              <span className="telemetry-sub">
                No temperature deviations during 42.6 km journey. AGMARK Grade A certified.
              </span>
            </div>
          </div>

          <div className="contract-btn-group">
            <button
              type="button"
              className="btn-slip"
              onClick={() => alert('Downloading APMC Certified Digital Invoice & Weighbridge Slip...')}
            >
              <Download size={15} />
              <span>Weighment Slip</span>
            </button>
            <button
              type="button"
              disabled={escrowReleased}
              className={`btn-escrow-action ${escrowReleased ? 'btn-escrow-action--settled' : ''}`}
              onClick={() => setEscrowReleased(true)}
            >
              <CheckCircle2 size={16} />
              <span>{escrowReleased ? 'Escrow Settled (Paid)' : 'Confirm Receipt & Release Escrow'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
