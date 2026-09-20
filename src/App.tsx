/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PhotoGallery } from './components/PhotoGallery';
import { DonationSection } from './components/DonationSection';
import { CrisisImpactInfo } from './components/CrisisImpactInfo';
import { Footer } from './components/Footer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { GazaPhoto, WalletSettings, DonationRecord, DonationStatus } from './types';
import { DEFAULT_WALLET_SETTINGS, DEFAULT_ADMIN_PASSWORD } from './data/photos';

const INITIAL_DONATION_RECORDS: DonationRecord[] = [
  {
    id: 'don-1',
    amountUSD: 150,
    donorName: 'Dr. Marcus Vance (Nordic Aid)',
    message: 'For emergency pediatric burn dressings and pediatric antibiotics.',
    timestamp: '12 mins ago',
    network: 'TRC20',
    status: 'verified',
    dateIso: new Date(Date.now() - 12 * 60 * 1000).toISOString()
  },
  {
    id: 'don-2',
    amountUSD: 50,
    donorName: 'Elena Rostova',
    message: 'To buy infant milk formula and warm blankets for orphaned infants.',
    timestamp: '28 mins ago',
    network: 'TRC20',
    status: 'verified',
    dateIso: new Date(Date.now() - 28 * 60 * 1000).toISOString()
  },
  {
    id: 'don-3',
    amountUSD: 300,
    donorName: 'Global Peace Volunteer Circle',
    message: 'Direct allocation for clean drinking water tankers in Khan Younis.',
    timestamp: '45 mins ago',
    network: 'BEP20',
    status: 'verified',
    dateIso: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  },
  {
    id: 'don-4',
    amountUSD: 35,
    donorName: 'Amira & Tariq K.',
    message: 'Holding every child in the rubble close to our hearts. Stay strong.',
    timestamp: '1 hour ago',
    network: 'TRC20',
    status: 'verified',
    dateIso: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    id: 'don-5',
    amountUSD: 70,
    donorName: 'Anonymous Donor',
    message: 'For winter clothes and rain shelter tarp.',
    timestamp: '2 hours ago',
    network: 'POLYGON',
    status: 'verified',
    dateIso: new Date(Date.now() - 120 * 60 * 1000).toISOString()
  }
];

export default function App() {
  // Load wallet settings from localStorage or fallback
  const [walletSettings, setWalletSettings] = useState<WalletSettings>(() => {
    try {
      const saved = localStorage.getItem('gaza_relief_wallet_settings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load wallet settings from localStorage', e);
    }
    return DEFAULT_WALLET_SETTINGS;
  });

  // Load donation records from localStorage
  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('gaza_relief_donations');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load donation records', e);
    }
    return INITIAL_DONATION_RECORDS;
  });

  // Admin Security Password
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('gaza_admin_password');
      if (saved) return saved;
    } catch (e) {
      console.error('Failed to load admin password', e);
    }
    return DEFAULT_ADMIN_PASSWORD;
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gaza_admin_auth') === 'true';
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<number>(35);

  // Sync auth state to session storage
  const handleSetAdminAuth = (auth: boolean) => {
    setIsAdminAuthenticated(auth);
    if (auth) {
      sessionStorage.setItem('gaza_admin_auth', 'true');
    } else {
      sessionStorage.removeItem('gaza_admin_auth');
    }
  };

  // Save settings when modified
  const handleSaveSettings = (newSettings: WalletSettings) => {
    setWalletSettings(newSettings);
    try {
      localStorage.setItem('gaza_relief_wallet_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save wallet settings', e);
    }
  };

  // Save new password
  const handleUpdateAdminPassword = (newPass: string) => {
    setAdminPassword(newPass);
    try {
      localStorage.setItem('gaza_admin_password', newPass);
    } catch (e) {
      console.error('Failed to save admin password', e);
    }
  };

  // Add new donation record
  const handleAddDonationRecord = (newRecord: DonationRecord) => {
    const updated = [newRecord, ...donationRecords];
    setDonationRecords(updated);
    try {
      localStorage.setItem('gaza_relief_donations', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save donation record', e);
    }
  };

  // Update status of donation record
  const handleUpdateDonationRecordStatus = (id: string, newStatus: DonationStatus) => {
    const updated = donationRecords.map((rec) => 
      rec.id === id ? { ...rec, status: newStatus } : rec
    );
    setDonationRecords(updated);
    try {
      localStorage.setItem('gaza_relief_donations', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update donation status', e);
    }
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gaza-photo-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDonation = () => {
    const el = document.getElementById('donation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDonateForPhoto = (photo: GazaPhoto) => {
    setSelectedBudget(photo.suggestedBudgetUSD);
    scrollToDonation();
  };

  // Calculate total raised funds
  const totalVerifiedLive = donationRecords
    .filter((r) => r.status === 'verified')
    .reduce((acc, curr) => acc + curr.amountUSD, 0);

  const totalRaisedOverall = (walletSettings.initialRaisedUSD || 42850) + totalVerifiedLive;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white antialiased">
      {/* Navigation Bar */}
      <Navbar
        walletSettings={walletSettings}
        onOpenSettings={() => setIsAdminOpen(true)}
        onScrollToDonation={scrollToDonation}
        onScrollToGallery={scrollToGallery}
        onScrollToHero={scrollToHero}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Support Banner with Live Target and Claim Action */}
        <HeroBanner
          walletSettings={walletSettings}
          onOpenSettings={() => setIsAdminOpen(true)}
          onScrollToDonation={scrollToDonation}
          onScrollToGallery={scrollToGallery}
          totalRaised={totalRaisedOverall}
        />

        {/* Photo Gallery: Documenting Children in the Rubble */}
        <PhotoGallery onDonateForPhoto={handleDonateForPhoto} />

        {/* Interactive USDT Donation & Budget Allocation Section */}
        <DonationSection
          walletSettings={walletSettings}
          onOpenSettings={() => setIsAdminOpen(true)}
          selectedBudget={selectedBudget}
          onSelectBudget={setSelectedBudget}
          donationRecords={donationRecords}
          onAddDonationRecord={handleAddDonationRecord}
        />

        {/* Relief Impact & Transparency Operational Pillars */}
        <CrisisImpactInfo />
      </main>

      {/* Footer */}
      <Footer
        walletSettings={walletSettings}
        onOpenSettings={() => setIsAdminOpen(true)}
        onScrollToDonation={scrollToDonation}
        onScrollToGallery={scrollToGallery}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Protected Admin Control Center */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        walletSettings={walletSettings}
        onSaveWalletSettings={handleSaveSettings}
        donationRecords={donationRecords}
        onUpdateDonationRecordStatus={handleUpdateDonationRecordStatus}
        onAddManualDonation={handleAddDonationRecord}
        adminPassword={adminPassword}
        onUpdateAdminPassword={handleUpdateAdminPassword}
        isAdminAuthenticated={isAdminAuthenticated}
        setIsAdminAuthenticated={handleSetAdminAuth}
      />
    </div>
  );
}
