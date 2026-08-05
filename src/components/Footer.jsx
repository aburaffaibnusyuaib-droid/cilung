'use client';

import React, { useState } from 'react';
import { MapPin, Clock, Sparkles, Flame, CreditCard, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [isOnline, setIsOnline] = useState(true);

  // Koordinat Lokasi Abang Jualan (Bisa disesuaikan)
  const latitude = -6.2297;
  const longitude = 106.8600;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <footer 
      id="lokasi" 
      className="w-full bg-[#070a11] text-slate-100 font-sans pt-10 pb-8 border-t-2 border-[#070a11] relative z-30 shadow-[0_-25px_50px_rgba(7,10,17,1)] mt-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ROW UTAMA */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 pb-6 border-b border-slate-800/80">
          
          {/* ==================== KIRI: LIVE LOCATION & PETA CLEAN ==================== */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between gap-3 shrink-0">
            <div>
              {/* Status Live Indicator */}
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  {isOnline && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                </span>
                <span 
                  className={`text-[11px] font-black tracking-widest uppercase ${isOnline ? 'text-emerald-400' : 'text-red-500'}`}
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  {isOnline ? 'LIVE GEROBAK' : 'OFFLINE GEROBAK'}
                </span>
              </div>

              {/* Judul & Alamat */}
              <div className="space-y-0.5 mb-3 text-left">
                <h4 
                  className="text-base font-black text-white uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  POSISI ABANG SEKARANG 🔥
                </h4>
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Sekitaran area sekolah & pemukiman warga</span>
                </p>
              </div>

              {/* Frame Peta Clean dengan PIN MERAH + Tombol Buka di Maps */}
              <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl relative group">
                
                {/* Overlay Button "Buka di Maps" */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 bg-slate-950/90 hover:bg-red-600 text-white text-[11px] font-black px-3 py-1.5 rounded-lg border border-slate-700/80 shadow-lg transition-all active:scale-95 backdrop-blur-sm"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  <span>BUKA DI MAPS</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>

                {/* Layer Transparan Pembatas (Mencegah Jebakan Scroll Trackpad) */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 bg-transparent cursor-pointer"
                  title="Klik untuk membuka titik lokasi di Google Maps"
                ></a>

                {/* Google Maps Iframe dengan Marker Pin Merah Presisi */}
                <iframe
                  title="Live Location Cilung Bara"
                  src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=id&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full block pointer-events-none grayscale-[20%] contrast-[105%]"
                ></iframe>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-medium text-center sm:text-left pt-1">
              *Klik peta atau tombol untuk membuka navigasi di aplikasi Google Maps.
            </p>
          </div>

          {/* ==================== KANAN: BRAND, BADGES, NAV, JAM & WA ==================== */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between gap-4 pt-1 lg:pt-0">
            
            {/* Header Brand + Micro Badges */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-3.5 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center shrink-0 shadow-md">
                  <img 
                    src="/RateBox_Logo.jpeg" 
                    alt="Logo Cilung Bara" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 
                  className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  CILUNG <span className="text-red-600">BARA🔥</span>
                </h3>
              </div>

              {/* Micro Badges Modern */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg hover:border-red-500/50 hover:text-white transition-all shadow-sm">
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Fresh Made</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg hover:border-red-500/50 hover:text-white transition-all shadow-sm">
                  <Flame className="w-3 h-3 text-red-500 shrink-0" />
                  <span>Bumbu Melimpah</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg hover:border-red-500/50 hover:text-white transition-all shadow-sm">
                  <CreditCard className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Tunai & QRIS</span>
                </span>
              </div>
            </div>

            {/* Deskripsi Brand */}
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl text-center sm:text-left">
              Jajanan cilung otentik khas gerobak keliling. Kenyal, gurih, bumbu melimpah, diracik fresh langsung di depan kamu!
            </p>

            {/* Navigasi Links */}
            <div className="space-y-1 text-center sm:text-left">
              <h4 
                className="text-[10px] font-black text-slate-500 uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                NAVIGASI
              </h4>
              <ul className="flex items-center justify-center sm:justify-start gap-6 text-xs font-bold text-slate-300">
                <li><a href="#hero" className="hover:text-red-500 transition-colors">Beranda</a></li>
                <li><a href="#menu" className="hover:text-red-500 transition-colors">Menu Amunisi</a></li>
                <li><a href="#lokasi" className="hover:text-red-500 transition-colors">Live Lokasi Gerobak</a></li>
              </ul>
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 pt-1">
              
              {/* Card Jam Operasional */}
              <div className="w-[92%] sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 shrink-0 text-center">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Keliling Setiap Hari: 10.00 - 18.00 WIB</span>
              </div>

              {/* Order via WA Button */}
              <a
                href="https://wa.me/6281234567890?text=Halo%20Abang%20Cilung%20Bara,%20posisi%20lagi%20di%20mana?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[92%] sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all shadow-md active:scale-95 shrink-0 text-center"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                <svg className="w-3.5 h-3.5 fill-slate-950 shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>ORDER VIA WA: +62 812-3456-7890</span>
              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM CREDIT */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Cilung Bara. All rights reserved.</p>

          <a
            href="https://instagram.com/rwapaaa77"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors group"
          >
            <span>Designed & Developed by</span>
            <span 
              className="font-black text-slate-200 group-hover:text-red-500 underline underline-offset-4 transition-colors"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              @rwapaaa77
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}