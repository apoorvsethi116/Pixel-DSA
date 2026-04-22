import { useEffect, useState } from 'react';
import { useAuth, API } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/users/progress')
      .then((res) => setProgress(res.data.progress))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">LOADING SAVE DATA...</div>;

  const xpPercent = progress
    ? Math.min(100, Math.round(((progress.xp % 100) / 100) * 100))
    : 0;

  return (
    <div>
      <Navbar />
      <div style={styles.page}>

        {/* Welcome */}
        <div style={styles.welcome}>
          <span style={{ color: '#555570' }}>PLAYER: </span>
          <span style={{ color: '#00ff88' }}>{user?.name?.toUpperCase()}</span>
        </div>

        {/* Stats Grid */}
        <div style={styles.grid}>
          <StatCard label="PROBLEMS SOLVED" value={progress?.solvedCount ?? 0} color="#00ff88" icon="✅" />
          <StatCard label="TOTAL XP" value={progress?.xp ?? 0} color="#bf5fff" icon="⭐" />
          <StatCard label="CURRENT STREAK" value={`${progress?.streak ?? 0} DAYS`} color="#ffd700" icon="🔥" />
          <StatCard label="LEVEL" value={progress?.level ?? 1} color="#00ff88" icon="🏆" />
        </div>

        {/* XP Progress Bar */}
        <div className="pixel-box" style={styles.xpSection}>
          <div style={styles.xpHeader}>
            <span>LEVEL {progress?.level} PROGRESS</span>
            <span style={{ color: '#bf5fff' }}>{xpPercent}%</span>
          </div>
          <div className="xp-bar-wrap">
            <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
          </div>
          <div style={{ color: '#555570', marginTop: '8px', fontSize: '8px' }}>
            {progress?.xpToNextLevel} XP TO NEXT LEVEL
          </div>
        </div>

        {/* Breakdown */}
        <div className="pixel-box" style={styles.breakdown}>
          <div style={styles.sectionTitle}>DIFFICULTY BREAKDOWN</div>
          <div style={styles.breakRow}>
            <BreakItem label="EASY" count={progress?.breakdown?.Easy ?? 0} color="#00ff88" />
            <BreakItem label="MEDIUM" count={progress?.breakdown?.Medium ?? 0} color="#ffd700" />
            <BreakItem label="HARD" count={progress?.breakdown?.Hard ?? 0} color="#ff4466" />
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/problems">
            <button className="btn btn-purple" style={{ fontSize: '10px', padding: '14px 28px' }}>
              ▶ CONTINUE QUEST
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div className="pixel-box" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '20px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ color, fontSize: '18px', marginBottom: '6px' }}>{value}</div>
      <div style={{ color: '#555570', fontSize: '7px' }}>{label}</div>
    </div>
  );
}

function BreakItem({ label, count, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ color, fontSize: '22px', marginBottom: '4px' }}>{count}</div>
      <span className={`badge badge-${label.charAt(0) + label.slice(1).toLowerCase()}`}>{label}</span>
    </div>
  );
}

const styles = {
  page: { maxWidth: '800px', margin: '0 auto', padding: '32px 20px' },
  welcome: { fontSize: '12px', marginBottom: '28px', letterSpacing: '1px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' },
  xpSection: { marginBottom: '12px' },
  xpHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '9px' },
  breakdown: { marginBottom: '12px' },
  sectionTitle: { color: '#555570', fontSize: '8px', marginBottom: '16px' },
  breakRow: { display: 'flex', justifyContent: 'space-around' },
};
