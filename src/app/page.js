'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu'; 
import Footer from '@/components/Footer';
import RacikModal from '@/components/RacikModal';
import Cart from '@/components/Cart';
import Qris from '@/components/Qris'; 

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  
  // STATE QRIS DAN PENYIMPANAN LINK WA
  const [isQrisOpen, setIsQrisOpen] = useState(false);
  const [waUrl, setWaUrl] = useState('');

  // Sinkronisasi status buka/tutup toko terpusat
  useEffect(() => {
    const checkStoreStatus = () => {
      try {
        const saved = localStorage.getItem('siboy_store_status');
        if (saved !== null) {
          setIsOpen(JSON.parse(saved));
        }
      } catch (e) {}
    };

    checkStoreStatus();
    window.addEventListener('storage', checkStoreStatus);
    window.addEventListener('focus', checkStoreStatus);
    const interval = setInterval(checkStoreStatus, 500);

    return () => {
      window.removeEventListener('storage', checkStoreStatus);
      window.removeEventListener('focus', checkStoreStatus);
      clearInterval(interval);
    };
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

  const handleSelectPackage = (selectedItem) => {
    setEditingIndex(null);
    setSelectedProduct(selectedItem);
    setIsModalOpen(true);
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setSelectedProduct(cartItems[index]);
    setIsCartOpen(false);
    setIsModalOpen(true);
  };

  const handleAddToCart = (orderData) => {
    if (!isOpen) return; // Guard clause pencegahan order saat toko tutup

    if (editingIndex !== null) {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[editingIndex] = orderData;
        return updated;
      });
      setEditingIndex(null);
      setIsCartOpen(true);
    } else {
      setCartItems((prev) => [...prev, orderData]);
      setIsCartOpen(true);
    }
    setIsModalOpen(false);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      updated[index].totalPrice = updated[index].unitPrice * newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <main className="min-h-screen bg-[#070a11] text-slate-100 overflow-x-hidden relative">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <Hero 
        isOpen={isOpen}
        onOrderClick={() => {
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} 
      />

      <div className="relative z-10 w-full overflow-hidden">
        <Menu 
          isOpen={isOpen}
          onSelectPackage={handleSelectPackage} 
        />
      </div>

      <div className="relative z-30 w-full bg-[#070a11] overflow-hidden">
        <Footer />
      </div>

      {isModalOpen && selectedProduct && (
        <RacikModal 
          key={editingIndex !== null ? `edit-${editingIndex}` : `new-${selectedProduct.id || Date.now()}`}
          product={selectedProduct} 
          isEditMode={editingIndex !== null}
          isOpenStore={isOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingIndex(null);
          }} 
          onAddToCart={handleAddToCart}
        />
      )}

      {/* MODAL QRIS */}
      <Qris 
        isOpen={isQrisOpen}
        onClose={() => setIsQrisOpen(false)}
        totalPrice={cartTotal}
        onProceedWA={() => {
          if (waUrl) window.open(waUrl, '_blank');
          handleClearCart();
          setIsCartOpen(false);
          setIsQrisOpen(false);
        }} 
      />

      {/* KERANJANG */}
      <Cart 
        isOpen={isCartOpen}
        isOpenStore={isOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onEditItem={handleEditItem}
        onClearCart={handleClearCart}
        onCheckoutCash={(url) => {
          if (!isOpen) return;
          window.open(url, '_blank');
          handleClearCart();
          setIsCartOpen(false);
        }}
        onCheckoutQris={(url) => {
          if (!isOpen) return;
          setWaUrl(url);
          setIsQrisOpen(true);
        }}
      />
    </main>
  );
}