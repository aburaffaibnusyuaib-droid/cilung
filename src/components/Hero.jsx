'use client';

import React from 'react';
import Image from 'next/image';
import {
  ShoppingCart,
  Flame,
  Sliders,
  Zap,
  Store,
  MapPin
} from 'lucide-react';

export default function Hero({ onOrderClick }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Montserrat:wght@800;900&family=Shojumaru&display=swap');
        
        @keyframes breathing {
          0%, 100% { box-shadow: 0 10px 25px -5px rgba(220, 38, 38, 0.4); }
          50% { box-shadow: 0 15px 35px -5px rgba(220, 38, 38, 0.7); }
        }
        .breathing-glow {
          animation: breathing 3s infinite ease-in-out;
        }
      `}} />

      <section id="beranda" className="bg-[#faf9f6] text-slate-900 pt-24 pb-16 lg:pt-24 lg:pb-16 min-h-[100dvh] flex flex-col justify-center relative overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* BACKGROUND GRID */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          backgroundSize: '32px 32px',
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)'
        }} />

        {/* 4 WATERMARK KANJI */}
        <div className="absolute top-12 left-4 lg:left-12 text-red-600/15 font-black text-6xl lg:text-7xl pointer-events-none select-none z-0" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
          一番
        </div>
        <div className="absolute top-20 right-4 lg:right-20 text-amber-500/20 font-black text-5xl lg:text-8xl pointer-events-none select-none z-0" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
          本格
        </div>
        <div className="absolute bottom-12 left-1/4 lg:left-1/3 text-slate-900/10 font-black text-5xl lg:text-6xl pointer-events-none select-none z-0" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
          美味しい
        </div>
        <div className="absolute bottom-8 right-12 lg:right-1/4 text-red-700/10 font-black text-6xl lg:text-7xl pointer-events-none select-none z-0" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
          職人
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-6 items-center z-10 relative">

          {/* ================= KOLOM KIRI (TEKS & FITUR) ================= */}
          <div className="w-full lg:col-span-7 flex flex-col justify-center order-1 text-center lg:text-left">
            
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="flex flex-col items-center lg:items-start">
                <span className="text-4xl sm:text-5xl lg:text-[3.5rem] tracking-widest text-slate-800 drop-shadow-sm mb-1 lg:mb-0" style={{ fontFamily: "'Shojumaru', system-ui" }}>
                  TAKOYAKI
                </span>
                <span className="text-[4rem] sm:text-[5.5rem] lg:text-[5.5rem] text-red-600 font-black leading-none drop-shadow-sm uppercase relative inline-block w-max mx-auto lg:mx-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  SIBOY
                  <svg className="absolute w-[110%] h-4 sm:h-6 -bottom-2 sm:-bottom-3 -left-[5%] text-amber-400 z-[-1]" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M5 12 Q 30 5 70 12 T 95 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Tombol Utama */}
            <div className="pt-8 sm:pt-10 lg:pt-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <button
                onClick={onOrderClick}
                className="group relative w-full sm:w-max px-8 py-4 bg-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-full breathing-glow hover:-translate-y-1 transition-all duration-300 ease-out flex items-center justify-center gap-3 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 text-amber-300 animate-bounce shrink-0" />
                <span className="relative z-10">Lihat Menu & Racik</span>
              </button>
            </div>

            {/* 4 CARD KEUNGGULAN */}
            <div className="mt-10 lg:mt-12 w-full grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto lg:mx-0">
              
              <div className="group bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-lg hover:shadow-red-500/20 hover:border-red-400 flex items-center gap-3 sm:gap-4 transition-all duration-200 ease-in-out cursor-default hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors duration-200 ease-in-out">
                  <Flame className="w-5 h-5 transform transition-transform duration-200 ease-in-out group-hover:scale-125 group-hover:rotate-12" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] sm:text-xs font-black text-slate-900 group-hover:text-red-600 uppercase transition-colors duration-200 ease-in-out">Dibuat Fresh</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-0.5">Dadakan di loyang</p>
                </div>
              </div>

              <div className="group bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-lg hover:shadow-amber-500/20 hover:border-amber-400 flex items-center gap-3 sm:gap-4 transition-all duration-200 ease-in-out cursor-default hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200 ease-in-out">
                  <Sliders className="w-5 h-5 transform transition-transform duration-200 ease-in-out group-hover:scale-125 group-hover:-rotate-12" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] sm:text-xs font-black text-slate-900 group-hover:text-amber-600 uppercase transition-colors duration-200 ease-in-out">Mix Toping</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-0.5">Isian sesukamu</p>
                </div>
              </div>

              <div className="group bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400 flex items-center gap-3 sm:gap-4 transition-all duration-200 ease-in-out cursor-default hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 fill-mode-both">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200 ease-in-out">
                  <Zap className="w-5 h-5 transform transition-transform duration-200 ease-in-out group-hover:scale-125 group-hover:rotate-12" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] sm:text-xs font-black text-slate-900 group-hover:text-purple-600 uppercase transition-colors duration-200 ease-in-out">Pesan WA</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-0.5">Gak perlu antre</p>
                </div>
              </div>

              <div className="group bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-400 flex items-center gap-3 sm:gap-4 transition-all duration-200 ease-in-out cursor-default hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-600 fill-mode-both">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200 ease-in-out">
                  <Store className="w-5 h-5 transform transition-transform duration-200 ease-in-out group-hover:scale-125 group-hover:-rotate-12" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] sm:text-xs font-black text-slate-900 group-hover:text-emerald-600 uppercase transition-colors duration-200 ease-in-out">Lapak Netap</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-0.5">Tinggal samperin</p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= KOLOM KANAN (FOTO DUMMY & MATAHARI) ================= */}
          {/* Ditambahkan mt-12 mb-6 di mobile biar posisinya turun ke bawah dan punya jarak aman */}
          <div className="w-full lg:col-span-5 order-2 lg:order-2 relative mt-20 mb-6 lg:mt-0 lg:mb-0 flex justify-center lg:px-4">
            
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] aspect-[4/5] sm:aspect-square group">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] sm:w-[120%] aspect-square bg-red-600 rounded-full z-0 opacity-90 shadow-2xl shadow-red-600/30 animate-in zoom-in-50 fade-in duration-1000 delay-300 fill-mode-both ease-out" />
              
              <div className="absolute inset-0 overflow-hidden bg-white z-10 shadow-xl animate-in fade-in zoom-in-95 duration-1000 delay-500 fill-mode-both ease-out " 
                   style={{ 
                     borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', 
                     border: '4px solid #0f172a' 
                   }}>
                <Image
                  src="/takoyaki.jpeg"
                  fill
                  alt="Takoyaki Siboy"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-6 z-20 animate-in fade-in slide-in-from-top-4 duration-700 delay-700 fill-mode-both">
                <div className="bg-white/95 backdrop-blur-sm border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-4 py-2 sm:py-2.5 flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-900 leading-none mt-0.5">Best Seller</span>
                </div>
              </div>

              <a href="#lokasi" className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 z-20 flex items-center gap-3 bg-white p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgb(0,0,0,0.12)] transition-all duration-300 ease-out cursor-pointer group/loc animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000 fill-mode-both">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0 group-hover/loc:bg-red-600 group-hover/loc:text-white transition-colors duration-300 ease-out">
                  <MapPin className="w-5 h-5 group-hover/loc:scale-110 transition-transform duration-300 ease-out" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lokasi Netap</p>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-900 leading-none mt-0.5">Depan SMKN 65</p>
                </div>
              </a>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}