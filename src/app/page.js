'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu'; 
import Footer from '@/components/Footer';
import RacikModal from '@/components/RacikModal';
import Cart from '@/components/Cart';
import Qris from '@/components/Qris'; 

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  
  // STATE QRIS DAN PENYIMPANAN LINK WA
  const [isQrisOpen, setIsQrisOpen] = useState(false);
  const [waUrl, setWaUrl] = useState('');

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
        onOrderClick={() => {
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} 
      />

      <div className="relative z-10 w-full overflow-hidden">
        <Menu 
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
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onEditItem={handleEditItem}
        onClearCart={handleClearCart}
        
        // PROPS BARU UNTUK 2 TOMBOL CHECKOUT
        onCheckoutCash={(url) => {
          window.open(url, '_blank');
          handleClearCart();
          setIsCartOpen(false);
        }}
        onCheckoutQris={(url) => {
          setWaUrl(url); // Simpan link WA yang bawa data nama
          setIsQrisOpen(true); // Buka popup QRIS
        }}
      />
    </main>
  );
}