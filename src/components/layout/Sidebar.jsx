import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Sprout, Store, ClipboardList,
  CreditCard, Truck, Shield, Settings, HelpCircle,
  BarChart3, Eye, AlertTriangle, ChevronLeft, ChevronRight,
  ShoppingBag, Building2, Layers
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Sidebar.css';

export default function Sidebar({ role, onRoleChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const farmerNav = [
    { to: '/dashboard', icon: LayoutDashboard, label: t('navOverview', 'Overview') },
    { to: '/market', icon: Store, label: t('navMarket', 'Mandi Market') },
    { to: '/list-produce', icon: Sprout, label: t('navProduce', 'Sell Harvest') },
    { to: '/orders', icon: ClipboardList, label: t('navOrders', 'Orders') },
    { to: '/payments', icon: CreditCard, label: t('navPayments', 'Payments') },
    { to: '/logistics', icon: Truck, label: t('navLogistics', 'Logistics') },
    { to: '/ledger', icon: Shield, label: t('navLedger', 'Trust Ledger') },
  ];

  const buyerNav = [
    { to: '/buyer', icon: LayoutDashboard, label: t('navOverview', 'Overview') },
    { to: '/market', icon: Store, label: t('navBuyerMarket', 'Wholesale Market') },
    { to: '/buyer/orders', icon: ClipboardList, label: t('navBuyerOrders', 'Contracts & Bids') },
    { to: '/logistics', icon: Truck, label: t('navBuyerTracking', 'Fleet Tracking') },
    { to: '/ledger', icon: Shield, label: t('navLedger', 'Trust Ledger') },
  ];

  const adminNav = [
    { to: '/admin', icon: BarChart3, label: t('navAdminSupply', 'Supply Network') },
    { to: '/admin/trust-monitor', icon: Eye, label: t('navAdminTrust', 'Trust Monitor') },
    { to: '/admin/dispute', icon: AlertTriangle, label: t('navAdminDisputes', 'Disputes') },
  ];

  const activeNavList = role === 'admin' ? adminNav : role === 'buyer' ? buyerNav : farmerNav;

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar__header">
        <div className="sidebar__brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="sidebar__icon-box">
            <Sprout size={22} className="text-primary-green" />
          </div>
          {!collapsed && (
            <div className="sidebar__brand-text">
              <span className="sidebar__title">KRISHI</span>
              <span className="sidebar__subtitle">CONNECT</span>
            </div>
          )}
        </div>
        <button
          className="sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* 3-Way Role Switcher: Farmer, Buyer, Admin */}
      <div className="sidebar__role-switch">
        <button
          type="button"
          className={`sidebar__role-btn ${role === 'farmer' ? 'sidebar__role-btn--active' : ''}`}
          onClick={() => onRoleChange('farmer')}
          title={t('farmerRole', 'Farmer')}
        >
          <Sprout size={15} />
          {!collapsed && <span>{t('farmerRole', 'Farmer')}</span>}
        </button>

        <button
          type="button"
          className={`sidebar__role-btn ${role === 'buyer' ? 'sidebar__role-btn--active' : ''}`}
          onClick={() => onRoleChange('buyer')}
          title={t('buyerRole', 'Buyer')}
        >
          <Building2 size={15} />
          {!collapsed && <span>{t('buyerRole', 'Buyer')}</span>}
        </button>

        <button
          type="button"
          className={`sidebar__role-btn ${role === 'admin' ? 'sidebar__role-btn--active' : ''}`}
          onClick={() => onRoleChange('admin')}
          title={t('adminRole', 'Admin')}
        >
          <Shield size={15} />
          {!collapsed && <span>{t('adminRole', 'Admin')}</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        <div className="sidebar__nav-group">
          {activeNavList.map((item) => (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              end={item.to === '/dashboard' || item.to === '/buyer' || item.to === '/admin'}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
              title={item.label}
            >
              <item.icon size={20} className="sidebar__link-icon" />
              {!collapsed && <span className="sidebar__link-text">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer / Utilities */}
      <div className="sidebar__footer">
        <NavLink to="/ledger" className="sidebar__link" title={t('navLedger', 'Trust Ledger')}>
          <Shield size={18} className="sidebar__link-icon" />
          {!collapsed && <span>{t('navLedger', 'Trust Ledger')}</span>}
        </NavLink>
        <NavLink to="/help" className="sidebar__link" title={t('navHelp', 'Help')}>
          <HelpCircle size={18} className="sidebar__link-icon" />
          {!collapsed && <span>{t('navHelp', 'Help')}</span>}
        </NavLink>
      </div>
    </aside>
  );
}
