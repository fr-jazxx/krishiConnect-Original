import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Shield, CheckCircle2, Lock, FileText, Search,
  ExternalLink, Hash, ArrowUpRight, Cpu
} from 'lucide-react';
import { ledgerEvents, formatTime } from '../../data/mockData';
import './TrustLedger.css';

export default function TrustLedger({ role }) {
  const location = useLocation();
  const isBuyer = role === 'buyer' || location.pathname.startsWith('/buyer');
  const [selectedTx, setSelectedTx] = useState('KC-10284');

  return (
    <div className="trust-ledger-page">
      <div className="ledger-header">
        <div>
          <div className="ledger-badge">
            <Shield size={14} className="badge-shield" />
            <span>
              {isBuyer
                ? 'Institutional Escrow Audit Log · Cryptographically Verified Settlement'
                : 'Decentralized Audit Log · Zero Manipulation Guarantee'}
            </span>
          </div>
          <h1 className="page-title">
            {isBuyer ? 'Buyer Escrow & Settlement Audit Trail' : 'Tamper-Evident Trust Ledger'}
          </h1>
          <p className="page-subtitle">
            {isBuyer
              ? 'Every dock weighment slip, cold-chain temperature ping, smart contract lock, and RTGS payment is cryptographically sealed and immutable.'
              : 'Every scale reading, grade assessment, contract agreement, and rupee transferred is cryptographically sealed and publicly verifiable.'}
          </p>
        </div>

        <div className="integrity-status-card">
          <div className="integrity-icon">
            <Lock size={22} />
          </div>
          <div>
            <div className="integrity-val">Ledger State: HEALTHY</div>
            <div className="integrity-sub">All 6 blocks verified with hash parity</div>
          </div>
        </div>
      </div>

      {/* Transaction Filter Header */}
      <div className="ledger-filter-row">
        <div className="filter-item">
          <span>Viewing Audit Trail for:</span>
          <select
            value={selectedTx}
            onChange={(e) => setSelectedTx(e.target.value)}
            className="ledger-select"
          >
            {isBuyer ? (
              <>
                <option value="KC-10284">Contract #KC-TOM-9842 (FreshMart ← Ramesh Kumar · Tomato 1,250 kg)</option>
                <option value="KC-10282">Contract #KC-POT-8031 (FreshMart ← Hooghly Potato Consortium · Potato 24,000 kg)</option>
                <option value="KC-10285">Contract #KC-PAD-8022 (FreshMart ← Damodar Valley Grain · Paddy 18,000 kg)</option>
              </>
            ) : (
              <>
                <option value="KC-10284">Order KC-10284 (Tomato · Ramesh Kumar → FreshMart)</option>
                <option value="KC-10281">Order KC-10281 (Paddy · Ramesh Kumar → GrainWorld)</option>
              </>
            )}
          </select>
        </div>
        <div className="block-height-tag">
          <Hash size={14} /> Block Sequence #84,204
        </div>
      </div>

      {/* Chronological Ledger Feed */}
      <div className="ledger-timeline">
        {ledgerEvents.map((evt, idx) => (
          <div key={evt.id} className="ledger-item">
            <div className="ledger-marker">
              <div className="marker-dot">
                <CheckCircle2 size={16} />
              </div>
              {idx < ledgerEvents.length - 1 && <div className="marker-stem" />}
            </div>

            <div className="ledger-card">
              <div className="ledger-card-top">
                <div className="evt-title-row">
                  <span className="evt-type-tag">{evt.type}</span>
                  <h3 className="evt-title">{evt.title}</h3>
                </div>
                <span className="evt-time">{formatTime(evt.timestamp)}</span>
              </div>

              <div className="ledger-card-body">
                <div className="evt-detail-box">
                  <span className="detail-key">Recorded Data:</span>
                  <strong className="detail-val">{evt.detail}</strong>
                </div>

                <div className="evt-actor-box">
                  <span className="detail-key">Attested by Actor:</span>
                  <span className="actor-name">{evt.actor}</span>
                </div>
              </div>

              <div className="ledger-card-footer">
                <div className="hash-row font-mono">
                  <span className="hash-label">HASH:</span>
                  <span className="hash-string">
                    0x{(idx * 137492 + 98234120).toString(16)}...{(idx * 948123 + 4921948).toString(16)}
                  </span>
                </div>
                <div className="verified-badge">
                  <CheckCircle2 size={12} /> Cryptographically Valid
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
