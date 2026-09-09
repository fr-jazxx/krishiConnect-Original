import { Link, useParams } from 'react-router-dom';
import {
  CheckCircle2, Shield, Truck, FileText, ArrowLeft,
  Calendar, MapPin, Scale, Award, Download
} from 'lucide-react';
import { transaction, farmer } from '../../data/mockData';
import './TransactionDetails.css';

export default function TransactionDetails() {
  const { id } = useParams();
  const txId = id || transaction.id;

  return (
    <div className="tx-details-page">
      <div className="tx-back-nav">
        <Link to="/orders" className="back-link">
          <ArrowLeft size={16} /> Back to Orders
        </Link>
      </div>

      <div className="tx-header">
        <div>
          <div className="tx-id-badge">
            <span className="font-mono">TRANSACTION #{txId}</span>
            <span className="tx-status-pill">Payment Confirmed</span>
          </div>
          <h1 className="tx-title">{transaction.crop} Batch · Grade {transaction.grade}</h1>
          <p className="tx-subtitle">
            Direct institutional contract fulfillment with FreshMart Retail. End-to-end tracked from Bardhaman Hub.
          </p>
        </div>

        <div className="tx-header-actions">
          <button className="btn btn-outline">
            <Download size={16} /> Download Tax Invoice & Proof
          </button>
          <Link to="/ledger" className="btn btn-primary">
            <Shield size={16} /> Audit On Trust Ledger
          </Link>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="tx-stepper-card">
        <h3>Execution Milestone Pipeline</h3>
        <div className="stepper-track">
          {transaction.steps.map((step, index) => (
            <div key={step.id} className="step-node step-node--done">
              <div className="step-circle">
                <CheckCircle2 size={18} />
              </div>
              <div className="step-content">
                <span className="step-name">{step.label}</span>
                <span className="step-meta">Completed</span>
              </div>
              {index < transaction.steps.length - 1 && <div className="step-line step-line--done" />}
            </div>
          ))}
        </div>
      </div>

      {/* Split Details: Settlement Summary & Weighment/Quality Certificate */}
      <div className="tx-grid">
        {/* Left Card: Final Settlement Breakdown */}
        <div className="tx-card">
          <div className="tx-card-header">
            <h3>Final Escrow Settlement</h3>
            <span className="badge badge-success">Direct NEFT Transferred</span>
          </div>

          <div className="settlement-detail-list">
            <div className="s-detail-row">
              <span className="detail-label">Verified Net Weight:</span>
              <span className="detail-val font-mono font-bold">{transaction.weight.toLocaleString('en-IN')} kg</span>
            </div>
            <div className="s-detail-row">
              <span className="detail-label">Contracted Locked Price:</span>
              <span className="detail-val font-bold">₹{transaction.pricePerKg.toFixed(2)} / kg</span>
            </div>
            <div className="s-detail-row border-top">
              <span className="detail-label">Gross Crop Value:</span>
              <span className="detail-val">₹{transaction.grossValue.toLocaleString('en-IN')}</span>
            </div>
            <div className="s-detail-row text-muted">
              <span className="detail-label">Pooled Freight Transport:</span>
              <span className="detail-val">- ₹{transaction.logistics.toFixed(2)}</span>
            </div>
            <div className="s-detail-row text-muted">
              <span className="detail-label">Platform Quality Assurance (1%):</span>
              <span className="detail-val">- ₹{transaction.platformFee.toFixed(2)}</span>
            </div>
            <div className="s-detail-row total-highlight">
              <span className="detail-label font-bold">Final Net Realization to Farmer:</span>
              <span className="detail-val font-xl text-primary-green">
                ₹{transaction.netPayout.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="payout-account-box">
            <div className="account-text">
              <div className="account-label">Deposited into Verified Bank Account</div>
              <div className="account-number">State Bank of India ({farmer.account})</div>
            </div>
            <span className="payout-utr">UTR: SBIN0029482194</span>
          </div>
        </div>

        {/* Right Card: Digital Weighment & Inspection Proof */}
        <div className="tx-card">
          <div className="tx-card-header">
            <h3>Certified Weighment & Inspection</h3>
            <span className="proof-tag">IoT Scale Calibrated</span>
          </div>

          <div className="certificate-box">
            <div className="cert-row">
              <div className="cert-item">
                <Scale size={20} className="cert-icon" />
                <div>
                  <div className="cert-label">Digital Scale Reading</div>
                  <div className="cert-val">{transaction.weight} kg (100% Accurate)</div>
                </div>
              </div>

              <div className="cert-item">
                <Award size={20} className="cert-icon" />
                <div>
                  <div className="cert-label">AI Computer Vision Grade</div>
                  <div className="cert-val">Grade A (Skin Firmness: 94%)</div>
                </div>
              </div>
            </div>

            <div className="cert-meta-grid">
              <div className="cert-meta-item">
                <span className="meta-lbl">Collection Center:</span>
                <span className="meta-val">Hub #14, Bardhaman Rural</span>
              </div>
              <div className="cert-meta-item">
                <span className="meta-lbl">Weighbridge Scale ID:</span>
                <span className="meta-val font-mono">WB-IOT-84920</span>
              </div>
              <div className="cert-meta-item">
                <span className="meta-lbl">Inspection Officer:</span>
                <span className="meta-val">P. Roy (Cert #9281)</span>
              </div>
              <div className="cert-meta-item">
                <span className="meta-lbl">Timestamp:</span>
                <span className="meta-val">08 Sep 2026 · 14:06 IST</span>
              </div>
            </div>

            <div className="ledger-hash-block">
              <div className="hash-title">Ledger Block Signature</div>
              <div className="hash-code font-mono">
                0x7f4e8b2c91a03f49e7b23c914d7a8e29bf4c9e81b672a912b7
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
