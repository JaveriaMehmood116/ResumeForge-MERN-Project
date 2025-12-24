import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = ({ isAuthed }) => {
  const navigate = useNavigate();

  const handlePrimary = () => {
    if (isAuthed) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing">
      <header className="landing-nav">
        <div className="brand">
          <div className="brand-icon">
            <span className="brand-doc" />
          </div>
          <div className="brand-text">
            Resume<span>Forge</span>
          </div>
        </div>
        <div className="nav-actions">
          <button className="nav-link" onClick={handleLogin}>
            Login
          </button>
          <button className="btn-primary" onClick={handlePrimary}>
            Get Started
          </button>
        </div>
      </header>

      <main className="hero">
        <p className="eyebrow">Build with confidence</p>
        <h1>Ready to Build Your Resume?</h1>
        <p className="subhead">
          Join thousands of professionals who have already created their perfect resume.
        </p>
        <div className="hero-actions">
          <button className="btn-primary lg" onClick={handlePrimary}>
            Get Started Free →
          </button>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="footer-brand">
          <div className="brand-icon">
            <span className="brand-doc" />
          </div>
          <div className="brand-text">
            Resume<span>Forge</span>
          </div>
        </div>
        <div className="footer-text">© 2025 ResumeForge. All rights reserved. @ Javera</div>
      </footer>
    </div>
  );
};

export default LandingPage;

