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

      <section id="beranda" className="hero-body-light bg-slate-50 text-slate-900 pt-20 sm:pt-24 lg:pt-32 pb-12 lg:pb-16 min-h-[calc(100vh-4rem)] flex flex-col justify-start overflow-hidden relative">

        {/* efek warna background */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center z-10">

          {/*judul*/}
          <div className="w-full lg:col-span-6 order-1 text-center lg:text-left">
            <span className="inline-block px-3.5 py-1 mb-2 rounded-full bg-red-50 border border-red-100 text-red-700 font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-sm">
              Otentik Gerobak Keliling
            </span>
            <h1 className="hero-title-light text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-slate-900">
              CILUNG <span className="text-red-600">BARA🔥</span>
            </h1>
          </div>

          {/*cilung dan elemen nya*/}
          <div className="w-full lg:col-span-6 order-2 lg:row-span-3 relative my-2 lg:my-0">

            {/*timer*/}
            <div className="absolute -top-3 -left-2 sm:-top-4 sm:-left-4 z-20 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/60 border border-white/40 shadow-lg backdrop-blur-sm">
              <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-amber-400 shadow-inner">
                <Timer className="w-5 h-5 sm:w-7 sm:h-7 text-slate-950 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            {/*cilung*/}
            <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden border-2 sm:border-4 border-white shadow-xl shadow-slate-200/80 group">
              <Image
                src="/potretcilung.jpeg"
                fill
                alt="Cilung Bara"
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
                  Depan SMKN 65 JKT
                </p>
              </div>
            </a>

          </div>

          {/*btn pesan*/}
          <div className="w-full lg:col-span-6 order-3 pt-1 pb-4 lg:pb-0 md-4">
            <button
              onClick={onOrderClick}
              className="group relative w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-amber-300 font-extrabold text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl hover:shadow-red-600/30 border border-red-500/80 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer overflow-hidden"
            >
              {/*animasi sinar*/}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />

              {/*cart */}
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
              <span className="relative z-10 tracking-wide">Racik & Pesan Sekarang</span>
            </button>
          </div>

          {/*keunggulan*/}
          <div className="w-full lg:col-span-6 order-4 text-left space-y-3 pt-4 lg:pt-0 border-t border-slate-200/80 lg:border-none">
            <div className="grid grid-cols-2 gap-2.5">

              {/* Fresh */}
              <div className="group p-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-400 hover:shadow-md hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer">
                <div className="p-2 rounded-xl bg-red-50 text-red-600 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-tight group-hover:text-red-600 transition-colors">Dibuat Fresh</p>
                  <p className="text-[10px] font-semibold text-slate-500">Dimasak Dadakan</p>
                </div>
              </div>

              {/* Mix Bumbu */}
              <div className="group p-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">Bebas Mix Bumbu</p>
                  <p className="text-[10px] font-semibold text-slate-500">Racik Sesukamu</p>
                </div>
              </div>

              {/* Tanpa Antre */}
              <div className="group p-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-purple-400 hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-tight group-hover:text-purple-600 transition-colors">Tanpa Antre</p>
                  <p className="text-[10px] font-semibold text-slate-500">Datang & Ambil</p>
                </div>
              </div>

              {/* Live Tracking */}
              <div className="group p-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer">
                <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 leading-tight group-hover:text-cyan-600 transition-colors">Live Tracking</p>
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