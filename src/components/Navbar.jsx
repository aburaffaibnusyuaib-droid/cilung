'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // daftar nav
  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Menu', href: '#menu' },
    { name: 'Lokasi', href: '#lokasi' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-red-600/95 backdrop-blur-md shadow-lg shadow-red-950/20 border-b border-amber-400/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo Brand */}
        <a href="#beranda" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border-2 border-amber-400 p-0.5 shadow-md transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/RateBox_Logo.jpeg"
              alt="RateBox Logo"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {/* klo mau ngasih nama brand */}
          <span className="hero-title-light text-white font-black tracking-wider text-base hidden sm:inline-block">
           <span className="text-amber-300"></span>
          </span>
        </a>

        {/* Nav Menu Desktop (Geser ke Kanan via ml-auto mr-8 + Slash Line Animation) */}
        <nav className="hidden md:flex items-center gap-12 ml-auto mr-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative py-1 text-base font-extrabold text-white/90 hover:text-amber-300 transition-colors duration-300 tracking-wide"
            >
              <span>{link.name}</span>
              
              {/* Garis Slash Underline (Animasi tumbuh dari Kiri ke Kanan) */}
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-amber-300 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Tombol Aksi Kanan */}
        <div className="flex items-center gap-2.5">
          
          {/* Tombol Keranjang */}
          <button
            onClick={onOpenCart}
            className="group relative p-2.5 rounded-xl bg-red-700/80 hover:bg-red-800 text-amber-300 transition-all duration-200 active:scale-95 flex items-center justify-center border border-amber-400/30 shadow-inner cursor-pointer"
            aria-label="Buka Keranjang"
          >
            <ShoppingCart className="w-5 h-5 text-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
            
            {/* Badge Angka Pesanan dengan Animasi Ping */}
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-400 text-slate-950 text-[11px] font-black items-center justify-center shadow-md">
                  {cartCount}
                </span>
              </span>
            )}
          </button>

          {/* Tombol Hamburger Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-red-700/80 text-amber-300 border border-red-500/50 active:scale-95 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-red-700/95 border border-amber-400/20 rounded-2xl p-3 shadow-2xl backdrop-blur-lg flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-amber-300 font-bold px-4 py-2.5 rounded-xl hover:bg-red-800/60 transition-all duration-200 text-sm flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-amber-400/50 text-xs">→</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}