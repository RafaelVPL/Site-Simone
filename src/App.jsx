import React, { useEffect, useState, useRef } from 'react';
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

  // Dropdown for mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

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
          <div className="topbar">
            <span className="topbar-title">Bem vindo!</span>
            {/* PC: show nav links centered, mobile: hide */}
            <nav
              className="topbar-links"
              style={{
                display: window.innerWidth > 900 ? 'flex' : 'none',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Link to="/" className="topbar-link">Início</Link>
              <Link to="/contatos" className="topbar-link">Contatos</Link>
            </nav>
            {/* PC: show mode button on right, mobile: hide */}
            <button
              className="topbar-mode-btn"
              style={{
                display: window.innerWidth > 900 ? 'inline-block' : 'none',
                marginLeft: 'auto'
              }}
              onClick={handleToggleMode}
              aria-label="Alternar modo claro/escuro"
            >
              <span className="topbar-mode-icon">{darkMode ? '🌙' : '☀️'}</span>
            </button>
            {/* Mobile: show dropdown only */}
            <div
              className={`topbar-dropdown${dropdownOpen ? ' open' : ''}`}
              ref={dropdownRef}
              style={{ display: window.innerWidth <= 900 ? 'inline-block' : 'none' }}
            >
              <button
                className="topbar-dropdown-btn"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-label="Abrir menu"
              >
                <span className="dropdown-icon">
                  <span className="dropdown-icon-bar"></span>
                  <span className="dropdown-icon-bar"></span>
                  <span className="dropdown-icon-bar"></span>
                </span>
              </button>
              <div className="topbar-dropdown-list">
                <Link to="/" className="topbar-dropdown-link" onClick={() => setDropdownOpen(false)}>Início</Link>
                <Link to="/contatos" className="topbar-dropdown-link" onClick={() => setDropdownOpen(false)}>Contatos</Link>
                <button
                  className="topbar-dropdown-mode-btn"
                  onClick={() => { handleToggleMode(); setDropdownOpen(false); }}
                  aria-label="Alternar modo claro/escuro"
                >
                  {darkMode ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
                </button>
              </div>
            </div>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contatos" element={<Contact />} />
            </Routes>
          </div>
          <div className="bottom-gradient-effect" />
        </div>
      </Router>
    </>
  );
}

export default App;