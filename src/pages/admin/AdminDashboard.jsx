import { Link } from 'react-router-dom';
import {
  BarChart3, Users, Store, TrendingUp, ShieldAlert,
  ArrowRight, CheckCircle2, AlertTriangle, Scale, Activity
} from 'lucide-react';
import { adminStats } from '../../data/mockData';
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <div className="admin-badge">
            <span className="badge-dot" /> National Agri Supply Oversight · Bardhaman District Hub
          </div>
          <h1 className="admin-title">Supply Network Operations & Market Telemetry</h1>
          <p className="admin-subtitle">
            Macro-level transparency monitoring, intermediary-elimination economics, and district trade flow health.
          </p>
        </div>

        <div className="admin-actions">
          <Link to="/admin/trust-monitor" className="btn btn-outline">
            <ShieldAlert size={16} /> Trust Monitor (36 Flagged)
          </Link>
          <Link to="/admin/dispute" className="btn btn-primary">
            <AlertTriangle size={16} /> Open Disputes (1)
          </Link>
        </div>
      </div>

      {/* Network Stats Metrics Grid */}
      <div className="admin-metrics-grid">
        <div className="admin-metric-card">
          <div className="metric-header">
            <span className="metric-label">Active Producers (FPOs)</span>
            <Users size={18} className="admin-icon" />
          </div>
          <div className="metric-val">{adminStats.activeFarmers.toLocaleString('en-IN')}</div>
          <div className="metric-sub text-success">+312 joined this week</div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-header">
            <span className="metric-label">Institutional Buyers</span>
            <Store size={18} className="admin-icon" />
          </div>
          <div className="metric-val">{adminStats.activeBuyers.toLocaleString('en-IN')}</div>
          <div className="metric-sub text-success">Verified GST & Escrow Active</div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-header">
            <span className="metric-label">Today's Direct Trade</span>
            <TrendingUp size={18} className="admin-icon admin-icon--gold" />
          </div>
          <div className="metric-val">{adminStats.todaysTradeFormatted}</div>
          <div className="metric-sub text-success">Across 8,421 contracts</div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-header">
            <span className="metric-label">Farmer Realization Lift</span>
            <TrendingUp size={18} className="admin-icon admin-icon--green" />
          </div>
          <div className="metric-val text-primary-green">+{adminStats.improvementPercent}%</div>
          <div className="metric-sub">₹{adminStats.farmerRealization}/kg vs ₹{adminStats.traditionalEstimate}/kg legacy</div>
        </div>
      </div>

      {/* Intermediary Disruption Impact Banner */}
      <div className="disruption-card">
        <div className="disruption-header">
          <h3>Economic Value Shift: Traditional Mandi vs Krishi Connect</h3>
          <span className="badge badge-success">Direct Producer Surplus: +₹18.4 Lakhs Today</span>
        </div>

        <div className="disruption-bars">
          <div className="d-bar-group">
            <div className="d-bar-label">
              <span>Traditional Middlemen Supply Chain (APMC Multi-Tier)</span>
              <strong>Farmer gets: ₹{adminStats.traditionalEstimate}/kg (71.2%)</strong>
            </div>
            <div className="bar-track">
              <div className="bar-fill bar-fill--legacy" style={{ width: '71%' }}>
                <span>Farmer (₹22.8)</span>
              </div>
              <div className="bar-fill bar-fill--middlemen" style={{ width: '29%' }}>
                <span>Middlemen Markups & Wastage (₹9.2)</span>
              </div>
            </div>
          </div>

          <div className="d-bar-group">
            <div className="d-bar-label">
              <span>Krishi Connect Direct Institutional Marketplace</span>
              <strong>Farmer gets: ₹{adminStats.farmerRealization}/kg (94.1%)</strong>
            </div>
            <div className="bar-track">
              <div className="bar-fill bar-fill--krishi" style={{ width: '94%' }}>
                <span>Direct Farmer Realization (₹27.4)</span>
              </div>
              <div className="bar-fill bar-fill--ops" style={{ width: '6%' }}>
                <span>Logistics & Assurance (₹1.7)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Transaction Verification Pipeline & District Commodity Flow */}
      <div className="admin-bottom-grid">
        <div className="admin-panel">
          <div className="panel-header">
            <h3>Today's Transaction Integrity Pipeline</h3>
            <span className="font-mono text-xs">{adminStats.transactionsToday} Total</span>
          </div>

          <div className="integrity-breakdown">
            <div className="breakdown-item item--verified">
              <div className="b-left">
                <CheckCircle2 size={18} className="text-success" />
                <span>Digitally Verified & Completed</span>
              </div>
              <strong>{adminStats.verified} (97.4%)</strong>
            </div>

            <div className="breakdown-item item--review">
              <div className="b-left">
                <Activity size={18} className="text-gold" />
                <span>IoT Scale Verification in Progress</span>
              </div>
              <strong>{adminStats.underReview} (2.2%)</strong>
            </div>

            <div className="breakdown-item item--flagged">
              <div className="b-left">
                <AlertTriangle size={18} className="text-danger" />
                <span>Risk Flagged for Anomalies</span>
              </div>
              <strong className="text-danger">{adminStats.flagged} (0.4%)</strong>
            </div>
          </div>

          <div className="panel-footer">
            <Link to="/admin/trust-monitor" className="card-link">
              Open Anomaly Detection Engine →
            </Link>
          </div>
        </div>

        <div className="admin-panel">
          <div className="panel-header">
            <h3>District Commodity Real-Time Volume</h3>
            <span className="text-xs text-muted">Bardhaman Division</span>
          </div>

          <div className="commodity-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Traded Volume</th>
                  <th>Direct Price</th>
                  <th>Mandi Avg</th>
                  <th>Delta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Tomato Hybrid</strong></td>
                  <td>1,420 Tonnes</td>
                  <td>₹29.00/kg</td>
                  <td>₹26.50/kg</td>
                  <td className="text-success">+9.4%</td>
                </tr>
                <tr>
                  <td><strong>Paddy Swarna</strong></td>
                  <td>1,840 Tonnes</td>
                  <td>₹27.00/kg</td>
                  <td>₹24.80/kg</td>
                  <td className="text-success">+8.8%</td>
                </tr>
                <tr>
                  <td><strong>Potato Jyoti</strong></td>
                  <td>582 Tonnes</td>
                  <td>₹18.50/kg</td>
                  <td>₹16.00/kg</td>
                  <td className="text-success">+15.6%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
