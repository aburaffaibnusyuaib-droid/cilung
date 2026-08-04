'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu'; 
import Footer from '@/components/Footer';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCart = () => {
    // Fungsi buka modal/drawer keranjang belanja
    console.log("Buka keranjang");
  };

  const handleOrderClick = () => {
    // Scroll otomatis ke section Menu pas tombol di Hero diklik
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (selectedItem) => {
    // Simpan paket yang dipilih & Buka Modal Racik Bumbu
    setSelectedProduct(selectedItem);
    setIsModalOpen(true);

    // Tambah counter cart safe-check (jika dari item langsung/pop-up)
    const qtyToAdd = selectedItem?.quantity || 1;
    setCartCount(prev => prev + qtyToAdd);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={handleOpenCart} 
      />

      {/* Hero */}
      <Hero 
        onOrderClick={handleOrderClick} 
      />

      {/* Menu */}
      <Menu 
        onSelectPackage={handleSelectPackage} 
      />
      {/* Footer */}
      <Footer />

      {/* MODAL / POP-UP RACIK BUMBU (Siap dihubungkan) */}
      {/* {isModalOpen && (
        <RacikModal 
          product={selectedProduct} 
          onClose={() => setIsModalOpen(false)} 
        />
      )} */}
    </main>
  );
}