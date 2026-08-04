'use client';

import React from 'react';
import Image from 'next/image';
import { Flame } from 'lucide-react';

export default function Menu({ onSelectPackage }) {
  const menuList = [
    {
      id: 'custom',
      name: 'CUSTOM PACK',
      price: 'Mulai Rp 2.000',
      description: 'Bebas atur jumlah minimal 2 tusuk.',
      image: '/landscapecilung.jpeg',
      badge: null,
      isCustom: true,
    },
    {
      id: 'goceng',
      name: 'PAKET GOCENG',
      price: 'Rp 5.000',
      description: 'Isi 5 tusuk cilung kenyal dengan bumbu melimpah.',
      image: '/landscapecilung.jpeg',
      badge: 'PALING LARIS',
      isCustom: false,
    },
    {
      id: 'ceban',
      name: 'PAKET CEBAN',
      price: 'Rp 10.000',
      description: 'Isi 10 tusuk melimpah. Dijamin puas.',
      image: '/landscapecilung.jpeg',
      badge: null,
      isCustom: false,
    },
  ];

  return (
    <section id="menu" className="w-full py-16 sm:py-24 bg-red-600 block overflow-visible">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Header Section (MENU dengan Background Abstrak Kuning & Teks Putih) */}
        <div className="text-center mb-10 sm:mb-14 flex justify-center">
          <div className="relative inline-block px-8 py-3.5">
            
            {/* SVG Background Shape Abstrak Coretan Hand-Drawn Kuning */}
            <svg
              className="absolute inset-0 w-full h-full text-amber-400 -z-0 scale-110 sm:scale-125"
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

            {/* Tulisan MENU Putih Solid (Montserrat Ultra Bold) */}
            <h2 
              className="relative z-10 text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              MENU
            </h2>
          </div>
        </div>

        {/* Grid 3 Card Sejajar (Aman Tanpa Bug Kepotong di Mobile) */}
        <div className="flex sm:grid sm:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible pt-5 pb-6 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {menuList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectPackage && onSelectPackage(item)}
              className="snap-center shrink-0 w-[82vw] sm:w-full max-w-[320px] sm:max-w-none rounded-2xl bg-white transition-all duration-300 flex flex-col justify-between overflow-hidden relative cursor-pointer group shadow-2xl shadow-black/25 hover:shadow-black/40 hover:-translate-y-2 active:scale-[0.98] border-2 border-white/90 hover:border-amber-400"
            >
              <div>
                {/* Visual Gambar Frame Clean */}
                <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  
                  {/* Badge Paling Laris */}
                  {item.badge && (
                    <div 
                      className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 font-black text-[9px] px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1 z-10"
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      <Flame className="w-3 h-3 fill-slate-950" />
                      <span>{item.badge}</span>
                    </div>
                  )}
                </div>

                {/* Body Content Typography Clean & Kompak */}
                <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[120px] sm:min-h-[130px]">
                  <div>
                    {/* Judul Card */}
                    <h3 
                      className={`text-lg sm:text-xl font-black tracking-tighter leading-none uppercase ${
                        item.isCustom ? 'text-red-600' : 'text-slate-900'
                      }`}
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      {item.name}
                    </h3>

                    {/* Harga Card */}
                    <p 
                      className={`font-black text-base sm:text-lg mt-1.5 tracking-tight leading-none ${
                        item.isCustom ? 'text-amber-500' : 'text-red-600'
                      }`}
                      style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                      {item.price}
                    </p>
                  </div>

                  {/* Deskripsi Singkat Presisi */}
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed font-semibold line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}