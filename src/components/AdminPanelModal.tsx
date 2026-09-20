import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  KeyRound, 
  ShieldCheck, 
  AlertTriangle, 
  Save, 
  RotateCcw, 
  LogOut, 
  CheckCircle2, 
  Wallet, 
  DollarSign, 
  Download, 
  Plus, 
  ExternalLink, 
  Radio, 
  Eye, 
  EyeOff, 
  Layers, 
  FileSpreadsheet,
  BadgeAlert,
  TrendingUp,
  Search
} from 'lucide-react';
import { CryptoNetwork, DonationRecord, WalletSettings, DonationStatus } from '../types';
import { DEFAULT_WALLET_SETTINGS, DEFAULT_ADMIN_PASSWORD } from '../data/photos';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletSettings: WalletSettings;
  onSaveWalletSettings: (settings: WalletSettings) => void;
  donationRecords: DonationRecord[];
  onUpdateDonationRecordStatus: (id: string, newStatus: DonationStatus) => void;
  onAddManualDonation: (record: DonationRecord) => void;
  adminPassword: string;
  onUpdateAdminPassword: (newPass: string) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
}

const NETWORKS: { id: CryptoNetwork; name: string; standard: string; desc: string; explorer: string }[] = [
  { id: 'TRC20', name: 'Tron', standard: 'TRC-20', desc: 'Recommended: ~$1 transfer fee, instant confirmation', explorer: 'https://tronscan.org/#/address/' },
  { id: 'ERC20', name: 'Ethereum', standard: 'ERC-20', desc: 'Mainnet Ethereum USDT contract (higher gas fees)', explorer: 'https://etherscan.io/address/' },
  { id: 'BEP20', name: 'BNB Chain', standard: 'BEP-20', desc: 'Binance Smart Chain USDT token (~$0.20 fees)', explorer: 'https://bscscan.com/address/' },
  { id: 'POLYGON', name: 'Polygon', standard: 'Polygon POS', desc: 'Ultra-low fees (~$0.02) Layer-2 scaling network', explorer: 'https://polygonscan.com/address/' },
  { id: 'TON', name: 'TON', standard: 'The Open Network', desc: 'Native Telegram & Tonkeeper ecosystem integration', explorer: 'https://tonscan.org/address/' },
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  walletSettings,
  onSaveWalletSettings,
  donationRecords,
  onUpdateDonationRecordStatus,
  onAddManualDonation,
  adminPassword,
  onUpdateAdminPassword,
  isAdminAuthenticated,
  setIsAdminAuthenticated
}) => {
  // Login State
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'wallet' | 'ledger' | 'security' | 'campaign'>('wallet');

  // Form states for Wallet Settings
  const [usdtAddress, setUsdtAddress] = useState(walletSettings.usdtAddress);
  const [network, setNetwork] = useState<CryptoNetwork>(walletSettings.network);
  const [recipientName, setRecipientName] = useState(walletSettings.recipientName);
  const [campaignTitle, setCampaignTitle] = useState(walletSettings.campaignTitle);
  const [customNote, setCustomNote] = useState(walletSettings.customNote);
  const [targetGoalUSD, setTargetGoalUSD] = useState<number>(walletSettings.targetGoalUSD || 150000);
  const [emergencyAlertActive, setEmergencyAlertActive] = useState(walletSettings.emergencyAlertActive);
  const [emergencyAlertText, setEmergencyAlertText] = useState(walletSettings.emergencyAlertText);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Security Form
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passwordChangeNotice, setPasswordChangeNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Manual donation addition
  const [showAddDonationModal, setShowAddDonationModal] = useState(false);
  const [manualAmount, setManualAmount] = useState<number>(50);
  const [manualDonor, setManualDonor] = useState('');
  const [manualTx, setManualTx] = useState('');
  const [manualMsg, setManualMsg] = useState('');
  const [manualNetwork, setManualNetwork] = useState<CryptoNetwork>(walletSettings.network);

  // Filter for ledger
  const [ledgerSearch, setLedgerSearch] = useState('');

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword.trim() === adminPassword.trim()) {
      setIsAdminAuthenticated(true);
      setLoginError('');
      setEnteredPassword('');
    } else {
      setLoginError('Incorrect administrative password. Please try again.');
    }
  };

  // Handle Save Wallet Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWalletSettings({
      ...walletSettings,
      usdtAddress: usdtAddress.trim(),
      network,
      recipientName: recipientName.trim(),
      campaignTitle: campaignTitle.trim(),
      customNote: customNote.trim(),
      targetGoalUSD: Number(targetGoalUSD) || 150000,
      emergencyAlertActive,
      emergencyAlertText: emergencyAlertText.trim()
    });

    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2800);
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (window.confirm('Reset all wallet configurations to system defaults?')) {
      setUsdtAddress(DEFAULT_WALLET_SETTINGS.usdtAddress);
      setNetwork(DEFAULT_WALLET_SETTINGS.network);
      setRecipientName(DEFAULT_WALLET_SETTINGS.recipientName);
      setCampaignTitle(DEFAULT_WALLET_SETTINGS.campaignTitle);
      setCustomNote(DEFAULT_WALLET_SETTINGS.customNote);
      setTargetGoalUSD(DEFAULT_WALLET_SETTINGS.targetGoalUSD);
      setEmergencyAlertActive(DEFAULT_WALLET_SETTINGS.emergencyAlertActive);
      setEmergencyAlertText(DEFAULT_WALLET_SETTINGS.emergencyAlertText);
    }
  };

  // Change Admin Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassInput !== adminPassword) {
      setPasswordChangeNotice({ type: 'error', text: 'Current password does not match.' });
      return;
    }
    if (newPassInput.length < 4) {
      setPasswordChangeNotice({ type: 'error', text: 'New password must be at least 4 characters long.' });
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setPasswordChangeNotice({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    onUpdateAdminPassword(newPassInput);
    setPasswordChangeNotice({ type: 'success', text: 'Administrative password updated successfully!' });
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
  };

  // Handle Manual Donation
  const handleCreateManualDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: DonationRecord = {
      id: 'don-man-' + Date.now(),
      amountUSD: Number(manualAmount) || 10,
      donorName: manualDonor.trim() || 'Verified Donor',
      txHash: manualTx.trim() || undefined,
      message: manualMsg.trim() || 'Direct humanitarian relief donation',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      network: manualNetwork,
      status: 'verified',
      dateIso: new Date().toISOString()
    };

    onAddManualDonation(newRecord);
    setShowAddDonationModal(false);
    setManualAmount(50);
    setManualDonor('');
    setManualTx('');
    setManualMsg('');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Amount_USDT', 'Network', 'Status', 'Donor_Name', 'TX_Hash', 'Message', 'Timestamp'];
    const rows = donationRecords.map((r) => [
      r.id,
      r.amountUSD,
      r.network,
      r.status,
      `"${(r.donorName || '').replace(/"/g, '""')}"`,
      `"${(r.txHash || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      r.timestamp
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gaza_children_usdt_ledger_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate totals
  const totalVerifiedDonations = donationRecords
    .filter(r => r.status === 'verified')
    .reduce((acc, curr) => acc + curr.amountUSD, 0);

  const totalOverallRaised = (walletSettings.initialRaisedUSD || 0) + totalVerifiedDonations;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${isAdminAuthenticated ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
              {isAdminAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-stone-100">
                  Gaza Children Relief • Admin Control Center
                </h2>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-semibold border ${
                  isAdminAuthenticated 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {isAdminAuthenticated ? 'AUTHENTICATED' : 'ACCESS RESTRICTED'}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Protected configuration portal for USDT recipient addresses, network routing, and donation verification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                id="admin-logout-btn"
                onClick={() => setIsAdminAuthenticated(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white text-xs border border-stone-700 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Log Out</span>
              </button>
            )}

            <button
              id="admin-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAdminAuthenticated ? (
          /* Password Authentication Gate */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center justify-center text-stone-200 shadow-inner">
              <KeyRound className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-100">
                Administrator Authentication
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Enter your administrative security password to manage receiving wallet addresses, edit campaign metadata, and audit donor records.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Security Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="admin-password-input"
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    placeholder="Enter admin password..."
                    autoFocus
                    required
                    className="w-full pl-4 pr-11 py-3 rounded-xl bg-stone-950 border border-stone-750 text-stone-100 font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                <span>Default setup password:</span>
                <span className="font-mono text-emerald-400 font-bold bg-stone-900 px-2 py-0.5 rounded border border-stone-750">
                  {adminPassword === DEFAULT_ADMIN_PASSWORD ? 'admin' : 'Custom Configured'}
                </span>
              </div>

              <button
                type="submit"
                id="admin-login-submit-btn"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Authorize & Enter Admin Portal</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Tabs Header */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-800 bg-stone-950/30 overflow-x-auto">
              <button
                id="tab-wallet-settings"
                onClick={() => setActiveTab('wallet')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'wallet'
                    ? 'border-emerald-500 text-emerald-400 bg-stone-900/50 rounded-t-lg'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>USDT Wallet & Networks</span>
              </button>

              <button
                id="tab-ledger-records"
                onClick={() => setActiveTab('ledger')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'ledger'
                    ? 'border-emerald-500 text-emerald-400 bg-stone-900/50 rounded-t-lg'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Donation Ledger ({donationRecords.length})</span>
              </button>

              <button
                id="tab-campaign-goals"
                onClick={() => setActiveTab('campaign')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'campaign'
                    ? 'border-emerald-500 text-emerald-400 bg-stone-900/50 rounded-t-lg'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Target Goals & Alerts</span>
              </button>

              <button
                id="tab-security-access"
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'security'
                    ? 'border-emerald-500 text-emerald-400 bg-stone-900/50 rounded-t-lg'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Security & Password</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: WALLET & PAYMENT GATEWAY */}
              {activeTab === 'wallet' && (
                <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
                  
                  {/* Status Banner */}
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-stone-100">
                        Live Tether (USDT) Receiving Address Configuration
                      </h4>
                      <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                        Changes made here take effect immediately on the public site, updating the hero banner, one-click claim buttons, and auto-generated QR codes for all international donors.
                      </p>
                    </div>
                  </div>

                  {/* Primary USDT Address */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                        Primary USDT Deposit Address *
                      </label>
                      <span className="text-[11px] text-stone-400 font-mono">
                        Active Network: {network}
                      </span>
                    </div>

                    <input
                      type="text"
                      id="admin-usdt-address-input"
                      value={usdtAddress}
                      onChange={(e) => setUsdtAddress(e.target.value)}
                      placeholder="e.g. TYDzsYUE28g1s7r328JcEFAhBf7w4FqKq8 (TRC20) or 0x... (ERC20)"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-emerald-300 font-mono text-sm focus:outline-none focus:border-emerald-500 select-all"
                    />
                    <p className="text-[11px] text-stone-400">
                      Double-check the wallet address format to avoid loss of funds. For Tron (TRC-20), addresses typically start with "T". For EVM (Ethereum / BSC / Polygon), addresses start with "0x".
                    </p>
                  </div>

                  {/* Network Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                      Select Primary Blockchain Network
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {NETWORKS.map((net) => (
                        <div
                          key={net.id}
                          onClick={() => setNetwork(net.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            network === net.id
                              ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                              : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full border ${network === net.id ? 'bg-emerald-500 border-emerald-400' : 'bg-transparent border-stone-600'}`} />
                              <span className="font-bold text-xs sm:text-sm text-stone-100">
                                {net.name}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                              {net.standard}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 mt-1">
                            {net.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Campaign Title & Beneficiary Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                        Public Campaign Title
                      </label>
                      <input
                        type="text"
                        value={campaignTitle}
                        onChange={(e) => setCampaignTitle(e.target.value)}
                        placeholder="e.g. Emergency Crypto Aid Campaign for Children in Gaza"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                        Organization / Beneficiary Fund Name
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="e.g. Gaza Children Emergency Relief & Medical Fund"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Donor Instructions Note */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                      Donor Advice & Transparency Disclaimer
                    </label>
                    <textarea
                      rows={3}
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="Guidance displayed to donors below the wallet address..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  {/* Submit Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                    <button
                      type="button"
                      onClick={handleResetDefaults}
                      className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Default Address</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {saveSuccessNotice && (
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 animate-in fade-in">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Settings successfully published!</span>
                        </span>
                      )}

                      <button
                        type="submit"
                        id="admin-save-wallet-btn"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-950 transition-all cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save & Publish Live</span>
                      </button>
                    </div>
                  </div>

                </form>
              )}

              {/* TAB 2: DONATION LEDGER & VERIFICATION */}
              {activeTab === 'ledger' && (
                <div className="space-y-6">
                  {/* Top stats bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                      <span className="text-xs text-stone-400">Total Verified Donor Inflows</span>
                      <div className="text-xl font-mono font-black text-emerald-400">
                        ${totalOverallRaised.toLocaleString()} USDT
                      </div>
                      <span className="text-[10px] text-stone-500">Including seed matching & live transactions</span>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                      <span className="text-xs text-stone-400">Submitted Transactions</span>
                      <div className="text-xl font-mono font-black text-stone-200">
                        {donationRecords.length} Records
                      </div>
                      <span className="text-[10px] text-stone-500">Across TRC20, ERC20 & BEP20</span>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
                      <span className="text-xs text-stone-400">Ledger Actions</span>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setShowAddDonationModal(true)}
                          className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Manual</span>
                        </button>
                        <button
                          onClick={handleExportCSV}
                          className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1 border border-stone-700 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export CSV</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Search / Filter */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={ledgerSearch}
                        onChange={(e) => setLedgerSearch(e.target.value)}
                        placeholder="Search by donor name, TXID, or amount..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <span className="text-xs text-stone-400">
                      Showing {donationRecords.filter(r => 
                        !ledgerSearch || 
                        (r.donorName || '').toLowerCase().includes(ledgerSearch.toLowerCase()) || 
                        (r.txHash || '').toLowerCase().includes(ledgerSearch.toLowerCase()) ||
                        r.amountUSD.toString().includes(ledgerSearch)
                      ).length} of {donationRecords.length} records
                    </span>
                  </div>

                  {/* Transactions Table */}
                  <div className="rounded-xl border border-stone-800 overflow-hidden bg-stone-950">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-stone-300">
                        <thead className="bg-stone-900 border-b border-stone-800 text-stone-400 uppercase font-mono text-[10px]">
                          <tr>
                            <th className="p-3">Status</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Donor Name</th>
                            <th className="p-3">Network</th>
                            <th className="p-3">Transaction Hash (TXID)</th>
                            <th className="p-3">Message / Note</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-850">
                          {donationRecords
                            .filter(r => 
                              !ledgerSearch || 
                              (r.donorName || '').toLowerCase().includes(ledgerSearch.toLowerCase()) || 
                              (r.txHash || '').toLowerCase().includes(ledgerSearch.toLowerCase()) ||
                              r.amountUSD.toString().includes(ledgerSearch)
                            )
                            .map((record) => (
                              <tr key={record.id} className="hover:bg-stone-900/40">
                                <td className="p-3 whitespace-nowrap">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                                    record.status === 'verified'
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                      : record.status === 'pending'
                                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                  }`}>
                                    {record.status}
                                  </span>
                                </td>
                                <td className="p-3 font-mono font-bold text-emerald-400 whitespace-nowrap">
                                  +{record.amountUSD} USDT
                                </td>
                                <td className="p-3 font-medium text-stone-100 whitespace-nowrap">
                                  {record.donorName || 'Anonymous Donor'}
                                </td>
                                <td className="p-3 font-mono text-stone-400 whitespace-nowrap">
                                  {record.network}
                                </td>
                                <td className="p-3 font-mono text-[11px] text-stone-400 max-w-[180px] truncate">
                                  {record.txHash ? (
                                    <span className="hover:text-emerald-400 select-all" title={record.txHash}>
                                      {record.txHash}
                                    </span>
                                  ) : (
                                    <span className="text-stone-600 italic">No Hash Provided</span>
                                  )}
                                </td>
                                <td className="p-3 text-stone-400 max-w-[220px] truncate">
                                  {record.message || '—'}
                                </td>
                                <td className="p-3 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {record.status !== 'verified' && (
                                      <button
                                        onClick={() => onUpdateDonationRecordStatus(record.id, 'verified')}
                                        className="px-2 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[10px] font-semibold transition-colors"
                                      >
                                        Verify
                                      </button>
                                    )}
                                    {record.status !== 'flagged' && (
                                      <button
                                        onClick={() => onUpdateDonationRecordStatus(record.id, 'flagged')}
                                        className="px-2 py-1 rounded bg-stone-800 hover:bg-rose-900/60 text-stone-400 hover:text-rose-300 text-[10px] transition-colors"
                                      >
                                        Flag
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: CAMPAIGN TARGET GOALS & ALERTS */}
              {activeTab === 'campaign' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
                    <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      Target Funding Goal & Progress Settings
                    </h4>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Campaign Target Goal (USDT)
                      </label>
                      <input
                        type="number"
                        value={targetGoalUSD}
                        onChange={(e) => setTargetGoalUSD(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 font-mono text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-stone-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-stone-300">
                          Emergency Crisis Alert Banner
                        </label>
                        <input
                          type="checkbox"
                          checked={emergencyAlertActive}
                          onChange={(e) => setEmergencyAlertActive(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={emergencyAlertText}
                        onChange={(e) => setEmergencyAlertText(e.target.value)}
                        placeholder="Critical alert banner text..."
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                    >
                      Update Campaign Progress & Alert
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: SECURITY & PASSWORD MANAGEMENT */}
              {activeTab === 'security' && (
                <form onSubmit={handleChangePassword} className="space-y-6 max-w-lg">
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                    <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-emerald-400" />
                      Administrative Password Management
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Update the master password used to access this Admin Portal. Ensure you store this securely in your password manager.
                    </p>
                  </div>

                  {passwordChangeNotice && (
                    <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      passwordChangeNotice.type === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}>
                      {passwordChangeNotice.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                      )}
                      <span>{passwordChangeNotice.text}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Current Admin Password
                      </label>
                      <input
                        type="password"
                        id="admin-current-pass-input"
                        value={currentPassInput}
                        onChange={(e) => setCurrentPassInput(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-750 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        New Admin Password (min. 4 characters)
                      </label>
                      <input
                        type="password"
                        id="admin-new-pass-input"
                        value={newPassInput}
                        onChange={(e) => setNewPassInput(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-750 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Confirm New Admin Password
                      </label>
                      <input
                        type="password"
                        id="admin-confirm-pass-input"
                        value={confirmPassInput}
                        onChange={(e) => setConfirmPassInput(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-750 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="admin-change-pass-btn"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                  >
                    Update Admin Password
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Manual Donation Addition Modal */}
      {showAddDonationModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                Add Verified Offline / Wire Donation
              </h3>
              <button 
                onClick={() => setShowAddDonationModal(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualDonation} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Amount (USDT)</label>
                <input
                  type="number"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(Number(e.target.value))}
                  required
                  min="1"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-emerald-400 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Donor Name / Organization</label>
                <input
                  type="text"
                  value={manualDonor}
                  onChange={(e) => setManualDonor(e.target.value)}
                  placeholder="e.g. Humanitarian Doctor Association"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Network</label>
                <select
                  value={manualNetwork}
                  onChange={(e) => setManualNetwork(e.target.value as CryptoNetwork)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100"
                >
                  <option value="TRC20">Tron TRC-20</option>
                  <option value="ERC20">Ethereum ERC-20</option>
                  <option value="BEP20">BNB Chain BEP-20</option>
                  <option value="POLYGON">Polygon</option>
                  <option value="TON">TON</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Transaction TXID / Reference</label>
                <input
                  type="text"
                  value={manualTx}
                  onChange={(e) => setManualTx(e.target.value)}
                  placeholder="Blockchain transaction hash"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Impact Purpose / Note</label>
                <input
                  type="text"
                  value={manualMsg}
                  onChange={(e) => setManualMsg(e.target.value)}
                  placeholder="e.g. For pediatric burns treatment"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddDonationModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Record to Public Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
