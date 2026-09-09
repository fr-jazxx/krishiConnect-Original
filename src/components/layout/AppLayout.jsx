import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import './AppLayout.css';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="app-layout__main">
        <Topbar role={role} />
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
      <MobileNav role={role} />
    </div>
  );
}
