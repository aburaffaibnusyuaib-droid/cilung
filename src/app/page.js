'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu'; 
import Footer from '@/components/Footer';
import RacikModal from '@/components/RacikModal';
import Cart from '@/components/Cart';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // 1. HANDLER BUKA RACIK MODAL DARI MENU
  const handleSelectPackage = (selectedItem) => {
    console.log("👉 1. MENU DIKLIK! Data diterima:", selectedItem);
    setEditingIndex(null);
    setSelectedProduct(selectedItem);
    setIsModalOpen(true);
  };

  // 2. HANDLER EDIT ITEM DARI KERANJANG
  const handleEditItem = (index) => {
    console.log("👉 EDIT ITEM INDEX:", index);
    setEditingIndex(index);
    setSelectedProduct(cartItems[index]);
    setIsCartOpen(false);
    setIsModalOpen(true);
  };

  // 3. TAMBAH / SIMPAN PERUBAHAN KE KERANJANG
  const handleAddToCart = (orderData) => {
    console.log("👉 MASUK KERANJANG:", orderData);
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
    }
    setIsModalOpen(false);
  };

  // 4. UPDATE QUANTITY PORSI (+ / -)
  const handleUpdateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      updated[index].totalPrice = updated[index].unitPrice * newQty;
      return updated;
    });
  };

  // 5. HAPUS ITEM DARI KERANJANG
  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // 6. KOSONGKAN KERANJANG TOTAL (CHECKOUT WA)
  const handleClearCart = () => {
    console.log("👉 KERANJANG DIBERSIHKAN!");
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

      {/* POP-UP RACIK BUMBU */}
      {isModalOpen && selectedProduct && (
        <RacikModal 
          product={selectedProduct} 
          isEditMode={editingIndex !== null}
          onClose={() => {
            setIsModalOpen(false);
            setEditingIndex(null);
          }} 
          onAddToCart={handleAddToCart}
        />
      )}

      {/* DRAWER KERANJANG BELANJA */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onEditItem={handleEditItem}
        onClearCart={handleClearCart}
      />
    </main>
  );
}