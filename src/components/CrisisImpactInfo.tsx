import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, Truck, Activity, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export const CrisisImpactInfo: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why is humanitarian assistance collected via Tether (USDT)?',
      a: 'Traditional international banking rails into the Gaza Strip are severely throttled, delayed, or subject to prohibitive transaction friction. Tether (USDT) operates globally 24/7 without regional banking blockades. On high-speed networks like Tron (TRC-20) or BNB Chain (BEP-20), transactions settle in seconds with minimal network fees, allowing relief coordinators to instantly convert funds into food, water shipments, and medical inventory on the ground.'
    },
    {
      q: 'How are the funds converted into direct aid for children?',
      a: 'USDT reserves are deployed directly through vetted local humanitarian ground teams in Gaza and bordering supply depots. Funds immediately purchase bulk food parcels, baby milk formula, sterile surgical burn dressings, and mobile drinking water deliveries dispatched straight to informal displacement camps in Khan Younis, Deir al-Balah, and Mawasi.'
    },
    {
      q: 'Does a small contribution (such as 5 or 15 USDT) really make a difference?',
      a: 'Yes, profoundly. In active displacement zones, 5 USDT purchases clean drinking water and a warm hot meal for an entire day. 15 USDT secures specialized fortified infant formula milk for a malnourished baby. Every single contribution translates into tangible, life-saving field relief.'
    },
    {
      q: 'How does the administrative control center protect receiving wallets?',
      a: 'The campaign features a secure, password-protected administrative portal. Only authorized campaign stewards can update the receiving USDT address, change network protocols (TRC20, ERC20, BEP20), audit submitted blockchain hashes (TXIDs), and publish official transparency reports.'
    }
  ];

  return (
    <section className="py-16 bg-stone-950 text-left border-b border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pillars of Relief */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-xl sm:text-3xl font-extrabold text-stone-100">
              Transforming Crypto Inflows into Life-Saving Field Relief
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm">
              Four fundamental humanitarian pillars safeguarding children stranded in the rubble
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-100">Emergency Trauma & Pediatric Care</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Dispatching sterile burn dressings, pediatric antibiotics, analgesics, and suture supplies to overwhelmed field triage units.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-100">Clean Water & Community Kitchens</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Operating high-capacity mobile water tankers and volunteer field pots cooking warm lentils and rice for displaced children daily.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-100">Infant Formula & Orphan Support</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Procuring certified baby formula, sterilized bottles, and baby wipes for unaccompanied infants who lost parents to the war.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-100">Winterized Tents & Insulation</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Supplying heavy rain tarpaulins, elevated thermal ground foam, and thick wool blankets to protect against acute hypothermia.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-base text-stone-100">
              Frequently Asked Questions: USDT Aid & Transparency
            </h4>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950/60"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-stone-200 hover:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${openFaq === idx ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-3.5 pt-0 text-xs text-stone-300 leading-relaxed border-t border-stone-850">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
