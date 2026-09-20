import { GazaPhoto, DonationTier, WalletSettings } from '../types';

export const GAZA_PHOTOS: GazaPhoto[] = [
  {
    id: 'photo-1',
    title: 'Child in the Rubble of Destroyed Home in Khan Younis',
    category: 'rubble',
    categoryLabel: 'Among the Rubble',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    location: 'Khan Younis, Southern Gaza Strip',
    date: '2024',
    description: 'A young child sitting amidst the shattered concrete slabs and twisted rebar of his destroyed family home. Over 80% of residential structures in this neighborhood have been reduced to dust, leaving children exposed to cold rain, debris dust, and psychological shock.',
    urgentNeeds: ['Weatherproof Emergency Tarps', 'Winter Blanket & Bedding', 'Children Thermal Clothing', 'Potable Clean Drinking Water'],
    suggestedBudgetUSD: 35
  },
  {
    id: 'photo-2',
    title: 'Waiting with Metal Pots in Line for Hot Soup',
    category: 'food_water',
    categoryLabel: 'Severe Food & Water Shortage',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    location: 'Deir al-Balah, Central Gaza',
    date: '2024',
    description: 'Children stand in winding queues for hours under harsh conditions holding small metal pots, hoping to receive warm lentil soup or rice from volunteer community kitchens to feed younger infant siblings.',
    urgentNeeds: ['Emergency Food Parcel', 'Infant Formula Milk', 'Therapeutic Nutrition Paste (RUTF)', 'High-Energy Biscuits'],
    suggestedBudgetUSD: 20
  },
  {
    id: 'photo-3',
    title: 'Emergency Medical Treatment on Overcrowded Hospital Floors',
    category: 'medical',
    categoryLabel: 'Urgent Medical & Trauma Care',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    location: 'Al-Aqsa Martyrs Hospital, Deir al-Balah',
    date: '2024',
    description: 'Surgeons and volunteer paramedics treating injured pediatric patients directly on blood-stained tiles due to zero available hospital beds and critical shortages of basic antiseptics, gauze, and pediatric analgesics.',
    urgentNeeds: ['Sterile Burn & Wound Dressings', 'Pediatric Antibiotics & Painkillers', 'Antiseptic Solutions', 'Emergency Trauma Kits'],
    suggestedBudgetUSD: 50
  },
  {
    id: 'photo-4',
    title: 'Displaced Families Sheltered in makeshift Fabric Tents',
    category: 'shelter',
    categoryLabel: 'Makeshift Tents & Displacement',
    imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    location: 'Informal Displacement Camp, Rafah Border',
    date: '2024',
    description: 'Over 1.2 million displaced civilians, more than half of whom are children, crowd fragile nylon tents lacking wooden flooring, sanitation facilities, and insulation against sub-zero night winds.',
    urgentNeeds: ['Reinforced Ground Insulation Mats', 'Heavy-Duty Rain Tarpaulins', 'Waterproof Kids Boots', 'Thermal Sleeping Bags'],
    suggestedBudgetUSD: 75
  },
  {
    id: 'photo-5',
    title: 'Outdoor Learning Under the Shadow of Shattered Concrete',
    category: 'education',
    categoryLabel: 'Education & Psycho-Social Hope',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    location: 'Jabalia Refugee Camp, Northern Gaza',
    date: '2024',
    description: 'Despite the collapse of over 85% of schools in the Gaza Strip, volunteer educators gather young boys and girls on pieces of rubble to conduct basic literacy and drawing sessions to foster psychological resilience.',
    urgentNeeds: ['Notebooks & Colored Pencils', 'Children Storybooks in Arabic', 'Trauma-Informed Art Therapy Kits', 'Portable Whiteboards'],
    suggestedBudgetUSD: 15
  },
  {
    id: 'photo-6',
    title: 'Carrying Heavy Water Jerricans Across Distant Dirt Tracks',
    category: 'food_water',
    categoryLabel: 'Severe Food & Water Shortage',
    imageUrl: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1200&q=80',
    location: 'Al-Amal District, Khan Younis',
    date: '2024',
    description: 'With urban desalination pipelines in ruins, children spend half their waking daylight trekking miles over sharp debris to haul heavy 10-liter water jugs back to their dehydrated families.',
    urgentNeeds: ['Water Purification Chlorine Tablets', 'Clean Mobile Water Truck Deliveries', 'Bottled Mineral Water Packs', 'Sanitary Jerrycans'],
    suggestedBudgetUSD: 25
  },
  {
    id: 'photo-7',
    title: 'Searching for a Cherished Toy in the House Ruins',
    category: 'rubble',
    categoryLabel: 'Among the Rubble',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    location: 'Beit Lahia, Northern Gaza',
    date: '2024',
    description: 'A young boy digging through gray pulverised cement to salvage a dusty sketchpad and a soft toy—his last tangible connection to his former peaceful childhood before the war.',
    urgentNeeds: ['Psychological First Aid Sessions', 'Child Creative Play Packages', 'Emergency Family Relocation Aid'],
    suggestedBudgetUSD: 30
  },
  {
    id: 'photo-8',
    title: 'Older Brother Protecting His Infant Sister in the Dust',
    category: 'shelter',
    categoryLabel: 'Makeshift Tents & Displacement',
    imageUrl: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1200&q=80',
    location: 'Al-Mawasi Humanitarian Zone, Western Rafah',
    date: '2024',
    description: 'An adolescent youth who lost both parents to airstrikes cradles his two-year-old sister wrapped in a dusty scarf, safeguarding her amid ongoing shelling and sand storms.',
    urgentNeeds: ['Comprehensive Orphan Care Sponsorship', 'Baby Diapers & Sensitive Wet Wipes', 'Pediatric Health Screening', 'Emergency Family Cash Grant'],
    suggestedBudgetUSD: 100
  }
];

