import { useState } from 'react';
import {
  CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap,
  Snowflake, Warehouse, Package, Scale, Calendar, IndianRupee,
  Camera, X, UploadCloud
} from 'lucide-react';
import CropImage from '../../components/common/CropImage';
import CustomSelect from '../../components/common/CustomSelect';
import { useLanguage } from '../../context/LanguageContext';
import { useKrishi } from '../../context/KrishiContext';
import './ListProduce.css';

const visualCrops = [
  { id: 'Tomato', name: 'Tomato', hindi: 'टमाटर', bangla: 'টমেটো', defaultPrice: 29 },
  { id: 'Paddy', name: 'Paddy', hindi: 'धान', bangla: 'धान', defaultPrice: 33 },
  { id: 'Potato', name: 'Potato', hindi: 'आलू', bangla: 'আলু', defaultPrice: 22 },
  { id: 'Onion', name: 'Onion', hindi: 'प्याज', bangla: 'পেঁয়াজ', defaultPrice: 35 },
  { id: 'Wheat', name: 'Wheat', hindi: 'गेहूं', bangla: 'গম', defaultPrice: 28 },
  { id: 'Mustard', name: 'Mustard', hindi: 'सरसों', bangla: 'সরিষা', defaultPrice: 54 },
];

export default function ListProduce() {
  const { t, language } = useLanguage();
  const { addProduceListing, listings = [] } = useKrishi();
  const [formData, setFormData] = useState({
    crop: 'Tomato',
    quantity: '1000',
    unit: 'kg',
    grade: 'A',
    price: '29',
    harvestDate: new Date().toISOString().split('T')[0],
    storage: 'cold_storage',
  });
  const [uploadedPhotos, setUploadedPhotos] = useState([
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedPhotos((prev) => [...prev, uploadEvent.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const unitOptions = [
    { value: 'kg', label: t('unitKg', 'kg') },
    { value: 'quintal', label: t('unitQuintal', 'Quintal') },
  ];

  const storageOptions = [
    {
      value: 'cold_storage',
      label: t('storageCold', 'Cold Storage / Aerated Crates'),
      subtitle: t('storageColdSub', 'Ideal for perishables and vegetables'),
      icon: <Snowflake size={18} className="text-blue-500" />,
    },
    {
      value: 'jute_bags',
      label: t('storageJute', 'Jute Bags / Dry Ventilated Shed'),
      subtitle: t('storageJuteSub', 'Recommended for grains and pulses'),
      icon: <Warehouse size={18} className="text-amber-600" />,
    },
    {
      value: 'bulk_polyhouse',
      label: t('storageBulk', 'Protected Bulk Storage'),
      subtitle: t('storageBulkSub', 'Moisture and pest protected'),
      icon: <Package size={18} className="text-emerald-600" />,
    },
  ];

  const handleSelectCrop = (cropObj) => {
    setFormData((prev) => ({
      ...prev,
      crop: cropObj.id,
      price: cropObj.defaultPrice.toString(),
    }));
  };

  const handleAddQuantity = (amount) => {
    const current = Number(formData.quantity) || 0;
    setFormData((prev) => ({ ...prev, quantity: (current + amount).toString() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.quantity || !formData.price) return;

    const newListing = {
      id: `P${Math.floor(100 + Math.random() * 900)}`,
      crop: formData.crop,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      grade: formData.grade,
      price: Number(formData.price),
      location: 'Bardhaman',
      harvestDate: formData.harvestDate,
      status: 'listed',
      photos: uploadedPhotos,
      farmerName: 'Ramesh Kumar',
      farmerPhone: '+91 98452 11029',
    };

    addProduceListing(newListing);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const selectedCropInfo = visualCrops.find((c) => c.id === formData.crop) || visualCrops[0];
  const estimatedGross = (Number(formData.quantity) || 0) * (Number(formData.price) || 0);

  return (
    <div className="list-produce-page">
      <div className="page-header">
        <div>
          <div className="farmer-dashboard__badge">
            <span className="badge-dot" /> {t('directContractBadge', 'Direct Farmer-to-Buyer Contract')}
          </div>
          <h1 className="page-title">{t('sellHarvestTitle', 'Sell Your Harvest')}</h1>
          <p className="page-subtitle">
            {t(
              'sellHarvestSub',
              'Choose your crop, set your price, and get matched with verified institutional buyers with guaranteed escrow bank payment.'
            )}
          </p>
        </div>
      </div>

      {submitted && (
        <div className="alert-banner alert-banner--success animate-fade-in">
          <CheckCircle2 size={24} className="text-success flex-shrink-0" />
          <div>
            <strong>{t('listedSuccessTitle', 'Produce Listed Successfully!')}</strong>
            <p className="text-sm mt-1">
              {t('listedSuccessSub', 'Verified buyers are receiving your batch details. A delivery truck will be scheduled upon match.')}
            </p>
          </div>
        </div>
      )}

      <div className="list-produce-layout">
        {/* Listing Form */}
        <div className="listing-form-card">
          <div className="step-indicator">
            <Scale size={16} />
            <span>{t('chooseCrop', 'Step 1: Choose Crop')}</span>
          </div>

          {/* Visual Crop Selector Grid */}
          <div className="visual-crop-grid">
            {visualCrops.map((c) => {
              const isSelected = formData.crop === c.id;
              const displayName = language === 'hi' ? c.hindi : language === 'bn' ? (c.bangla || c.hindi) : c.name;
              return (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => handleSelectCrop(c)}
                  className={`visual-crop-btn ${isSelected ? 'visual-crop-btn--active' : ''}`}
                >
                  <div className="crop-icon-wrapper">
                    <CropImage crop={c.id} size={48} />
                  </div>
                  <span className="crop-name">{displayName}</span>
                  <span className="crop-mandi-tag">₹{c.defaultPrice}/kg</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="listing-form mt-6">
            {/* Quantity with quick add buttons */}
            <div className="form-group">
              <div className="form-label-with-hint">
                <label className="input-field-label">{t('quantity', 'Quantity')}</label>
                <div className="quick-qty-wrap">
                  <span className="text-muted text-xs">{t('quickAdd', 'Quick add:')}</span>
                  <div className="quick-qty-row">
                    <button type="button" onClick={() => handleAddQuantity(100)} className="qty-quick-btn">+100 kg</button>
                    <button type="button" onClick={() => handleAddQuantity(500)} className="qty-quick-btn">+500 kg</button>
                    <button type="button" onClick={() => handleAddQuantity(1000)} className="qty-quick-btn">+1,000 kg</button>
                    <button type="button" onClick={() => setFormData((p) => ({ ...p, quantity: '500' }))} className="qty-quick-btn qty-quick-btn--reset">Reset</button>
                  </div>
                </div>
              </div>

              {/* Redesigned Seamless Input Group with CustomSelect */}
              <div className="quantity-input-combo">
                <div className="qty-number-field">
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                    className="qty-main-input"
                  />
                </div>
                <div className="qty-unit-dropdown">
                  <CustomSelect
                    size="md"
                    value={formData.unit}
                    onChange={(val) => setFormData({ ...formData, unit: val })}
                    options={unitOptions}
                  />
                </div>
              </div>
            </div>

            {/* Quality Grade Visual Pills */}
            <div className="form-group">
              <label className="input-field-label">{t('qualityGrade', 'Quality Grade')}</label>
              <div className="grade-pill-selector">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, grade: 'A' }))}
                  className={`grade-pill ${formData.grade === 'A' ? 'grade-pill--active' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="grade-badge grade-a">{t('gradeA', 'Grade A')}</span>
                    {formData.grade === 'A' && <CheckCircle2 size={16} className="text-emerald-700" />}
                  </div>
                  <strong>{t('gradeADesc', 'Super Clean Quality (+12% Premium)')}</strong>
                  <span className="grade-desc">+12% Premium Rate Above Mandi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, grade: 'B' }))}
                  className={`grade-pill ${formData.grade === 'B' ? 'grade-pill--active' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="grade-badge grade-b">{t('gradeB', 'Grade B')}</span>
                    {formData.grade === 'B' && <CheckCircle2 size={16} className="text-amber-700" />}
                  </div>
                  <strong>{t('gradeBDesc', 'Standard Mandi Benchmark Pricing')}</strong>
                  <span className="grade-desc">Mandi Benchmark Pricing</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, grade: 'C' }))}
                  className={`grade-pill ${formData.grade === 'C' ? 'grade-pill--active' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="grade-badge grade-c" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
                      Grade C
                    </span>
                    {formData.grade === 'C' && <CheckCircle2 size={16} className="text-rose-700" />}
                  </div>
                  <strong>Processing & Bulk Grade (-8% Discount)</strong>
                  <span className="grade-desc">Quick Industrial Clearance</span>
                </button>
              </div>
            </div>

            {/* Produce Photo Upload Section */}
            <div className="form-group">
              <label className="input-field-label flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Camera size={16} className="text-emerald-600" />
                  <span>Upload Produce Verification Photos (फसल की तस्वीरें)</span>
                </span>
                <span className="text-xs text-muted">Photos boost buyer trust by 85%</span>
              </label>

              <div className="photo-upload-container">
                <label className="photo-upload-dropzone">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <UploadCloud size={24} className="text-emerald-600 mb-1" />
                  <span className="text-sm font-semibold text-slate-700">Click to Upload Batch Photos</span>
                  <span className="text-xs text-muted">Supports JPG, PNG · Max 5MB each</span>
                </label>

                {uploadedPhotos.length > 0 && (
                  <div className="photo-preview-strip">
                    {uploadedPhotos.map((url, idx) => (
                      <div key={idx} className="photo-preview-item">
                        <img src={url} alt={`Produce upload ${idx + 1}`} className="photo-thumb" />
                        <span className="photo-grade-tag">Grade {formData.grade}</span>
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="photo-remove-btn"
                          title="Remove photo"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price with Recommended Auto-fill */}
            <div className="form-row-2">
              <div className="form-group">
                <div className="form-label-with-hint">
                  <label className="input-field-label">
                    {t('yourPrice', 'Your Price')} (₹/{formData.unit})
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, price: selectedCropInfo.defaultPrice.toString() }))}
                    className="auto-price-btn"
                  >
                    <Sparkles size={14} />
                    <span>{t('useMandiRate', 'Mandi Benchmark')} ₹{selectedCropInfo.defaultPrice}</span>
                  </button>
                </div>
                <div className="price-input-wrapper">
                  <span className="currency-prefix"><IndianRupee size={16} /></span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="form-control price-input"
                  />
                  <span className="per-unit">/{formData.unit}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="input-field-label flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-500" />
                  <span>{t('harvestDate', 'Harvest Date')}</span>
                </label>
                <input
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                  required
                  className="form-control"
                />
              </div>
            </div>

            {/* Storage requirement with Redesigned CustomSelect */}
            <div className="form-group">
              <label className="input-field-label">
                {t('storagePackaging', 'Storage & Packaging')}
              </label>
              <CustomSelect
                value={formData.storage}
                onChange={(val) => setFormData({ ...formData, storage: val })}
                options={storageOptions}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block mt-4 submit-harvest-btn">
              <CheckCircle2 size={20} />
              <span>{t('submitListing', 'Submit & Match Institutional Buyers')}</span>
              <ArrowRight size={20} />
            </button>
          </form>
        </div>

        {/* Real-time Revenue & Guarantee Sidebar */}
        <div className="advisor-column">
          {/* Total Money Card */}
          <div className="payout-summary-card">
            <div className="payout-summary-header">
              <Sparkles size={20} className="text-gold" />
              <h4>{t('estimatedPayout', 'Estimated Escrow Payout')}</h4>
            </div>

            <div className="payout-big-number">
              ₹{estimatedGross.toLocaleString('en-IN')}
            </div>
            <p className="payout-sub">
              {formData.quantity || 0} {formData.unit} {formData.crop} @ ₹{formData.price || 0}/{formData.unit}
            </p>

            <div className="payout-perks">
              <div className="perk-item">
                <ShieldCheck size={18} className="text-success flex-shrink-0" />
                <span>{t('escrowGuaranteed', '100% Escrow Bank Guaranteed')}</span>
              </div>
              <div className="perk-item">
                <Zap size={18} className="text-gold flex-shrink-0" />
                <span>{t('instantPayout', 'Direct RTGS / UPI settlement upon weighment')}</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                <span>{t('zeroCommission', 'Zero Mandi Agent Commission')}</span>
              </div>
            </div>
          </div>

          {/* Active Listings in this hub */}
          <div className="active-batches-card">
            <h4>{t('currentBatchesTitle', 'Your Current Batches')}</h4>
            <div className="batches-mini-list">
              {listings.map((l) => (
                <div key={l.id} className="batch-mini-item">
                  <div className="batch-mini-left flex items-center gap-3">
                    <CropImage crop={l.crop} size={32} />
                    <div>
                      <strong>{l.crop}</strong>
                      <span>{l.quantity} {l.unit} • Grade {l.grade}</span>
                    </div>
                  </div>
                  <div className="batch-mini-right">
                    <span className="batch-price">₹{l.price}/{l.unit}</span>
                    <span className="batch-status-badge">{t('activeStatus', 'Active')}</span>
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
