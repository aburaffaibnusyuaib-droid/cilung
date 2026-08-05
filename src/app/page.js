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
    console.log("Buka keranjang");
  };

  const handleOrderClick = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (selectedItem) => {
    setSelectedProduct(selectedItem);
    setIsModalOpen(true);

    const qtyToAdd = selectedItem?.quantity || 1;
    setCartCount(prev => prev + qtyToAdd);
  };

  return (
    <main className="min-h-screen bg-[#070a11] text-slate-100 overflow-x-hidden relative">
      {/* Navbar */}
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={handleOpenCart} 
      />

      {/* Hero */}
      <Hero 
        onOrderClick={handleOrderClick} 
      />

      {/* Menu - Dibungkus isolasi biar warna merah gak meluber ke footer */}
      <div className="relative z-10 w-full overflow-hidden">
        <Menu 
          onSelectPackage={handleSelectPackage} 
        />
      </div>

      {/* Footer - Kunci z-index 30 biar lepas dari kejebak overlay atas */}
      <div className="relative z-30 w-full bg-[#070a11] overflow-hidden">
        <Footer />
      </div>

      {/* MODAL / POP-UP RACIK BUMBU */}
      {/* {isModalOpen && (
        <RacikModal 
          product={selectedProduct} 
          onClose={() => setIsModalOpen(false)} 
        />
      )} */}
    </main>
  );
}