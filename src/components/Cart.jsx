'use client';

import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, 
  MapPin, Clock, Send, AlertCircle, User, MessageSquare, Pencil, Sparkles, Flame
} from 'lucide-react';

export default function Cart({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQuantity = () => {}, 
  onRemoveItem = () => {}, 
  onEditItem = () => {},
  onClearCart = () => {}
}) {
  if (!isOpen) return null;

  const [nama, setNama] = useState('');
  const [waktuAmbil, setWaktuAmbil] = useState('Langsung Sekarang');
  const [catatanGlobal, setCatatanGlobal] = useState('');
  const [errorNama, setErrorNama] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckoutWA = () => {
    if (!nama.trim()) {
      setErrorNama(true);
      return;
    }
    setErrorNama(false);

    const targetPhone = '628567637987';

    let message = `🔥 *PESANAN CILUNG BARA (SELF-PICKUP)* 🔥\n`;
    message += `------------------------------------------\n`;
    message += `👤 *Nama Pemesan:* ${nama.trim()}\n`;
    message += `⏰ *Waktu Ambil:* ${waktuAmbil}\n`;
    if (catatanGlobal.trim()) {
      message += `📝 *Catatan Pemesan:* ${catatanGlobal.trim()}\n`;
    }
    message += `------------------------------------------\n`;
    message += `📋 *RINCIAN PESANAN:*\n\n`;

    cartItems.forEach((item, index) => {
      const bumbuText = item.selectedBumbu && item.selectedBumbu.length > 0 
        ? item.selectedBumbu.map(b => b.toUpperCase()).join(', ') 
        : 'TANPA BUMBU';
      
      message += `${index + 1}. *${item.quantity}x ${item.name}*${item.isCustom ? ` (${item.customTusuk} Tusuk)` : ''}\n`;
      message += `   • Bumbu: ${bumbuText}\n`;
      message += `   • Pedas: ${item.selectedPedas}\n`;
      if (item.catatan) {
        message += `   • Catatan Item: ${item.catatan}\n`;
      }
      message += `   • Subtotal: Rp ${item.totalPrice.toLocaleString('id-ID')}\n\n`;
    });

    message += `------------------------------------------\n`;
    message += `💰 *TOTAL BAYAR:* Rp ${subtotal.toLocaleString('id-ID')}\n`;
    message += `💳 *Pembayaran:* Tunai / QRIS di Gerobak\n\n`;
    message += `_Mohon diproses ya bang, saya langsung meluncur ke gerobak!_ 🚀`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

    // Reset Form & Kosongkan Keranjang
    onClearCart();
    setNama('');
    setCatatanGlobal('');
    onClose();

    // Buka WhatsApp
    window.open(waUrl, '_blank');
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex justify-end animate-in fade-in duration-300 cursor-pointer"
    >
      <div 
        className="w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 relative text-slate-800 cursor-default"
        style={{ fontFamily: 'var(--font-sans), sans-serif' }}
      >
        {/* HEADER DRAWER MEWAH */}
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
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
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
            title="Tutup Keranjang"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 stroke-[2.5]" />
          </button>
        </div>

        {/* BODY DRAWER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 p-3.5 rounded-2xl flex items-start gap-3 shadow-sm">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 animate-bounce" />
            </div>
            <div className="text-xs text-amber-950">
              <p 
                className="font-black uppercase tracking-wide text-[11px]"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                SELF-PICKUP (AMBIL SENDIRI)
              </p>
              <p className="text-[11px] text-amber-800/90 mt-0.5 font-semibold leading-relaxed">
                Pesanan diracik langsung di gerobak. Kirim via WA, lalu tinggal samperin abangnya!
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
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> TAMBAH MENU SEKARANG
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
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                      >
                        {item.name} {item.isCustom ? `(${item.customTusuk} Tusuk)` : ''}
                      </h4>
                      <p 
                        className="text-xs font-black text-red-600 mt-0.5"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                      >
                        Rp {item.totalPrice.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditItem(index)}
                        className="flex items-center gap-1 text-[10px] font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-lg transition-all active:scale-95 group/edit"
                        title="Edit Racikan Bumbu"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
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
                      <span>{item.selectedBumbu ? item.selectedBumbu.join(', ') : 'Tanpa Bumbu'}</span>
                    </span>
                    <span className="bg-red-50 text-red-900 px-2.5 py-1 rounded-lg border border-red-200/80 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-red-500" />
                      <span>{item.selectedPedas}</span>
                    </span>
                  </div>

                  {item.catatan && (
                    <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-xl border border-slate-100">
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
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
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
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
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
                    <AlertCircle className="w-3 h-3" /> Isi nama dulu ya biar abang tau siapa pemesannya!
                  </p>
                )}
              </div>

              <div>
                <label 
                  className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5 mb-1.5"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>ESTIMASI PENGAMBILAN</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                  {['Langsung Sekarang', '5-10 Menit Lagi', '15 Menit Lagi'].map((waktu) => (
                    <button
                      key={waktu}
                      onClick={() => setWaktuAmbil(waktu)}
                      type="button"
                      className={`p-2.5 rounded-2xl border text-center transition-all active:scale-95 ${
                        waktuAmbil === waktu
                          ? 'bg-amber-50 border-amber-500 text-amber-900 font-black shadow-sm ring-2 ring-amber-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      {waktu}
                    </button>
                  ))}
                </div>
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

        {/* FOOTER CHECKOUT */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-100 space-y-3 shrink-0 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Total Pembayaran:</span>
              <span 
                className="text-xl font-black text-red-600"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Rp {subtotal.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={handleCheckoutWA}
              className="group w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-slate-950 py-3.5 px-4 rounded-2xl text-xs font-black tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              <Send className="w-4 h-4 fill-slate-950 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
              <span>KIRIM PESANAN VIA WA</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}