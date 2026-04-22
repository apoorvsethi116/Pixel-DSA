import { useEffect, useState } from 'react';
import { useAuth, API } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export default function Problems() {
  const { user, setUser } = useAuth();
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [solving, setSolving] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const params = filter !== 'All' ? `?difficulty=${filter}` : '';
    API.get(`/problems${params}`)
      .then((res) => setProblems(res.data.problems))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filter]);

  const handleSolve = async (problemId) => {
    setSolving(problemId);
    try {
      const { data } = await API.post(`/problems/${problemId}/solve`);
      // Update local state — mark as solved
      setProblems((prev) =>
        prev.map((p) => (p._id === problemId ? { ...p, isSolved: true } : p))
      );
      // Update user XP in context
      setUser((prev) => ({ ...prev, xp: data.xp, streak: data.streak }));
      showToast(data.message);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error!');
    } finally {
      setSolving(null);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  if (loading) return <div className="loading">FETCHING QUESTS...</div>;

  return (
    <div>
      <Navbar />
      <div style={styles.page}>

        <div style={styles.header}>
          <div style={styles.title}>⚔ QUEST BOARD</div>
          <div style={{ color: '#555570', fontSize: '8px' }}>{problems.length} PROBLEMS</div>
        </div>

        {/* Filter Tabs */}
        <div style={styles.filters}>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              className="btn"
              style={{
                fontSize: '8px',
                padding: '7px 14px',
                color: filter === d ? '#0a0a0f' : diffColor(d),
                borderColor: diffColor(d),
                background: filter === d ? diffColor(d) : 'transparent',
                boxShadow: `2px 2px 0 ${diffColor(d)}`,
              }}
              onClick={() => setFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Problem List */}
        <div style={styles.list}>
          {problems.map((problem) => (
            <ProblemCard
              key={problem._id}
              problem={problem}
              onSolve={handleSolve}
              solving={solving === problem._id}
            />
          ))}
          {problems.length === 0 && (
            <div style={{ color: '#555570', textAlign: 'center', padding: '40px', fontSize: '9px' }}>
              NO QUESTS FOUND
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={styles.toast}>{toast}</div>
      )}
    </div>
  );
}

function ProblemCard({ problem, onSolve, solving }) {
  return (
    <div
      className="pixel-box"
      style={{
        ...styles.card,
        borderColor: problem.isSolved ? '#1a3a2a' : '#2a2a40',
        opacity: problem.isSolved ? 0.75 : 1,
      }}
    >
      <div style={styles.cardTop}>
        <div style={styles.cardTitle}>
          {problem.isSolved && <span style={{ color: '#00ff88', marginRight: '8px' }}>✓</span>}
          {problem.title}
        </div>
        <span className={`badge badge-${problem.difficulty}`}>{problem.difficulty}</span>
      </div>

      <div style={styles.desc}>{problem.description}</div>

      <div style={styles.cardBottom}>
        <div style={styles.tags}>
          {problem.tags?.map((tag) => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>
        <div style={styles.cardRight}>
          {problem.link && (
            <a
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ fontSize: '7px', padding: '6px 10px', marginRight: '8px' }}
            >
              OPEN LINK
            </a>
          )}
          <span style={{ color: '#bf5fff', fontSize: '8px', marginRight: '12px' }}>
            +{problem.xpReward} XP
          </span>
          {!problem.isSolved ? (
            <button
              className="btn btn-green"
              style={{ fontSize: '7px', padding: '6px 12px' }}
              onClick={() => onSolve(problem._id)}
              disabled={solving}
            >
              {solving ? '...' : 'SOLVE ▶'}
            </button>
          ) : (
            <span style={{ color: '#00ff88', fontSize: '8px' }}>SOLVED ✓</span>
          )}
        </div>
      </div>
    </div>
  );
}

function diffColor(d) {
  return { All: '#555570', Easy: '#00ff88', Medium: '#ffd700', Hard: '#ff4466' }[d];
}

const styles = {
  page: { maxWidth: '860px', margin: '0 auto', padding: '32px 20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '14px', color: '#00ff88', letterSpacing: '1px' },
  filters: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  card: { cursor: 'default' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
  cardTitle: { fontSize: '9px', color: '#e0e0e0', flex: 1, marginRight: '12px', lineHeight: '1.6' },
  desc: { fontSize: '8px', color: '#555570', lineHeight: '1.8', marginBottom: '12px' },
  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' },
  cardRight: { display: 'flex', alignItems: 'center' },
  tags: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  tag: {
    fontSize: '7px',
    padding: '2px 6px',
    border: '1px solid #2a2a40',
    color: '#555570',
    background: 'transparent',
  },
  toast: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: '#12121a',
    border: '2px solid #00ff88',
    boxShadow: '4px 4px 0 #00ff88',
    color: '#00ff88',
    fontFamily: "'Press Start 2P', monospace",
    fontSize: '9px',
    padding: '12px 18px',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease',
  },
};
