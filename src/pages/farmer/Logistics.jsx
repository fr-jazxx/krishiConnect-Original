import { useState, useEffect, useMemo } from 'react';
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

// ── Canonical Google Highway Route Polyline ──
// Accurately follows every major turn of NH-19 (Bardhaman -> Memari -> Jamalpur -> Gurap -> Dankuni -> Belghoria Expwy -> Kolkata APMC)
export const CANONICAL_ROUTE_POINTS = [
  { x: 80, y: 70, name: 'Bardhaman Farmer Hub' },
  { x: 140, y: 66 },
  { x: 200, y: 60 },
  { x: 260, y: 54 },
  { x: 310, y: 50 },
  { x: 345, y: 55, name: 'Memari Cold Storage Checkpoint' },
  { x: 370, y: 78 },
  { x: 392, y: 108 },
  { x: 406, y: 138 },
  { x: 417, y: 168 },
  { x: 427, y: 202 },
  { x: 438, y: 238 },
  { x: 449, y: 272 },
  { x: 462, y: 302 },
  { x: 478, y: 324, name: 'Dankuni Highway Weighbridge' },
  { x: 500, y: 318 },
  { x: 530, y: 304 },
  { x: 565, y: 292 },
  { x: 610, y: 284 },
  { x: 660, y: 285 },
  { x: 720, y: 290, name: 'Kolkata Institutional Terminal (APMC)' }
];

// Precompute cumulative lengths along the canonical route polyline
const { ROUTE_CUM_DISTS, ROUTE_TOTAL_LEN } = (() => {
  const dists = [0];
  let sum = 0;
  for (let i = 0; i < CANONICAL_ROUTE_POINTS.length - 1; i++) {
    const dx = CANONICAL_ROUTE_POINTS[i + 1].x - CANONICAL_ROUTE_POINTS[i].x;
    const dy = CANONICAL_ROUTE_POINTS[i + 1].y - CANONICAL_ROUTE_POINTS[i].y;
    sum += Math.hypot(dx, dy);
    dists.push(sum);
  }
  return { ROUTE_CUM_DISTS: dists, ROUTE_TOTAL_LEN: sum };
})();

