import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  Heart, 
  Copy, 
  Wallet, 
  Sparkles, 
  CheckCircle2, 
  Droplet, 
  Baby, 
  HeartPulse, 
  Shield, 
  Home, 
  Send,
  Download,
  Lock,
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';
import { CryptoNetwork, DonationRecord, WalletSettings } from '../types';
import { DONATION_TIERS } from '../data/photos';

interface DonationSectionProps {
  walletSettings: WalletSettings;
  onOpenSettings: () => void;
  selectedBudget: number;
  onSelectBudget: (amount: number) => void;
  donationRecords: DonationRecord[];
  onAddDonationRecord: (record: DonationRecord) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  walletSettings,
  onOpenSettings,
  selectedBudget,
  onSelectBudget,
  donationRecords,
  onAddDonationRecord
}) => {
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [txHash, setTxHash] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [confirmedRecord, setConfirmedRecord] = useState<DonationRecord | null>(null);

  // Generate QR Code dynamically whenever the address or network changes
  useEffect(() => {
    if (!walletSettings.usdtAddress) return;
    
    // Construct URI based on network
    let uri = walletSettings.usdtAddress;
    if (walletSettings.network === 'TRC20') {
      uri = `tron:${walletSettings.usdtAddress}?token=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t&amount=${selectedBudget || 10}`;
    } else if (walletSettings.network === 'ERC20' || walletSettings.network === 'BEP20' || walletSettings.network === 'POLYGON') {
      uri = `ethereum:${walletSettings.usdtAddress}`;
    }

    QRCode.toDataURL(uri, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#1c1917',
        light: '#f5f5f4'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });
  }, [walletSettings.usdtAddress, walletSettings.network, selectedBudget]);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletSettings.usdtAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Calculate impact for custom budget
  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedBudget;

  const calculateImpact = (amount: number) => {
    if (amount <= 0) return 'Enter an amount to see projected real-world humanitarian impact.';
    const meals = Math.floor(amount / 5);
    const babyKits = Math.floor(amount / 15);
    const medicalPacks = Math.floor(amount / 35);
    const shelterShare = Math.floor((amount / 150) * 100);

    const parts: string[] = [];
    if (meals > 0) parts.push(`${meals} daily hot meals & clean drinking water portions`);
    if (babyKits > 0) parts.push(`or ${babyKits} fortified infant formula milk & baby packages`);
    if (medicalPacks > 0) parts.push(`or ${medicalPacks} sterile wound dressing & antibiotic kits`);
    if (shelterShare >= 20) parts.push(`plus funding ${Math.min(shelterShare, 100)}% of an insulated winter tent shelter`);

    return parts.length > 0 ? parts.join('; ') : 'Your contribution directly purchases urgent survival essentials on the ground.';
  };

  const handleSelectTier = (amount: number) => {
    onSelectBudget(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      onSelectBudget(num);
    }
  };

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = effectiveAmount > 0 ? effectiveAmount : 10;
    const newRecord: DonationRecord = {
      id: 'don-' + Date.now(),
      amountUSD: finalAmount,
      txHash: txHash.trim() || undefined,
      donorName: donorName.trim() || 'Anonymous Solidarity Donor',
      message: donorMessage.trim() || 'In solidarity with children of Gaza',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      network: walletSettings.network,
      status: 'verified',
      dateIso: new Date().toISOString()
    };

    onAddDonationRecord(newRecord);
    setConfirmedRecord(newRecord);
    setShowConfirmModal(false);
    setTxHash('');
    setDonorName('');
    setDonorMessage('');
  };

  const getTierIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-5 h-5 text-sky-400" />;
      case 'Baby': return <Baby className="w-5 h-5 text-amber-400" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-indigo-400" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="donation-section" className="py-16 bg-stone-900/60 border-t border-b border-stone-850 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold">
            <Heart className="w-4 h-4 fill-emerald-400" />
            <span>Transparent Tether (USDT) Humanitarian Aid</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-stone-100 tracking-tight">
            Direct Aid for Children in Gaza Based on Your Budget
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Claim and copy the official USDT wallet address below or scan the QR code with any Web3 wallet. Every single contribution, even 5 USDT, immediately delivers clean water or infant nutrition to children in the rubble.
          </p>
        </div>

        {/* Core Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Budget Selection & Custom Amount (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Budget Tiers */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-sm font-bold text-stone-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-mono">
                    1
                  </span>
                  Select Relief Package Matching Your Budget:
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  Denomination: Tether (USDT)
                </span>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DONATION_TIERS.map((tier) => {
                  const isSelected = selectedBudget === tier.amountUSD && !customAmount;
                  return (
                    <div
                      key={tier.id}
                      id={`tier-card-${tier.amountUSD}`}
                      onClick={() => handleSelectTier(tier.amountUSD)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 text-left ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                          : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-950'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 shrink-0 mt-0.5">
                        {getTierIcon(tier.impactIcon)}
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs sm:text-sm text-stone-100">
                            {tier.title}
                          </h4>
                          <span className="font-mono text-emerald-400 font-bold text-sm">
                            ${tier.amountUSD}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 leading-relaxed">
                          {tier.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Budget Input */}
              <div className="pt-3 border-t border-stone-800/80">
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Or enter any custom amount based on your financial capacity:
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      id="custom-budget-input"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      placeholder="e.g. 25, 100, or 500"
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-750 text-stone-100 font-mono text-base focus:outline-none focus:border-emerald-500 placeholder:text-stone-600"
                    />
                    <span className="absolute right-3 top-3.5 text-xs text-stone-400 font-mono font-bold">
                      USDT
                    </span>
                  </div>

                  {customAmount && (
                    <button
                      onClick={() => setCustomAmount('')}
                      className="px-3 py-3 rounded-xl bg-stone-800 text-stone-400 hover:text-white text-xs cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Live Impact Calculation */}
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">
                      Direct Field Impact for ${effectiveAmount} USDT:
                    </span>
                    <span className="text-stone-300 leading-relaxed">
                      {calculateImpact(effectiveAmount)}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Community Wall of Solidarity */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-stone-200 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Public Solidarity Ledger & Recent Contributor Inflows:</span>
                </h4>
                <span className="text-xs text-emerald-400 font-mono">
                  {donationRecords.length} Contributions
                </span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {donationRecords.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-stone-950 border border-stone-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-200">{item.donorName}</span>
                        <span className="text-[10px] text-stone-500 font-mono">({item.network})</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase font-mono font-bold">
                          {item.status}
                        </span>
                      </div>
                      {item.message && (
                        <p className="text-[11px] text-stone-400 italic">"{item.message}"</p>
                      )}
                    </div>

                    <div className="text-right font-mono shrink-0">
                      <span className="font-bold text-emerald-400 text-sm">+{item.amountUSD} USDT</span>
                      <span className="block text-[10px] text-stone-500">{item.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Claim Wallet & QR Code (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-emerald-500/50 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl shadow-emerald-950/30">
              
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-sm font-bold text-stone-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-mono">
                    2
                  </span>
                  Claim Address & Deposit USDT:
                </span>

                <button
                  id="donation-open-settings-btn"
                  onClick={onOpenSettings}
                  title="Configure receiving wallet address in Admin Panel"
                  className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Admin Settings</span>
                </button>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center p-4 bg-stone-950 rounded-xl border border-stone-800">
                {qrDataUrl ? (
                  <div className="p-2 bg-white rounded-xl shadow-md">
                    <img 
                      src={qrDataUrl} 
                      alt="Tether USDT QR Code" 
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-stone-900 rounded-xl flex items-center justify-center text-stone-500 text-xs">
                    Generating dynamic QR code...
                  </div>
                )}

                <div className="mt-3 text-center space-y-1">
                  <span className="text-xs text-stone-300 font-semibold block">
                    Scan with Trust Wallet, Binance, Tonkeeper, TronLink, or Metamask
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono block">
                    Designated Network: {walletSettings.network} (Tether USD)
                  </span>
                </div>
              </div>

              {/* Address Claim & Copy Block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-300 font-semibold">
                    USDT Wallet Deposit Address:
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">
                    {walletSettings.recipientName}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-2 text-xs font-mono break-all text-stone-200 select-all">
                  <span className="flex-1 text-emerald-300 text-left">
                    {walletSettings.usdtAddress}
                  </span>
                </div>

                {/* Big Claim / Copy Button */}
                <button
                  id="donation-claim-address-btn"
                  onClick={handleCopy}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                      <span>Wallet Address Claimed & Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Claim & Copy USDT Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Transaction Registration / Solidarity Receipt Button */}
              <div className="pt-2 border-t border-stone-800/80">
                <button
                  id="donation-register-intent-btn"
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full py-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-200 border border-stone-700/80 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Record Transaction (TXID) & Claim Solidarity Certificate</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Modal for Recording / Registering Donation Receipt */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div 
            className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 text-left space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-bold text-stone-100 text-base flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                Register Contribution & Solidarity Certificate
              </h3>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              If you have sent USDT to the verified address, record your transaction hash (TXID) below. This immediately publishes your contribution to the public solidarity ledger and generates your humanitarian certificate.
            </p>

            <form onSubmit={handleRecordSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Transferred Amount (USDT):
                </label>
                <input
                  type="number"
                  value={effectiveAmount}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-emerald-400 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Donor Name / Alias (Optional):
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins or Anonymous Supporter"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Blockchain Transaction Hash / TXID (Optional):
                </label>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="Paste transaction hash from wallet..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Message of Hope / Solidarity for Gaza:
                </label>
                <input
                  type="text"
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder="e.g. Holding the children of Gaza in our hearts..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow cursor-pointer"
                >
                  Publish to Solidarity Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate of Solidarity View */}
      {confirmedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div 
            className="w-full max-w-md bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-emerald-500/80 rounded-2xl p-6 text-center space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="font-extrabold text-xl text-stone-100">
              Certificate of Humanitarian Solidarity
            </h3>

            <p className="text-xs text-stone-300 leading-relaxed">
              Thank you for standing in unwavering support with the children of Gaza. Your USDT humanitarian contribution directly funds urgent potable water, trauma care, and warm nourishment.
            </p>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-300 space-y-1.5 text-left">
              <div>Donor: <span className="text-white font-bold">{confirmedRecord.donorName}</span></div>
              <div>Aid Volume: <span className="text-emerald-400 font-bold">{confirmedRecord.amountUSD} USDT</span></div>
              <div>Routing Network: <span className="text-stone-300">{confirmedRecord.network}</span></div>
              <div>Verification Status: <span className="text-emerald-400 font-bold uppercase">{confirmedRecord.status}</span></div>
              {confirmedRecord.txHash && (
                <div className="truncate">TXID: <span className="text-stone-400">{confirmedRecord.txHash}</span></div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirmedRecord(null)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow cursor-pointer"
              >
                Close & Return to Campaign
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
