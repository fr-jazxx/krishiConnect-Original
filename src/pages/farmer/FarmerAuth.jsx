import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sprout, Phone, Lock, User, MapPin, ShieldCheck,
  CheckCircle2, ArrowRight, Sparkles, Building2, HelpCircle
} from 'lucide-react';
import './FarmerAuth.css';

export default function FarmerAuth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    kisanId: '',
    state: 'West Bengal',
    district: 'Bardhaman',
    farmSize: '4.5',
    primaryCrop: 'Paddy & Vegetables',
  });

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone) return;
    setOtpSent(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login
    navigate('/dashboard');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Simulate successful registration
    navigate('/dashboard');
  };

  return (
    <div className="farmer-auth-page">
      {/* Background with aerial overlay */}
      <div className="farmer-auth-map-bg" />
      <div className="farmer-auth-overlay" />

      <div className="farmer-auth-container">
        {/* Left Side: Value Proposition */}
        <div className="farmer-auth-brand-side">
          <div className="brand-logo-row">
            <div className="brand-icon-circle">
              <Sprout size={28} className="text-emerald-400" />
            </div>
            <div>
              <span className="brand-name">KrishiConnect</span>
              <span className="brand-tagline">Kisan Portal (किसान पोर्टल)</span>
            </div>
          </div>

          <h2 className="auth-hero-title">
            Sell Direct to Institutional Buyers at Mandi-Beating Prices
          </h2>
          <p className="auth-hero-desc">
            Eliminate middlemen, get guaranteed payments via digital escrow, and track your cold-chain logistics live to the city warehouse.
          </p>

          <div className="auth-benefits-list">
            <div className="auth-benefit-item">
              <div className="benefit-icon-box">
                <CheckCircle2 size={18} className="text-emerald-400" />
              </div>
              <div>
                <strong>Zero Commission (0% ब्रोकरेज)</strong>
                <p>100% of the agreed price reaches your bank account directly.</p>
              </div>
            </div>

            <div className="auth-benefit-item">
              <div className="benefit-icon-box">
                <ShieldCheck size={18} className="text-emerald-400" />
              </div>
              <div>
                <strong>Digital Weighing & Immediate Escrow Lock</strong>
                <p>IoT scale verified weight ensures no arbitrary deduction.</p>
              </div>
            </div>

            <div className="auth-benefit-item">
              <div className="benefit-icon-box">
                <Sparkles size={18} className="text-emerald-400" />
              </div>
              <div>
                <strong>AI Quality Grading & Real-time Benchmark</strong>
                <p>Grade A produce unlocks up to +15% price premium.</p>
              </div>
            </div>
          </div>

          <div className="auth-kisan-helpline">
            <HelpCircle size={18} className="text-emerald-300" />
            <span>Kisan Toll-Free Support: <strong>1800-419-5522</strong></span>
          </div>
        </div>

        {/* Right Side: Auth Card */}
        <div className="farmer-auth-form-card">
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Farmer Login (लॉगिन)
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              New Registration (पंजीकरण)
            </button>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="auth-header-text">
                <h3>Welcome Back, Kisan Brother</h3>
                <p>Enter your registered mobile number to access your farm dashboard</p>
              </div>

              <div className="form-group">
                <label className="auth-label">Mobile Number (मोबाइल नंबर)</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-prefix">+91</span>
                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="98452 11029"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="auth-input"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="btn btn-primary auth-submit-btn"
                >
                  <Phone size={18} />
                  <span>Send OTP via SMS</span>
                </button>
              ) : (
                <>
                  <div className="form-group animate-fade-in">
                    <div className="flex justify-between items-center mb-1">
                      <label className="auth-label">Enter 4-Digit OTP</label>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-xs text-emerald-400 hover:underline"
                      >
                        Resend OTP
                      </button>
                    </div>
                    <div className="auth-input-wrap">
                      <Lock size={18} className="auth-input-icon" />
                      <input
                        type="text"
                        maxLength="4"
                        placeholder="1 2 3 4"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="auth-input"
                      />
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block">
                      Demo OTP auto-filled or enter any 4 digits.
                    </span>
                  </div>

                  <button type="submit" className="btn btn-primary auth-submit-btn">
                    <span>Verify & Enter Dashboard</span>
                    <ArrowRight size={18} />
                  </button>
                </>
              )}

              <div className="auth-footer-note">
                <span>By continuing, you agree to KrishiConnect's Fair Trade Charter and Escrow Guidelines.</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="auth-header-text">
                <h3>Register as Verified Grower</h3>
                <p>Join thousands of farmers trading directly at premium mandi rates</p>
              </div>

              <div className="form-group">
                <label className="auth-label">Full Name (पूरा नाम)</label>
                <div className="auth-input-wrap">
                  <User size={18} className="auth-input-icon" />
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="auth-label">Mobile Number</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-prefix">+91</span>
                    <input
                      type="tel"
                      maxLength="10"
                      placeholder="98452 11029"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="auth-label">Kisan ID / Aadhaar</label>
                  <div className="auth-input-wrap">
                    <ShieldCheck size={18} className="auth-input-icon" />
                    <input
                      type="text"
                      placeholder="KCC-98214"
                      value={formData.kisanId}
                      onChange={(e) => setFormData({ ...formData, kisanId: e.target.value })}
                      required
                      className="auth-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="auth-label">State (राज्य)</label>
                  <div className="auth-input-wrap">
                    <MapPin size={18} className="auth-input-icon" />
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="auth-label">District (ज़िला)</label>
                  <div className="auth-input-wrap">
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="auth-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="auth-label">Farm Size (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.farmSize}
                    onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                    className="auth-input"
                  />
                </div>

                <div className="form-group">
                  <label className="auth-label">Primary Crops Grown</label>
                  <input
                    type="text"
                    value={formData.primaryCrop}
                    onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                    className="auth-input"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary auth-submit-btn mt-4">
                <Sprout size={18} />
                <span>Complete Registration & Open Portal</span>
              </button>
            </form>
          )}

          <div className="auth-back-link">
            <Link to="/">← Return to Public Home Page</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
