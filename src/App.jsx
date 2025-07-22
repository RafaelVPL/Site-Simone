import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import lightBg from './assets/1452.jpg';
import darkBg from './assets/1668.jpg';
import Home from './pages/Home';
import Contact from './pages/Contact';
import './App.css';

function App() {
  // Load dark mode from localStorage, default to false
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  // Sync dark mode class and background immediately on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Detect dark mode for background, always use darkMode state
  const isDark = darkMode;

  const handleToggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      {/* Site background texture for all pages */}
      <div
        className="site-bg-texture"
        style={{
          backgroundImage: `url(${isDark ? darkBg : lightBg})`
        }}
      />
      <Router>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          {/* ...removed flower background... */}
          <div className="topbar">
            <span className="topbar-title">Bem vindo!</span>
            <nav className="topbar-links">
              <Link to="/" className="topbar-link">Início</Link>
              <Link to="/contact" className="topbar-link">Contatos</Link>
            </nav>
            <button
              className="topbar-mode-btn"
              onClick={handleToggleMode}
              aria-label="Alternar modo claro/escuro"
            >
              <span className="topbar-mode-icon">{darkMode ? '🌙' : '☀️'}</span>
            </button>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          {/* Gradient light effect at bottom */}
          <div className="bottom-gradient-effect" />
        </div>
      </Router>
    </>
  );
}

export default App;