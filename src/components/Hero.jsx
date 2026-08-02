'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ShoppingCart, 
  Timer, 
  Radar, 
  Flame, 
  Sliders, 
  Zap, 
  Navigation 
} from 'lucide-react';

export default function Hero({ onOrderClick }) {
  return (
    <>
      {/* import font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Montserrat:wght@800;900&display=swap');
        
        .hero-title-light {
          font-family: 'Montserrat', sans-serif !important;
        }
        .hero-body-light {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
      `}</style>

      {/* section utama */}
      <section id="beranda" className="hero-body-light bg-slate-50 text-slate-900 pt-14 sm:pt-20 pb-10 overflow-hidden relative">
        
        {/* efek warna background */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-10 items-center z-10">
          
          {/*judul*/}
          <div className="w-full lg:col-span-6 order-1 text-center lg:text-left pt-1">
            <span className="inline-block px-3 py-0.5 mb-1 rounded-full bg-red-50 border border-red-100 text-red-700 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
              Otentik Gerobak Keliling
            </span>
            <h1 className="hero-title-light text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-slate-900">
              CILUNG <span className="text-red-600">RAPUT</span>
            </h1>
          </div>

          {/*cilung dan elemen nya*/}
          <div className="w-full lg:col-span-6 order-2 lg:row-span-3 relative my-1.5 lg:my-0">
            
            {/*timer (dihidupkan & digedein)*/}
            <div className="absolute -top-3 -left-2 sm:-top-4 sm:-left-4 z-20 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/60 border border-white/40 shadow-lg backdrop-blur-sm">
              <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-amber-400 shadow-inner">
                <Timer className="w-5 h-5 sm:w-7 sm:h-7 text-slate-950 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            {/*cilung (aspect-[4/3] biar foto lebih gede di hp)*/}
            <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden border-2 sm:border-4 border-white shadow-xl shadow-slate-200/80 group">
              <Image 
                src="/potretcilung.jpeg" 
                fill 
                alt="Cilung Raput" 
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
              />
              
              {/*Overlay gelap tipis*/}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>

            {/*live tracking */}
            <a href="#live-tracking" className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex max-w-[85%] items-center gap-2 rounded-full bg-white/95 p-1.5 pr-3.5 border border-slate-100 shadow-md backdrop-blur-sm transition-transform active:scale-95 cursor-pointer">
              {/*map elemen*/}
              <div className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 relative border border-emerald-100">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <Radar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 animate-spin" style={{ animationDuration: '5s' }} />
              </div>
              
              {/*teks naroh lokasi*/}
              <div className="text-left overflow-hidden">
                <p className="text-[8px] font-extrabold text-slate-400 uppercase leading-none tracking-wide">
                  Gerobak Live
                </p>
                <p className="text-[10px] sm:text-xs font-black text-slate-950 mt-0.5 truncate">
                  Depan Alfamart SMKN 65 Jkt (Keliling Area Rawamangun)
                </p>
              </div>
            </a>

          </div>

          {/*btn pesan*/}
          <div className="w-full lg:col-span-6 order-3 pt-1 pb-10 lg:pb-0">
            <button 
              onClick={onOrderClick} 
              className="w-full sm:w-auto px-6 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-amber-300 font-extrabold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg shadow-red-600/20 border border-red-500 transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span>Racik & Pesan Sekarang</span>
            </button>
          </div>

          {/*keunggulan (harus scroll baru keliatan di HP)*/}
          <div className="w-full lg:col-span-6 order-4 text-left space-y-3 pt-6 lg:pt-0 border-t border-slate-200/60 lg:border-none">
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Fresh */}
              <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-2.5 hover:shadow-md transition-shadow">
                <div className="p-2 rounded-xl bg-red-50 text-red-600 shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-tight">Dibuat Fresh</p>
                  <p className="text-[10px] font-semibold text-slate-500">Dimasak Dadakan</p>
                </div>
              </div>

              {/* Mix Bumbu */}
              <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-2.5 hover:shadow-md transition-shadow">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-tight">Bebas Mix Bumbu</p>
                  <p className="text-[10px] font-semibold text-slate-500">Racik Sesukamu</p>
                </div>
              </div>

              {/* Tanpa Antre */}
              <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-2.5 hover:shadow-md transition-shadow">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-tight">Tanpa Antre</p>
                  <p className="text-[10px] font-semibold text-slate-500">Datang & Ambil</p>
                </div>
              </div>

              {/* Live Tracking */}
              <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-2.5 hover:shadow-md transition-shadow">
                <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-tight">Live Tracking</p>
                  <p className="text-[10px] font-semibold text-slate-500">Pantau Gerobak</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}