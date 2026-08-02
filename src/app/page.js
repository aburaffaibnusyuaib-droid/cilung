'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const handleOpenCart = () => {
    // Fungsi buka modal/drawer keranjang
    console.log("Buka keranjang");
  };

  const handleOrderClick = () => {
    // Fungsi pas tombol "Racik & Pesan Sekarang" diklik
    setCartCount(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* 1. Navbar Komponen Terpisah */}
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={handleOpenCart} 
      />

      {/* 2. Hero Komponen Terpisah */}
      <Hero 
        onOrderClick={handleOrderClick} 
      />

      {/* Komponen lain nanti di bawah sini (Keunggulan, Menu, dll) */}
    </main>
  );
}