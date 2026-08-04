'use client';

import React from 'react';
import { MapPin, Clock, MessageCircle, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="lokasi" className="w-full bg-slate-950 text-white font-sans pt-12 pb-8 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Layout Utama: Langsung Grid Horizontal Tanpa Kotak-Kotak Pembungkus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-12 border-b border-slate-900">
          
          {/* ==================== 30% AREA: LIVE LOCATION & MAPS (Col 4) ==================== */}
          <div className="lg:col-span-4 space-y-3">
            {/* Live Indicator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span 
                  className="text-[11px] font-black tracking-widest uppercase text-emerald-400"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  LIVE GEROBAK
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Aktif
              </span>
            </div>

            {/* Title & Info */}
            <div>
              <h4 
                className="text-base font-black text-white uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                POSISI ABANG SEKARANG 🔥
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Sekitaran area sekolah & pemukiman warga</span>
              </p>
            </div>

            {/* Frame Peta Clean / Frame Edge Radius Murni */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <iframe
                title="Live Location Cilung Bara"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2828062973845!2d106.8600!3d-6.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnNDYuOSJTIDEwNsKwNTEnMzYuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>

            <p className="text-[10px] text-slate-500 font-medium pt-1">
              *Posisi terupdate secara otomatis saat abang jualan keliling.
            </p>
          </div>

          {/* ==================== 70% AREA: FOOTER CONTENT (Col 8) ==================== */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-8 items-start pt-2">
            
            {/* Branding Section */}
            <div className="sm:col-span-7 space-y-4">
              <div>
                <h3 
                  className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase leading-none"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  CILUNG <span className="text-red-600">BARA🔥</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-3 leading-relaxed max-w-sm">
                  Jajanan cilung otentik khas gerobak keliling. Kenyal, gurih, bumbu melimpah, diracik fresh langsung di depan kamu!
                </p>
              </div>

              {/* Jam Operasional Simple */}
              <div className="flex items-center gap-2 text-slate-300 text-xs font-bold">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Keliling Setiap Hari: 10.00 - 18.00 WIB</span>
              </div>

              {/* Tombol WhatsApp Direct */}
              <div className="pt-2">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Abang%20Cilung%20Bara,%20posisi%20di%20mana?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/10 transition-all hover:-translate-y-0.5"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Hubungi Abang via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Links Navigasi & Social Media */}
            <div className="sm:col-span-5 space-y-6">
              <div>
                <h4 
                  className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  NAVIGASI
                </h4>
                <ul className="space-y-2.5 text-xs font-bold">
                  <li>
                    <a href="#hero" className="text-slate-300 hover:text-red-500 transition-colors">
                      Beranda
                    </a>
                  </li>
                  <li>
                    <a href="#menu" className="text-slate-300 hover:text-red-500 transition-colors">
                      Menu Amunisi
                    </a>
                  </li>
                  <li>
                    <a href="#lokasi" className="text-slate-300 hover:text-red-500 transition-colors">
                      Live Lokasi Gerobak
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 
                  className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  MEDIA SOSIAL
                </h4>
                <div className="flex items-center gap-3">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 1 1-2.896-2.896c.24 0 .474.029.7.083V9.387a6.34 6.34 0 1 0 5.64 6.285V8.532a8.17 8.17 0 0 0 4.771 1.524V6.612a4.845 4.845 0 0 1-1.000.074z"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Line: Copyright & Portofolio Lu */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Cilung Bara. All rights reserved.</p>

          <a
            href="https://instagram.com/m.raffaputraa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>by</span>
            <span 
              className="font-black text-slate-300 underline underline-offset-2"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              @m.raffaputraa
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}