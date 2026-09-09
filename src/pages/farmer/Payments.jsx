import {
  CreditCard, CheckCircle2, ArrowDownLeft, ShieldCheck,
  Download, Clock, Building2, AlertCircle
} from 'lucide-react';
import CropImage from '../../components/common/CropImage';
import { farmer, transaction, formatCurrency } from '../../data/mockData';
import './Payments.css';

export default function Payments() {
  const payouts = [
    {
      id: 'PAY-84219',
      txId: 'KC-10284',
      crop: 'Tomato Grade A',
      amount: 35015.50,
      gross: 36177.50,
      date: '08 Sep 2026',
      status: 'settled',
      utr: 'SBIN0029482194',
    },
    {
      id: 'PAY-83912',
      txId: 'KC-10119',
      crop: 'Paddy Swarna',
      amount: 48600.00,
      gross: 50000.00,
      date: '28 Aug 2026',
      status: 'settled',
      utr: 'SBIN0019284910',
    },
    {
      id: 'PAY-82104',
      txId: 'KC-09822',
      crop: 'Potato Jyoti',
      amount: 59184.50,
      gross: 61000.00,
      date: '14 Aug 2026',
      status: 'settled',
      utr: 'SBIN0011824719',
    },
  ];

  return (
    <div className="payments-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Digital Escrow & Direct Bank Payouts</h1>
          <p className="page-subtitle">
            Instant automated bank transfers. Zero commission delays, zero traditional mandi deductions, and transparent fee audit.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="payment-metrics-grid">
        <div className="p-metric-card">
          <span className="p-metric-label">Total Realized Revenue</span>
          <div className="p-metric-val">₹1,42,800.00</div>
          <span className="p-metric-sub text-success">100% direct bank credit</span>
        </div>

        <div className="p-metric-card">
          <span className="p-metric-label">Latest Settlement (Today)</span>
          <div className="p-metric-val text-primary-green">₹35,015.50</div>
          <span className="p-metric-sub">For Order KC-10284</span>
        </div>

        <div className="p-metric-card">
          <span className="p-metric-label">Escrow Locked (Incoming)</span>
          <div className="p-metric-val text-gold">₹27,910.00</div>
          <span className="p-metric-sub">Awaiting FreshMart Dispatch</span>
        </div>

        <div className="p-metric-card bank-info-card">
          <div className="bank-header">
            <Building2 size={20} className="bank-icon" />
            <span className="verified-pill">Verified Direct Credit</span>
          </div>
          <div className="bank-name">State Bank of India</div>
          <div className="bank-acct">Account {farmer.account} · Bardhaman Branch</div>
        </div>
      </div>

      {/* How Escrow Protects Farmers */}
      <div className="escrow-process-card">
        <h3>How Krishi Connect Escrow Protects You Against Non-Payment</h3>
        <div className="escrow-steps-row">
          <div className="e-step">
            <div className="e-step-num">1</div>
            <h4>Buyer Deposits Funds Upfront</h4>
            <p>Institutional buyer deposits 100% contract amount into RBI-regulated escrow before harvest dispatch.</p>
          </div>
          <div className="e-step">
            <div className="e-step-num">2</div>
            <h4>IoT Weighment at Local Hub</h4>
            <p>Produce is weighed on digital scales. Weight and grade are locked immutably into the Trust Ledger.</p>
          </div>
          <div className="e-step">
            <div className="e-step-num">3</div>
            <h4>Direct Bank Credit within 2h</h4>
            <p>Smart contract releases net payout directly to your bank account via NEFT/RTGS. No agent middlemen.</p>
          </div>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="payout-table-card">
        <div className="payout-table-header">
          <h3>Settled Payout Ledger</h3>
          <button className="btn btn-outline btn-sm">
            <Download size={14} /> Export Financial Statement
          </button>
        </div>

        <div className="table-responsive">
          <table className="payout-table">
            <thead>
              <tr>
                <th>Payout ID</th>
                <th>Order Ref</th>
                <th>Produce Batch</th>
                <th>Date Settled</th>
                <th>Gross Value</th>
                <th>Net Realized</th>
                <th>Bank UTR Ref</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id}>
                  <td className="font-mono font-bold">{p.id}</td>
                  <td className="font-mono">{p.txId}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <CropImage crop={p.crop.split(' ')[0]} size={20} />
                      <span>{p.crop}</span>
                    </div>
                  </td>
                  <td>{p.date}</td>
                  <td>₹{p.gross.toLocaleString('en-IN')}</td>
                  <td className="font-bold text-primary-green">
                    ₹{p.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="font-mono text-xs">{p.utr}</td>
                  <td>
                    <span className="settled-tag">
                      <CheckCircle2 size={12} /> Settled
                    </span>
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
