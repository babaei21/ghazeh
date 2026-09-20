import React, { useState } from 'react';
import { Heart, Wallet, Copy, Check, ShieldCheck, Lock } from 'lucide-react';
import { WalletSettings } from '../types';

interface FooterProps {
  walletSettings: WalletSettings;
  onOpenSettings: () => void;
  onScrollToDonation: () => void;
  onScrollToGallery: () => void;
  isAdminAuthenticated: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  walletSettings,
  onOpenSettings,
  onScrollToDonation,
  onScrollToGallery,
  isAdminAuthenticated
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletSettings.usdtAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-stone-950 text-stone-400 text-left border-t border-stone-850 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand & Purpose (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-emerald-500" />
              </div>
              <span className="font-extrabold text-stone-100 text-base sm:text-lg">
                Gaza Children Relief & Humanitarian Aid
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-lg">
              An independent, transparent humanitarian initiative dedicated to documenting the survival of children amidst the rubble in the Gaza Strip and providing direct life-saving support through decentralized Tether (USDT) contributions worldwide.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% of crypto donations are routed directly to the designated relief wallet for emergency field procurement.</span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-stone-200">
              Quick Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onScrollToGallery}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Children in the Rubble Archive
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToDonation}
                  className="hover:text-stone-200 transition-colors cursor-pointer"
                >
                  Donate Tether (USDT) by Budget
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSettings}
                  className="hover:text-emerald-400 text-stone-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Admin Control Center ({isAdminAuthenticated ? 'Logged In' : 'Protected'})</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Active Tether Wallet (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-stone-200">
              Active USDT Wallet
            </h5>
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-stone-400 font-mono">Network: {walletSettings.network}</span>
                <button
                  onClick={onOpenSettings}
                  className="text-emerald-400 hover:underline cursor-pointer"
                >
                  Manage
                </button>
              </div>

              <div className="font-mono text-[11px] text-emerald-300 break-all select-all">
                {walletSettings.usdtAddress}
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy USDT Address'}</span>
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Gaza Children Relief & Humanitarian Aid Campaign • Standing with the innocent.</p>
          <p className="flex items-center gap-1">
            <span>Built with humanitarian care & solidarity</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
