import { useState, useEffect, useRef } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const GIFS = [
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3MydDR6ZWlvbjU5YmE5YzRham9rOTh2aWV3bWxyN3M0ZGl2OWVuMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l7tZfMuVLiJnkoRzNA/giphy.webp',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3MydDR6ZWlvbjU5YmE5YzRham9rOTh2aWV3bWxyN3M0ZGl2OWVuMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/syEfLvksYQnmM/200.webp',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3MydDR6ZWlvbjU5YmE5YzRham9rOTh2aWV3bWxyN3M0ZGl2OWVuMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xTiTnnq6SknvxN15Is/200.webp',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3MydDR6ZWlvbjU5YmE5YzRham9rOTh2aWV3bWxyN3M0ZGl2OWVuMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7G2cxOTQLPeOk/giphy.webp',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3MydDR6ZWlvbjU5YmE5YzRham9rOTh2aWV3bWxyN3M0ZGl2OWVuMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JQtjrjz75ttYY/200.webp',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3MydDR6ZWlvbjU5YmE5YzRham9rOTh2aWV3bWxyN3M0ZGl2OWVuMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qzNfY04dErJ8BUKmaK/200.webp',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3MydDR6ZWlvbjU5YmE5YzRham9rOTh2aWV3bWxyN3M0ZGl2OWVuMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0NwFNMhfqejfqDcY/200.webp',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3MydDR6ZWlvbjU5YmE5YzRham9rOTh2aWV3bWxyN3M0ZGl2OWVuMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7Hiszs0NkF5te/100.webp',
  'https://media2.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3am80cjI4ZWoxNnI4ZnJnOW01ZG8ycWF4MGFyMW1tYTV3aHUyaHEycCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oJVPiO6Ees2L7EU237/giphy.webp',
  'https://media1.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3am80cjI4ZWoxNnI4ZnJnOW01ZG8ycWF4MGFyMW1tYTV3aHUyaHEycCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/FXR3gtwZoyyK4/giphy.webp',
  'https://media3.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cWJ4NWQwM3drdnI1b2U3ZmsydmRocjQxamhxNHg1YmViMmc0cW5rNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BZqxuFnVopV9m/giphy.webp',
];

const GIF_DURATION = 5000; // ms per gif
const STATIC_DURATION = 600; // ms of static transition

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function GifBackground() {
  const [currentGif, setCurrentGif] = useState(GIFS[0]);
  const [showStatic, setShowStatic] = useState(false);
  const queueRef = useRef(shuffle(GIFS));
  const idxRef = useRef(0);

  useEffect(() => {
    const cycle = () => {
      // Show static
      setShowStatic(true);
      setTimeout(() => {
        // Advance to next gif
        idxRef.current = (idxRef.current + 1) % queueRef.current.length;
        if (idxRef.current === 0) {
          queueRef.current = shuffle(GIFS);
        }
        setCurrentGif(queueRef.current[idxRef.current]);
        setShowStatic(false);
      }, STATIC_DURATION);
    };

    const timer = setInterval(cycle, GIF_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* GIF layer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${currentGif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          zIndex: 0,
          transition: 'opacity 0.3s',
        }}
      />
      {/* Static overlay */}
      {showStatic && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: 0.6,
            zIndex: 1,
            animation: 'staticFlicker 0.05s steps(1) infinite',
          }}
        />
      )}
    </>
  );
}

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
    <div style={{ minHeight: '100vh', position: 'relative', backgroundColor: '#0a0a0a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Special+Elite&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }
        @keyframes staticFlicker {
          0%   { background-position: 0 0; }
          25%  { background-position: -10px 5px; }
          50%  { background-position: 5px -10px; }
          75%  { background-position: -5px 15px; }
          100% { background-position: 10px -5px; }
        }
      `}</style>

      <GifBackground />

      {/* Dark overlay for readability */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 100%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, padding: '2rem', fontFamily: "'Oswald', sans-serif", color: '#e0e0e0' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '2px solid #c0392b', paddingBottom: '1.5rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700, color: '#c0392b', letterSpacing: '0.15em', textTransform: 'uppercase', textShadow: '0 0 20px rgba(192,57,43,0.5)' }}>
            FIGHT CLUB
          </h1>
          <div style={{ fontSize: '1.2rem', letterSpacing: '0.5em', color: '#aaa', marginTop: '0.5rem', fontFamily: "'Special Elite', cursive" }}>
            THE RULES
          </div>
        </header>

        <main style={{ maxWidth: '700px', margin: '0 auto' }}>
          {loading && <p style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem' }}>Loading...</p>}
          {error && <p style={{ textAlign: 'center', color: '#e74c3c', fontSize: '1.1rem' }}>Error: {error}</p>}

          <ol style={{ listStyle: 'none', padding: 0 }}>
            {rules.map((r) => (
              <li
                key={r.number}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#c0392b', flexShrink: 0, minWidth: '2.5rem', textShadow: '0 0 10px rgba(192,57,43,0.4)' }}>
                  #{r.number}
                </span>
                <span style={{ fontSize: '1.15rem', lineHeight: 1.5, fontFamily: "'Special Elite', cursive", textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                  {r.rule}
                </span>
              </li>
            ))}
          </ol>
        </main>
      </div>
    </div>
  );
}
