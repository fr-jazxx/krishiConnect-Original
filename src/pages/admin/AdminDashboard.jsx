import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, Users, Store, TrendingUp, ShieldAlert,
  ArrowRight, CheckCircle2, AlertTriangle, Scale, Activity,
  UserX, UserCheck, ShieldBan, ShieldCheck
} from 'lucide-react';
import { adminStats } from '../../data/mockData';
import { useKrishi } from '../../context/KrishiContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { users, toggleUserStatus } = useKrishi();
  const [adminToast, setAdminToast] = useState(null);

  const handleToggle = (userId, userName, currentStatus) => {
    const nextStatus = currentStatus === 'verified' ? 'revoked' : 'verified';
    toggleUserStatus(userId, nextStatus);
    setAdminToast(
      nextStatus === 'revoked'
        ? `Access revoked for ${userName}. Deemed unverified for trade.`
        : `Verified access granted to ${userName}.`
    );
    setTimeout(() => setAdminToast(null), 4000);
  };
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

      {adminToast && (
        <div className="p-3 mb-4 rounded-lg bg-slate-900 text-white flex items-center justify-between text-sm animate-fade-in shadow-lg">
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span>{adminToast}</span>
          </span>
          <button onClick={() => setAdminToast(null)} className="text-xs text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* User Access & Trade Verification Management Panel */}
      <div className="admin-panel mt-6">
        <div className="panel-header flex justify-between items-center">
          <div>
            <h3>User & Entity Trade Authorization Control</h3>
            <span className="text-xs text-muted">Manage buying/selling permissions and revoke access for non-compliant actors</span>
          </div>
          <span className="badge badge-accent">Oversight Authority: District APMC Registrar</span>
        </div>

        <div className="commodity-table-wrap mt-3">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Entity Name</th>
                <th>Role</th>
                <th>Location & Phone</th>
                <th>Trades</th>
                <th>Verification Status</th>
                <th>Access Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <strong>{u.name}</strong>
                    <span className="text-xs text-muted block">ID: {u.id}</span>
                  </td>
                  <td>
                    <span className={`badge ${u.role.includes('Farmer') ? 'badge-primary' : 'badge-accent'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm">{u.location}</span>
                    <span className="text-xs text-muted block">{u.phone}</span>
                  </td>
                  <td>
                    <strong>{u.tradeCount}</strong>
                    <span className="text-xs text-muted block">Joined {u.joinDate}</span>
                  </td>
                  <td>
                    {u.status === 'verified' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={13} /> Verified for Trade
                      </span>
                    )}
                    {u.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                        <Activity size={13} /> Pending Review
                      </span>
                    )}
                    {u.status === 'revoked' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                        <ShieldBan size={13} /> Access Revoked
                      </span>
                    )}
                    {u.status === 'flagged' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                        <AlertTriangle size={13} /> Risk Flagged
                      </span>
                    )}
                  </td>
                  <td>
                    {u.status === 'verified' ? (
                      <button
                        type="button"
                        onClick={() => handleToggle(u.id, u.name, u.status)}
                        className="btn btn-outline text-xs py-1.5 px-3 border-rose-300 text-rose-700 hover:bg-rose-50 flex items-center gap-1"
                      >
                        <UserX size={13} />
                        <span>Revoke Access</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggle(u.id, u.name, u.status)}
                        className="btn btn-primary text-xs py-1.5 px-3 flex items-center gap-1"
                      >
                        <UserCheck size={13} />
                        <span>Verify / Restore Access</span>
                      </button>
                    )}
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

