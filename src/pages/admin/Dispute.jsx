import { useState } from 'react';
import {
  AlertTriangle, Scale, CheckCircle2, FileText,
  Shield, Camera, ArrowRight, Check
} from 'lucide-react';
import './Dispute.css';

export default function Dispute() {
  const [resolved, setResolved] = useState(false);

  const handleResolve = () => {
    setResolved(true);
  };

  return (
    <div className="dispute-page">
      <div className="page-header">
        <div>
          <div className="dispute-badge">
            <AlertTriangle size={14} className="text-danger" />
            <span>Multi-Party Evidence & Arbitration Tribunal</span>
          </div>
          <h1 className="page-title">Dispute Resolution Engine</h1>
          <p className="page-subtitle">
            Transparent evidentiary resolution for weight discrepancies, moisture evaporation, and quality downgrades.
          </p>
        </div>
      </div>

      {/* Active Dispute Case Container */}
      <div className="case-card">
        <div className="case-header">
          <div>
            <div className="case-meta">
              <span className="case-id">CASE #DSP-2041</span>
              <span className="case-status">{resolved ? 'Resolved & Sealed' : 'Under Formal Arbitration'}</span>
            </div>
            <h2>Weight Variance on Dispatch: Tomato Batch (Order KC-10284)</h2>
          </div>
          <div className="case-dispute-amt">
            <span className="amt-label">Variance in Contest:</span>
            <span className="amt-val">47.5 kg (₹1,377.50)</span>
          </div>
        </div>

        {/* Multi-Party Evidence Grid */}
        <div className="evidence-grid">
          <div className="evidence-col">
            <div className="evidence-header">
              <span className="evidence-tag tag--farmer">Party A: Farmer Gate Claim</span>
            </div>
            <div className="evidence-body">
              <p><strong>Claimed Weight:</strong> 1,295.0 kg</p>
              <p><strong>Instrument:</strong> Manual mechanical spring balance at village gate.</p>
              <p><strong>Tare deduction:</strong> Gross estimated including wooden boxes (non-standardized).</p>
              <div className="evidence-note">
                Note: Spring scales have ±4% uncalibrated margin of error.
              </div>
            </div>
          </div>

          <div className="evidence-col">
            <div className="evidence-header">
              <span className="evidence-tag tag--hub">Party B: Hub IoT Scale (Attested)</span>
            </div>
            <div className="evidence-body">
              <p><strong>Recorded Weight:</strong> 1,247.5 kg</p>
              <p><strong>Instrument:</strong> Calibrated electronic loadcell (Cert #WB-IOT-84920).</p>
              <p><strong>Tare deduction:</strong> Standardized plastic crate tare deducted automatically.</p>
              <div className="evidence-note note--valid flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-success inline flex-shrink-0" />
                <span>Hardware hash matches Trust Ledger Block #84,204.</span>
              </div>
            </div>
          </div>

          <div className="evidence-col">
            <div className="evidence-header">
              <span className="evidence-tag tag--lab">Independent Lab Telemetry</span>
            </div>
            <div className="evidence-body">
              <p><strong>Moisture Loss:</strong> 3.6% transpiration during midday transit (31°C ambient).</p>
              <p><strong>Quality Grading:</strong> Grade A sustained (firmness 94%).</p>
              <p><strong>Physical Damage:</strong> Zero transit bruising.</p>
              <div className="evidence-note">
                Natural physiological water loss accounts for 42 kg of the variance.
              </div>
            </div>
          </div>
        </div>

        {/* Administrative Ruling Card */}
        <div className="ruling-card">
          <h4>Arbitration Finding & Ruling</h4>
          <p>
            The independent sensor telemetry confirms that 1,247.5 kg represents the verified delivered biomass, with variance explained by non-standard tare deduction at source and natural midday tomato transpiration.
          </p>

          <div className="ruling-actions">
            {resolved ? (
              <div className="ruling-confirmed">
                <CheckCircle2 size={20} className="text-success" />
                <span>
                  <strong>Ruling executed:</strong> Hub weight of 1,247.5 kg upheld. Farmer paid ₹35,015.50 in full. Dispute closed and sealed on Trust Ledger.
                </span>
              </div>
            ) : (
              <div className="ruling-buttons">
                <button onClick={handleResolve} className="btn btn-primary">
                  <Check size={18} /> Uphold Hub Certified Weight (1,247.5 kg) & Release Payout
                </button>
                <button className="btn btn-outline">
                  Split Transpiration Variance (50/50 Goodwill)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
