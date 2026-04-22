import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.email, form.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.logo}>PIXEL<span style={{ color: '#bf5fff' }}>DSA</span></div>
        <div style={styles.subtitle}>// LEVEL UP YOUR DSA SKILLS</div>

        <div className="pixel-box" style={styles.box}>
          {/* Mode Toggle */}
          <div style={styles.tabs}>
            <button
              className="btn"
              style={{ ...styles.tab, ...(mode === 'login' ? styles.tabActive : {}) }}
              onClick={() => { setMode('login'); setError(''); }}
            >
              LOGIN
            </button>
            <button
              className="btn"
              style={{ ...styles.tab, ...(mode === 'signup' ? styles.tabActive : {}) }}
              onClick={() => { setMode('signup'); setError(''); }}
            >
              SIGNUP
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div>
                <label style={styles.label}>NAME</label>
                <input
                  type="text"
                  placeholder="Hero Name..."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            )}

            <label style={styles.label}>EMAIL</label>
            <input
              type="email"
              placeholder="player@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label style={styles.label}>PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            {error && <div style={styles.error}>⚠ {error}</div>}

            <button
              className="btn btn-green"
              type="submit"
              style={{ width: '100%', marginTop: '8px' }}
              disabled={loading}
            >
              {loading ? 'LOADING...' : mode === 'login' ? '▶ START GAME' : '▶ CREATE HERO'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0f',
    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,255,136,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(191,95,255,0.03) 0%, transparent 50%)',
  },
  container: { width: '100%', maxWidth: '400px', padding: '0 20px', textAlign: 'center' },
  logo: { fontSize: '22px', color: '#00ff88', marginBottom: '8px', letterSpacing: '2px' },
  subtitle: { color: '#555570', fontSize: '8px', marginBottom: '32px' },
  box: { textAlign: 'left' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px' },
  tab: {
    flex: 1,
    background: 'transparent',
    color: '#555570',
    borderColor: '#2a2a40',
    boxShadow: 'none',
    fontSize: '9px',
  },
  tabActive: { color: '#00ff88', borderColor: '#00ff88', boxShadow: '3px 3px 0 #00ff88' },
  label: { display: 'block', fontSize: '8px', color: '#555570', marginBottom: '6px' },
  error: { color: '#ff4466', fontSize: '8px', margin: '8px 0', lineHeight: '1.6' },
};
