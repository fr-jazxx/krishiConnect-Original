import { Link } from 'react-router-dom';
import {
  ShieldAlert, AlertTriangle, Scale, DollarSign,
  UserX, FileWarning, ArrowRight, CheckCircle2, Shield
} from 'lucide-react';
import { trustMonitor } from '../../data/mockData';
import './TrustMonitor.css';

export default function TrustMonitor() {
  const { riskEvents, flaggedActor } = trustMonitor;

  return (
    <div className="trust-monitor-page">
      <div className="page-header">
        <div>
          <div className="monitor-badge">
            <ShieldAlert size={14} className="text-danger" />
            <span>AI Automated Integrity & Fraud Surveillance Engine</span>
          </div>
          <h1 className="page-title">Market Trust & Risk Monitor</h1>
          <p className="page-subtitle">
            Autonomous detection of suspicious cartels, scale weight tampering, distress pricing coercion, and repeated buyer defaults.
          </p>
        </div>
      </div>

      {/* Risk Metric Indicators */}
      <div className="risk-metrics-grid">
        <div className="risk-metric-card card--price">
          <div className="risk-metric-header">
            <span>Price Anomalies</span>
            <DollarSign size={18} className="risk-icon" />
          </div>
          <div className="risk-metric-val">{riskEvents.priceAnomalies}</div>
          <div className="risk-metric-sub">Distress bids &gt; 25% below mandi</div>
        </div>

        <div className="risk-metric-card card--weight">
          <div className="risk-metric-header">
            <span>Weighment Anomalies</span>
            <Scale size={18} className="risk-icon" />
          </div>
          <div className="risk-metric-val">{riskEvents.weightAnomalies}</div>
          <div className="risk-metric-sub">Scale variance &gt; 2.5% vs hub loadcell</div>
        </div>

        <div className="risk-metric-card card--payment">
          <div className="risk-metric-header">
            <span>Payment Delay Flags</span>
            <AlertTriangle size={18} className="risk-icon" />
          </div>
          <div className="risk-metric-val">{riskEvents.paymentAnomalies}</div>
          <div className="risk-metric-sub">Escrow lock release timeouts</div>
        </div>

        <div className="risk-metric-card card--complaint">
          <div className="risk-metric-header">
            <span>Farmer Grievances</span>
            <UserX size={18} className="risk-icon" />
          </div>
          <div className="risk-metric-val">{riskEvents.repeatedComplaints}</div>
          <div className="risk-metric-sub">Cluster complaints against single buyer</div>
        </div>
      </div>

      {/* Flagged Entity Profile */}
      <div className="flagged-actor-card">
        <div className="flagged-header">
          <div className="actor-title-wrap">
            <span className="risk-tag">CRITICAL SURVEILLANCE FLAG</span>
            <h3>Actor Entity #{flaggedActor.id} · Regional Commission Intermediary</h3>
          </div>
          <div className="risk-score-badge">
            <span className="score-num">{flaggedActor.riskScore}</span>
            <span className="score-denom">/100 RISK</span>
          </div>
        </div>

        <div className="flagged-body">
          <div className="flagged-left">
            <h4>Algorithmic Violation Breakdown</h4>
            <p className="violation-desc">
              Behavior consistent with artificial price-depressing bids and repeated weight discount claims at receiving bays.
            </p>

            <div className="violation-bars">
              {flaggedActor.reasons.map((r, i) => (
                <div key={i} className="v-bar-item">
                  <div className="v-bar-meta">
                    <span>{r.label}</span>
                    <strong>{r.percent}% Contribution</strong>
                  </div>
                  <div className="v-track">
                    <div className="v-fill" style={{ width: `${r.percent * 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flagged-right">
            <h4>Recommended Administrative Actions</h4>
            <div className="action-buttons-list">
              <button className="btn btn-danger btn-block">
                Freeze Active Escrow & Platform Bidding
              </button>
              <button className="btn btn-outline btn-block">
                Request Physical Calibration Audit of Scales
              </button>
              <Link to="/admin/dispute" className="btn btn-primary btn-block">
                Escalate to Dispute Arbitration Tribunal <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
