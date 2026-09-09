'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Flame, UtensilsCrossed } from 'lucide-react';

const DEFAULT_PRICES = { kecil: 6000, besar: 12000, special: 17000 };

export default function Menu({ onSelectPackage }) {
  const [prices, setPrices] = useState(DEFAULT_PRICES);

  useEffect(() => {
    const syncPrices = () => {
      try {
        const saved = localStorage.getItem('siboy_prices');
        if (saved) {
          const parsed = JSON.parse(saved);
          setPrices({
            kecil: parsed.kecil || DEFAULT_PRICES.kecil,
            besar: parsed.besar || DEFAULT_PRICES.besar,
            special: parsed.special || DEFAULT_PRICES.special
          });
        }
      } catch (e) {}
    };

    syncPrices();
    window.addEventListener('storage', syncPrices);
    return () => window.removeEventListener('storage', syncPrices);
  }, []);

  const menuList = [
    {
      id: 'kecil',
      name: 'PORSI KECIL',
      pcs: '5 PCS',
      price: `Rp ${prices.kecil.toLocaleString('id-ID')}`,
      numericPrice: prices.kecil,
      image: '/produk.jpg',
      badge: null,
    },
    {
      id: 'besar',
      name: 'PORSI BESAR',
      pcs: '10 PCS',
      price: `Rp ${prices.besar.toLocaleString('id-ID')}`,
      numericPrice: prices.besar,
      image: '/produk.jpg',
      badge: 'PALING LARIS',
    },
    {
      id: 'special',
      name: 'PORSI SPECIAL',
      pcs: '15 PCS',
      price: `Rp ${prices.special.toLocaleString('id-ID')}`,
      numericPrice: prices.special,
      image: '/produk.jpg',
      badge: null,
    },
  ];

  return (
    <section id="menu" className="w-full pt-32 pb-24 sm:pt-36 sm:pb-28 relative overflow-hidden scroll-mt-16 bg-[#dc2626]">
      
      {/* ================= 1. SUNBURST JEPANG BACKGROUND ================= */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'repeating-conic-gradient(from 0deg, transparent 0deg 12deg, rgba(0, 0, 0, 0.18) 12deg 24deg)'
        }}
      />

      {/* ================= 2. WATERMARK KANJI BESAR ================= */}
      <div className="absolute left-[-2%] top-1/4 text-[12rem] sm:text-[18rem] font-black text-black/[0.08] select-none pointer-events-none leading-none -rotate-12 font-serif">
        た
      </div>
      <div className="absolute right-[-2%] top-1/3 text-[12rem] sm:text-[18rem] font-black text-amber-300/[0.09] select-none pointer-events-none leading-none rotate-12 font-serif">
        蛸
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[8rem] sm:text-[13rem] font-black text-white/[0.04] select-none pointer-events-none leading-none font-serif whitespace-nowrap">
        たこ焼き
      </div>

      {/* ================= 3. ORNAMEN ILUSTRASI JEPANG ================= */}
      <svg
        className="absolute top-20 left-4 sm:left-12 w-28 sm:w-40 h-28 sm:h-40 text-black/[0.12] pointer-events-none -rotate-12"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 3.84 2.16 7.18 5.34 8.87-.1-.49-.16-1-.16-1.53 0-2.31 1.25-4.33 3.12-5.43-.22-.61-.34-1.26-.34-1.94 0-3.31 2.69-6 6-6s6 2.69 6 6c0 .68-.12 1.33-.34 1.94 1.87 1.1 3.12 3.12 3.12 5.43 0 .53-.06 1.04-.16 1.53C21.84 19.18 24 15.84 24 12c0-5.52-4.48-10-10-10zm-3 10c-.83 0-1.5-.67-1.5-1.5S8.17 9 9 9s1.5.67 1.5 1.5S9.83 12 9 12zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 9 15 9s1.5.67 1.5 1.5S15.83 12 15 12z" />
      </svg>

      <div className="absolute top-24 right-4 sm:right-16 text-amber-400/[0.18] pointer-events-none rotate-45">
        <UtensilsCrossed className="w-24 sm:w-36 h-24 sm:h-36 stroke-[1.8]" />
      </div>

      <svg
        className="absolute bottom-6 left-6 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 text-amber-300/[0.14] pointer-events-none rotate-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="14" r="8" fill="currentColor" fillOpacity="0.1" />
        <path d="M9 4c0 1.5-1 2-1 3" />
        <path d="M12 2c0 1.5-1 2.5-1 3.5" />
        <path d="M15 3.5c0 1.5-1 2-1 3" />
      </svg>

      <svg
        className="absolute bottom-8 right-6 sm:right-20 w-28 sm:w-36 h-28 sm:h-36 text-black/[0.12] pointer-events-none -rotate-12"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <rect x="2" y="5" width="20" height="14" rx="3" fillOpacity="0.2" />
        <circle cx="6" cy="9" r="2" />
        <circle cx="12" cy="9" r="2" />
        <circle cx="18" cy="9" r="2" />
        <circle cx="6" cy="15" r="2" />
        <circle cx="12" cy="15" r="2" />
        <circle cx="18" cy="15" r="2" />
      </svg>

      {/* ================= 4. KONTEN UTAMA ================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="relative inline-block px-10 py-2">
            <svg
              className="absolute inset-0 w-full h-full text-amber-400 -z-0 scale-[1.3]"
              viewBox="0 0 200 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M15.5 22.5C45 -2.5 165 -1.5 188.5 20.5C212 42.5 182.5 76 142 77.5C101.5 79 22.5 75.5 8 55C-6.5 34.5 15.5 22.5 15.5 22.5Z"
                fill="currentColor"
              />
            </svg>

            <h2 
              className="relative z-10 text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-md"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              MENU
            </h2>
          </div>

          <p 
            className="text-white/95 text-[11px] sm:text-sm font-bold uppercase tracking-widest mt-6 drop-shadow-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Dibuat fresh langsung dari wajan panggang setiap hari
          </p>
        </div>

        {/* Grid Kartu Menu */}
        <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-8 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {menuList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectPackage && onSelectPackage(item)}
              className="snap-center shrink-0 w-[78vw] sm:w-full max-w-[280px] sm:max-w-none rounded-[1.25rem] bg-white transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer group shadow-xl hover:shadow-2xl hover:-translate-y-1.5 border-2 border-white hover:border-amber-400"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                
                {item.badge && (
                  <div 
                    className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-black text-[9px] px-2.5 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1 z-10"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <Flame className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    <span>{item.badge}</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 
                    className="text-lg sm:text-xl font-black text-slate-900 tracking-tight uppercase leading-none mt-0.5"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.name}
                  </h3>
                  <span 
                    className="text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-1 rounded-[6px] uppercase tracking-wider shrink-0"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.pcs}
                  </span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <span 
                    className="text-2xl font-black text-red-600 tracking-tight"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}