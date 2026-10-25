import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { X, Lock, Unlock, Eye, EyeOff, Save, Check, RefreshCw } from 'lucide-react';

export const OwnerPortalModal: React.FC = () => {
  const {
    config,
    updateConfig,
    mensPackages,
    womensPackages,
    updatePackage,
    isOwnerModalOpen,
    closeOwnerModal,
    isOwnerAuthenticated,
    loginOwner,
    logoutOwner
  } = useSalon();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'mens' | 'womens'>('settings');
  const [saveToast, setSaveToast] = useState(false);

  // Editable settings fields
  const [announcement, setAnnouncement] = useState(config.announcement);
  const [announcementSub, setAnnouncementSub] = useState(config.announcementSub);
  const [primaryPhone, setPrimaryPhone] = useState(config.primaryPhone);
  const [secondaryPhone, setSecondaryPhone] = useState(config.secondaryPhone);
  const [email, setEmail] = useState(config.email);

  if (!isOwnerModalOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginOwner(pinInput)) {
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Invalid PIN code. Hint: Burari Pincode (110084)');
    }
  };

  const handleSaveSettings = () => {
    updateConfig({
      announcement,
      announcementSub,
      primaryPhone,
      secondaryPhone,
      email
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const togglePriceVisibility = () => {
    updateConfig({ showPricesPublicly: !config.showPricesPublicly });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-portal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#141619] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181B20] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#22262E] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              {isOwnerAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h2 id="owner-portal-title" className="text-base font-serif font-bold text-[#F4F4F0]">
                Salon Owner Admin Portal
              </h2>
              <p className="text-xs text-neutral-400">
                Manage business details, package publication, and pricing visibility
              </p>
            </div>
          </div>
          <button
            onClick={closeOwnerModal}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close owner portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!isOwnerAuthenticated ? (
          /* PIN Verification View */
          <div className="p-8 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">Owner Authentication</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Enter your salon administrator PIN to edit pricing, contact numbers, or toggle draft
              packages.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 6-digit PIN"
                  className="w-full px-4 py-2.5 bg-[#0C0D0E] border border-white/15 rounded-lg text-center tracking-widest text-lg font-mono text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  autoFocus
                />
                {pinError && <p className="text-xs text-red-400 mt-2">{pinError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs tracking-wide uppercase rounded-lg transition-colors cursor-pointer"
              >
                Access Owner Portal
              </button>
              <p className="text-[11px] text-neutral-500">
                Default PIN: <code className="text-neutral-400">110084</code> (Burari Pincode)
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-[#D4AF37] text-black'
                      : 'text-neutral-400 hover:text-white bg-neutral-800'
                  }`}
                >
                  General Settings
                </button>
                <button
                  onClick={() => setActiveTab('mens')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === 'mens'
                      ? 'bg-[#D4AF37] text-black'
                      : 'text-neutral-400 hover:text-white bg-neutral-800'
                  }`}
                >
                  Men&apos;s Packages ({mensPackages.length})
                </button>
                <button
                  onClick={() => setActiveTab('womens')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === 'womens'
                      ? 'bg-[#D4AF37] text-black'
                      : 'text-neutral-400 hover:text-white bg-neutral-800'
                  }`}
                >
                  Women&apos;s Packages ({womensPackages.length})
                </button>
              </div>

              <button
                onClick={logoutOwner}
                className="text-xs text-neutral-500 hover:text-red-400 transition-colors"
              >
                Log Out
              </button>
            </div>

            {saveToast && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-200 rounded-lg text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Business settings saved successfully!</span>
              </div>
            )}

            {/* General Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-5">
                {/* Public Pricing Toggle */}
                <div className="p-4 bg-[#1B1E24] border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">Public Price Display</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded ${
                          config.showPricesPublicly
                            ? 'bg-emerald-900/60 text-emerald-300'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {config.showPricesPublicly ? 'VISIBLE' : 'HIDDEN'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      Per original instructions, package prices remain hidden by default until
                      activated by the salon owner.
                    </p>
                  </div>
                  <button
                    onClick={togglePriceVisibility}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      config.showPricesPublicly
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                        : 'bg-[#D4AF37] hover:bg-[#dfbe58] text-black'
                    }`}
                  >
                    {config.showPricesPublicly ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide Prices</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Publish Prices</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Contact & Announcement Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Primary Phone (WhatsApp CTAs)
                    </label>
                    <input
                      type="text"
                      value={primaryPhone}
                      onChange={(e) => setPrimaryPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Secondary Phone (Alternative Call)
                    </label>
                    <input
                      type="text"
                      value={secondaryPhone}
                      onChange={(e) => setSecondaryPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Top Announcement Headline
                    </label>
                    <input
                      type="text"
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Announcement Subtitle
                    </label>
                    <input
                      type="text"
                      value={announcementSub}
                      onChange={(e) => setAnnouncementSub(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Business Details</span>
                </button>
              </div>
            )}

            {/* Men's Packages Tab */}
            {activeTab === 'mens' && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-400">
                  Toggle package status between Published and Draft, or edit optional pricing.
                </p>
                <div className="divide-y divide-white/5">
                  {mensPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{pkg.name}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                              pkg.isDraft
                                ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                            }`}
                          >
                            {pkg.isDraft ? 'DRAFT' : 'PUBLISHED'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{pkg.items.join(' · ')}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {config.showPricesPublicly && (
                          <input
                            type="number"
                            placeholder="₹ Price"
                            defaultValue={pkg.price || ''}
                            onBlur={(e) => {
                              const val = parseInt(e.target.value, 10);
                              updatePackage(pkg.id, { price: isNaN(val) ? undefined : val });
                            }}
                            className="w-20 px-2 py-1 bg-[#0C0D0E] border border-white/15 rounded text-xs text-white font-mono"
                          />
                        )}
                        <button
                          onClick={() => updatePackage(pkg.id, { isDraft: !pkg.isDraft })}
                          className={`px-3 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                            pkg.isDraft
                              ? 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200'
                              : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                          }`}
                        >
                          {pkg.isDraft ? 'Publish' : 'Move to Draft'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Women's Packages Tab */}
            {activeTab === 'womens' && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-400">
                  Adapt and confirm proposed women&apos;s special packages. Unapproved entries remain
                  cleanly hidden from public views.
                </p>
                <div className="divide-y divide-white/5">
                  {womensPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{pkg.name}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                              pkg.isDraft
                                ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                            }`}
                          >
                            {pkg.isDraft ? 'DRAFT / UNAPPROVED' : 'PUBLISHED'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{pkg.items.join(' · ')}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {config.showPricesPublicly && (
                          <input
                            type="number"
                            placeholder="₹ Price"
                            defaultValue={pkg.price || ''}
                            onBlur={(e) => {
                              const val = parseInt(e.target.value, 10);
                              updatePackage(pkg.id, { price: isNaN(val) ? undefined : val });
                            }}
                            className="w-20 px-2 py-1 bg-[#0C0D0E] border border-white/15 rounded text-xs text-white font-mono"
                          />
                        )}
                        <button
                          onClick={() => updatePackage(pkg.id, { isDraft: !pkg.isDraft })}
                          className={`px-3 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                            pkg.isDraft
                              ? 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200'
                              : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                          }`}
                        >
                          {pkg.isDraft ? 'Approve & Publish' : 'Move to Draft'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
