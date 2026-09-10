import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Store, Sprout, ClipboardList, Shield, BarChart3, AlertTriangle, Truck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './MobileNav.css';

export default function MobileNav({ role }) {
  const { t } = useLanguage();

  const farmerLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: t('navOverview', 'Home') },
    { to: '/market', icon: Store, label: t('navMarket', 'Market') },
    { to: '/list-produce', icon: Sprout, label: t('sellCropBtn', 'Sell') },
    { to: '/orders', icon: ClipboardList, label: t('navOrders', 'Orders') },
    { to: '/logistics', icon: Truck, label: t('navLogistics', 'Logistics') },
  ];

  const buyerLinks = [
    { to: '/buyer', icon: LayoutDashboard, label: t('navOverview', 'Home') },
    { to: '/buyer/marketplace', icon: Store, label: t('navBuyerMarket', 'Wholesale') },
    { to: '/buyer/orders', icon: ClipboardList, label: t('navBuyerOrders', 'Contracts') },
    { to: '/buyer/tracking', icon: Truck, label: t('navBuyerTracking', 'Tracking') },
  ];

  const adminLinks = [
    { to: '/admin', icon: BarChart3, label: t('navAdminSupply', 'Network') },
    { to: '/admin/trust-monitor', icon: Shield, label: t('navAdminTrust', 'Trust') },
    { to: '/admin/dispute', icon: AlertTriangle, label: t('navAdminDisputes', 'Disputes') },
  ];

  const links = role === 'admin' ? adminLinks : role === 'buyer' ? buyerLinks : farmerLinks;

  return (
    <nav className="mobile-nav">
      {links.map((item) => (
        <NavLink
          key={item.to + item.label}
          to={item.to}
          className={({ isActive }) =>
            `mobile-nav__item ${isActive ? 'mobile-nav__item--active' : ''}`
          }
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
