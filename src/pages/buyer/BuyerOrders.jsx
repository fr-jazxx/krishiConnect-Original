import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, ShieldCheck, Truck, CheckCircle2,
  Clock, ArrowRight, Download, Eye, DollarSign
} from 'lucide-react';
import CropImage from '../../components/common/CropImage';
import { buyerOffer, logisticsRoutes } from '../../data/mockData';

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
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-start flex-wrap gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <CropImage crop="Tomato" size={48} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-800">Contract #KC-TOM-9842</h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                  In Transit (Cold-Chain)
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Seller: Ramesh Kumar (Bardhaman Hub) • Escrow Locked: ₹27,910
              </p>
            </div>
          </div>

          <Link to="/logistics" className="btn btn-secondary flex items-center gap-2">
            <Truck size={16} />
            <span>Track Delivery Truck (PB-10-CZ-4412)</span>
          </Link>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-4 gap-4 my-6 text-center">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <CheckCircle2 size={20} className="text-emerald-600 mx-auto mb-1" />
            <span className="text-xs font-bold text-emerald-800 block">Contract Locked</span>
            <span className="text-[11px] text-slate-500">09:15 AM · Fixed ₹29/kg</span>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <CheckCircle2 size={20} className="text-emerald-600 mx-auto mb-1" />
            <span className="text-xs font-bold text-emerald-800 block">Farm Weighment</span>
            <span className="text-[11px] text-slate-500">11:30 AM · 1,000 kg Digital</span>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Truck size={20} className="text-blue-600 mx-auto mb-1" />
            <span className="text-xs font-bold text-blue-800 block">In Transit</span>
            <span className="text-[11px] text-slate-500">ETA 15:40 · Temp 4.1°C</span>
          </div>
          <div className={`p-3 rounded-lg border ${escrowReleased ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
            <DollarSign size={20} className={`${escrowReleased ? 'text-emerald-600' : 'text-slate-400'} mx-auto mb-1`} />
            <span className={`text-xs font-bold block ${escrowReleased ? 'text-emerald-800' : 'text-slate-600'}`}>
              {escrowReleased ? 'Escrow Released' : 'Dock Inspection'}
            </span>
            <span className="text-[11px] text-slate-500">
              {escrowReleased ? 'Settled to Bank' : 'Pending Gate Scan'}
            </span>
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-emerald-600" />
            <div className="text-sm">
              <strong className="text-slate-800 block">IoT Cold-Chain Quality Telemetry: Passed</strong>
              <span className="text-slate-500 text-xs">No temperature deviations during 42.6 km journey. AGMARK Grade A certified.</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="btn btn-secondary text-xs"
              onClick={() => alert('Downloading APMC Certified Digital Invoice & Weighbridge Slip...')}
            >
              <Download size={14} />
              <span>Weighment Slip</span>
            </button>
            <button
              type="button"
              disabled={escrowReleased}
              className={`btn ${escrowReleased ? 'btn-secondary' : 'btn-primary'} text-xs`}
              onClick={() => setEscrowReleased(true)}
            >
              <CheckCircle2 size={14} />
              <span>{escrowReleased ? 'Escrow Settled (Paid)' : 'Confirm Receipt & Release Escrow'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
