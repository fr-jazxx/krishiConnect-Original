import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, TrendingUp, Truck, Users, Award,
  CheckCircle2, XCircle, Sprout, Building2, Globe, ChevronDown
} from 'lucide-react';
import LiquidGlass from '../components/effects/LiquidGlass';
import { adminStats } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import './Landing.css';

export default function Landing() {
  const { language, setLanguage, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef(null);

  // Smooth scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal--visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    }
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleDocClick);
    }
    function handleDocClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    }
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [langMenuOpen]);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', label: 'Bangla', native: 'বাংলা' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="landing-page">
      {/* Satellite Map Background */}
      <div className="landing-page__map-bg" />
      <div className="landing-page__gradient-overlay" />

      {/* Header */}
      <header className="landing-header">
        <div className="landing-header__brand">
          <div className="landing-brand-icon">
            <Sprout size={24} className="text-emerald-400" />
          </div>
          <div className="landing-header__title-wrap">
            <span className="landing-header__title">KRISHI</span>
            <span className="landing-header__sub">CONNECT</span>
          </div>
        </div>

        <nav className="landing-header__nav">
          <a href="#problem" className="landing-nav-link">The Problem</a>
          <a href="#features" className="landing-nav-link">Platform Pillars</a>
          <Link to="/market" className="landing-nav-link">Live Mandi</Link>
          <Link to="/buyer" className="landing-nav-link landing-nav-link--badge">
            <Building2 size={14} className="inline mr-1" /> Buyer Portal
          </Link>
          <Link to="/admin" className="landing-nav-link text-xs opacity-80 hover:opacity-100">
            Admin View
          </Link>
        </nav>

        <div className="landing-header__right flex items-center gap-3">
          {/* Language Switcher Pill */}
          <div className="landing-lang-wrap" ref={langRef}>
            <button
              type="button"
              className="landing-lang-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
            >
              <Globe size={15} className="text-emerald-400" />
              <span>{currentLangObj.native}</span>
              <ChevronDown size={13} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="landing-lang-menu animate-fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    className={`landing-lang-item ${language === l.code ? 'landing-lang-item--active' : ''}`}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                  >
                    <span>{l.native}</span>
                    <small className="opacity-70">({l.label})</small>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/dashboard" className="btn btn-primary landing-header__cta">
            <span>Enter Platform</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero Content */}
      <main className="landing-hero">
        <div className="landing-hero__badge animate-fade-in">
          <span className="badge-pulse" />
          <span>SIH26033 · National Transparent Agri Supply Chain Platform</span>
        </div>

        <h1 className="landing-hero__title animate-fade-in">
          {t('landingHeroTitle', 'Connecting Indian Farms directly to institutional buyers.')}
        </h1>

        <p className="landing-hero__subtitle animate-fade-in">
          {t(
            'landingHeroSub',
            'Eliminating 5+ layers of non-value-adding middlemen. Empowering producers with real-time price discovery, tamper-evident trust verification, and instant bank settlements.'
          )}
        </p>

        {/* Separated Role CTAs */}
        <div className="landing-hero__actions animate-fade-in">
          <Link to="/dashboard" className="btn btn-primary btn-lg hero-cta-farmer">
            <Sprout size={20} />
            <span>{t('launchFarmerPortal', 'Launch Farmer Portal')}</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/buyer" className="btn btn-secondary btn-lg hero-cta-buyer">
            <Building2 size={20} />
            <span>{t('launchBuyerPortal', 'Enter Buyer Marketplace')}</span>
          </Link>
        </div>

        {/* Liquid Glass Highlight Stats with smooth hover effects */}
        <div className="landing-hero__stats scroll-reveal">
          <LiquidGlass variant="panel" borderRadius={16} className="landing-stat-card">
            <div className="stat-card-inner">
              <div className="stat-icon-wrap"><Users size={22} /></div>
              <div className="stat-value">{adminStats.activeFarmers.toLocaleString('en-IN')}</div>
              <div className="stat-label">{t('verifiedFarmers', 'Verified Farmers & FPOs')}</div>
            </div>
          </LiquidGlass>

          <LiquidGlass variant="panel" borderRadius={16} className="landing-stat-card">
            <div className="stat-card-inner">
              <div className="stat-icon-wrap"><TrendingUp size={22} /></div>
              <div className="stat-value">{adminStats.todaysTradeFormatted}</div>
              <div className="stat-label">{t('dailyDirectTrade', 'Daily Direct Trade')}</div>
            </div>
          </LiquidGlass>

          <LiquidGlass variant="panel" borderRadius={16} className="landing-stat-card">
            <div className="stat-card-inner">
              <div className="stat-icon-wrap"><Truck size={22} /></div>
              <div className="stat-value">{adminStats.produceMoved} {adminStats.produceMovedUnit}</div>
              <div className="stat-label">{t('produceDispatched', 'Tracked Produce Dispatched')}</div>
            </div>
          </LiquidGlass>

          <LiquidGlass variant="gold" borderRadius={16} className="landing-stat-card">
            <div className="stat-card-inner">
              <div className="stat-icon-wrap"><Award size={22} /></div>
              <div className="stat-value text-gold">+{adminStats.improvementPercent}%</div>
              <div className="stat-label">{t('netRealizationGain', 'Net Realization Gain')}</div>
            </div>
          </LiquidGlass>
        </div>
      </main>

      {/* Problem Comparison Section with Scroll Reveal */}
      <section id="problem" className="landing-section scroll-reveal">
        <div className="section-container">
          <div className="section-header text-center">
            <div className="badge badge-accent mb-2">Intermediary Disruption</div>
            <h2 className="section-title">{t('problemTitle', 'The Fragmented Supply Chain vs Krishi Connect')}</h2>
            <p className="section-subtitle">
              {t('problemSub', 'Traditional multi-tiered APMC mandis erode farmer profits while consumers pay inflated prices.')}
            </p>
          </div>

          <div className="comparison-grid">
            <div className="comparison-card comparison-card--legacy">
              <h3 className="comparison-title text-danger">{t('legacyFlowTitle', 'Traditional Legacy Flow')}</h3>
              <ul className="comparison-list">
                <li>
                  <XCircle size={18} className="text-danger inline-icon flex-shrink-0" />
                  <span>5-6 Intermediaries (Village Aggregator, Commission Agent, Wholesaler, Trader, Retailer)</span>
                </li>
                <li>
                  <XCircle size={18} className="text-danger inline-icon flex-shrink-0" />
                  <span>Farmer receives only ₹22.80/kg of ₹32.00 consumer price (30%+ loss)</span>
                </li>
                <li>
                  <XCircle size={18} className="text-danger inline-icon flex-shrink-0" />
                  <span>Unverified weighment scale deductions up to 8%</span>
                </li>
                <li>
                  <XCircle size={18} className="text-danger inline-icon flex-shrink-0" />
                  <span>Delayed physical cash or credit payouts (15-45 days)</span>
                </li>
                <li>
                  <XCircle size={18} className="text-danger inline-icon flex-shrink-0" />
                  <span>High transit wastage (up to 25% post-harvest spoilage)</span>
                </li>
              </ul>
            </div>

            <div className="comparison-card comparison-card--krishi">
              <h3 className="comparison-title text-success">{t('krishiFlowTitle', 'Krishi Connect Solution')}</h3>
              <ul className="comparison-list">
                <li>
                  <CheckCircle2 size={18} className="text-success inline-icon flex-shrink-0" />
                  <span>Direct Farmer-to-Institutional Buyer Contracts</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-success inline-icon flex-shrink-0" />
                  <span>Farmer earns ₹29.00/kg with transparent pricing</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-success inline-icon flex-shrink-0" />
                  <span>IoT digital weighment & AI grade certification at hub</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-success inline-icon flex-shrink-0" />
                  <span>Automated digital escrow payout within minutes of delivery</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-success inline-icon flex-shrink-0" />
                  <span>Optimized cold-chain route logistics reducing transit spoilage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Architecture Section with Scroll Reveal */}
      <section id="features" className="landing-section landing-section--features scroll-reveal">
        <div className="section-container">
          <div className="section-header text-center">
            <div className="badge badge-primary mb-2">Platform Foundations</div>
            <h2 className="section-title">{t('featuresTitle', 'Engineered for Indian Agricultural Reality')}</h2>
          </div>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon"><ShieldCheck size={28} /></div>
              <h4>Tamper-Evident Ledger</h4>
              <p>Every weight measurement, quality assessment, and payment milestone is immutably timestamped and verifiable.</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon"><TrendingUp size={28} /></div>
              <h4>Real-time Market Discovery</h4>
              <p>Mandi price telemetry combined with active bulk buyer demand prevents distress sales at local village gates.</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon"><Truck size={28} /></div>
              <h4>Multi-Stop Pooled Logistics</h4>
              <p>Consolidated collection routes allow smallholders to share freight capacity, lowering transport costs by 40%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <div className="footer-brand flex items-center gap-2">
            <Sprout size={18} className="text-emerald-400" />
            <span>Krishi Connect — Smart India Hackathon Prototype (SIH26033)</span>
          </div>
          <div className="footer-links">
            <Link to="/dashboard">Farmer Dashboard</Link>
            <Link to="/buyer">Buyer Portal</Link>
            <Link to="/market">Market Board</Link>
            <Link to="/admin">Admin Monitoring</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
