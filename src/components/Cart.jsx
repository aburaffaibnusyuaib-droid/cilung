'use client';

import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, 
  MapPin, AlertCircle, User, MessageSquare, Pencil, Sparkles, Flame, Leaf,
  QrCode, Banknote // Tambahan icon baru
} from 'lucide-react';

export default function Cart({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQuantity = () => {}, 
  onRemoveItem = () => {}, 
  onEditItem = () => {},
  onClearCart = () => {},
  onCheckoutCash = () => {},
  onCheckoutQris = () => {}
}) {
  if (!isOpen) return null;

  const [nama, setNama] = useState('');
  const [catatanGlobal, setCatatanGlobal] = useState('');
  const [errorNama, setErrorNama] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getToppingLabel = (id) => {
    const map = {
      sosis: 'Sosis',
      kornet: 'Kornet',
      crabstick: 'Crabstick',
      keju: 'Keju',
      cakalang: 'Katsuobushi',
      polos: 'Tanpa Topping (Polos)'
    };
    return map[id] || id;
  };

  const getSausLabel = (id) => {
    const map = {
      pedas: 'Saus Pedas',
      tomat: 'Saus Tomat',
      mayones: 'Mayones',
      tanpasaus: 'Tanpa Saus'
    };
    return map[id] || id;
  };

  // FUNGSI RAKIT PESAN WA (Bisa buat QRIS atau Tunai)
  const generateWAUrl = (isQris) => {
    const targetPhone = '628567637987';
    let message = `🐙 *PESANAN TAKOYAKI SIBOY (SELF-PICKUP)* 🐙\n`;
    message += `------------------------------------------\n`;
    message += `👤 *Nama Pemesan:* ${nama.trim()}\n`;
    if (catatanGlobal.trim()) {
      message += `📝 *Catatan Tambahan:* ${catatanGlobal.trim()}\n`;
    }
    message += `------------------------------------------\n`;
    message += `📋 *RINCIAN PESANAN:*\n\n`;

    cartItems.forEach((item, index) => {
      const toppingsText = item.toppings && item.toppings.length > 0 
        ? item.toppings.map(t => getToppingLabel(t)).join(', ') 
        : 'Tanpa Topping (Polos)';
      
      const sausText = item.saus && item.saus.length > 0
        ? item.saus.map(s => getSausLabel(s)).join(' + ')
        : 'Tanpa Saus';
      
      message += `${index + 1}. *${item.quantity}x ${item.name}* (${item.pcs || 'Porsi'})\n`;
      message += `   • Isian/Topping: ${toppingsText}\n`;
      message += `   • Sayur: ${item.sayur || 'Pakai Sayur'}\n`;
      message += `   • Saus: ${sausText}\n`;
      if (item.catatan && item.catatan.trim()) {
        message += `   • Catatan Item: "${item.catatan.trim()}"\n`;
      }
      message += `   • Subtotal: Rp ${(item.totalPrice || 0).toLocaleString('id-ID')}\n\n`;
    });

    message += `------------------------------------------\n`;
    message += `💰 *TOTAL BAYAR:* Rp ${subtotal.toLocaleString('id-ID')}\n`;
    
    if (isQris) {
      message += `💳 *Pembayaran:* QRIS (Bukti transfer dilampirkan)\n\n`;
    } else {
      message += `💳 *Pembayaran:* Tunai / Bayar di Gerobak\n\n`;
    }
    
    message += `_Mohon diproses ya bang, saya langsung ambil ke kedai!_ 🚀`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleCashClick = () => {
    if (!nama.trim()) { setErrorNama(true); return; }
    setErrorNama(false);
    onCheckoutCash(generateWAUrl(false));
  };

  const handleQrisClick = () => {
    if (!nama.trim()) { setErrorNama(true); return; }
    setErrorNama(false);
    onCheckoutQris(generateWAUrl(true));
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex justify-end animate-in fade-in duration-300 cursor-pointer"
    >
      <div 
        className="w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 relative text-slate-800 cursor-default"
      >
        {/* HEADER DRAWER */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-amber-50/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-red-500/20 group">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 
                  className="text-base font-black text-slate-900 uppercase tracking-tight"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  KERANJANG
                </h3>
                <span className="text-[9px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" /> LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-bold">
                {cartItems.length} Pilihan Menu Dipilih
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="group w-8 h-8 rounded-full bg-slate-100 hover:bg-red-600 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 active:scale-90 shadow-sm border border-slate-200/80 hover:border-red-600"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 stroke-[2.5]" />
          </button>
        </div>

        {/* BODY DRAWER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-hide">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 p-3.5 rounded-2xl flex items-start gap-3 shadow-sm">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 animate-bounce" />
            </div>
            <div className="text-xs text-amber-950">
              <p 
                className="font-black uppercase tracking-wide text-[11px]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                SELF-PICKUP (AMBIL SENDIRI)
              </p>
              <p className="text-[11px] text-amber-800/90 mt-0.5 font-semibold leading-relaxed">
                Pesanan diracik langsung dari wajan panggang. Kirim via WA, lalu langsung ambil ke kedai!
              </p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-300 flex items-center justify-center mx-auto border border-slate-200/60 shadow-inner">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <p className="text-sm font-extrabold text-slate-600">Keranjang kamu masih kosong</p>
              <button 
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-black text-red-600 hover:text-red-700 uppercase tracking-wider bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> PILIH MENU SEKARANG
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-slate-200/90 hover:border-amber-400 p-4 rounded-2xl space-y-3 transition-all duration-300 shadow-sm hover:shadow-md relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 
                        className="text-xs font-black text-slate-900 uppercase tracking-tight"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {item.name} <span className="text-slate-400 font-bold">({item.pcs || '5 PCS'})</span>
                      </h4>
                      <p 
                        className="text-xs font-black text-red-600 mt-0.5"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Rp {(item.totalPrice || 0).toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditItem(index)}
                        className="flex items-center gap-1 text-[10px] font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-lg transition-all active:scale-95 group/edit"
                        title="Edit Pilihan Topping & Saus"
                      >
                        <Pencil className="w-3 h-3 text-amber-600 group-hover/edit:rotate-12 transition-transform" />
                        <span>EDIT</span>
                      </button>

                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all active:scale-90"
                        title="Hapus Menu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                    <span className="bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200/80 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>
                        {item.toppings && item.toppings.length > 0 
                          ? item.toppings.map(t => getToppingLabel(t)).join(', ') 
                          : 'Tanpa Topping (Polos)'}
                      </span>
                    </span>

                    <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                      item.sayur?.includes('Tanpa')
                        ? 'bg-slate-50 text-slate-600 border-slate-200'
                        : 'bg-emerald-50 text-emerald-900 border-emerald-200/80'
                    }`}>
                      <Leaf className="w-3 h-3 text-emerald-500" />
                      <span>{item.sayur || 'Pakai Sayur'}</span>
                    </span>

                    <span className="bg-red-50 text-red-900 px-2.5 py-1 rounded-lg border border-red-200/80 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-red-500" />
                      <span>
                        {item.saus && item.saus.length > 0 
                          ? item.saus.map(s => getSausLabel(s)).join(' + ') 
                          : 'Tanpa Saus'}
                      </span>
                    </span>
                  </div>

                  {item.catatan && (
                    <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-xl border border-slate-100 font-serif">
                      "{item.catatan}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400">Porsi:</span>
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-inner">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-90 transition-all shadow-sm"
                      >
                        <Minus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                      <span 
                        className="text-xs font-black text-slate-900 w-5 text-center"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-red-600 hover:bg-red-700 flex items-center justify-center text-white active:scale-90 transition-all shadow-sm"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="pt-2 space-y-3">
              <div className="border-t border-slate-100 pt-3">
                <label 
                  className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5 mb-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <User className="w-3.5 h-3.5 text-red-600" />
                  <span>NAMA PEMESAN</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => {
                    setNama(e.target.value);
                    if (e.target.value.trim()) setErrorNama(false);
                  }}
                  placeholder="Ketik nama kamu di sini..."
                  className={`w-full bg-slate-50 border ${
                    errorNama ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200'
                  } rounded-2xl p-3 text-xs text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white transition-all`}
                />
                {errorNama && (
                  <p className="text-[10px] text-red-500 font-bold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Isi nama dulu ya biar abang tahu siapa pemesannya!
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Catatan Tambahan Pesanan (Opsional)</span>
                </label>
                <input
                  type="text"
                  value={catatanGlobal}
                  onChange={(e) => setCatatanGlobal(e.target.value)}
                  placeholder="Contoh: Pakai uang pecahan Rp 50.000 ya bang..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* FOOTER CHECKOUT (2 TOMBOL BARU) */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-100 space-y-3 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Total Pembayaran:</span>
              <span 
                className="text-xl font-black text-red-600"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Rp {subtotal.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCashClick}
                className="w-full bg-emerald-50 hover:bg-emerald-500 text-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-500 py-3.5 px-2 rounded-xl text-[10px] sm:text-[11px] font-black tracking-wide uppercase flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <Banknote className="w-4 h-4 shrink-0" />
                <span>BAYAR TUNAI</span>
              </button>

              <button
                onClick={handleQrisClick}
                className="w-full bg-sky-500 hover:bg-sky-600 border border-sky-500 text-white py-3.5 px-2 rounded-xl text-[10px] sm:text-[11px] font-black tracking-wide uppercase flex items-center justify-center gap-1.5 transition-all shadow-md shadow-sky-500/20 active:scale-95"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <QrCode className="w-4 h-4 shrink-0" />
                <span>BAYAR VIA QRIS</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}