// Single canonical SVG path string (exact same route geometry for visual path & truck)
const CANONICAL_PATH_D = CANONICAL_ROUTE_POINTS.reduce(
  (acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
  ''
);

// Sample coordinates (x, y) and heading angle sequentially along the canonical route
function getTruckTransform(progressPercent) {
  const norm = Math.max(0, Math.min(100, progressPercent)) / 100;
  const targetDist = norm * ROUTE_TOTAL_LEN;

  let segIdx = 0;
  for (let i = 0; i < ROUTE_CUM_DISTS.length - 1; i++) {
    if (targetDist <= ROUTE_CUM_DISTS[i + 1]) {
      segIdx = i;
      break;
    }
  }

  const p1 = CANONICAL_ROUTE_POINTS[segIdx];
  const p2 = CANONICAL_ROUTE_POINTS[Math.min(segIdx + 1, CANONICAL_ROUTE_POINTS.length - 1)];
  const segStartDist = ROUTE_CUM_DISTS[segIdx];
  const segEndDist = ROUTE_CUM_DISTS[segIdx + 1] || (segStartDist + 1);
  const segLen = segEndDist - segStartDist;
  const t = segLen > 0 ? (targetDist - segStartDist) / segLen : 0;

  const x = p1.x + t * (p2.x - p1.x);
  const y = p1.y + t * (p2.y - p1.y);

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

  return { x, y, angleDeg, segIdx };
}

export default function Logistics() {
  const { t } = useLanguage();
  const { orders } = useKrishi();
  const [selectedRoute, setSelectedRoute] = useState(logisticsRoutes[0]);
  const [mapMode, setMapMode] = useState('satellite'); // 'satellite', 'roadmap', 'night'
  const [isSimulating, setIsSimulating] = useState(true);
  const [truckProgress, setTruckProgress] = useState(58);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulated real-time GPS telemetry tick along the canonical polyline
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setTruckProgress((prev) => {
        if (prev >= 98) return 5;
        return Number((prev + 0.4).toFixed(1));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Derived truck position along the canonical polyline (viewBox 0 0 800 360)
  const truckTransform = useMemo(() => getTruckTransform(truckProgress), [truckProgress]);
  const truckLeftPct = (truckTransform.x / 800) * 100;
  const truckTopPct = (truckTransform.y / 360) * 100;

  // Mock telemetry values dynamically aligned with the canonical route
  const totalKm = 101.4;
  const remainingKm = Math.max(0, (totalKm * (1 - truckProgress / 100))).toFixed(1);
  const mockSpeed = Math.round(48 + Math.sin(truckProgress * 0.15) * 3);

  // Dynamic corridor detection
  let corridorName = 'NH-19 Durgapur Expwy (S 165°)';
  if (truckProgress < 24) {
    corridorName = 'GT Road Corridor (SE 115°)';
  } else if (truckProgress > 72) {
    corridorName = 'Belghoria Expwy AH-1 (E 95°)';
  }

  // Dynamic ETA calculation
  const etaMinutes = Math.round((Number(remainingKm) / 48) * 60);
  const arrivalTimeStr = etaMinutes <= 3 ? 'Arriving' : `${Math.floor(etaMinutes / 60)}h ${etaMinutes % 60}m`;

  // Waypoint progress percentages along the canonical polyline
  const memariProgress = (ROUTE_CUM_DISTS[5] / ROUTE_TOTAL_LEN) * 100;
  const dankuniProgress = (ROUTE_CUM_DISTS[14] / ROUTE_TOTAL_LEN) * 100;

  const routeWaypoints = [
    { name: 'Bardhaman Farmer Hub', time: '09:30 AM', passed: true, temp: '4.2°C' },
    { name: 'Memari Cold Storage Checkpoint', time: '11:15 AM', passed: truckProgress >= memariProgress, temp: '4.0°C' },
    { name: 'Dankuni Highway Weighbridge', time: '01:45 PM', passed: truckProgress >= dankuniProgress, temp: '4.1°C' },
    { name: 'Kolkata Institutional Terminal (APMC)', time: `ETA ${arrivalTimeStr}`, passed: truckProgress >= 98, temp: 'Expected' },
  ];

  // Dynamic Google Maps embed target based on map mode
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

              {/* Canonical Highway NH-19 Corridor Vector Overlay from Bardhaman through Memari, Jamalpur, Dankuni to Kolkata */}
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
                {/* Outer route shadow along canonical route */}
                <path
                  d={CANONICAL_PATH_D}
                  fill="none"
                  stroke="rgba(15, 23, 42, 0.75)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Active canonical highway corridor path - matches the Google highway route */}
                <path
                  d={CANONICAL_PATH_D}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="8 6"
                  className="route-pulse-line"
                />
                {/* Canonical Waypoint Pins: Exactly on the Highway Route Polyline */}
                {/* 1. Bardhaman Hub */}
                <circle cx={CANONICAL_ROUTE_POINTS[0].x} cy={CANONICAL_ROUTE_POINTS[0].y} r="8" fill="#22c55e" stroke="#ffffff" strokeWidth="2.5" />
                {/* 2. Memari Checkpoint */}
                <circle cx={CANONICAL_ROUTE_POINTS[5].x} cy={CANONICAL_ROUTE_POINTS[5].y} r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2.5" />
                {/* 3. Dankuni Weighbridge */}
                <circle cx={CANONICAL_ROUTE_POINTS[14].x} cy={CANONICAL_ROUTE_POINTS[14].y} r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2.5" />
                {/* 4. Kolkata Terminal */}
                <circle cx={CANONICAL_ROUTE_POINTS[20].x} cy={CANONICAL_ROUTE_POINTS[20].y} r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />

                {/* Waypoint Text Labels positioned along canonical highway coordinates */}
                <text x={CANONICAL_ROUTE_POINTS[0].x} y={CANONICAL_ROUTE_POINTS[0].y - 18} fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle" filter="url(#routeGlow)">
                  Bardhaman (Origin)
                </text>
                <text x={CANONICAL_ROUTE_POINTS[5].x} y={CANONICAL_ROUTE_POINTS[5].y - 14} fill="#ffffff" fontSize="10.5" fontWeight="700" textAnchor="middle" filter="url(#routeGlow)">
                  Memari Checkpoint
                </text>
                <text x={CANONICAL_ROUTE_POINTS[14].x - 10} y={CANONICAL_ROUTE_POINTS[14].y + 22} fill="#ffffff" fontSize="10.5" fontWeight="700" textAnchor="middle" filter="url(#routeGlow)">
                  Dankuni Weighbridge
                </text>
                <text x={CANONICAL_ROUTE_POINTS[20].x} y={CANONICAL_ROUTE_POINTS[20].y + 24} fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle" filter="url(#routeGlow)">
                  Kolkata (Terminal)
                </text>
              </svg>

              {/* Dynamic Moving Truck Pin traveling sequentially along the canonical Google highway route */}
              <div
                className="live-truck-marker"
                style={{
                  left: `${truckLeftPct}%`,
                  top: `${truckTopPct}%`,
                }}
              >
                <div className="radar-ripple" />
                <div
                  className="truck-bubble"
                  style={{
                    transform: `rotate(${Math.round(truckTransform.angleDeg)}deg)`,
                    transition: 'transform 0.4s ease'
                  }}
                >
                  <Truck size={18} />
                </div>
                <div className="truck-tag">
                  <strong>WB-39-E-9042</strong>
                  <span>{mockSpeed} km/h • 4.1°C</span>
                </div>
              </div>

              {/* Map Floating HUD Overlay with Real-time Simulated Metrics */}
              <div className="map-hud-box">
                <div className="hud-metric">
                  <Compass size={14} className="text-emerald-400" />
                  <span>Corridor: <strong>{corridorName}</strong></span>
                </div>
                <div className="hud-metric">
                  <Navigation size={14} className="text-emerald-400" />
                  <span>Remaining: <strong>{remainingKm} km</strong></span>
                </div>
                <div className="hud-metric">
                  <Clock size={14} className="text-emerald-400" />
                  <span>Est Arrival: <strong>{arrivalTimeStr} (15:40 IST)</strong></span>
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
              <span className="sensor-val">{mockSpeed} km/h</span>
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
          <div className="route-progress-box">
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
