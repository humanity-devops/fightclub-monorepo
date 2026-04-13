import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function App() {
  const [rules, setRules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/rules`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setRules(data.rules))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>FIGHT CLUB</h1>
        <div style={styles.subtitle}>THE RULES</div>
      </header>

      <main style={styles.main}>
        {loading && <p style={styles.status}>Loading...</p>}
        {error && <p style={styles.error}>Error: {error}</p>}

        <ol style={styles.list}>
          {rules.map((r) => (
            <li key={r.number} style={styles.item}>
              <span style={styles.number}>#{r.number}</span>
              <span style={styles.rule}>{r.rule}</span>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    margin: 0,
    padding: '2rem',
    backgroundColor: '#0a0a0a',
    color: '#e0e0e0',
    fontFamily: "'Oswald', sans-serif",
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    borderBottom: '2px solid #c0392b',
    paddingBottom: '1.5rem',
  },
  title: {
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: 700,
    color: '#c0392b',
    letterSpacing: '0.15em',
    margin: 0,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: '1.2rem',
    letterSpacing: '0.5em',
    color: '#888',
    marginTop: '0.5rem',
    fontFamily: "'Special Elite', cursive",
  },
  main: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  status: {
    textAlign: 'center',
    color: '#888',
    fontSize: '1.1rem',
  },
  error: {
    textAlign: 'center',
    color: '#e74c3c',
    fontSize: '1.1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid #1a1a1a',
  },
  number: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#c0392b',
    flexShrink: 0,
    minWidth: '2.5rem',
  },
  rule: {
    fontSize: '1.15rem',
    lineHeight: 1.5,
    fontFamily: "'Special Elite', cursive",
  },
};
