export type PhotoCategory = 'all' | 'rubble' | 'medical' | 'food_water' | 'shelter' | 'education';

export interface GazaPhoto {
  id: string;
  title: string;
  category: PhotoCategory;
  categoryLabel: string;
  imageUrl: string;
  location: string;
  date: string;
  description: string;
  urgentNeeds: string[];
  suggestedBudgetUSD: number;
}

export type CryptoNetwork = 'TRC20' | 'ERC20' | 'BEP20' | 'POLYGON' | 'TON';

export interface WalletSettings {
  usdtAddress: string;
  network: CryptoNetwork;
  recipientName: string;
  campaignTitle: string;
  customNote: string;
  targetGoalUSD: number;
  initialRaisedUSD: number;
  emergencyAlertActive: boolean;
  emergencyAlertText: string;
}

export interface AdminSecuritySettings {
  passwordHash: string; // Plain or hashed password for admin portal
  lastLogin?: string;
  sessionExpiryMinutes: number;
}

export interface DonationTier {
  id: string;
  amountUSD: number;
  title: string;
  description: string;
  impactIcon: string;
}

export type DonationStatus = 'verified' | 'pending' | 'flagged';

export interface DonationRecord {
  id: string;
  amountUSD: number;
  txHash?: string;
  donorName?: string;
  message?: string;
  timestamp: string;
  network: CryptoNetwork;
  status: DonationStatus;
  dateIso?: string;
}
