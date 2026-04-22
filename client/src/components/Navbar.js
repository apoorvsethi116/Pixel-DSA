import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">⚔ PIXEL<span style={{ color: '#bf5fff' }}>DSA</span></div>
      <div className="nav-links">
        <Link to="/" className={pathname === '/' ? 'active' : ''}>DASHBOARD</Link>
        <Link to="/problems" className={pathname === '/problems' ? 'active' : ''}>PROBLEMS</Link>
        <span style={{ color: '#00ff88', fontSize: '8px' }}>
          ⭐ {user?.xp || 0} XP
        </span>
        <button
          className="btn btn-red"
          style={{ fontSize: '7px', padding: '6px 10px' }}
          onClick={logout}
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
}
