import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Truck, ShieldCheck, PlusCircle, ArrowRight,
  Volume2, CheckCircle2, ChevronRight, AlertCircle, Sparkles,
  Sprout, Wallet, Clock, MapPin, Award
} from 'lucide-react';
import CropImage from '../../components/common/CropImage';
import { farmer, marketData, buyerOffer, activeOrders } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import './FarmerDashboard.css';

export default function FarmerDashboard() {
  const { t, language } = useLanguage();
  const [speaking, setSpeaking] = useState(false);

  // Audio accessibility readout in the active language
  const handleReadSummary = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    let text = '';
    let voiceLang = 'en-IN';

    if (language === 'hi') {
      text = `नमस्ते ${farmer.name} जी। आज टमाटर का मंडी भाव 29 रुपये किलो है और मांग बहुत तेज है। फ्रेशमार्ट की तरफ से 1000 किलो का पक्का ऑर्डर 27,910 रुपये का बैंक एस्क्रो में सुरक्षित है।`;
      voiceLang = 'hi-IN';
    } else if (language === 'bn') {
      text = `স্বাগতম ${farmer.name} বাবু। আজকে টমেটোর মান্ডি রেট প্রতি কেজিতে ২৯ টাকা এবং চাহিদা প্রবল। ফ্রেশমার্ট থেকে ১০০০ কেজির নিশ্চিত অর্ডার ২৭,৯১০ টাকা ব্যাংক এসক্রোতে সংরক্ষিত আছে।`;
      voiceLang = 'bn-IN';
    } else {
      text = `Welcome ${farmer.name}. Today's tomato market benchmark is 29 rupees per kg with high buyer demand. FreshMart Retail has locked a 1,000 kg purchase order of 27,910 rupees guaranteed in bank escrow.`;
      voiceLang = 'en-US';
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLang;
    utterance.rate = 0.92;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="farmer-dashboard animate-fade-in">
      {/* Top Welcome & Voice Assistant Banner */}
      <div className="farmer-dashboard__header">
        <div>
          <div className="farmer-dashboard__badge">
            <span className="badge-dot" /> {t('farmerHubBadge', 'Verified Producer · Bardhaman Hub')}
          </div>
          <h1 className="farmer-dashboard__title">
            {t('welcomeUser', 'Welcome')}, {farmer.name.split(' ')[0]}!
          </h1>
          <p className="farmer-dashboard__subtitle">
            {t('farmerSubtitle', 'Kisan Service Hub · Check live mandi prices, accept guaranteed buyer orders, and get instant bank payouts.')}
          </p>
        </div>

        <div className="farmer-dashboard__header-actions">
          <button
            onClick={handleReadSummary}
            className={`farmer-voice-btn ${speaking ? 'farmer-voice-btn--active' : ''}`}
            title="Read Summary aloud"
          >
            <Volume2 size={18} className={speaking ? 'animate-pulse text-red-500' : ''} />
            <span>{speaking ? t('stopAudio', 'Stop Audio') : t('listenAudio', 'Listen Audio')}</span>
          </button>
          <Link to="/list-produce" className="farmer-primary-cta">
            <PlusCircle size={18} />
            <span>{t('sellCropBtn', '+ Sell Harvest')}</span>
          </Link>
        </div>
      </div>

      {/* Kisan Quick Action Cards - 3 Big Visual Touch Targets */}
      <div className="kisan-quick-actions">
        <Link to="/list-produce" className="quick-action-card quick-action-card--sell">
          <div className="quick-action-icon">
            <Sprout size={26} className="text-emerald-700" />
          </div>
          <div className="quick-action-text">
            <h4>{t('quickSellTitle', 'Sell New Harvest')}</h4>
            <p>{t('quickSellSub', 'Guaranteed Price · Escrow Protected')}</p>
          </div>
          <ArrowRight size={18} className="quick-action-arrow" />
        </Link>

        <Link to="/logistics" className="quick-action-card quick-action-card--truck">
          <div className="quick-action-icon">
            <Truck size={26} className="text-blue-700" />
          </div>
          <div className="quick-action-text">
            <h4>{t('quickTruckTitle', 'Where is the Truck?')}</h4>
            <p>{t('quickTruckSub', 'Live GPS Fleet Tracking')}</p>
          </div>
          <ArrowRight size={18} className="quick-action-arrow" />
        </Link>

        <Link to="/payments" className="quick-action-card quick-action-card--money">
          <div className="quick-action-icon">
            <Wallet size={26} className="text-amber-700" />
          </div>
          <div className="quick-action-text">
            <h4>{t('quickMoneyTitle', 'My Bank Balance')}</h4>
            <p>{t('quickMoneySub', 'Safe in Escrow Account')}</p>
          </div>
          <ArrowRight size={18} className="quick-action-arrow" />
        </Link>
      </div>

      {/* Primary 3-Metric Summary Banner */}
      <div className="farmer-metrics-row">
        <div className="farmer-metric-card">
          <div className="metric-header">
            <span className="metric-label">{t('metricRateLabel', "Today's Market Rate")}</span>
            <span className="badge badge-accent">{t('metricDistrictTag', 'District APMC')}</span>
          </div>
          <div className="metric-number">
            ₹{marketData.tomato.avgPrice} <span className="metric-unit">/ kg</span>
          </div>
          <span className="metric-sub text-success">
            +{marketData.tomato.demandTrend} {t('metricRateSub', 'Higher than traditional middleman rate')}
          </span>
        </div>

        <div className="farmer-metric-card">
          <div className="metric-header">
            <span className="metric-label">{t('metricProduceLabel', 'Listed Farm Produce')}</span>
            <span className="badge badge-primary">{t('metricProduceActive', 'Active on Market')}</span>
          </div>
          <div className="metric-number">
            2,100 <span className="metric-unit">kg</span>
          </div>
          <span className="metric-sub text-muted">
            2 {t('metricProduceSub', 'Batches ready for dispatch')}
          </span>
        </div>

        <div className="farmer-metric-card highlight-gold">
          <div className="metric-header">
            <span className="metric-label">{t('metricEscrowLabel', 'Locked Escrow Payout')}</span>
            <ShieldCheck size={18} className="text-gold" />
          </div>
          <div className="metric-number text-gold">
            ₹27,910
          </div>
          <span className="metric-sub">
            {t('metricEscrowSub', 'Guaranteed in RBI Escrow · Instant RTGS settlement')}
          </span>
        </div>
      </div>

      {/* Grid: Mandi Rates & Live Buyer Offer */}
      <div className="farmer-dashboard__grid">
        {/* Left Column */}
        <div className="farmer-dashboard__left">
          {/* Real-time Mandi Rate Comparison */}
          <div className="dashboard-card mandi-rates-card">
            <div className="dashboard-card__header">
              <div>
                <div className="market-live-pill">
                  <span className="badge-pulse" /> {t('liveMandiTitle', 'LIVE MANDI RATE UPDATE')}
                </div>
                <h3>{t('mandiPulseTitle', 'Crop Price & Market Pulse')}</h3>
              </div>
              <Link to="/market" className="btn btn-secondary btn-sm">
                <span>{t('viewAllRates', 'View All Rates')}</span>
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="mandi-comparison-box">
              <div className="mandi-stat-line">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-500" />
                  {t('marketSpread', 'Market Spread')}: ₹{marketData.tomato.minPrice} - ₹{marketData.tomato.maxPrice}/kg
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-emerald-600" />
                  {t('buyerDemand', 'Buyer Demand: HIGH')}
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  {t('verifiedBuyersCount', 'Verified Buyers: 14 Active Near You')}
                </span>
              </div>

              <div className="mandi-visual-comparison">
                <div className="comp-item comp-item--traditional">
                  <div className="comp-label">{t('legacyMandiTitle', 'Traditional Middleman / Agent Rate')}</div>
                  <div className="comp-price">₹22.50 / kg</div>
                  <div className="comp-note">{t('legacyMandiDeduction', 'Less 8% commission + arbitrary weight deductions')}</div>
                </div>

                <div className="comp-item comp-item--krishi">
                  <div className="comp-label flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-700" />
                    <span>{t('krishiConnectTitle', 'Krishi Connect Guaranteed Net')}</span>
                  </div>
                  <div className="comp-price text-success">₹29.00 / kg</div>
                  <div className="comp-note text-success">
                    +₹6.50/kg {t('krishiGainHighlight', 'extra net realization (+28.8% Gain)')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Institutional Buy Offer Card */}
          <div className="dashboard-card buyer-deal-card">
            <div className="deal-header">
              <div className="deal-header__title">
                <span className="badge badge-accent">{t('confirmedOfferTitle', 'Confirmed Buyer Offer')}</span>
                <h3>{buyerOffer.crop} — 1,000 kg Bulk Procurement</h3>
              </div>
              <div className="deal-timer">
                <Clock size={15} />
                <span>{t('validHours', 'Valid for 4 hours')}</span>
              </div>
            </div>

            <div className="deal-body">
              <div className="deal-buyer-info">
                <div className="buyer-avatar-badge">FM</div>
                <div>
                  <strong>{buyerOffer.buyer}</strong>
                  <span className="verified-tag flex items-center gap-1">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    {t('verifiedInstitutional', 'Verified Institutional Buyer')}
                  </span>
                </div>
              </div>

              <div className="deal-financials">
                <div className="financial-col">
                  <span className="fin-label">{t('unitPrice', 'Unit Price')}</span>
                  <span className="fin-val">₹{buyerOffer.offerPrice} / kg</span>
                </div>
                <div className="financial-col">
                  <span className="fin-label">{t('batchVolume', 'Volume')}</span>
                  <span className="fin-val">{buyerOffer.quantity} kg</span>
                </div>
                <div className="financial-col highlight">
                  <span className="fin-label">{t('netPayout', 'Direct Bank Payout')}</span>
                  <span className="fin-val-large">₹{buyerOffer.estimatedPayout.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="deal-escrow-guarantee">
                <ShieldCheck size={18} className="text-success flex-shrink-0" />
                <span>{t('escrowGuaranteeNote', 'Funds held in RBI Escrow account. Guaranteed payment released immediately upon weighment verification.')}</span>
              </div>
            </div>

            <div className="deal-actions">
              <Link to="/orders" className="btn btn-primary btn-lg btn-block deal-submit-btn">
                <span>{t('acceptOfferBtn', 'Accept Offer & Schedule Dispatch')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Active Batches & Quick Orders */}
        <div className="farmer-dashboard__right">
          <div className="dashboard-card active-consignments-card">
            <div className="dashboard-card__header">
              <h3>{t('activeConsignmentsTitle', 'Active Consignments')}</h3>
              <Link to="/orders" className="btn-link">{t('viewAll', 'View All')}</Link>
            </div>

            <div className="active-orders-list">
              {activeOrders.map((order) => (
                <div key={order.id} className="order-item-compact">
                  <div className="order-item-top">
                    <div className="flex items-center gap-3">
                      <CropImage crop={order.crop} size={36} />
                      <div>
                        <strong>{order.crop}</strong>
                        <span className="text-muted text-xs block font-medium">
                          {order.quantity} {order.unit} @ ₹{order.price}/{order.unit}
                        </span>
                      </div>
                    </div>
                    <span className="order-buyer-tag">{order.buyer}</span>
                  </div>

                  <div className="order-status-row">
                    <span className="order-status-badge">
                      {order.status === 'in_transit' ? (
                        <span className="flex items-center gap-1.5 text-emerald-700">
                          <Truck size={14} /> {t('inTransit', 'In Transit')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-blue-700">
                          <Clock size={14} /> {t('paymentProcessing', 'Payment Processing')}
                        </span>
                      )}
                    </span>
                    <Link to="/logistics" className="order-track-link">
                      {t('trackLive', 'Track Live →')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
