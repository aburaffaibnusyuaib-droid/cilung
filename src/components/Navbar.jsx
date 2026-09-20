'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'beranda', name: 'Beranda', href: '#beranda' },
  { id: 'menu', name: 'Menu', href: '#menu' },
  { id: 'about-us', name: 'Tentang Kami', href: '#about-us' },
  { id: 'lokasi', name: 'Lokasi', href: '#lokasi' },
];

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const navRef = useRef(null);

  // Auto-close saat user klik di luar area navbar/menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Scroll Spy Dua Arah (Atas-Bawah & Bawah-Atas) 100% Akurat
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // 1. Jika sudah di puncak paling atas, paksa aktifkan 'beranda'
      if (window.scrollY < 100) {
        setActiveSection('beranda');
        return;
      }

      // 2. Jika scroll sudah mentok di paling bawah halaman, paksa 'lokasi'
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 70;

      if (isAtBottom) {
        setActiveSection('lokasi');
        return;
      }

      // 3. Deteksi Garis Pandang Mata (Tengah Layar Atas: 35% tinggi viewport)
      const focalPoint = window.innerHeight * 0.35;
      let currentActive = 'beranda';

      for (const item of NAV_LINKS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Jika titik pandang mata berada di antara batas atas dan bawah section
          if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
            currentActive = item.id;
            break;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Backdrop penangkap klik di luar navbar mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-2xs"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Container Utama */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none animate-in fade-in slide-in-from-top-6 duration-700 ease-out flex justify-center"
      >
        <div
          className={`w-full max-w-5xl rounded-2xl sm:rounded-[2rem] px-4 sm:px-6 h-16 flex items-center justify-between pointer-events-auto transition-all duration-500 ${
            isScrolled
              ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200 mt-2 scale-[0.98]'
              : 'bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/50 mt-4'
          }`}
        >
          {/* LOGO BRAND */}
          <a href="#beranda" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <Image
                src="/logosiboy.png"
                alt="Logo Takoyaki Siboy"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <span
              className="text-slate-900 font-black tracking-tight text-sm sm:text-[15px] uppercase leading-none"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Takoyaki <span className="text-red-600">Siboy</span>
            </span>
          </a>

          {/* DESKTOP NAV MENU */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto mr-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`group relative py-2 text-[13px] font-black transition-colors duration-300 uppercase tracking-wider ${
                    isActive ? 'text-red-600' : 'text-slate-700 hover:text-red-600'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>{link.name}</span>
                  {/* Garis Bawah Merah Aktif / Hover */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2.5px] bg-red-600 rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* TOMBOL AKSI KANAN */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tombol Keranjang Belanja */}
            <button
              type="button"
              onClick={onOpenCart}
              className="group relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 hover:bg-white text-slate-800 transition-all duration-300 active:scale-95 flex items-center justify-center border border-slate-200 hover:border-red-400 shadow-xs hover:shadow-md cursor-pointer"
              aria-label="Buka Keranjang"
            >
              <ShoppingCart className="w-[18px] h-[18px] sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-red-600" />

              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 duration-700" />
                  <span
                    className="relative inline-flex rounded-full h-[18px] w-[18px] bg-red-600 text-white text-[9px] font-black items-center justify-center shadow-md"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {cartCount}
                  </span>
                </span>
              )}
            </button>

            {/* Tombol Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2.5 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 active:scale-95 cursor-pointer shadow-xs hover:border-red-400 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-red-600" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* DROPDOWN MENU MOBILE */}
        {isMobileMenuOpen && (
          <div className="absolute top-[88px] left-4 right-4 sm:left-6 sm:right-6 max-w-5xl mx-auto md:hidden pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="bg-white border border-slate-100 rounded-2xl p-2.5 shadow-xl flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-black px-4 py-3.5 rounded-xl transition-all duration-200 text-[13px] flex items-center justify-between group uppercase ${
                      isActive
                        ? 'bg-red-50 text-red-600'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-red-600'
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span>{link.name}</span>
                    <span
                      className={`transition-colors text-sm ${
                        isActive
                          ? 'text-red-500 font-bold'
                          : 'text-slate-300 group-hover:text-red-400'
                      }`}
                    >
                      →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
}