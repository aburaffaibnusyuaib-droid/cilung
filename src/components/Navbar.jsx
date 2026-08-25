'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';

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

  // Deteksi Scroll untuk Efek Floating & Active Menu (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['beranda', 'menu', 'lokasi'];
      let currentSection = 'beranda';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'beranda', name: 'Beranda', href: '#beranda' },
    { id: 'menu', name: 'Menu', href: '#menu' },
    { id: 'lokasi', name: 'Lokasi', href: '#lokasi' },
  ];

  return (
    <>
      {/* Backdrop penangkap klik di luar navbar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Container Utama: Turun halus saat web pertama dibuka */}
      <header 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none animate-in fade-in slide-in-from-top-6 duration-700 ease-out flex justify-center"
      >
        {/* Floating Island: Berubah skala dan bayangan saat di-scroll */}
        <div 
          className={`w-full max-w-5xl rounded-2xl sm:rounded-[2rem] px-4 sm:px-6 h-16 flex items-center justify-between pointer-events-auto transition-all duration-500 ${
            isScrolled
              ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200 mt-2 scale-[0.98]'
              : 'bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/50 mt-4'
          }`}
        >
          {/* ================= LOGO BRAND ================= */}
          <a href="#beranda" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-900 border border-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/RateBox_Logo.jpeg"
                alt="Logo Takoyaki Siboy"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <span className="text-slate-900 font-black tracking-tight text-sm sm:text-[15px] uppercase leading-none drop-shadow-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Takoyaki <span className="text-red-600">Siboy</span>
            </span>
          </a>

          {/* ================= DESKTOP NAV MENU ================= */}
          <nav className="hidden md:flex items-center gap-8 ml-auto mr-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 text-[13px] font-black transition-colors duration-300 uppercase tracking-wider ${
                    isActive ? 'text-red-600' : 'text-slate-700 hover:text-red-600'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>{link.name}</span>
                  {/* Micro-underline: Nyala kalau aktif atau di-hover */}
                  <span 
                    className={`absolute bottom-0 left-0 h-[2px] bg-red-600 rounded-full transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full hover:w-full'
                    }`} 
                  />
                </a>
              );
            })}
          </nav>

          {/* ================= TOMBOL AKSI KANAN ================= */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tombol Keranjang Belanja */}
            <button
              onClick={onOpenCart}
              className="group relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 hover:bg-white text-slate-800 transition-all duration-300 active:scale-95 flex items-center justify-center border border-slate-200 hover:border-red-400 shadow-sm hover:shadow-md cursor-pointer"
              aria-label="Buka Keranjang"
            >
              <ShoppingCart className="w-[18px] h-[18px] sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-red-600" />
              
              {/* Badge Angka Pesanan - Hanya muncul jika > 0 */}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 duration-700"></span>
                  <span className="relative inline-flex rounded-full h-[18px] w-[18px] bg-red-600 text-white text-[9px] font-black items-center justify-center shadow-md" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {cartCount}
                  </span>
                </span>
              )}
            </button>

            {/* Tombol Hamburger Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 active:scale-95 cursor-pointer shadow-sm hover:border-red-400 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ================= DROPDOWN MENU MOBILE ================= */}
        {isMobileMenuOpen && (
          <div className="absolute top-[88px] left-4 right-4 sm:left-6 sm:right-6 max-w-5xl mx-auto md:hidden pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="bg-white border border-slate-100 rounded-2xl p-2.5 shadow-xl flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-black px-4 py-3.5 rounded-xl transition-all duration-200 text-[13px] flex items-center justify-between group uppercase ${
                      isActive ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-50 hover:text-red-600'
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span>{link.name}</span>
                    <span className={`transition-colors text-sm ${isActive ? 'text-red-500' : 'text-slate-300 group-hover:text-red-400'}`}>
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