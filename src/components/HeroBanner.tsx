import React, { useState } from 'react';
import { Heart, Copy, Check, ShieldAlert, Sparkles, ArrowDown, Wallet, Settings2, ShieldCheck, Lock } from 'lucide-react';
import { WalletSettings } from '../types';

interface HeroBannerProps {
  walletSettings: WalletSettings;
  onOpenSettings: () => void;
  onScrollToDonation: () => void;
  onScrollToGallery: () => void;
  totalRaised: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  walletSettings,
  onOpenSettings,
  onScrollToDonation,
  onScrollToGallery,
  totalRaised
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(walletSettings.usdtAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const progressPercent = Math.min(
    100,
    Math.round((totalRaised / (walletSettings.targetGoalUSD || 150000)) * 100)
  );

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 border-b border-stone-850">
      {/* Subtle background ambient overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Atmospheric glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Urgent Emergency Alert Bar */}
        {walletSettings.emergencyAlertActive && (
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span>{walletSettings.emergencyAlertText}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Title & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-100 leading-tight tracking-tight">
              Stand with Children
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-200 to-emerald-400">
                Surviving in Gaza’s Rubble
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Thousands of innocent children across the Gaza Strip have lost their homes, parents, and schools. Living amid pulverised concrete and sub-zero night winds, they face severe dehydration, untreated shrapnel wounds, and catastrophic famine. Through decentralized Tether (USDT), you can deliver rapid, unblockable field aid tailored to any budget.
            </p>

            {/* Campaign Live Target Tracker */}
            <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2.5 max-w-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Direct Relief Campaign Progress
                </span>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  ${totalRaised.toLocaleString()} / ${(walletSettings.targetGoalUSD || 150000).toLocaleString()} USDT ({progressPercent}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-stone-950 rounded-full overflow-hidden p-0.5 border border-stone-800">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span>Direct on-the-ground food & medical procurement</span>
                <span>Transparent ledger & instant verification</span>
              </div>
            </div>

            {/* Key Field Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-left">
                <span className="text-rose-400 font-extrabold text-xl sm:text-2xl font-mono block">
                  17,000+
                </span>
                <span className="text-xs text-stone-400 mt-1 block">
                  Unaccompanied or orphaned children in displacement
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-left">
                <span className="text-amber-400 font-extrabold text-xl sm:text-2xl font-mono block">
                  85%+
                </span>
                <span className="text-xs text-stone-400 mt-1 block">
                  Schools & child medical centers severely damaged
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-left col-span-2 sm:col-span-1">
                <span className="text-emerald-400 font-extrabold text-xl sm:text-2xl font-mono block">
                  100%
                </span>
                <span className="text-xs text-stone-400 mt-1 block">
                  Direct allocation to clean water, food, and urgent care
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-donate-now-btn"
                onClick={onScrollToDonation}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/60 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>Donate USDT According to Your Budget</span>
              </button>

              <button
                id="hero-view-gallery-btn"
                onClick={onScrollToGallery}
                className="px-5 py-3.5 rounded-xl bg-stone-900 border border-stone-700/80 hover:border-stone-500 text-stone-200 font-semibold text-sm transition-all flex items-center gap-2 hover:bg-stone-850 cursor-pointer"
              >
                <ArrowDown className="w-4 h-4 text-rose-400" />
                <span>View Field Photo Documentation</span>
              </button>
            </div>
          </div>

          {/* Prominent Support & Tether Wallet Banner Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-stone-900 via-stone-900/95 to-stone-950 border-2 border-emerald-500/40 p-5 sm:p-6 shadow-2xl shadow-emerald-950/40">
              
              {/* Card Header & Admin Link */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-100">
                      {walletSettings.campaignTitle || 'Official Gaza Children Relief Banner'}
                    </h3>
                    <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                      Network: {walletSettings.network} (Tether USDT)
                    </span>
                  </div>
                </div>

                <button
                  id="hero-banner-settings-btn"
                  onClick={onOpenSettings}
                  title="Configure receiving wallet address in Admin Panel"
                  className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors border border-stone-700 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Admin Settings</span>
                </button>
              </div>

              {/* Wallet Claim Card Content */}
              <div className="mt-4 space-y-3.5 text-left">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-stone-300">
                      Official USDT Deposit Address:
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      Click to copy or claim
                    </span>
                  </div>
                  
                  {/* Address Display + Copy / Claim Button */}
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-950 border border-stone-800 font-mono text-xs sm:text-sm text-stone-200 break-all select-all">
                    <span className="flex-1 font-mono text-emerald-300 font-medium text-[11px] sm:text-xs">
                      {walletSettings.usdtAddress}
                    </span>
                    <button
                      id="hero-claim-copy-btn"
                      onClick={handleCopyWallet}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-bold transition-all shadow cursor-pointer active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Claim & Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Recipient note */}
                <div className="text-[11px] text-stone-300 bg-stone-950/60 p-3 rounded-xl border border-stone-850 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Beneficiary: {walletSettings.recipientName}</span>
                  </div>
                  <p className="text-stone-400 leading-relaxed">{walletSettings.customNote}</p>
                </div>

                {/* Budget selector presets */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-300">
                      Select Your Donation Budget:
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Every dollar saves lives
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[5, 15, 35, 70].map((amount) => (
                      <button
                        key={amount}
                        id={`hero-budget-preset-${amount}`}
                        onClick={onScrollToDonation}
                        className="py-2 px-1 rounded-xl bg-stone-800/90 hover:bg-emerald-950/80 hover:border-emerald-500/50 border border-stone-700/80 text-center transition-all cursor-pointer group"
                      >
                        <span className="block font-mono font-bold text-xs sm:text-sm text-emerald-400 group-hover:text-emerald-300">
                          ${amount}
                        </span>
                        <span className="block text-[10px] text-stone-400">
                          USDT
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    id="hero-go-budget-calculator-btn"
                    onClick={onScrollToDonation}
                    className="w-full mt-3 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold border border-stone-700/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Calculate Custom Impact & Generate QR Code</span>
                    <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
