import React, { useState } from 'react';
import { Heart, ShieldCheck, Copy, Check, Sparkles, Wallet, Lock } from 'lucide-react';
import { WalletSettings } from '../types';

interface NavbarProps {
  walletSettings: WalletSettings;
  onOpenSettings: () => void;
  onScrollToDonation: () => void;
  onScrollToGallery: () => void;
  onScrollToHero: () => void;
  isAdminAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  walletSettings,
  onOpenSettings,
  onScrollToDonation,
  onScrollToGallery,
  onScrollToHero,
  isAdminAuthenticated
}) => {
  const [copied, setCopied] = useState(false);

  const handleQuickCopy = () => {
    navigator.clipboard.writeText(walletSettings.usdtAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const truncatedAddress = walletSettings.usdtAddress
    ? `${walletSettings.usdtAddress.slice(0, 6)}...${walletSettings.usdtAddress.slice(-4)}`
    : 'Not Configured';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-950/90 border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={onScrollToHero}
          id="nav-brand-btn"
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-stone-800 to-rose-700 p-0.5 shadow-lg shadow-emerald-950/50">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg text-stone-100 tracking-tight">
                Gaza Children Relief
              </span>
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-mono font-semibold">
                USDT Direct Aid
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Field Documentation & Emergency Crypto Humanitarian Aid
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium text-stone-300">
          <button 
            id="nav-gallery-link"
            onClick={onScrollToGallery}
            className="px-3 py-2 rounded-lg hover:text-white hover:bg-stone-900 transition-colors cursor-pointer"
          >
            Children in Rubble
          </button>
          <button 
            id="nav-banner-link"
            onClick={onScrollToHero}
            className="px-3 py-2 rounded-lg hover:text-white hover:bg-stone-900 transition-colors cursor-pointer"
          >
            Emergency Appeal
          </button>
          <button 
            id="nav-donate-link"
            onClick={onScrollToDonation}
            className="px-3 py-2 rounded-lg hover:text-white hover:bg-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Donate by Budget (USDT)
          </button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          {/* Quick claim / copy USDT */}
          <button
            id="nav-quick-claim-btn"
            onClick={handleQuickCopy}
            title="Claim & copy USDT wallet address"
            className="hidden lg:flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 hover:border-emerald-500/60 hover:bg-stone-850 transition-all cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>USDT ({walletSettings.network}):</span>
            <span className="text-emerald-400 font-bold">{truncatedAddress}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 animate-in fade-in" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-stone-400" />
            )}
          </button>

          {/* Main Donate Button */}
          <button
            id="nav-main-donate-cta"
            onClick={onScrollToDonation}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-950 transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Donate USDT</span>
          </button>

          {/* Admin Panel Button */}
          <button
            id="nav-admin-btn"
            onClick={onOpenSettings}
            title="Admin Management Panel (Password Protected)"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isAdminAuthenticated
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-white hover:border-stone-700 hover:bg-stone-800'
            }`}
          >
            {isAdminAuthenticated ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline font-mono">Admin: Active</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Admin Panel</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
