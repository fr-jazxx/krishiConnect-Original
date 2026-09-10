import { useState, useEffect } from 'react';
import {
  Truck, MapPin, Navigation, Clock, CheckCircle2,
  PhoneCall, Shield, AlertTriangle, ChevronRight, Phone,
  ThermometerSnowflake, Droplets, Zap, Users, RefreshCw,
  Layers, Maximize2, Compass, ShieldCheck, Search
} from 'lucide-react';
import { logisticsRoutes } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { useKrishi } from '../../context/KrishiContext';
import './Logistics.css';

export default function Logistics() {
  const { t } = useLanguage();
  const { orders } = useKrishi();
  const [selectedRoute, setSelectedRoute] = useState(logisticsRoutes[0]);
  const [mapMode, setMapMode] = useState('satellite'); // 'satellite', 'roadmap', 'night'
  const [isSimulating, setIsSimulating] = useState(true);
  const [truckProgress, setTruckProgress] = useState(58);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulated real-time GPS telemetry tick
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setTruckProgress((prev) => {
        if (prev >= 98) return 10;
        return Number((prev + 0.3).toFixed(1));
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Coordinates along West Bengal Agricultural Corridor (Bardhaman -> Durgapur -> Asansol -> Kolkata)
  const routeWaypoints = [
    { name: 'Bardhaman Farmer Hub', lat: 23.2324, lng: 87.8615, time: '09:30 AM', passed: true, temp: '4.2°C' },
    { name: 'Memari Cold Storage Checkpoint', lat: 23.1800, lng: 88.1100, time: '11:15 AM', passed: true, temp: '4.0°C' },
    { name: 'Dankuni Highway Weighbridge', lat: 22.6800, lng: 88.2900, time: '01:45 PM', passed: true, temp: '4.1°C' },
    { name: 'Kolkata Institutional Terminal (APMC)', lat: 22.5726, lng: 88.3639, time: 'ETA 03:40 PM', passed: false, temp: 'Expected' },
  ];

  // Dynamic Google Maps embed target based on map mode
  // saddr=Bardhaman & daddr=Kolkata ensures highway route is focused
  const mapTypeParam = mapMode === 'satellite' ? 'k' : 'm';
  const embedUrl = `https://maps.google.com/maps?saddr=Bardhaman,+West+Bengal&daddr=Kolkata,+West+Bengal&t=${mapTypeParam}&z=10&output=embed`;

  return (
    <div className="logistics-page animate-fade-in">
      <div className="page-header">
        <div>
          <div className="farmer-dashboard__badge">
            <span className="badge-dot" /> Live GPS Fleet Tracking & Cold-Chain Telemetry
          </div>
          <h1 className="page-title">{t('logisticsTitle', 'Cold-Chain Fleet & GPS Tracking')}</h1>
          <p className="page-subtitle">
            {t(
              'logisticsSub',
              'Shared temperature-controlled transport. Track your produce live from field collection to institutional buyer gate.'
            )}
          </p>
        </div>

        <div className="logistics-header-actions">
          <div className="consignment-search-wrap">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search Truck ID or Batch #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="consignment-search-input"
            />
          </div>
        </div>
      </div>

      {/* Savings Metric Banner */}
      <div className="logistics-savings-banner">
        <div className="savings-left">
          <span className="badge badge-accent">{t('sharedSavings', 'Shared Truck Cost Savings')}</span>
          <h3>{t('sharedSavings', 'Shared Truck Cost Savings')}</h3>
          <p>
            {t(
              'sharedSavingsDetail',
              'Consolidated pooling lowers freight costs from ₹2.10/kg to ₹0.64/kg.'
            )}
          </p>
        </div>
        <div className="savings-right">
          <div className="savings-stat">
            <span className="stat-label">{t('fareSavings', 'Transport Savings')}</span>
            <span className="stat-val text-success">41.8%</span>
          </div>
          <div className="savings-stat">
            <span className="stat-label">{t('spoilageRate', 'Transit Spoilage')}</span>
            <span className="stat-val text-success">&lt; 2.5%</span>
          </div>
        </div>
      </div>

      <div className="logistics-layout">
        {/* Active Truck Routes List */}
        <div className="routes-list-column">
          <div className="flex items-center justify-between mb-3">
            <h3 className="routes-column-title">{t('activeTrucks', 'Active Fleet Vehicles')}</h3>
            <span className="text-xs text-muted font-bold">3 Online</span>
          </div>

          <div className="routes-cards">
            {logisticsRoutes.map((route) => {
              const isSelected = selectedRoute.id === route.id;
              return (
                <div
                  key={route.id}
                  className={`route-card ${isSelected ? 'route-card--active' : ''}`}
                  onClick={() => setSelectedRoute(route)}
                >
                  <div className="route-card-top">
                    <div className="route-id-tag">
                      <Truck size={18} />
                      <span>TRUCK #{route.id}</span>
                    </div>
                    <span className={`route-status-pill status-${route.status}`}>
                      <span className="status-dot" />
                      {route.status === 'in_transit' ? t('inTransit', 'In Transit') : t('delivered', 'Delivered')}
                    </span>
                  </div>

                  <div className="route-stops-summary">
                    {route.stops.join(' → ')}
                  </div>

                  <div className="route-card-meta">
                    <span>{t('batchVolume', 'Volume')}: <strong>{route.weight} {route.weightUnit}</strong></span>
                    <span>Distance: <strong>{route.distance} km</strong></span>
                    <span>ETA: <strong>{route.eta}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Route Google Map & Live Console View */}
        <div className="tracking-view-card">
          <div className="tracking-view-header">
            <div>
              <div className="flex items-center gap-2">
                <h3>Truck #{selectedRoute.id} · Live Telemetry</h3>
                <span className="live-pill">
                  <span className="live-dot animate-ping" /> LIVE GPS
                </span>
              </div>
              <span className="text-muted text-xs">
                Registration: WB-39-E-9042 • Reefer Container #RC-804 • Corridor: NH-19
              </span>
            </div>

            <a href="tel:+919830248102" className="driver-contact-btn">
              <Phone size={16} />
              <span>{t('callDriver', 'Call Driver')}: Manoj (+91 98302 48102)</span>
            </a>
          </div>

          {/* Interactive Google Map Simulation Canvas */}
          <div className="google-map-container">
            {/* Map Top Overlay Controls */}
            <div className="map-toolbar">
              <div className="map-mode-toggle">
                <button
                  type="button"
                  className={`map-mode-btn ${mapMode === 'satellite' ? 'map-mode-btn--active' : ''}`}
                  onClick={() => setMapMode('satellite')}
                >
                  Satellite (Aerial NH-19)
                </button>
                <button
                  type="button"
                  className={`map-mode-btn ${mapMode === 'roadmap' ? 'map-mode-btn--active' : ''}`}
                  onClick={() => setMapMode('roadmap')}
                >
                  Roadmap (Google)
                </button>
                <button
                  type="button"
                  className={`map-mode-btn ${mapMode === 'night' ? 'map-mode-btn--active' : ''}`}
                  onClick={() => setMapMode('night')}
                >
                  Night Command
                </button>
              </div>

              <div className="map-actions-right">
                <button
                  type="button"
                  className="map-action-btn"
                  onClick={() => setIsSimulating(!isSimulating)}
                  title="Toggle GPS Simulation"
                >
                  <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
                  <span>{isSimulating ? 'Live Radar Active' : 'Radar Paused'}</span>
                </button>
              </div>
            </div>

            {/* Map Viewport: High contrast dark canvas or live Google Map, with clear route overlay */}
            <div className="map-viewport">
              {mapMode === 'night' ? (
                <div className="map-viewport-dark-canvas" />
              ) : (
                <iframe
                  title="Google Maps NH19 Bardhaman to Kolkata"
                  src={embedUrl}
                  className="google-map-iframe"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}

              {/* Highway NH-19 Corridor Vector Overlay from Bardhaman (NW) to Kolkata (SE) */}
              <svg className="map-route-svg pointer-events-none" viewBox="0 0 800 360" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="60%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <filter id="routeGlow">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
                  </filter>
                </defs>
                {/* Outer route shadow */}
                <path
                  d="M 80 70 Q 280 130 520 210 T 720 290"
                  fill="none"
                  stroke="rgba(15, 23, 42, 0.75)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Active highway corridor path */}
                <path
                  d="M 80 70 Q 280 130 520 210 T 720 290"
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="8 5"
                  className="route-pulse-line"
                />
                {/* Waypoints: Bardhaman -> Memari -> Dankuni -> Kolkata */}
                <circle cx="80" cy="70" r="8" fill="#22c55e" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="280" cy="130" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                <circle cx="520" cy="210" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                <circle cx="720" cy="290" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />

                {/* Waypoint Text Labels */}
                <text x="80" y="46" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle" filter="url(#routeGlow)">
                  Bardhaman (Origin)
                </text>
                <text x="720" y="324" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle" filter="url(#routeGlow)">
                  Kolkata (Terminal)
                </text>
              </svg>

              {/* Dynamic Moving Truck Pin traveling forward along NH-19 towards Kolkata */}
              <div
                className="live-truck-marker"
                style={{
                  left: `${10 + (truckProgress * 0.74)}%`,
                  top: `${16 + (truckProgress * 0.60)}%`,
                }}
              >
                <div className="radar-ripple" />
                <div className="truck-bubble" style={{ transform: 'rotate(28deg)' }}>
                  <Truck size={18} />
                </div>
                <div className="truck-tag">
                  <strong>WB-39-E-9042</strong>
                  <span>48 km/h • 4.1°C</span>
                </div>
              </div>

              {/* Map Floating HUD Overlay */}
              <div className="map-hud-box">
                <div className="hud-metric">
                  <Compass size={14} className="text-emerald-400" />
                  <span>Corridor: <strong>NH-19 (SE 142°)</strong></span>
                </div>
                <div className="hud-metric">
                  <Navigation size={14} className="text-emerald-400" />
                  <span>Remaining: <strong>18.4 km</strong></span>
                </div>
                <div className="hud-metric">
                  <Clock size={14} className="text-emerald-400" />
                  <span>Est Arrival: <strong>15:40 IST</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Sensors in Plain Language */}
          <div className="sensors-grid">
            <div className="sensor-box">
              <div className="sensor-header">
                <ThermometerSnowflake size={18} className="text-blue-500" />
                <span className="sensor-label">{t('cabinTemp', 'Reefer Cabin Temp')}</span>
              </div>
              <span className="sensor-val text-success">4.1°C (Safe)</span>
              <span className="sensor-sub">Target Perishable Range: 2°C - 6°C</span>
            </div>

            <div className="sensor-box">
              <div className="sensor-header">
                <Droplets size={18} className="text-emerald-500" />
                <span className="sensor-label">{t('freshnessLevel', 'Freshness Index')}</span>
              </div>
              <span className="sensor-val">82%</span>
              <span className="sensor-sub">Moisture level verified</span>
            </div>

            <div className="sensor-box">
              <div className="sensor-header">
                <Zap size={18} className="text-amber-500" />
                <span className="sensor-label">{t('vehicleSpeed', 'Vehicle Speed')}</span>
              </div>
              <span className="sensor-val">48 km/h</span>
              <span className="sensor-sub">Highway cruising speed</span>
            </div>

            <div className="sensor-box">
              <div className="sensor-header">
                <Users size={18} className="text-purple-500" />
                <span className="sensor-label">{t('sharingFarmers', 'Consolidated Farms')}</span>
              </div>
              <span className="sensor-val">3 Farms</span>
              <span className="sensor-sub">Zero empty backhaul waste</span>
            </div>
          </div>

          {/* Waypoints Route Progress Track */}
          <div className="route-progress-box mt-6">
            <h4>{t('routeStopsTitle', 'Route Stops & Waypoints')}</h4>
            <div className="waypoints-track">
              {routeWaypoints.map((stop, index) => {
                const isPassed = stop.passed;
                return (
                  <div key={index} className="waypoint-item">
                    <div
                      className={`waypoint-node ${
                        isPassed ? 'waypoint-node--passed' : 'waypoint-node--future'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 size={16} /> : <span>{index + 1}</span>}
                    </div>
                    <div className="waypoint-info">
                      <div className="waypoint-name">{stop.name}</div>
                      <div className="waypoint-status">
                        {stop.time} • {stop.temp}
                      </div>
                    </div>
                    {index < routeWaypoints.length - 1 && (
                      <div
                        className={`waypoint-connector ${
                          isPassed ? 'waypoint-connector--passed' : ''
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