export const DONATION_TIERS: DonationTier[] = [
  {
    id: 'tier-5',
    amountUSD: 5,
    title: 'Daily Clean Water & Hot Meal',
    description: 'Provides 10 liters of purified drinking water, water purification tabs, and a hot nourishing meal for one child.',
    impactIcon: 'Droplet'
  },
  {
    id: 'tier-15',
    amountUSD: 15,
    title: 'Infant Formula & Baby Care Kit',
    description: 'Supplies a fortified infant milk formula tin, sterilized bottle, and baby nutrition supplements against acute malnutrition.',
    impactIcon: 'Baby'
  },
  {
    id: 'tier-35',
    amountUSD: 35,
    title: 'Medical Dressing & First Aid Package',
    description: 'Delivers sterile gauze wraps, burn ointments, pediatric pain relievers, and antiseptic wash to field clinics.',
    impactIcon: 'HeartPulse'
  },
  {
    id: 'tier-70',
    amountUSD: 70,
    title: 'Warm Winter Clothes & Insulation',
    description: 'Includes a heavy thermal wool blanket, waterproof rain boots, a thick insulated jacket, and foam ground mat.',
    impactIcon: 'Shield'
  },
  {
    id: 'tier-150',
    amountUSD: 150,
    title: 'Emergency Family Tent Shelter Share',
    description: 'Funds heavy-duty waterproof tarpaulins, tent frame poles, and elevated storm flooring for a displaced family.',
    impactIcon: 'Home'
  },
  {
    id: 'tier-300',
    amountUSD: 300,
    title: 'Critical Pediatric Trauma Intervention',
    description: 'Supports minor pediatric surgical supplies, specialized burn dressings, and critical antibiotic courses for severe trauma.',
    impactIcon: 'Sparkles'
  }
];

export const DEFAULT_WALLET_SETTINGS: WalletSettings = {
  usdtAddress: 'TYDzsYUE28g1s7r328JcEFAhBf7w4FqKq8', // Tron TRC-20 standard recipient format
  network: 'TRC20',
  recipientName: 'Gaza Children Emergency Relief & Medical Fund',
  campaignTitle: 'Emergency Crypto Aid Campaign for Children in Gaza',
  customNote: 'Please transfer USDT using the specified network (TRC-20 is strongly recommended for ultra-low network fees and sub-minute settlement). All crypto donations directly purchase field supplies on the ground.',
  targetGoalUSD: 150000,
  initialRaisedUSD: 42850,
  emergencyAlertActive: true,
  emergencyAlertText: 'CRITICAL EMERGENCY: Over 17,000 unaccompanied or orphaned children in Gaza urgently require shelter, potable water, and pediatric trauma care.'
};

export const DEFAULT_ADMIN_PASSWORD = 'admin'; // Default password for instant access, configurable in Admin Settings
