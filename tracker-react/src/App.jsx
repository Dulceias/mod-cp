import React from 'react';
import ListaEnvios from './components/ListaEnvios';
import FormularioEnvio from './components/FormularioEnvio';
import './AeroTheme.css';

function App() {
  return (
    <div className="window-chrome">
      {/* ── Window Title Bar (XP/Vista style) ── */}
      <div className="window-titlebar">
        <span className="window-titlebar__icon">🌐</span>
        <span className="window-titlebar__text">Tracker de Problemas — CP Training</span>
        <div className="window-titlebar__controls">
          <div className="window-btn window-btn--min">−</div>
          <div className="window-btn window-btn--max">□</div>
          <div className="window-btn window-btn--close">✕</div>
        </div>
      </div>

      {/* ── Window Body ── */}
      <div className="window-body">

        {/* ── Aero Header ── */}
        <div className="aero-header">
          <h1>Tracker de Problemas</h1>
          <p>Competitive Programming — Training Log</p>
        </div>

        {/* ── Nav bar (decorative) ── */}
        <div className="aero-nav">
          <button type="button">Home</button>
          <button type="button">About</button>

          {/* Music player widget */}
          <div className="music-player">
            <div>playing : lofi beats</div>
            <div className="music-player__controls">
              <span>◀</span>
              <span>◁</span>
              <span>❚❚</span>
              <span>▷</span>
              <span>▶</span>
            </div>
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="separator"></div>

        {/* ── Form Card ── */}
        <div className="card">
          <FormularioEnvio />
        </div>

        {/* ── Decorative HR ── */}
        <hr />

        {/* ── Table Card ── */}
        <div className="card">
          <ListaEnvios />
        </div>

        {/* ── Links Footer ── */}
        <div className="links-footer">
          <span className="links-footer__label">. . . links</span>
          <div className="links-footer__line"></div>
          <div className="eq-bars">
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
          </div>
        </div>

        {/* ── Footer Banner ── */}
        <div className="footer-banner">
          ✨ Keep training, keep improving! ✨
        </div>
        <p className="footer-text">( Tracker v1.0 — Frutiger Aero Edition )</p>
      </div>
    </div>
  );
}

export default App;