import React, { useState, createContext, useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Sprout, Store, ClipboardList,
  CreditCard, Truck, Shield, HelpCircle,
  BarChart3, Eye, AlertTriangle, Building2,
  Pin, PinOff, CheckCircle2, ChevronRight, Menu, X
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { farmer } from '../../data/mockData';
import { cn } from '../../lib/utils';
import './Sidebar.css';

// ── Sidebar Context ──
const SidebarContext = createContext(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const effectiveOpen = isPinned || open;

  return (
    <SidebarContext.Provider
      value={{
        open: effectiveOpen,
        setOpen,
        isPinned,
        setIsPinned,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// ── Main Sidebar Component ──
export default function Sidebar({ role, onRoleChange }) {
  const { open, setOpen, isPinned, setIsPinned } = useSidebar();
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

  // Wholesaler / Buyer Navigation (points to /buyer/marketplace instead of farmer /market)
  const buyerNav = [
    { to: '/buyer', icon: LayoutDashboard, label: t('navOverview', 'Overview') },
    { to: '/buyer/marketplace', icon: Store, label: t('navBuyerMarket', 'Wholesale Market') },
    { to: '/buyer/orders', icon: ClipboardList, label: t('navBuyerOrders', 'Contracts & Bids') },
    { to: '/buyer/tracking', icon: Truck, label: t('navBuyerTracking', 'Fleet Tracking') },
    { to: '/buyer/ledger', icon: Shield, label: t('navLedger', 'Trust Ledger') },
  ];

  const adminNav = [
    { to: '/admin', icon: BarChart3, label: t('navAdminSupply', 'Supply Network') },
    { to: '/admin/trust-monitor', icon: Eye, label: t('navAdminTrust', 'Trust Monitor') },
    { to: '/admin/dispute', icon: AlertTriangle, label: t('navAdminDisputes', 'Disputes') },
  ];

  const activeNavList = role === 'admin' ? adminNav : role === 'buyer' ? buyerNav : farmerNav;

  const userProfiles = {
    farmer: {
      name: farmer.name,
      role: 'Verified Producer',
      sub: 'Bardhaman Hub',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    buyer: {
      name: 'FreshMart Procurement',
      role: 'Institutional Buyer',
      sub: 'APMC Certified',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    admin: {
      name: 'Dr. S. K. Roy',
      role: 'Nodal Officer',
      sub: 'State Directorate',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    },
  };

  const currentUser = userProfiles[role] || userProfiles.farmer;

  return (
    <motion.aside
      className={cn(
        'sidebar-aceternity',
        open ? 'sidebar-aceternity--open' : 'sidebar-aceternity--collapsed',
        isPinned && 'sidebar-aceternity--pinned'
      )}
      animate={{
        width: open ? 260 : 68,
      }}
      transition={{
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => !isPinned && setOpen(true)}
      onMouseLeave={() => !isPinned && setOpen(false)}
    >
      {/* Brand Header */}
      <div className="sidebar-aceternity__header">
        <div
          className="sidebar-aceternity__brand"
          onClick={() => navigate('/')}
          title="KrishiConnect Home"
        >
          <div className="sidebar-aceternity__icon-box">
            <Sprout size={22} className="text-emerald-400" />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
                className="sidebar-aceternity__brand-text"
              >
                <span className="sidebar-aceternity__title">KRISHI</span>
                <span className="sidebar-aceternity__subtitle">CONNECT</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pin button only visible when open - clean, non-overlapping */}
        {open && (
          <button
            type="button"
            className={cn(
              'sidebar-aceternity__pin-btn',
              isPinned && 'sidebar-aceternity__pin-btn--active'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setIsPinned(!isPinned);
            }}
            title={isPinned ? 'Unpin Sidebar (Auto-collapse)' : 'Pin Sidebar (Keep Open)'}
          >
            {isPinned ? <PinOff size={14} /> : <Pin size={14} />}
          </button>
        )}
      </div>

      {/* 3-Way Role Switcher */}
      <div className="sidebar-aceternity__role-switch">
        {open ? (
          <div className="role-switch-expanded">
            <button
              type="button"
              className={cn(
                'role-tab-btn',
                role === 'farmer' && 'role-tab-btn--active'
              )}
              onClick={() => onRoleChange('farmer')}
            >
              <Sprout size={13} />
              <span>Farmer</span>
            </button>
            <button
              type="button"
              className={cn(
                'role-tab-btn',
                role === 'buyer' && 'role-tab-btn--active'
              )}
              onClick={() => onRoleChange('buyer')}
            >
              <Building2 size={13} />
              <span>Buyer</span>
            </button>
            <button
              type="button"
              className={cn(
                'role-tab-btn',
                role === 'admin' && 'role-tab-btn--active'
              )}
              onClick={() => onRoleChange('admin')}
            >
              <Shield size={13} />
              <span>Admin</span>
            </button>
          </div>
        ) : (
          <div className="role-switch-collapsed">
            <button
              type="button"
              className={cn(
                'role-dot-btn',
                role === 'farmer' && 'role-dot-btn--active'
              )}
              onClick={() => onRoleChange('farmer')}
              title="Switch to Farmer Portal"
            >
              <Sprout size={16} />
            </button>
            <button
              type="button"
              className={cn(
                'role-dot-btn',
                role === 'buyer' && 'role-dot-btn--active'
              )}
              onClick={() => onRoleChange('buyer')}
              title="Switch to Buyer Portal"
            >
              <Building2 size={16} />
            </button>
            <button
              type="button"
              className={cn(
                'role-dot-btn',
                role === 'admin' && 'role-dot-btn--active'
              )}
              onClick={() => onRoleChange('admin')}
              title="Switch to Admin Oversight"
            >
              <Shield size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-aceternity__nav">
        <div className="sidebar-aceternity__nav-list">
          {activeNavList.map((item) => (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              end={item.to === '/dashboard' || item.to === '/buyer' || item.to === '/admin'}
              className={({ isActive }) =>
                cn(
                  'sidebar-aceternity__link group/link',
                  isActive && 'sidebar-aceternity__link--active'
                )
              }
              title={!open ? item.label : undefined}
            >
              <item.icon size={20} className="sidebar-aceternity__link-icon" />

              <motion.span
                animate={{
                  display: open ? 'inline-block' : 'none',
                  opacity: open ? 1 : 0,
                  x: open ? 0 : -6,
                }}
                transition={{ duration: 0.18 }}
                className="sidebar-aceternity__link-label"
              >
                {item.label}
              </motion.span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer / User Profile */}
      <div className="sidebar-aceternity__footer">
        <NavLink
          to={role === 'buyer' ? '/buyer/ledger' : role === 'admin' ? '/admin/trust-monitor' : '/ledger'}
          className="sidebar-aceternity__link sidebar-aceternity__link--utility"
          title={!open ? 'Trust Ledger' : undefined}
        >
          <Shield size={18} className="sidebar-aceternity__link-icon" />
          <motion.span
            animate={{
              display: open ? 'inline-block' : 'none',
              opacity: open ? 1 : 0,
            }}
            transition={{ duration: 0.18 }}
            className="sidebar-aceternity__link-label"
          >
            Trust Ledger
          </motion.span>
        </NavLink>

        <NavLink
          to="/help"
          className="sidebar-aceternity__link sidebar-aceternity__link--utility"
          title={!open ? 'Help & Support' : undefined}
        >
          <HelpCircle size={18} className="sidebar-aceternity__link-icon" />
          <motion.span
            animate={{
              display: open ? 'inline-block' : 'none',
              opacity: open ? 1 : 0,
            }}
            transition={{ duration: 0.18 }}
            className="sidebar-aceternity__link-label"
          >
            Help & Support
          </motion.span>
        </NavLink>

        {/* User Card */}
        <div className="sidebar-aceternity__user-card">
          <div className="user-avatar-wrap">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="user-avatar-img"
            />
            <span className="user-online-dot" />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                className="user-details"
              >
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">{currentUser.role}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
