import { useState } from 'react';
import { Store, Search, Filter, ArrowUpDown, MapPin, CheckCircle, ExternalLink, TrendingUp, Sparkles } from 'lucide-react';
import LiquidGlass from '../../components/effects/LiquidGlass';
import CropImage from '../../components/common/CropImage';
import { marketBoard, marketData } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import './Market.css';

export default function Market() {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'price', 'quantity'

  const crops = [
    { id: 'All', label: t('allCrops', 'All Crops') },
    { id: 'Tomato', label: t('cropTomato', 'Tomato') },
    { id: 'Paddy', label: t('cropPaddy', 'Paddy') },
    { id: 'Onion', label: t('cropOnion', 'Onion') },
    { id: 'Wheat', label: t('cropWheat', 'Wheat') },
    { id: 'Rice', label: t('cropRice', 'Rice') },
  ];

  const filteredItems = marketBoard
    .filter((item) => {
      const matchesCrop = selectedCrop === 'All' || item.crop.toLowerCase() === selectedCrop.toLowerCase();
      const matchesQuery =
        item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.crop.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCrop && matchesQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'quantity') return b.quantity - a.quantity;
      return parseInt(a.distance) - parseInt(b.distance);
    });

  return (
    <div className="market-page">
      {/* Header Banner with High-Performance Liquid Glass */}
      <LiquidGlass variant="panel" borderRadius={16} className="market-header-glass">
        <div className="market-header-content">
          <div className="market-header-left">
            <div className="market-tag">
              <span className="badge-pulse" /> LIVE MANDI RATES • APMC VERIFIED
            </div>
            <h2>{t('marketPageTitle', 'Live Agricultural Market Board')}</h2>
            <p>
              {t('marketPageSub', 'District Bardhaman & neighboring hubs. Real-time direct wholesale listings with verified digital weighment and zero middleman fee cuts.')}
            </p>
          </div>

          <div className="market-header-stats">
            <div className="market-stat-box">
              <div className="flex items-center gap-2 mb-1">
                <CropImage crop="Tomato" size={20} />
                <span className="stat-name">Tomato Benchmark</span>
              </div>
              <span className="stat-val">₹{marketData.tomato.avgPrice} / kg</span>
              <span className="stat-trend text-success">+{marketData.tomato.demandTrend} high demand</span>
            </div>
            <div className="market-stat-box">
              <div className="flex items-center gap-2 mb-1">
                <CropImage crop="Paddy" size={20} />
                <span className="stat-name">Paddy Benchmark</span>
              </div>
              <span className="stat-val">₹{marketData.paddy.avgPrice} / kg</span>
              <span className="stat-trend text-success">+{marketData.paddy.demandTrend} steady</span>
            </div>
          </div>
        </div>
      </LiquidGlass>

      {/* Filter and Search Bar */}
      <div className="market-controls">
        <div className="crop-filters">
          {crops.map((c) => (
            <button
              key={c.id}
              className={`crop-filter-btn ${selectedCrop === c.id ? 'crop-filter-btn--active' : ''}`}
              onClick={() => setSelectedCrop(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="search-sort-group">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('searchPlaceholder', 'Search crop, mandi, or buyer...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="market-search-input"
            />
          </div>

          <div className="sort-dropdown-wrap">
            <ArrowUpDown size={15} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="market-sort-select"
            >
              <option value="distance">{t('sortNearestHub', 'Nearest Hub')}</option>
              <option value="price">{t('sortHighestPrice', 'Highest Price')}</option>
              <option value="quantity">{t('sortHighestVolume', 'Highest Volume')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Market Board Grid */}
      <div className="market-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="market-listing-card">
            <div className="card-top">
              <div className="flex items-center gap-3">
                <CropImage crop={item.crop} size={38} />
                <div className="card-crop-info">
                  <h3>{item.crop}</h3>
                  <span className="grade-badge">Grade {item.grade} • Verified</span>
                </div>
              </div>
              <div className="card-price">
                <span className="price-num">₹{item.price}</span>
                <span className="price-unit">/ {item.unit}</span>
              </div>
            </div>

            <div className="card-meta">
              <div className="meta-row">
                <span>{t('availableQty', 'Available Volume')}:</span>
                <strong>{item.quantity.toLocaleString('en-IN')} {item.unit}</strong>
              </div>
              <div className="meta-row">
                <span>{t('locationMandi', 'Mandi Location')}:</span>
                <span className="location-tag">
                  <MapPin size={13} /> {item.location} ({item.distance} {t('distanceAway', 'away')})
                </span>
              </div>
              <div className="meta-row">
                <span>{t('tradingParty', 'Party / Seller')}:</span>
                <span className="seller-tag">
                  {item.seller} <span className="seller-type">({item.sellerType})</span>
                </span>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn btn-secondary btn-sm btn-action">
                {t('qualityCertBtn', 'Quality Certificate')}
              </button>
              <button className="btn btn-primary btn-sm btn-action">
                {t('lockDealBtn', 'Lock Deal')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
