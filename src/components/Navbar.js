'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // daftar nav
  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Keunggulan', href: '#keunggulan' },
    { name: 'Menu', href: '#menu' },
    { name: 'Lokasi', href: '#lokasi' },
  ];

  return (
    <>
      {/* Header utama */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-red-600 shadow-lg text-white border-b border-red-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo Ratebox */}
          <a href="#beranda" className="flex items-center">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border-2 border-yellow-400 p-0.5 shadow-md transition-transform hover:scale-105">
              <Image
                src="/RateBox_Logo.jpeg"
                alt="RateBox Logo"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </a>

          {/*nav menu*/}
          <nav className="hidden md:flex items-center gap-12 text-base font-bold tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-yellow-300 active:text-yellow-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Tombol aksi kanan */}
          <div className="flex items-center gap-3">
            {/* keranjang desktop */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-yellow-300 transition-all active:scale-95 flex items-center justify-center border border-red-500/50"
              aria-label="Buka Keranjang"
            >
              <ShoppingCart className="w-5 h-5" />
              
              {/* Angka pesanan (muncul kalau ada isinya) */}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-900 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Tombol hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-red-700 text-yellow-300 border border-red-500/50 active:scale-95"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Dropdown menu pas dibuka di HP */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-red-700 border-t border-red-800 px-6 pt-2 pb-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-yellow-300 font-semibold py-2 border-b border-red-600/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Tombol keranjang melayang di kanan bawah (HP) */}
      <button
        onClick={onOpenCart}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-yellow-300 p-4 rounded-full shadow-2xl border-2 border-yellow-400 flex items-center justify-center active:scale-90 transition-all"
        aria-label="Floating Keranjang"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-red-600">
            {cartCount}
          </span>
        )}
      </button>
    </>
  );
}