import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { KrishiProvider } from './context/KrishiContext';
import AppLayout from './components/layout/AppLayout';
import Landing from './pages/Landing';
import FarmerAuth from './pages/farmer/FarmerAuth';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import Market from './pages/farmer/Market';
import ListProduce from './pages/farmer/ListProduce';
import Orders from './pages/farmer/Orders';
import TransactionDetails from './pages/farmer/TransactionDetails';
import TrustLedger from './pages/farmer/TrustLedger';
import Payments from './pages/farmer/Payments';
import Logistics from './pages/farmer/Logistics';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import BuyerOrders from './pages/buyer/BuyerOrders';
import WholesaleMarket from './pages/buyer/WholesaleMarket';
import AdminDashboard from './pages/admin/AdminDashboard';
import TrustMonitor from './pages/admin/TrustMonitor';
import Dispute from './pages/admin/Dispute';

export default function App() {
  return (
    <LanguageProvider>
      <KrishiProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* Farmer Authentication */}
            <Route path="/farmer/login" element={<FarmerAuth />} />
            <Route path="/farmer/register" element={<FarmerAuth />} />

            {/* App Layout Shell */}
            <Route element={<AppLayout />}>
              {/* Farmer Portal Routes */}
              <Route path="/dashboard" element={<FarmerDashboard />} />
              <Route path="/market" element={<Market />} />
              <Route path="/list-produce" element={<ListProduce />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/transaction" element={<TransactionDetails />} />
              <Route path="/transaction/:id" element={<TransactionDetails />} />
              <Route path="/ledger" element={<TrustLedger />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/logistics" element={<Logistics />} />

              {/* Buyer Portal Routes (Separated Workflow) */}
              <Route path="/buyer" element={<BuyerDashboard />} />
              <Route path="/buyer/orders" element={<BuyerOrders />} />
              <Route path="/buyer/marketplace" element={<WholesaleMarket />} />
              <Route path="/buyer/tracking" element={<Logistics />} />
              <Route path="/buyer/ledger" element={<TrustLedger role="buyer" />} />

              {/* Admin Oversight Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/trust-monitor" element={<TrustMonitor />} />
              <Route path="/admin/dispute" element={<Dispute />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </KrishiProvider>
    </LanguageProvider>
  );
}
