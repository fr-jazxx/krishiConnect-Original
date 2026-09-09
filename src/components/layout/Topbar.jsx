import { Bell, User, Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { farmer } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import './Topbar.css';

export default function Topbar({ role = 'farmer' }) {
  const { language, setLanguage, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef(null);

  const hour = new Date().getHours();
  let greetingKey = 'greetingMorning';
  if (hour >= 12 && hour < 17) greetingKey = 'greetingAfternoon';
  else if (hour >= 17) greetingKey = 'greetingEvening';

  useEffect(() => {
    function handleDocClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    }
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleDocClick);
    }
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [langMenuOpen]);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', label: 'Bangla', native: 'বাংলা' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const roleLabels = {
    farmer: t('farmerRole', 'Farmer Portal'),
    buyer: t('buyerRole', 'Buyer Portal'),
    admin: t('adminRole', 'Admin Control'),
  };

  return (
    <header className="topbar">
      <div className="topbar__greeting">
        <div className="flex items-center gap-2">
          <h2 className="topbar__title">
            {t(greetingKey)}, {role === 'buyer' ? 'FreshMart Procurement' : role === 'admin' ? 'Nodal Officer' : farmer.name.split(' ')[0]}
          </h2>
          <span className="topbar__role-tag">{roleLabels[role] || role}</span>
        </div>
        <p className="topbar__subtitle">{t('farmMarketplace', 'Transparent farm marketplace')}</p>
      </div>

      <div className="topbar__actions">
        {/* Language Switcher Dropdown */}
        <div className="topbar__lang-wrap" ref={langRef}>
          <button
            type="button"
            className="topbar__lang-btn"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            title="Switch Language"
          >
            <Globe size={16} className="text-primary-green" />
            <span className="topbar__lang-code">{currentLangObj.native}</span>
            <ChevronDown size={14} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {langMenuOpen && (
            <div className="topbar__lang-menu animate-fade-in">
              <div className="lang-menu-title">Select Language / भाषा चुनें</div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={`lang-option ${language === l.code ? 'lang-option--active' : ''}`}
                  onClick={() => {
                    setLanguage(l.code);
                    setLangMenuOpen(false);
                  }}
                >
                  <span className="lang-native">{l.native}</span>
                  <span className="lang-latin">({l.label})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="topbar__btn" title={t('notifications', 'Notifications')}>
          <Bell size={18} />
          <span className="topbar__notification-dot" />
        </button>

        <button className="topbar__btn topbar__avatar" title={t('profile', 'Profile')}>
          <User size={18} />
        </button>
      </div>
    </header>
  );
}
