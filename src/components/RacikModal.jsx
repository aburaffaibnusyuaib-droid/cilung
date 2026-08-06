'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, Plus, Minus, Flame, Check, Sparkles, 
  Utensils, ShieldCheck, Smile, Zap, Ban, Leaf
} from 'lucide-react';

export default function RacikModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  // State Pilihan
  const [quantity, setQuantity] = useState(1);
  const [customTusuk, setCustomTusuk] = useState(2); // Min 2 tusuk buat Custom Pack
  const [selectedBumbu, setSelectedBumbu] = useState([]);
  const [selectedPedas, setSelectedPedas] = useState('Level 0');
  const [catatan, setCatatan] = useState('');

  // Handler Tutup Saat Backdrop Diklik
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Config Varian Bumbu + Icon Valid + Dynamic Border Color Glow & Micro Animations
  const bumbuOptions = [
    { 
      id: 'balado', 
      label: 'Balado', 
      icon: <Flame className="w-4 h-4 text-red-500 group-hover:scale-125 transition-transform duration-300" />,
      activeStyle: 'border-red-500 bg-red-50/80 text-red-700 shadow-sm shadow-red-200' 
    },
    { 
      id: 'keju', 
      label: 'Keju', 
      icon: <Utensils className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />,
      activeStyle: 'border-amber-500 bg-amber-50/80 text-amber-800 shadow-sm shadow-amber-200' 
    },
    { 
      id: 'jagung', 
      label: 'Jagung Bakar', 
      icon: <Sparkles className="w-4 h-4 text-yellow-500 group-hover:bounce transition-transform duration-300" />,
      activeStyle: 'border-yellow-500 bg-yellow-50/80 text-yellow-800 shadow-sm shadow-yellow-200' 
    },
    { 
      id: 'asin', 
      label: 'Asin / Gurih', 
      icon: <Sparkles className="w-4 h-4 text-slate-500 group-hover:spin transition-transform duration-300" />,
      activeStyle: 'border-slate-400 bg-slate-100 text-slate-800 shadow-sm shadow-slate-200' 
    },
    { 
      id: 'nori', 
      label: 'Rumput Laut', 
      icon: <Leaf className="w-4 h-4 text-emerald-500 group-hover:-translate-y-0.5 transition-transform duration-300" />,
      activeStyle: 'border-emerald-500 bg-emerald-50/80 text-emerald-800 shadow-sm shadow-emerald-200' 
    },
    { 
      id: 'tanpa', 
      label: 'Tanpa Bumbu', 
      icon: <Ban className="w-4 h-4 text-slate-400" />,
      activeStyle: 'border-slate-400 bg-slate-100 text-slate-600 shadow-sm' 
    },
  ];

  // Config Level Pedas dengan Custom Indicator
  const pedasOptions = [
    { 
      id: 'Level 0', 
      label: 'Level 0', 
      desc: 'Tanpa Cabai', 
      indicator: <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-300"></span>,
      activeStyle: 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20' 
    },
    { 
      id: 'Level 1', 
      label: 'Level 1', 
      desc: 'Pedas Santai', 
      indicator: <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-200"></span>,
      activeStyle: 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20' 
    },
    { 
      id: 'Level 2', 
      label: 'Level 2', 
      desc: 'Pedas Bara', 
      indicator: <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-300 animate-pulse"></span>,
      activeStyle: 'border-orange-500 bg-orange-50 text-orange-900 ring-2 ring-orange-500/20' 
    },
    { 
      id: 'Level 3', 
      label: 'Level 3', 
      desc: 'Pedas Mampus🔥', 
      indicator: (
        <span className="relative flex items-center justify-center shrink-0">
          <Flame className="w-3.5 h-3.5 text-red-600 fill-red-500 animate-bounce drop-shadow-[0_2px_8px_rgba(239,68,68,0.7)]" />
        </span>
      ),
      activeStyle: 'border-red-600 bg-red-100/80 text-red-950 ring-2 ring-red-600/30' 
    },
  ];

  // Hitung Harga
  const getUnitPrice = () => {
    if (product.isCustom) return customTusuk * 1000;
    if (product.id === 'goceng') return 5000;
    if (product.id === 'ceban') return 10000;
    return 5000;
  };

  const totalPrice = getUnitPrice() * quantity;

  // Handler Bumbu
  const handleToggleBumbu = (id) => {
    if (id === 'tanpa') {
      setSelectedBumbu(['tanpa']);
      return;
    }

    let updated = selectedBumbu.filter((item) => item !== 'tanpa');
    if (updated.includes(id)) {
      updated = updated.filter((item) => item !== id);
    } else {
      updated.push(id);
    }
    setSelectedBumbu(updated);
  };

  // Submit Handler
  const handleAdd = () => {
    const orderData = {
      ...product,
      quantity,
      customTusuk: product.isCustom ? customTusuk : null,
      unitPrice: getUnitPrice(),
      totalPrice,
      selectedBumbu: selectedBumbu.length > 0 ? selectedBumbu : ['tanpa'],
      selectedPedas,
      catatan,
    };

    if (onAddToCart) onAddToCart(orderData);
    onClose();
  };

  return (
    /* BACKDROP OVERLAY DENGAN EVENT CLICK TO CLOSE */
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
    >
      
      {/* CARD CONTAINER (FLOATING CARD DENGAN MARGIN/PADDING INSET DI MOBILE) */}
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[85vh] overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 relative text-slate-800 cursor-default"
        style={{ fontFamily: 'var(--font-sans), sans-serif' }}
      >
        
        {/* HEADER MODAL */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-amber-100 shrink-0">
              <Image 
                src={product.image || '/landscapecilung.jpeg'} 
                alt={product.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 
                  className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  {product.name}
                </h3>
              </div>
              <p 
                className="text-xs text-red-600 font-extrabold"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                {product.isCustom ? `Rp ${(customTusuk * 1000).toLocaleString('id-ID')} (${customTusuk} Tusuk)` : product.price}
              </p>
            </div>
          </div>

          {/* Tombol Silang X dengan Hover Merah */}
          <button
            onClick={onClose}
            className="group w-8 h-8 rounded-full bg-slate-100 hover:bg-red-600 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 active:scale-90 shadow-sm border border-slate-200/80 hover:border-red-600"
            title="Tutup Modal"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 stroke-[2.5]" />
          </button>
        </div>

        {/* BODY CONTENT SCROLLABLE */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
          
          {/* KHUSUS CUSTOM PACK */}
          {product.isCustom && (
            <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-amber-950 block uppercase tracking-wide">JUMLAH TUSUK</span>
                <span className="text-[10px] text-amber-800 font-semibold">Minimal 2 tusuk (@Rp 1.000)</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-amber-300/80 shadow-sm">
                <button
                  onClick={() => setCustomTusuk((prev) => Math.max(2, prev - 1))}
                  className="w-7 h-7 rounded-lg bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-900 disabled:opacity-40 transition-colors"
                  disabled={customTusuk <= 2}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span 
                  className="font-black text-sm text-slate-900 w-6 text-center"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  {customTusuk}
                </span>
                <button
                  onClick={() => setCustomTusuk((prev) => prev + 1)}
                  className="w-7 h-7 rounded-lg bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 1: PILIH BUMBU TABUR */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label 
                className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                <span>PILIH BUMBU TABUR</span>
              </label>
              <span className="text-[10px] text-slate-400 font-semibold">Bisa racik campur</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {bumbuOptions.map((bumbu) => {
                const isSelected = selectedBumbu.includes(bumbu.id);
                return (
                  <button
                    key={bumbu.id}
                    onClick={() => handleToggleBumbu(bumbu.id)}
                    type="button"
                    className={`group py-2.5 px-3 rounded-2xl text-xs font-extrabold border transition-all duration-200 flex items-center justify-between text-left active:scale-95 ${
                      isSelected
                        ? bumbu.activeStyle
                        : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {bumbu.icon}
                      <span>{bumbu.label}</span>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 ml-1">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: LEVEL KEPEDASAN */}
          <div className="space-y-2.5">
            <label 
              className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              <Flame className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>LEVEL KEPEDASAN</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {pedasOptions.map((pedas) => {
                const isSelected = selectedPedas === pedas.id;
                return (
                  <button
                    key={pedas.id}
                    onClick={() => setSelectedPedas(pedas.id)}
                    type="button"
                    className={`p-2.5 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-1.5 active:scale-95 relative overflow-hidden ${
                      isSelected
                        ? `${pedas.activeStyle} shadow-sm font-black`
                        : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {pedas.indicator}
                      <span 
                        className="text-xs font-black uppercase tracking-tight"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                      >
                        {pedas.label}
                      </span>
                    </div>

                    <span className="text-[9px] font-bold text-slate-500">{pedas.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: CATATAN KHUSUS */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Catatan Khusus (Opsional):</label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Bumbunya dipisah ya bang / goreng agak garing..."
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all resize-none"
            />
          </div>

        </div>

        {/* STICKY BOTTOM ACTION BAR */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-3 shrink-0 shadow-lg">
          
          {/* Counter Quantity Porsi */}
          <div className="flex items-center gap-2.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-xl bg-white hover:bg-slate-200/80 flex items-center justify-center text-slate-800 disabled:opacity-40 transition-colors shadow-sm"
              disabled={quantity <= 1}
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span 
              className="font-black text-sm text-slate-900 w-6 text-center"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-8 h-8 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Tombol Tambah ke Keranjang */}
          <button
            onClick={handleAdd}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-2xl text-xs font-black tracking-wide uppercase flex items-center justify-between transition-all active:scale-[0.98] shadow-md shadow-red-600/20"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            <span>TAMBAH KE KERANJANG</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg text-white font-black backdrop-blur-sm">
              Rp {totalPrice.toLocaleString('id-ID')}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}