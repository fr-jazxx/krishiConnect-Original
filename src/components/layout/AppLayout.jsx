import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar, { SidebarProvider, useSidebar } from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import { cn } from '../../lib/utils';
import './AppLayout.css';

function AppLayoutInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isPinned } = useSidebar();

  // Infer role from current path
  const getRoleFromPath = (path) => {
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/buyer')) return 'buyer';
    return 'farmer';
  };

  const [role, setRole] = useState(getRoleFromPath(location.pathname));

  useEffect(() => {
    setRole(getRoleFromPath(location.pathname));
  }, [location.pathname]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'admin') {
      navigate('/admin');
    } else if (newRole === 'buyer') {
      navigate('/buyer');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="app-layout">
      <Sidebar role={role} onRoleChange={handleRoleChange} />
      <div className={cn('app-layout__main', isPinned && 'app-layout__main--pinned')}>
        <Topbar role={role} />
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
      <MobileNav role={role} />
    </div>
  );
}

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppLayoutInner />
    </SidebarProvider>
  );
}
