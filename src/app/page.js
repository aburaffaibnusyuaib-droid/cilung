'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu'; 
import Footer from '@/components/Footer';
import RacikModal from '@/components/RacikModal';
import Cart from '@/components/Cart';
import Qris from '@/components/Qris'; 

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  
  const [isQrisOpen, setIsQrisOpen] = useState(false);
  const [pendingOrderInfo, setPendingOrderInfo] = useState(null);

  useEffect(() => {
    const checkStoreStatus = () => {
      try {
        const saved = localStorage.getItem('siboy_store_status');
        if (saved !== null) setIsOpen(JSON.parse(saved));
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
    if (!isOpen) return;

    if (editingIndex !== null) {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[editingIndex] = orderData;
        return updated;
      });
      setEditingIndex(null);
    } else {
      setCartItems((prev) => [...prev, orderData]);
    }
    setIsCartOpen(true);
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

  // Helper Pembuatan Order & Karcis Otomatis
  const processCheckout = (orderMeta) => {
    try {
      const history = JSON.parse(localStorage.getItem('siboy_order_history') || '[]');
      const kitchen = JSON.parse(localStorage.getItem('siboy_kitchen_orders') || '[]');

      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      
      const qIndex = (history.length % 99) + 1;
      const qNo = `#${qIndex.toString().padStart(2, '0')}`;
      const orderId = `SB-${Date.now().toString().slice(-4)}`;

      const formattedItems = cartItems.map(item => ({
        name: item.name,
        qty: item.quantity,
        price: item.unitPrice,
        toppings: item.toppings?.join(', ') || 'Polos',
        veg: item.sayur || 'Pakai Sayur',
        spicy: item.saus?.join(' + ') || 'Tanpa Saus'
      }));

      const newOrder = {
        id: orderId,
        qNo,
        name: orderMeta.customerName,
        customerName: orderMeta.customerName,
        time: timeStr,
        timestamp: now.toISOString(),
        rawTotal: cartTotal,
        total: `Rp ${cartTotal.toLocaleString('id-ID')}`,
        pay: orderMeta.paymentMethod,
        status: 'waiting_verification', // Menunggu validasi kasir
        notes: orderMeta.notes || '',
        items: formattedItems
      };

      // Simpan ke storage untuk kasir & dapur
      localStorage.setItem('siboy_order_history', JSON.stringify([newOrder, ...history]));
      localStorage.setItem('siboy_kitchen_orders', JSON.stringify([...kitchen, newOrder]));
      window.dispatchEvent(new Event('storage'));

      // Bersihkan keranjang dan buka halaman tiket
      handleClearCart();
      setIsCartOpen(false);
      setIsQrisOpen(false);
      router.push(`/ticket?id=${orderId}`);
    } catch (e) {
      console.error(e);
    }
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
        onConfirmPayment={() => {
          if (pendingOrderInfo) processCheckout(pendingOrderInfo);
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
        onCheckoutCash={(info) => processCheckout(info)}
        onCheckoutQris={(info) => {
          setPendingOrderInfo(info);
          setIsQrisOpen(true);
        }}
      />
    </main>
  );
}